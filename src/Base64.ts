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
		let binary = '';
		const len = bytes.byteLength;
		for (let idx = 0; idx < len; idx++)
		{
			binary += String.fromCharCode(bytes[idx]);
		}
		return btoa(binary);
	}

	/**
	 * Decodes a base64 string to an ArrayBuffer.
	 *
	 * @param {string} base64 - The base64 string to decode
	 * @returns {Uint8Array} - The decoded ArrayBuffer
	 */
	public static decode(base64: string): Uint8Array
	{
		const binaryString = atob(base64);
		const len = binaryString.length;
		const bytes = new Uint8Array(len);
		for (let idx = 0; idx < len; idx++)
		{
			bytes[idx] = binaryString.charCodeAt(idx);
		}
		return bytes;
	}
}
