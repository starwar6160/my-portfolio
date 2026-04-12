import re
import sys
import math
import os
import subprocess

# Configuration
EXCLUDED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.bin', '.hex', '.map', '.lock'}
EXCLUDED_DIRS = {'node_modules', 'vendor', 'themes', 'static/assets'}
ENTROPY_THRESHOLD = 3.8  # Threshold for high-entropy secret detection
MIN_ENTROPY_LEN = 20

# Professional/Public Identity (Whitelisted)
WHITELISTED_EMAILS = {'zhouwei6160@gmail.com'}

# PII Patterns
PATTERNS = {
    'Yokohama Address': re.compile(r'\d{1,2}丁目\d{1,2}番\d{1,2}号|鶴見区|Tsurumi|Yokohama|Kanagawa', re.IGNORECASE),
    'Phone (JP Fixed)': re.compile(r'045-\d{3,4}-\d{4}'),
    'Phone (Universal)': re.compile(r'\d{3}-\d{4}-\d{4}|\d{2}-\d{4}-\d{4}'),
    'Personal Name': re.compile(r'\bZhou\s*Wei\b|\bZN\s*0\b', re.IGNORECASE),
    'Identity Doc': re.compile(r'(Zairyu\s*Card|在留カード|My\s*Number|个人编号|Visa).*?\d{10,18}', re.IGNORECASE),
    'Email (Private)': re.compile(r'[a-zA-Z0-9._%+-]+@(?!gmail\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'),
    'Web3 ETH Private Key': re.compile(r'\b0x[a-fA-F0-9]{64}\b'),
    'Web3 BTC WIF': re.compile(r'\b[5KL][1-9A-HJ-NP-Za-km-z]{50,51}\b'),
    'PGP Private Key': re.compile(r'-----BEGIN PGP PRIVATE KEY BLOCK-----'),
}

def calculate_entropy(string):
    if not string:
        return 0
    prob = [float(string.count(c)) / len(string) for c in dict.fromkeys(list(string))]
    entropy = - sum([p * math.log(p) / math.log(2.0) for p in prob])
    return entropy

def get_staged_files():
    try:
        output = subprocess.check_output(['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM'], text=True)
        return output.splitlines()
    except subprocess.CalledProcessError:
        return []

def get_file_content(filepath):
    try:
        # Use git show to get the staged version of the content
        return subprocess.check_output(['git', 'show', f':{filepath}'], text=True, errors='ignore')
    except subprocess.CalledProcessError:
        return ""

def is_bip39_mnemonic(content):
    # Simplified check: looking for long runs of words that might be mnemonics
    # A robust check would need the full BIP-39 wordlist
    words = content.split()
    if 12 <= len(words) <= 24:
        # Heuristic: if most words are lowercase alphabetic and between 3-8 chars
        if all(re.match(r'^[a-z]{3,10}$', w) for w in words):
            return True
    return False

def check_pii():
    staged_files = get_staged_files()
    violations = []
    
    for filepath in staged_files:
        # Check Dotenv staging
        if filepath.endswith('.env') or '.env.' in filepath:
            violations.append(f"CRITICAL: .env file detected in staging: {filepath}")
            continue

        # Skip excluded dirs/exts
        if any(d in filepath for d in EXCLUDED_DIRS) or any(filepath.endswith(e) for e in EXCLUDED_EXTENSIONS):
            continue
            
        content = get_file_content(filepath)
        lines = content.splitlines()
        
        for i, line in enumerate(lines, 1):
            # 1. Pattern matching
            for name, pattern in PATTERNS.items():
                match = pattern.search(line)
                if match:
                    # Specific check for emails: allow whitelisted ones
                    if name == 'Email (Private)':
                        if any(email in line for email in WHITELISTED_EMAILS):
                            continue
                    violations.append(f"[{name}] at {filepath}:{i} -> {line.strip()[:50]}...")

            # 2. Entropy detection (High-entropy secret detection)
            # Find candidate strings: long alphanumeric/hex/base64 strings
            candidates = re.findall(r'[a-zA-Z0-9+/=]{20,}', line)
            for cand in candidates:
                if calculate_entropy(cand) > ENTROPY_THRESHOLD:
                    # Filter out obvious false positives like file hashes in comments if possible
                    violations.append(f"[High Entropy Secret] at {filepath}:{i} -> {cand[:10]}...")

    return violations

if __name__ == "__main__":
    results = check_pii()
    if results:
        print("\n" + "!" * 60)
        print("🏛️  GUARD SYSTEM: PII / ASSET LEAK DETECTED")
        print("!" * 60)
        for error in results:
            print(f"- {error}")
        print("\n" + "!" * 60)
        print("ACTION REQUIRED: Remove sensitive data before committing.")
        print("If this is a false positive, use 'git commit --no-verify' to bypass.")
        print("!" * 60 + "\n")
        sys.exit(1)
    else:
        sys.exit(0)
