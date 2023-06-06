import { diff } from '../diff';
import { everyLowerCase, everyUpperCase } from './case';

export function translateCase(source: string, target: string): string {
	if (everyLowerCase(source)) {
		return target;
	}

	if (everyUpperCase(source)) {
		return target.toUpperCase();
	}

	if (everyUpperCase(source.substring(0, 1))) {
		if (everyLowerCase(source.substring(1))) {
			return target.substring(0, 1).toUpperCase() + target.substring(1);
		}

		target = target.substring(0, 1).toUpperCase() + target.substring(1);
	}

	const changes = diff(source, target);
	let result = '';
	let isUpperCase = false;

	for (const { added, removed, oldValue, newValue } of changes) {
		if ((removed && added) || (!removed && !added)) {
			for (let charIndex = 0; charIndex < newValue.length; charIndex++) {
				const oldChar = oldValue.charAt(charIndex);
				const newChar = newValue.charAt(charIndex);
				isUpperCase = everyUpperCase(oldChar) && (!everyLowerCase(oldChar) || isUpperCase);
				result += isUpperCase ? newChar.toUpperCase() : newChar;
			}
		} else if (added) {
			for (let charIndex = 0; charIndex < newValue.length; charIndex++) {
				const newChar = newValue.charAt(charIndex);
				result += isUpperCase ? newChar.toUpperCase() : newChar;
			}
		}
	}

	return result;
}
