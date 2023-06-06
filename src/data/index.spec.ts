import { AmericanSpellings, BritishSpellings } from './';

describe('AmericanSpellings', () => {
	it('should be defined', () => {
		expect(AmericanSpellings).toBeDefined();
		expect(typeof AmericanSpellings).toStrictEqual('object');
	});

	it('should be a string to string map', () => {
		for (const [key, value] of Object.entries(AmericanSpellings)) {
			expect(typeof key).toStrictEqual('string');
			expect(typeof value).toStrictEqual('string');
			expect(value).not.toStrictEqual(key);

			expect(key).toMatch(/^[a-z]+-?$/);
			expect(value).toMatch(/^[a-z]+-?$/);
		}
	});
});

describe('BritishSpellings', () => {
	it('should be defined', () => {
		expect(BritishSpellings).toBeDefined();
		expect(typeof BritishSpellings).toStrictEqual('object');
	});

	it('should be a string to string map', () => {
		for (const [key, value] of Object.entries(BritishSpellings)) {
			expect(typeof key).toStrictEqual('string');
			expect(typeof value).toStrictEqual('string');
			expect(value).not.toStrictEqual(key);

			expect(key).toMatch(/^[a-z]+-?$/);
			expect(value).toMatch(/^[a-z]+-?$/);
		}
	});
});
