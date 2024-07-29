import { compare } from "../pkg/image_similarity.js";
import { read_image } from "./util.ts";

if (globalThis?.Deno?.args.length < 2) {
  console.error("Usage: deno run ./image_similarity.ts <base_image> <images...>");
  globalThis?.Deno?.exit(1);
}

const [base, ...images] = globalThis?.Deno?.args;

const diff = await compare({
  base: await read_image(base),
  images: await Promise.all(images.map(read_image)),
});

console.log(diff);