function pixelizeIMG(sample_size:number):void{
    let c = document.createElement("canvas");
    let img1 = new Image();

    img1.onload = function () {
        const oldImage:HTMLImageElement = <HTMLImageElement>document.getElementById("image1")

        const w = img1.width;
        const h = img1.height;

        c.width = w;
        c.height = h;
        const ctx = <CanvasRenderingContext2D> c.getContext('2d');
        ctx.drawImage(img1, 0, 0);

        //continue the image processing

        let pixelArr = ctx.getImageData(0, 0, w, h).data;

        for (let y = 0; y < h; y += sample_size) {
            for (let x = 0; x < w; x += sample_size) {
                let p = (x + (y*w)) * 4;
                ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
                ctx.fillRect(x, y, sample_size, sample_size);
            }
        }
        const potentialCanvas = document.getElementById("canvasIMG");
        console.log(potentialCanvas)
        if(potentialCanvas != null){
            potentialCanvas.remove()
        }
        let img2 = new Image();
        img2.src = c.toDataURL("image/jpeg");
        img2.width = 600;
        img2.id = "canvasIMG"
        document.body.appendChild(img2);


    };
    const currentImage:HTMLImageElement = <HTMLImageElement>document.getElementById("image1");
    img1.src = currentImage.src

}

for(let x = 60; x >= 2; x-=1){
    pixelizeIMG(x);
}