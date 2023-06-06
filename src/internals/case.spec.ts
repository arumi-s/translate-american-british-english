import { everyLowerCase, everyUpperCase } from './case';

describe('everyLowerCase', () => {
	it('should be defined', () => {
		expect(everyLowerCase).toBeDefined();
	});

	it('should return true when all letters are not A-Z', () => {
		expect(everyLowerCase('abcd')).toStrictEqual(true);

		let text = '-';
		for (let code = 'a'.charCodeAt(0); code <= 'z'.charCodeAt(0); code++) {
			text += String.fromCharCode(code);
			expect(everyLowerCase(text)).toStrictEqual(true);
		}
	});

	it('should return false when any letters are A-Z', () => {
		expect(everyLowerCase('Abcd')).toStrictEqual(false);

		let text = '-';
		for (let code = 'A'.charCodeAt(0); code <= 'Z'.charCodeAt(0); code++) {
			text += String.fromCharCode(code);
			expect(everyLowerCase(text)).toStrictEqual(false);
		}
	});
});

describe('everyUpperCase', () => {
	it('should be defined', () => {
		expect(everyUpperCase).toBeDefined();
	});

	it('should return true when all letters are not a-z', () => {
		expect(everyUpperCase('ABCD')).toStrictEqual(true);

		let text = '-';
		for (let code = 'A'.charCodeAt(0); code <= 'Z'.charCodeAt(0); code++) {
			text += String.fromCharCode(code);
			expect(everyUpperCase(text)).toStrictEqual(true);
		}
	});

	it('should return false when any letters are a-z', () => {
		expect(everyUpperCase('aBCD')).toStrictEqual(false);

		let text = '-';
		for (let code = 'a'.charCodeAt(0); code <= 'z'.charCodeAt(0); code++) {
			text += String.fromCharCode(code);
			expect(everyUpperCase(text)).toStrictEqual(false);
		}
	});
});
