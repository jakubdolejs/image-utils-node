# Image utilities for Node

This library is a collection of utilities for resampling and cropping images inside the Node JS runtime.

## Requirements

- [NodeJS](https://nodejs.org)
- [ImageMagick](https://imagemagick.org)

## Installation

1. Add the following registry in your .npmrc file

    ```
    @jakubdolejs:registry=https://npm.pkg.github.com
    ```
2. Install the package

    ```
    npm install @jakubdolejs/image_utils
    ```

## Usage

### Get image dimensions

```typescript
import { Size, imageSize } from "@jakubdolejs/image_utils"
import fs from "fs"

const file = "myimage.png"
fs.promises.readFile(file)
    .then(image => imageSize(image))
    .then(size => console.log(`The dimensions of ${file} are ${size.width} x ${size.height} pixels`))
    .catch(error => console.error(error))
```
### Convert image to a different format*

The following script converts an image called *myimage.png* to a JPG image called *myimage.jpg*

```typescript
import { convert } from "@jakubdolejs/image_utils"
import fs from "fs"

const file = "myimage.png"
const jpegFile = "myimage.jpg"
fs.promises.readFile(file)
    .then(image => convert(image, "jpg"))
    .then(jpeg => fs.promises.writeFile(jpegFile))
    .catch(error => console.error(error))
```
*Supported formats are PNG and JPG

### Crop image

The following script crops an image called *myimage.png* to a 200 &times; 300 pixel rectangle that starts 10 pixels from the left edge of the image and 20 pixels from the top of the image. The script then writes the cropped image to a file called *mycroppedimage.png*.

```typescript
import { crop } from "@jakubdolejs/image_utils"
import fs from "fs"

const file = "myimage.png"
const croppedImageFile = "mycroppedimage.png"
const x = 10
const y = 20
const width = 200
const height = 300
fs.promises.readFile(file)
    .then(image => crop(image, x, y, width, height))
    .then(croppedImage => fs.promises.writeFile(croppedImageFile, croppedImage))
    .catch(error => console.error(error))
```

### Resample image

The following script resamples an image called *myimage.png* to fit into a rectangle that's 200 pixels wide and 300 pixels tall. The script then writes the cropped image to a file called *myresampledimage.png*.

```typescript
import { resample } from "@jakubdolejs/image_utils"
import fs from "fs"

const file = "myimage.png"
const resampledImageFile = "myresampledimage.png"
const width = 200
const height = 300
fs.promises.readFile(file)
    .then(image => resample(image, width, height))
    .then(resampledImage => fs.promises.writeFile(resampledImageFile, resampledImage)
    .catch(error => console.error(error))
```