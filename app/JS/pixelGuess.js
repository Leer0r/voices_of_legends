function pixelizeIMG(sample_size) {
    var c = document.createElement("canvas");
    var img1 = new Image();
    img1.onload = function () {
        var oldImage = document.getElementById("image1");
        var w = img1.width;
        var h = img1.height;
        c.width = w;
        c.height = h;
        var ctx = c.getContext('2d');
        ctx.drawImage(img1, 0, 0);
        //continue the image processing
        var pixelArr = ctx.getImageData(0, 0, w, h).data;
        for (var y = 0; y < h; y += sample_size) {
            for (var x = 0; x < w; x += sample_size) {
                var p = (x + (y * w)) * 4;
                ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
                ctx.fillRect(x, y, sample_size, sample_size);
            }
        }
        var potentialCanvas = document.getElementById("canvasIMG");
        console.log(potentialCanvas);
        if (potentialCanvas != null) {
            potentialCanvas.remove();
        }
        var img2 = new Image();
        img2.src = c.toDataURL("image/jpeg");
        img2.width = 600;
        img2.id = "canvasIMG";
        document.body.appendChild(img2);
    };
    var currentImage = document.getElementById("image1");
    img1.src = currentImage.src;
}
for (var x = 60; x >= 2; x -= 1) {
    pixelizeIMG(x);
}
