import { Options } from './interface';
import { translateWord } from './translateWord';

export function translate(original: string, options?: Partial<Options>): string {
	return original.replace(/[a-z]+-?/gi, (word) => translateWord(word, options));
}
