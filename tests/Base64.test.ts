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

	// String encoding/decoding tests
	it('should correctly encode and decode a simple ASCII string', () =>
	{
		const testString = 'Hello, World!';
		const base64String = Base64.encodeString(testString);
		expect(base64String).toBe('SGVsbG8sIFdvcmxkIQ==');
		
		const decodedString = Base64.decodeString(base64String);
		expect(decodedString).toBe(testString);
	});

	it('should correctly encode and decode an empty string', () =>
	{
		const testString = '';
		const base64String = Base64.encodeString(testString);
		expect(base64String).toBe('');
		
		const decodedString = Base64.decodeString(base64String);
		expect(decodedString).toBe(testString);
	});

	it('should correctly encode and decode Unicode strings', () =>
	{
		const testString = '你好，世界！😀🌍';
		const base64String = Base64.encodeString(testString);
		
		// Just check that we can round-trip the string correctly
		const decodedString = Base64.decodeString(base64String);
		expect(decodedString).toBe(testString);
	});

	it('should correctly encode and decode a longer complex string', () =>
	{
		const testString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non felis vel augue varius facilisis. Ut sollicitudin arcu vitae ex condimentum, non volutpat quam interdum. In hac habitasse platea dictumst.';
		const base64String = Base64.encodeString(testString);
		
		const decodedString = Base64.decodeString(base64String);
		expect(decodedString).toBe(testString);
	});
});
