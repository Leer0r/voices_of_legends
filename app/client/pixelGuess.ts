interface selectedImage{
    champSkins:champSkins;
    skinNumber:number
}

class pixelGuess {
    difficulty:string = ""
    guessImage:HTMLImageElement = <HTMLImageElement>document.getElementById("guessImage");
    allChampSkins:Array<champSkins> = [];
    selectedImage:selectedImage = {
        champSkins:
        {
            id:0,
            name:"",
            skins:[]
        },
        skinNumber:0
    }
    constructor() {
        this.lauchGame();
    }

    pixelizeIMG(sample_size:number):void{
        let c = document.createElement("canvas");
        let img1 = new Image();
    
        img1.onload = function () {
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
            if(potentialCanvas != null){
                potentialCanvas.remove()
            }
            let img2 = new Image();
            img2.src = c.toDataURL("image/jpeg");
            img2.width = 800;
            img2.id = "canvasIMG"
            document.querySelector(".champToGuess")?.appendChild(img2);
    
    
        };
        const currentImage:HTMLImageElement = <HTMLImageElement>document.getElementById("guessImage");
        img1.src = currentImage.src
    
    }

    getDifficulty() {
        this.difficulty = (<HTMLDivElement>document.querySelector(".middle .gameInfo .difficulty .value")).innerText
        console.log(this.difficulty)
    }

    lauchGame() {
        getAllChampSkins()
        .then((result:Array<champSkins>) => {
            this.allChampSkins = result
            console.log(this.allChampSkins)

            this.getDifficulty();
            this.chooseImage();
            this.pixelGame();
        })
    }

    chooseImage(){
        let champion:number = getRandomInt(this.allChampSkins.length)
        let championSkin;
        if(this.difficulty == "facile"){
            championSkin = 0
        }
        else {
            championSkin = 1
        }
        this.selectedImage.champSkins = this.allChampSkins[champion]
        this.selectedImage.skinNumber = championSkin
        console.log(this.getSkinPath(this.selectedImage.champSkins.id,this.selectedImage.skinNumber))
    }

    setGuessImage(imgSrc:string) {
        this.guessImage.src = imgSrc
    }

    getSkinPath(champId:number,skinsId:number):string{
        return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champId}/${champId}0${skinsId < 10 ? `0${skinsId}` : `${skinsId}`}.jpg`
    }

    async pixelGame() {
        let delay:number = 1000
        for(let x = 60; x >= 1; x-=5 - (x < 7 ? 4 : 0)){
            setTimeout(() => {
                this.pixelizeIMG(x)
            }, delay)
            delay += 1000
        }
    }
}

const _pixelGuess = new pixelGuess()