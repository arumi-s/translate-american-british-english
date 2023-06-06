# Translate American British English

[![NPM](https://img.shields.io/npm/v/translate-american-british-english)](https://www.npmjs.com/package/translate-american-british-english)
![License](https://img.shields.io/npm/l/translate-american-british-english)

## Install

```bash
npm install translate-american-british-english
```

## Usage

```typescript
import { translate } from 'translate-american-british-english';

const translatedToBritishEnglish = translate('My favorite color is gray.');
console.log(translatedToBritishEnglish); // My favourite colour is grey.

const translatedToAmericanEnglish = translate('My favourite colour is grey.', { american: true });
console.log(translatedToAmericanEnglish); // My favorite color is gray.
```

## Sources

- [American-British-English-Translator](https://github.com/hyperreality/American-British-English-Translator)
- [jsdiff](https://github.com/kpdecker/jsdiff)
