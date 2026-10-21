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

	describe.each([false, true])('with american: %s', (american) => {
		it.each(['constructor', 'Constructor', 'CONSTRUCTOR', 'conSTRUCTOR', 'constructor-', 'Constructor-', '__proto__'])(
			'should preserve inherited property name %s',
			(word) => {
				expect(translateWord(word, { american })).toBe(word);
			},
		);
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
