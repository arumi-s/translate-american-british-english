import { translate } from '../';

describe('translate', () => {
	it('should be defined', () => {
		expect(translate).toBeDefined();
	});

	it('should preserve shared spellings while translating British spellings to American', () => {
		expect(translate('Cancellation of the grey buses prompted dialogue about fuel gauges.', { american: true })).toBe(
			'Cancellation of the gray buses prompted dialogue about fuel gauges.',
		);
		expect(translate('The aesthete favoured colourful aesthetics.', { american: true })).toBe('The aesthete favored colorful aesthetics.');
	});

	it.each([
		['The color dialog is gray.', 'The colour dialog is grey.'],
		['He left his armor as a gage.', 'He left his armour as a gage.'],
		['The gages had a sweet flavor.', 'The gages had a sweet flavour.'],
		['They favored busses on the cheek.', 'They favoured busses on the cheek.'],
		['They were bussing at the theater.', 'They were bussing at the theatre.'],
	])('should preserve context-dependent spellings in %s', (text, expected) => {
		expect(translate(text)).toBe(expected);
	});

	it('should translate text spellings from American to British', () => {
		expect(translate('my favorite color is gray')).toBe('my favourite colour is grey');
		expect(translate('a skillful story')).toBe('a skilful story');
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
		expect(translate('an unskilful building with three storeys', { american: true })).toBe('an unskillful building with three stories');
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
