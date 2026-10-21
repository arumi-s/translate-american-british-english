import { translateWord } from '../';

describe('translateWord', () => {
	it('should be defined', () => {
		expect(translateWord).toBeDefined();
	});

	it('should translate word spellings', () => {
		expect(translateWord('color')).toBe('colour');
		expect(translateWord('snowplow')).toBe('snowplough');
		expect(translateWord('pummeled')).toBe('pummelling');
		expect(translateWord('prologs')).toBe('prologues');
		expect(translateWord('estr-')).toBe('oestr-');
	});

	it('should keep empty string', () => {
		expect(translateWord('')).toBe('');
	});

	it.each([
		'cancellation',
		'cancellations',
		'gauge',
		'gauged',
		'gauges',
		'gauging',
		'buses',
		'busing',
		'minibuses',
		'dialogue',
		'dialogues',
		'aesthete',
		'aesthetes',
		'aesthetic',
		'aesthetically',
		'aesthetics',
	])('should preserve shared spelling %s when translating to American English', (word) => {
		expect(translateWord(word, { american: true })).toBe(word);
		expect(translateWord(word.toUpperCase(), { american: true })).toBe(word.toUpperCase());
	});

	it.each(['gage', 'gaged', 'gages', 'gaging', 'dialog', 'dialogs', 'busses', 'bussing'])(
		'should preserve context-dependent spelling %s when translating to British English',
		(word) => {
			expect(translateWord(word)).toBe(word);
			expect(translateWord(word.toUpperCase())).toBe(word.toUpperCase());
		},
	);

	it.each([
		['cancelation', 'cancellation'],
		['cancelations', 'cancellations'],
		['minibusses', 'minibuses'],
		['esthete', 'aesthete'],
		['esthetes', 'aesthetes'],
		['esthetic', 'aesthetic'],
		['esthetically', 'aesthetically'],
		['esthetics', 'aesthetics'],
	])('should translate variant %s to British spelling %s', (word, expected) => {
		expect(translateWord(word)).toBe(expected);
	});

	it('should keep the same word when no translate available', () => {
		expect(translateWord('cat')).toBe('cat');
		expect(translateWord('Internet')).toBe('Internet');
		expect(translateWord('ice-')).toBe('ice-');
	});

	it('should translate word spellings and keep case', () => {
		expect(translateWord('Color')).toBe('Colour');
		expect(translateWord('SnowPlow')).toBe('SnowPlough');
		expect(translateWord('pummeLED')).toBe('pummeLLING');
		expect(translateWord('proLOGS')).toBe('proLOGUES');
	});
});
