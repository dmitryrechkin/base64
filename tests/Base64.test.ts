import { describe, it, expect } from 'vitest';
import { Base64 } from '../src/Base64';

describe('Base64', () =>
{
	it('should correctly encode an ArrayBuffer to a base64 string', () =>
	{
		const arrayBuffer = new Uint8Array([255, 254, 253, 252, 251]);
		const base64String = Base64.encode(arrayBuffer);
		expect(base64String).toBe('//79/Ps=');
	});

	it('should correctly decode a base64 string to an ArrayBuffer', () =>
	{
		const base64String = '//79/Ps=';
		const expectedArrayBuffer = new Uint8Array([255, 254, 253, 252, 251]);
		const decodedArrayBuffer = Base64.decode(base64String);
		expect(new Uint8Array(decodedArrayBuffer)).toEqual(new Uint8Array(expectedArrayBuffer));
	});

	it('should correctly encode and decode an empty ArrayBuffer', () =>
	{
		const arrayBuffer = new Uint8Array([]);
		const base64String = Base64.encode(arrayBuffer);
		expect(base64String).toBe('');
		const decodedArrayBuffer = Base64.decode(base64String);
		expect(new Uint8Array(decodedArrayBuffer)).toEqual(new Uint8Array([]));
	});

	it('should correctly encode and decode a complex ArrayBuffer', () =>
	{
		const arrayBuffer = new Uint8Array([255, 254, 253, 252, 251]);
		const base64String = Base64.encode(arrayBuffer);

		// Directly compare the original base64 string
		expect(base64String).toBe('//79/Ps=');

		const decodedBytes = Base64.decode(base64String);
		expect(decodedBytes).toEqual(new Uint8Array([255, 254, 253, 252, 251]));
	});
});
