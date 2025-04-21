export class Base64
{
	/**
	 * Encodes an ArrayBuffer to a base64 string.
	 *
	 * @param {Uint8Array} bytes - The bytes to encode
	 * @returns {string} - The base64 encoded string
	 */
	public static encode(bytes: Uint8Array): string
	{
		// Base64 encoding table - maps 6-bit values (0-63) to characters
		const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		let result = '';

		const length = bytes.length;
		// Process input in groups of 3 bytes
		for (let i = 0; i < length; i += 3)
		{
			// Get the next three bytes, or use 0 for missing bytes at the end
			const byte1 = i < length ? bytes[i] : 0;
			const byte2 = i + 1 < length ? bytes[i + 1] : 0;
			const byte3 = i + 2 < length ? bytes[i + 2] : 0;

			// Combine 3 bytes into a 24-bit number
			const triplet = (byte1 << 16) | (byte2 << 8) | byte3;

			// Split the 24-bit number into 4 groups of 6 bits and convert each to a base64 character
			// First character: bits 18-23
			result += base64Chars[(triplet >> 18) & 0x3F];
			// Second character: bits 12-17
			result += base64Chars[(triplet >> 12) & 0x3F];
			// Third character: bits 6-11 (or '=' padding if we only had 1 input byte)
			result += i + 1 < length ? base64Chars[(triplet >> 6) & 0x3F] : '=';
			// Fourth character: bits 0-5 (or '=' padding if we only had 1 or 2 input bytes)
			result += i + 2 < length ? base64Chars[triplet & 0x3F] : '=';
		}

		return result;
	}

	/**
	 * Encodes a string to a base64 string.
	 *
	 * @param {string} str - The string to encode
	 * @returns {string} - The base64 encoded string
	 */
	public static encodeString(str: string): string
	{
		// Convert string to UTF-8 byte array and encode
		return this.encode(new TextEncoder().encode(str));
	}

	/**
	 * Decodes a base64 string to an ArrayBuffer.
	 *
	 * @param {string} base64 - The base64 string to decode
	 * @returns {Uint8Array} - The decoded ArrayBuffer
	 */
	public static decode(base64: string): Uint8Array
	{
		// Base64 encoding table - maps 6-bit values (0-63) to characters
		const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		// Create a lookup table to quickly convert base64 characters to their 6-bit values
		const lookup = new Uint8Array(256);

		// Fill the lookup table with character code -> 6-bit value mappings
		for (let charIndex = 0; charIndex < base64Chars.length; charIndex++)
		{
			lookup[base64Chars.charCodeAt(charIndex)] = charIndex;
		}

		// Handle padding - find where the valid data ends
		const paddingIndex = base64.indexOf('=');
		const actualLength = paddingIndex === -1 ? base64.length : paddingIndex;

		// Each 4 base64 characters become 3 bytes
		const outputLength = Math.floor(actualLength * 3 / 4);
		const result = new Uint8Array(outputLength);

		let inputIndex = 0;
		let outputIndex = 0;

		// Process input in groups of 4 base64 characters
		// Each group of 4 chars (4*6 = 24 bits) is converted to 3 bytes (3*8 = 24 bits)
		while (inputIndex < actualLength)
		{
			// Get 6-bit values for each of the 4 base64 characters
			const value1 = lookup[base64.charCodeAt(inputIndex++)];
			const value2 = lookup[base64.charCodeAt(inputIndex++)];
			const value3 = inputIndex < actualLength ? lookup[base64.charCodeAt(inputIndex++)] : 0;
			const value4 = inputIndex < actualLength ? lookup[base64.charCodeAt(inputIndex++)] : 0;

			// Combine four 6-bit values into a 24-bit number
			const triplet = (value1 << 18) | (value2 << 12) | (value3 << 6) | value4;

			// Split the 24-bit number into 3 bytes
			if (outputIndex < outputLength)
			{
				result[outputIndex++] = (triplet >> 16) & 0xFF; // First byte: bits 16-23
			}

			if (outputIndex < outputLength)
			{
				result[outputIndex++] = (triplet >> 8) & 0xFF;  // Second byte: bits 8-15
			}

			if (outputIndex < outputLength)
			{
				result[outputIndex++] = triplet & 0xFF;         // Third byte: bits 0-7
			}
		}

		return result;
	}

	/**
	 * Decodes a base64 string to a string.
	 *
	 * @param {string} base64 - The base64 string to decode
	 * @returns {string} - The decoded string
	 */
	public static decodeString(base64: string): string
	{
		// Convert decoded bytes to a UTF-8 string
		return new TextDecoder().decode(this.decode(base64));
	}
}
