import { AmericanSpellingWord, AmericanSpellings, BritishSpellingWord, BritishSpellings } from '../data';
import { Options } from './interface';
import { translateCase } from './translateCase';

function map(word: string, options?: Partial<Options>) {
	if (options?.american) {
		return BritishSpellings[word as BritishSpellingWord];
	} else {
		return AmericanSpellings[word as AmericanSpellingWord];
	}
}

export function translateWord(word: string, options?: Partial<Options>): string {
	let key = word.toLowerCase();

	if (key === '') return word;

	let translated = map(key, options);

	if (translated != null) {
		return translateCase(word, translated);
	}

	if (key.endsWith('-')) {
		key = key.substring(0, key.length - 1);
		translated = map(key, options);

		if (translated != null) {
			return translateCase(word, translated) + '-';
		}
	}

	return word;
}
