import { translate } from '../';

describe('translate', () => {
	it('should be defined', () => {
		expect(translate).toBeDefined();
	});

	it('should translate text spellings from American to British', () => {
		expect(translate('my favorite color is gray')).toBe('my favourite colour is grey');
		expect(translate('My favorite color is gray.')).toBe('My favourite colour is grey.');
		expect(translate('My Favorite COLOR is Gray')).toBe('My Favourite COLOUR is Grey');
		expect(translate('My Favourite COLOUR is Grey')).toBe('My Favourite COLOUR is Grey');
	});

	it('should translate text spellings from American to British (words with hyphen)', () => {
		expect(translate('estr-abc')).toBe('oestr-abc');
		expect(translate('Estr-Abc')).toBe('Oestr-Abc');
		expect(translate('Leuk-Abc')).toBe('LeucAbc');
	});

	it('should translate text spellings from American to British (arbitrary hyphen)', () => {
		expect(translate('phony pizzazz')).toBe('phoney pzazz');
		expect(translate('phony-pizzazz')).toBe('phoney-pzazz');
		expect(translate('Phony-pizzazz')).toBe('Phoney-pzazz');
		expect(translate('--phony-pizzazz-')).toBe('--phoney-pzazz-');
	});

	it('should translate text spellings from British to American', () => {
		expect(translate('my favourite colour is grey', { american: true })).toBe('my favorite color is gray');
		expect(translate('My favourite colour is grey.', { american: true })).toBe('My favorite color is gray.');
		expect(translate('My Favourite COLOUR is Grey', { american: true })).toBe('My Favorite COLOR is Gray');
		expect(translate('My Favorite COLOR is Gray', { american: true })).toBe('My Favorite COLOR is Gray');
	});

	it('should translate text spellings from British to American (words with hyphen)', () => {
		expect(translate('oestr-abc', { american: true })).toBe('estr-abc');
		expect(translate('Oestr-Abc', { american: true })).toBe('Estr-Abc');
		expect(translate('Leuc Abc', { american: true })).toBe('Leuk- Abc');
	});

	it('should translate text spellings from British to American (arbitrary hyphen)', () => {
		expect(translate('phoney pzazz', { american: true })).toBe('phony pizzazz');
		expect(translate('phoney-pzazz', { american: true })).toBe('phony-pizzazz');
		expect(translate('Phoney-pzazz', { american: true })).toBe('Phony-pizzazz');
		expect(translate('--phoney-pzazz-', { american: true })).toBe('--phony-pizzazz-');
	});
});
