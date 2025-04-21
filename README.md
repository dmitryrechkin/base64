# Base64 Utility

**Base64 Utility is a TypeScript library designed to handle base64 encoding and decoding in environments like serverless platforms (e.g., Cloudflare Workers) where native base64 functionality might be limited.** This utility provides a simple and efficient way to encode and decode data to and from base64 strings.

## Installation

Install the package using pnpm:

```bash
pnpm add @dmitryrechkin/base64
```

## Features

- **Base64 Encoding**: Convert binary data (e.g., `ArrayBuffer`) to a base64 string.
- **Base64 Decoding**: Convert a base64 string back into binary data.
- **String Encoding/Decoding**: Encode and decode UTF-8 strings to and from base64.
- **Cross-Platform**: Works in browsers, Node.js, and serverless environments like Cloudflare Workers.
- **No Dependencies**: Pure JavaScript implementation with no external dependencies.

## Usage

### Working with Binary Data

#### Encoding an ArrayBuffer to a Base64 String

```typescript
import { Base64 } from '@dmitryrechkin/base64';

const data = new Uint8Array([72, 101, 108, 108, 111]); // Represents "Hello" in ASCII
const base64String = Base64.encode(data);

console.log(base64String);
// Output: "SGVsbG8="
```

#### Decoding a Base64 String to an ArrayBuffer

```typescript
import { Base64 } from '@dmitryrechkin/base64';

const base64String = "SGVsbG8="; // Base64 encoded "Hello"
const data = Base64.decode(base64String);

console.log(data);
// Output: Uint8Array(5) [ 72, 101, 108, 108, 111 ]
```

### Working with Strings

#### Encoding a String to Base64

```typescript
import { Base64 } from '@dmitryrechkin/base64';

// ASCII string
const text = "Hello, World!";
const base64String = Base64.encodeString(text);

console.log(base64String);
// Output: "SGVsbG8sIFdvcmxkIQ=="

// Unicode string with emojis
const unicodeText = "Hello, 世界! 😀";
const unicodeBase64 = Base64.encodeString(unicodeText);

console.log(unicodeBase64);
// Output: "SGVsbG8sIOS4lueVjCEg8J+YgA=="
```

#### Decoding Base64 to a String

```typescript
import { Base64 } from '@dmitryrechkin/base64';

const base64String = "SGVsbG8sIFdvcmxkIQ=="; // Base64 encoded "Hello, World!"
const text = Base64.decodeString(base64String);

console.log(text);
// Output: "Hello, World!"

// Unicode handling
const unicodeBase64 = "SGVsbG8sIOS4lueVjCEg8J+YgA==";
const unicodeText = Base64.decodeString(unicodeBase64);

console.log(unicodeText);
// Output: "Hello, 世界! 😀"
```

## Rationale

The `Base64` class is specifically designed to work universally across different JavaScript environments, including browsers, Node.js, and serverless platforms like Cloudflare Workers where native methods might not be available. This utility offers a reliable and portable way to handle base64 operations without relying on environment-specific implementations.

By using this class, developers can ensure consistent base64 handling across different environments, especially when working with binary data and UTF-8 strings in web and serverless applications.

## Installation & Setup

Install the package using pnpm:

```bash
pnpm add @dmitryrechkin/base64
```

Ensure that your project is set up to handle TypeScript and supports ES modules, as this library is built with modern JavaScript standards.

## Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests. Before submitting, please ensure your code passes all linting and unit tests.

You can run unit tests using:

```bash
pnpm test
```
