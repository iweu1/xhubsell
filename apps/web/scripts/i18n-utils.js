#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../public/locales');
const SUPPORTED_LOCALES = ['en', 'ru'];
const NAMESPACES = [
  'common',
  'navigation',
  'home',
  'catalog',
  'seller',
  'auth',
  'admin',
  'errors',
  'notifications',
];

function checkMissingKeys() {
  console.log('🔍 Checking for missing translation keys...\n');

  const allKeys = new Map();

  // Collect all keys from English (base)
  const enDir = path.join(LOCALES_DIR, 'en');
  for (const namespace of NAMESPACES) {
    const filePath = path.join(enDir, `${namespace}.json`);
    if (fs.existsSync(filePath)) {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const keys = extractKeys(content);
      allKeys.set(namespace, keys);
    }
  }

  // Check each locale
  for (const locale of SUPPORTED_LOCALES) {
    console.log(`📋 Checking ${locale}:`);

    for (const namespace of NAMESPACES) {
      const filePath = path.join(LOCALES_DIR, locale, `${namespace}.json`);

      if (!fs.existsSync(filePath)) {
        console.log(`  ❌ Missing namespace: ${namespace}.json`);
        continue;
      }

      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const keys = extractKeys(content);
      const baseKeys = allKeys.get(namespace) || [];

      const missing = baseKeys.filter((key) => !keys.includes(key));
      const extra = keys.filter((key) => !baseKeys.includes(key));

      if (missing.length > 0) {
        console.log(`  ❌ ${namespace}: Missing keys: ${missing.join(', ')}`);
      }

      if (extra.length > 0) {
        console.log(`  ⚠️  ${namespace}: Extra keys: ${extra.join(', ')}`);
      }

      if (missing.length === 0 && extra.length === 0) {
        console.log(`  ✅ ${namespace}: All keys present`);
      }
    }
    console.log('');
  }
}

function extractKeys(obj, prefix = '') {
  const keys = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...extractKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

function addNewKey(namespace, key, value) {
  console.log(`➕ Adding key "${key}" to namespace "${namespace}"`);

  for (const locale of SUPPORTED_LOCALES) {
    const filePath = path.join(LOCALES_DIR, locale, `${namespace}.json`);

    let content = {};
    if (fs.existsSync(filePath)) {
      content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    setNestedValue(content, key, locale === 'en' ? value : `[TRANSLATE: ${value}]`);

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`  ✅ Updated ${locale}/${namespace}.json`);
  }
}

function setNestedValue(obj, key, value) {
  const keys = key.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
}

function extractUnusedKeys() {
  console.log('🔍 Scanning for potentially unused keys...\n');
  console.log('Note: This is a basic scan. Manual review recommended.');

  const webSrcDir = path.join(__dirname, '../src');
  const allTranslationKeys = new Set();

  // Collect all translation keys
  for (const locale of SUPPORTED_LOCALES) {
    const localeDir = path.join(LOCALES_DIR, locale);
    for (const namespace of NAMESPACES) {
      const filePath = path.join(localeDir, `${namespace}.json`);
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const keys = extractKeys(content);
        keys.forEach((key) => allTranslationKeys.add(`${namespace}:${key}`));
      }
    }
  }

  // Scan source files for usage
  const usedKeys = new Set();

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.match(/\.(ts|tsx|js|jsx)$/)) {
        const content = fs.readFileSync(filePath, 'utf8');

        // Look for t('key') patterns
        const matches = content.match(/t\(['"`]([^'"`]+)['"`]\)/g);
        if (matches) {
          for (const match of matches) {
            const key = match.match(/t\(['"`]([^'"`]+)['"`]\)/)[1];

            // Determine namespace
            let namespace, translationKey;
            if (key.includes(':')) {
              [namespace, translationKey] = key.split(':');
            } else {
              // Default to common if no namespace specified
              namespace = 'common';
              translationKey = key;
            }

            usedKeys.add(`${namespace}:${translationKey}`);
          }
        }
      }
    }
  }

  scanDirectory(webSrcDir);

  // Find unused keys
  const unusedKeys = Array.from(allTranslationKeys).filter((key) => !usedKeys.has(key));

  if (unusedKeys.length > 0) {
    console.log('🗑️  Potentially unused keys:');
    unusedKeys.forEach((key) => console.log(`  - ${key}`));
  } else {
    console.log('✅ No obviously unused keys found');
  }
}

// CLI Interface
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case 'check':
    checkMissingKeys();
    break;

  case 'add':
    if (args.length < 3) {
      console.log('Usage: npm run i18n add <namespace> <key> <value>');
      process.exit(1);
    }
    addNewKey(args[0], args[1], args[2]);
    break;

  case 'unused':
    extractUnusedKeys();
    break;

  default:
    console.log('Available commands:');
    console.log('  check    - Check for missing translation keys');
    console.log('  add      - Add a new translation key to all locales');
    console.log('  unused   - Find potentially unused translation keys');
    console.log('');
    console.log('Examples:');
    console.log('  npm run i18n check');
    console.log('  npm run i18n add common welcomeBack "Welcome Back"');
    console.log('  npm run i18n unused');
    break;
}
