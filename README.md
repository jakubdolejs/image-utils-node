# Image utilities for Node

This library is a collection of image manipulation utilities running inside the Node JS runtime. The manipulation is done using [ImageMagick](https://imagemagick.org).

## Requirements

- [NodeJS](https://nodejs.org)
- [ImageMagick](https://imagemagick.org)

## Installation

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

### Stack images

The following script stacks the image called *top.png* on top of image called *bottom.png*. If the images are different widths they will be centered. The script writes the resulting image in a file called *myverticalstack.png*.

To stack images horizontally substitute `stackVertically` with `stackHorizontally`.

```typescript
import { stackVertically } from "@jakubdolejs/image_utils"
import fs from "fs"

const top = "top.png"
const bottom = "bottom.png"
const stackedImages = "myverticalstack.png"
fs.promises.readFile(top)
    .then(topImage => {
        return fs.promises.readFile(bottom)
            .then(bottomImage => stackVertically([topImage, bottomImage], "Center", "png")
    })
    .then(stackedImage => fs.promises.writeFile(stackedImages, stackedImage))
    .catch(error => console.error(error))
```

### Draw a rectangle on image

The following script draws a rectangle with 4-pixel wide green stroke and semi-transparent fill 10 pixels from each edge of a 640 &times; 480 pixel image called *myimage.png*. The script writes the resulting image in a file called *myimagewithrectangle.png*.

```typescript
import { drawRectangle, Colour } from "@jakubdolejs/image_utils"
import fs from "fs"

const file = "myimage.png"
const fileWithRectangle = "myimagewithrectangle.png"
const rectangle = {
    "x": 10,
    "y": 10,
    "width": 620,
    "height": 460
}
const fillColour = Colour.TRANSPARENT
const stroke = {
    "width": 4,
    "colour": Colour.GREEN
}
fs.promises.readFile(file)
    .then(image => drawRectangle(image, rectangle, fillColour, stroke, "png"))
    .then(imageWithRectangle => fs.promises.writeFile(fileWithRectangle, imageWithRectangle))
    .catch(error => console.error(error))
```