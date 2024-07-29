Image Similarity (WASM SSIM-Enhanced)
===

Image similarity comparison simulating human perception (multiscale SSIM-Enhanced in TypeScript & WASM).

This project is a TypeScript & WASM port of [dssim](https://github.com/kornelski/dssim) by [kornelski](https://github.com/kornelski). more details can be found in the [original repo](https://github.com/kornelski/dssim).

### Usage

```shell
$ deno run --allow-all src/image_similarity.ts <base_image> <images...>
```

For library usage:

```ts
import { compare } from "https://deno.land/x/ssime@1.0.0/pkg/image_similarity.js";
```
