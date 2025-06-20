
function* render(image, context) {

    for (let j = 0; j< image.height; j++) {
        for (let i = 0; i < image.width; i++) {
            let r = i / (image.width - 1);
            let g = j / (image.height - 1);
            let b = 0.25;

            let ir = 255.999 * r;
            let ig = 255.999 * g;
            let ib = 255.999 * b;

            putPixel(image, i, j, ir, ig, ib);

        }
        if (j % 64) { yield }

    }
}

function update(image, context) {
    renderGenerator.next();
    context.putImageData(image, 0, 0);
    window.requestAnimationFrame(() => { update(image, context) });
}

const BYTES_PER_PIXEL = 4;

function putPixel(image, x, y, r, g, b) {
    let pixelIndex = ((y * image.width) + x) * BYTES_PER_PIXEL;

    image.data[pixelIndex + 0] = r; // R value
    image.data[pixelIndex + 1] = g; // G value
    image.data[pixelIndex + 2] = b; // B value
    image.data[pixelIndex + 3] = 255; // Alpha value
}

function rowMain() {
    const image_width = 256;
    const image_height = 256;

    let canvas = document.createElement('canvas');

    canvas.width = image_width;
    canvas.height = image_height;
    canvas.style.imageRendering = "pixelated";
    canvas.style.width = "100%";
    document.body.appendChild(canvas);

    let context = canvas.getContext('2d');

    // console.log(context);

    context.fillStyle = "red";
    context.fillRect(0, 0, canvas.width, canvas.height);


    let image = context.createImageData(image_width, image_height);
    renderGenerator = render(image, context);
    window.requestAnimationFrame(() => { update(image, context) });
    
}