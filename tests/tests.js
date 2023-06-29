import { assert } from "chai"
import { imageSize, crop, resample, convert, stackVertically, stackHorizontally, drawRectangle, addBorderPercent, extendSidesByMirroring, rotate, Colour } from "../index.js"
import fs from "fs"

const divineSize = {
    "width": 257,
    "height": 388
}
const largeDivineSize = {
    "width": 2570,
    "height": 3880
}

function checkSizeMatchesDivine(size, scale, done) {
    assert.isAtLeast(size.width, Math.floor(divineSize.width * scale))
    assert.isAtLeast(size.height, Math.floor(divineSize.height * scale))
    assert.isAtMost(size.width, Math.ceil(divineSize.width * scale))
    assert.isAtMost(size.height, Math.ceil(divineSize.height * scale))
    done()
}

function checkSizeMatchesLargeDivine(size, scale, done) {
    assert.isAtLeast(size.width, Math.floor(largeDivineSize.width * scale))
    assert.isAtLeast(size.height, Math.floor(largeDivineSize.height * scale))
    assert.isAtMost(size.width, Math.ceil(largeDivineSize.width * scale))
    assert.isAtMost(size.height, Math.ceil(largeDivineSize.height * scale))
    done()
}

describe("Image size", () => {
    it("Gets image size", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => imageSize(image))
            .then(size => {
                assert.equal(size.width, divineSize.width)
                assert.equal(size.height, divineSize.height)
                done()
            })
            .catch(error => done(error))
    })
    it("Fails to get image size of invalid image", done => {
        imageSize(Buffer.from([0,1,2,3,4,5,6,7,8,9]))
            .then(() => done(new Error("Input is nonsense")))
            .catch(() => done())
    })
})
describe("Cropping", () => {
    it("Crops image to size", done => {
        const width = 200
        const height = 300
        fs.promises.readFile("./tests/divine.png")
            .then(image => crop(image, 10, 10, width, height))
            .then(image => imageSize(image))
            .then(size => {
                assert.equal(size.width, width)
                assert.equal(size.height, height)
                done()
            })
            .catch(error => done(error))
    })
    it("Fails to crop image to invalid bounds", done => {
        const width = 500
        const height = 600
        fs.promises.readFile("./tests/divine.png")
            .then(image => crop(image, 1000, 10, width, height))
            .then(() => done(new Error("X is outside image bounds")))
            .catch(() => done())
    })
    it("Crops image and outputs jpg", done => {
        const width = 200
        const height = 300
        fs.promises.readFile("./tests/divine.png")
            .then(image => crop(image, 10, 10, width, height, "png"))
            .then(image => imageSize(image))
            .then(size => {
                assert.equal(size.width, width)
                assert.equal(size.height, height)
                done()
            })
            .catch(error => done(error))
    })
    it("Fails to outputs unsupported format", done => {
        const width = 200
        const height = 300
        fs.promises.readFile("./tests/divine.png")
            .then(image => crop(image, 10, 10, width, height, "tif"))
            .then(() => done("Should have failed to write tif"))
            .catch(() => done())
    })
})
describe("Resampling", () => {
    const scale = 0.5
    const newSize = {
        width: divineSize.width * scale,
        height: divineSize.height * scale
    }
    function checkSize(size, done) {
        assert.isAtMost(size.width, Math.ceil(newSize.width))
        assert.isAtMost(size.height, Math.ceil(newSize.height))
        done()
    }
    it("Resamples image to width and height", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => resample(image, newSize.width, newSize.height))
            .then(resampled => imageSize(resampled))
            .then(size => checkSize(size, done))
            .catch(error => done(error))
    })
    it("Resamples image to width", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => resample(image, newSize.width))
            .then(resampled => imageSize(resampled))
            .then(size => checkSize(size, done))
            .catch(error => done(error))
    })
    it("Resamples image to height", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => resample(image, undefined, newSize.height))
            .then(resampled => imageSize(resampled))
            .then(size => checkSize(size, done))
            .catch(error => done(error))
    })
})
describe("Conversion", () => {
    it("Convert image to jpg", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => convert(image, "jpg"))
            .then(jpg => convert(jpg, "png"))
            .then(() => done())
            .catch(error => done(error))
    })
})
describe("Stacking", () => {
    it("Stacks images vertically", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => stackVertically([image, image], "Center", "png"))
            .then(png => imageSize(png))
            .then(size => {
                assert.equal(size.width, divineSize.width)
                assert.equal(size.height, divineSize.height * 2)
                done()
            })
            .catch(error => done(error))
    })
    it("Stacks images horizontally", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => stackHorizontally([image, image], "Center", "png"))
            .then(png => imageSize(png))
            .then(size => {
                assert.equal(size.width, divineSize.width * 2)
                assert.equal(size.height, divineSize.height)
                done()
            })
            .catch(error => done(error))
    })
})
describe("Drawing", () => {
    it("Draws a rectangle on image", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => drawRectangle(image, {"x": 20, "y": 20, "width": divineSize.width-40, "height": divineSize.height-40}, Colour.TRANSPARENT, {"width": 4, "colour": Colour.RED}))
            .then(() => done())
            .catch(error => done(error))
    })
})
describe("Adding borders", () => {
    it("Adds a 5% border around image", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => addBorderPercent(image, 5, 5, Colour.BLACK))
            .then(image => imageSize(image))
            .then(size => checkSizeMatchesDivine(size, 1.1, done))
            .catch(error => done(error))
    })
    it("Extends image by 5% mirroring the centre", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => extendSidesByMirroring(image, 5, 5))
            .then(image => imageSize(image))
            .then(size => checkSizeMatchesDivine(size, 1.1, done))
            .catch(error => done(error))
    })
    it("Extends large image by 5% mirroring the centre", done => {
        fs.promises.readFile("./tests/large_divine.png")
            .then(image => extendSidesByMirroring(image, 5, 5))
            .then(image => imageSize(image))
            .then(size => checkSizeMatchesLargeDivine(size, 1.1, done))
            .catch(error => done(error))
    }).timeout(20000)
})
describe("Rotating", () => {
    it("Rotates image 90º", done => {
        fs.promises.readFile("./tests/divine.png")
            .then(image => rotate(image, 90))
            .then(image => imageSize(image))
            .then(size => {
                assert.equal(size.width, divineSize.height)
                assert.equal(size.height, divineSize.width)
                done()
            })
            .catch(error => done(error))
    })
})