use wasm_bindgen::prelude::*;
use dssim_core::*;
use rgb::RGBA;
use serde::{Deserialize, Serialize};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Rgba {
    /// Red Component
    pub r: u8,
    /// Green Component
    pub g: u8,
    /// Blue Component
    pub b: u8,
    /// Alpha Component
    pub a: u8,
}

fn vec_u8_to_vec_rgba(data: &Vec<u8>) -> Vec<RGBA<u8>> {
    if data.len() % 4 != 0 {
        panic!("The length of input data must be a multiple of 4.");
    }

    let mut rgba_vec = Vec::with_capacity(data.len() / 4);

    for chunk in data.chunks_exact(4) {
        let rgba = RGBA {
            r: chunk[0],
            g: chunk[1],
            b: chunk[2],
            a: chunk[3],
        };
        rgba_vec.push(rgba);
    }

    rgba_vec
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Image {
    pub bitmap: Vec<u8>,
    pub __width__: usize,
    pub __height__: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Param {
    pub base: Image,
    pub images: Vec<Image>,
}

fn get_dssim_image(attr: &Dssim, image: &Image) -> DssimImage<f32> {
    return Dssim::create_image_rgba(
        &attr,
        &vec_u8_to_vec_rgba(&image.bitmap),
        image.__width__,
        image.__height__,
    )
    .expect("create image error");
}

#[wasm_bindgen]
pub fn compare(param: JsValue) -> Vec<f64> {
    let attr = Dssim::new();

    let param: Param = serde_wasm_bindgen::from_value(param).expect("param error");

    // Initialize a vector to store comparison results
    let mut results = Vec::new();

    let base = get_dssim_image(&attr, &param.base);
    // Compare base image with each image in param.images
    for image in &param.images {
        let image = get_dssim_image(&attr, image);

        let (diff, _) = attr.compare(&base, image);
        results.push(diff.into());
    }

    return results;
}
