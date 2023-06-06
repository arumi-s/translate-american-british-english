/**
 * Modified From: https://github.com/hyperreality/American-British-English-Translator
 * @license MIT
 * Copyright (c) 2016
 */

import AmericanSpellings from '../data/american_spellings.json';
import BritishSpellings from '../data/british_spellings.json';

export type AmericanSpellingWord = keyof typeof AmericanSpellings;
export type BritishSpellingWord = keyof typeof BritishSpellings;

export { AmericanSpellings, BritishSpellings };
