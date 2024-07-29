import { decode } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

export async function read_image(filename: string) {
  const file = await globalThis?.Deno?.readFile(filename);
  return decode(file);
}
