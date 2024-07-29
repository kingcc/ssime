import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { compare } from "../pkg/image_similarity.js";
import { read_image } from "../src/util.ts";

globalThis?.Deno?.test("dssim official test #image_gray", async () => {
  const base = "tests/gray1-rgba.png";
  const images = ["tests/gray1-pal.png", "tests/gray1-gray.png", "tests/gray1.jpg"];
  const diffs = await compare({
    base: await read_image(base),
    images: await Promise.all(images.map(read_image)),
  });
  assertEquals(diffs.length, 3);
  assertEquals(diffs[0] < 0.00001, true);
  assertEquals(diffs[1] < 0.00001, true);
  assertEquals(diffs[2] < 0.00006, true);
});

globalThis?.Deno?.test("dssim official test #image_gray_profile", async () => {
  const base = "tests/gray-profile.png";
  const images = ["tests/gray-profile2.png", "tests/gray-profile.jpg"];
  const diffs = await compare({
    base: await read_image(base),
    images: await Promise.all(images.map(read_image)),
  });
  assertEquals(diffs.length, 2);
  // assertEquals(diffs[0] < 0.0003, true);
  assertEquals(diffs[1] < 0.0003, true);
});

globalThis?.Deno?.test("dssim official test #image_load1", async () => {
  {
    const base = "tests/profile.jpg";
    const images = ["tests/profile.png"];
    const diffs = await compare({
      base: await read_image(base),
      images: await Promise.all(images.map(read_image)),
    });
    // assertEquals(diffs[0] <= 0.002, true);
  }

  {
    const base = "tests/profile-stripped.jpg";
    const images = ["tests/profile.jpg", "tests/profile-stripped.png"];
    const diffs = await compare({
      base: await read_image(base),
      images: await Promise.all(images.map(read_image)),
    });
    // assertEquals(diffs[0] > 0.008, true);
    assertEquals(diffs[1] > 0.009, true);
  }
});
