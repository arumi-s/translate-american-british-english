import { translateCase } from './translateCase';

describe('translateCase', () => {
	it('should be defined', () => {
		expect(translateCase).toBeDefined();
	});

	it('should return exact target when source has no CAPS', () => {
		expect(translateCase('color', 'colour')).toBe('colour');
		expect(translateCase('color', 'CoLouR')).toBe('CoLouR');
		expect(translateCase('ice-cream', 'ice-scream')).toBe('ice-scream');
	});

	it('should return upper case target when source has all CAPS', () => {
		expect(translateCase('COLOR', 'colour')).toBe('COLOUR');
		expect(translateCase('COLOR', 'CoLouR')).toBe('COLOUR');
		expect(translateCase('ICE-CREAM', 'ice-scream')).toBe('ICE-SCREAM');
	});

	it('should return recreate arbitrary CAPS sequence when target is similar to the source (single place single letter)', () => {
		expect(translateCase('color', 'colour')).toBe('colour');
		expect(translateCase('Color', 'colour')).toBe('Colour');
		expect(translateCase('CoLor', 'colour')).toBe('CoLour');
		expect(translateCase('CoLOR', 'colour')).toBe('CoLOUR');
		expect(translateCase('CoLOr', 'colour')).toBe('CoLOUr');

		expect(translateCase('colour', 'color')).toBe('color');
		expect(translateCase('Colour', 'color')).toBe('Color');
		expect(translateCase('CoLour', 'color')).toBe('CoLor');
		expect(translateCase('CoLOUR', 'color')).toBe('CoLOR');
		expect(translateCase('CoLOUr', 'color')).toBe('CoLOr');

		expect(translateCase('chiLi', 'chilli')).toBe('chiLLi');

		expect(translateCase('chiLLi', 'chili')).toBe('chiLi');
	});

	it('should return recreate arbitrary CAPS sequence when target is similar to the source (start single letter)', () => {
		expect(translateCase('estr-', 'oestr-')).toBe('oestr-');
		expect(translateCase('EstR-', 'oestr-')).toBe('OEstR-');
		expect(translateCase('Estr-', 'oestr-')).toBe('Oestr-');
	});

	it('should return recreate arbitrary CAPS sequence when target is similar to the source (multiple places single letters)', () => {
		expect(translateCase('TRI-coloriZation', 'trio-colourisation')).toBe('TRIO-colouriSation');
		expect(translateCase('TRIO-colouriSation', 'tri-colorization')).toBe('TRI-coloriZation');
	});

	it('should return recreate arbitrary CAPS sequence when target is similar to the source (suffix)', () => {
		expect(translateCase('snowplow', 'snowplough')).toBe('snowplough');
		expect(translateCase('SNOWPLOW', 'snowplough')).toBe('SNOWPLOUGH');
		expect(translateCase('Snowplow', 'snowplough')).toBe('Snowplough');
		expect(translateCase('snowPloW', 'snowplough')).toBe('snowPloUGH');

		expect(translateCase('snowplough', 'snowplow')).toBe('snowplow');
		expect(translateCase('SNOWPLOUGH', 'snowplow')).toBe('SNOWPLOW');
		expect(translateCase('Snowplough', 'snowplow')).toBe('Snowplow');
		expect(translateCase('snowPloUGH', 'snowplow')).toBe('snowPloW');

		expect(translateCase('pummeled', 'pummelling')).toBe('pummelling');
		expect(translateCase('PUMMELED', 'pummelling')).toBe('PUMMELLING');
		expect(translateCase('pummeLed', 'pummelling')).toBe('pummeLLing');
		expect(translateCase('pummelEd', 'pummelling')).toBe('pummellIng');
		expect(translateCase('pummellEd', 'pummellling')).toBe('pummelllIng');

		expect(translateCase('pummelling', 'pummeled')).toBe('pummeled');
		expect(translateCase('PUMMELLING', 'pummeled')).toBe('PUMMELED');
		expect(translateCase('pummeLLing', 'pummeled')).toBe('pummeLed');
		expect(translateCase('pummellIng', 'pummeled')).toBe('pummelEd');
		expect(translateCase('pummelllIng', 'pummelled')).toBe('pummellEd');
	});

	it('should return recreate arbitrary CAPS sequence when target is similar to the source (suffix with -s)', () => {
		expect(translateCase('prologs', 'prologues')).toBe('prologues');
		expect(translateCase('PROLOgs', 'prologues')).toBe('PROLOgues');
		expect(translateCase('proloGs', 'prologues')).toBe('proloGUEs');
		expect(translateCase('proloGS', 'prologues')).toBe('proloGUES');

		expect(translateCase('prologues', 'prologs')).toBe('prologs');
		expect(translateCase('PROLOgues', 'prologs')).toBe('PROLOgs');
		expect(translateCase('proloGUEs', 'prologs')).toBe('proloGs');
		expect(translateCase('proloGUES', 'prologs')).toBe('proloGS');
	});

	it('should return recreate arbitrary CAPS sequence when target is similar to the source (multiple places multiple letters)', () => {
		expect(translateCase('tranquilizers', 'tranquillisers')).toBe('tranquillisers');
		expect(translateCase('tranquiLizers', 'tranquillisers')).toBe('tranquiLLisers');
		expect(translateCase('tranquiLiZers', 'tranquillisers')).toBe('tranquiLLiSers');
		expect(translateCase('tranquiliZERS', 'tranquillisers')).toBe('tranquilliSERS');

		expect(translateCase('tranquillisers', 'tranquilizers')).toBe('tranquilizers');
		expect(translateCase('tranquiLLisers', 'tranquilizers')).toBe('tranquiLizers');
		expect(translateCase('tranquiLLiSers', 'tranquilizers')).toBe('tranquiLiZers');
		expect(translateCase('tranquilliSERS', 'tranquilizers')).toBe('tranquiliZERS');
		expect(translateCase('tranquiLlisers', 'tranquilizers')).toBe('tranquiLizers');
		expect(translateCase('tranquilLisers', 'tranquilizers')).toBe('tranquilizers');

		expect(translateCase('outmaneuvers', 'outmanoeuvres')).toBe('outmanoeuvres');
		expect(translateCase('outmaneuvErs', 'outmanoeuvres')).toBe('outmanoeuvrEs');
		expect(translateCase('outmaneuveRs', 'outmanoeuvres')).toBe('outmanoeuvres');
		expect(translateCase('outmaneuVERS', 'outmanoeuvres')).toBe('outmanoeuVRES');

		expect(translateCase('outmanoeuvres', 'outmaneuvers')).toBe('outmaneuvers');
		expect(translateCase('outmanoeuvrEs', 'outmaneuvers')).toBe('outmaneuvers');
		expect(translateCase('outmanoeuvRes', 'outmaneuvers')).toBe('outmaneuveRs');
		expect(translateCase('outmanoeuVRES', 'outmaneuvers')).toBe('outmaneuVERS');
	});

	it('should return recreate arbitrary CAPS sequence when target is similar to the source (others)', () => {
		expect(translateCase('Ice-CreaM', 'ice-screamme')).toBe('Ice-sCreaMME');
		expect(translateCase('TRI-coloriZation', 'trio-colourisation')).toBe('TRIO-colouriSation');
		expect(translateCase('TRIO-colouriSation', 'tri-colorization')).toBe('TRI-coloriZation');

		expect(translateCase('leTter', 'lemmer')).toBe('leMmer');
		expect(translateCase('leTTer', 'lemmer')).toBe('leMMer');
		expect(translateCase('leTTer', 'lemer')).toBe('leMer');

		expect(translateCase('leMmer', 'letter')).toBe('leTter');
		expect(translateCase('leMMer', 'letter')).toBe('leTTer');
		expect(translateCase('leMer', 'letter')).toBe('leTTer');
	});

	it('should return recreate arbitrary CAPS sequence when source is not similar to the source but have the same length', () => {
		expect(translateCase('', '')).toBe('');
		expect(translateCase('a', 'x')).toBe('x');
		expect(translateCase('A', 'x')).toBe('X');
		expect(translateCase('Ab', 'xy')).toBe('Xy');
		expect(translateCase('aB', 'xy')).toBe('xY');

		expect(translateCase('ABC', 'xyz')).toBe('XYZ');
		expect(translateCase('aBC', 'xyz')).toBe('xYZ');
		expect(translateCase('AbC', 'xyz')).toBe('XyZ');
		expect(translateCase('ABc', 'xyz')).toBe('XYz');
		expect(translateCase('abC', 'xyz')).toBe('xyZ');
		expect(translateCase('Abc', 'xyz')).toBe('Xyz');
	});
});
