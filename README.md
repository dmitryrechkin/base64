
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
- **Serverless Ready**: Specifically designed to work in environments where native base64 functionality may be restricted or unavailable, such as Cloudflare Workers.

## Usage

### Encoding an ArrayBuffer to a Base64 String

```typescript
import { Base64 } from '@dmitryrechkin/base64';

const data = new Uint8Array([72, 101, 108, 108, 111]); // Represents "Hello" in ASCII
const base64String = Base64.encode(data);

console.log(base64String);
// Output: "SGVsbG8="
```

### Decoding a Base64 String to an ArrayBuffer

```typescript
import { Base64 } from '@dmitryrechkin/base64';

const base64String = "SGVsbG8="; // Base64 encoded "Hello"
const data = Base64.decode(base64String);

console.log(data);
// Output: Uint8Array(5) [ 72, 101, 108, 108, 111 ]
```

## Rationale

The `Base64` class is specifically designed to be used in serverless environments like Cloudflare Workers where native methods for encoding and decoding base64 strings might not be readily available. This utility offers a reliable and portable way to handle base64 operations without relying on environment-specific implementations.

By using this class, developers can ensure consistent base64 handling across different environments, especially when working with binary data in serverless applications.

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
