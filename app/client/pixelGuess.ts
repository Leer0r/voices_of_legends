interface selectedImage{
    champSkins:champSkins;
    skinNumber:number;
    guessName:string;
}

class pixelGuess {
    difficulty:string = ""
    guessImage:HTMLImageElement = <HTMLImageElement>document.getElementById("guessImage");
    allChampSkins:Array<champSkins> = [];
    selectedImages:Array<selectedImage> = [];
    nbChampToGuess:number = 10;
    championIdArray:Array<number> = []
    constructor() {
        this.lauchGame();
    }

    pixelizeIMG(sample_size:number):void{
        let c = document.createElement("canvas");
        let img1 = new Image();
        img1.crossOrigin = "unknown"
    
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
    }

    lauchGame() {
        getAllChampSkins()
        .then(async (result:Array<champSkins>) => {
            this.allChampSkins = result
            console.log(this.allChampSkins)
            this.championIdArray = await getAllChampId()
            this.getDifficulty();
            this.chooseImages();
            this.pixelGame();
        })
    }

    chooseImages(){
        const randArray:Array<number> = getRandomArray(this.championIdArray.length,this.nbChampToGuess);
        for(let i = 0; i < this.nbChampToGuess; i++){
            this.selectedImages[i] = {
                champSkins: {
                    id:0,
                    name:"",
                    skins:[]
                },
                guessName: "",
                skinNumber:0
            }
            let champion:number = randArray[i]
            let championSkin;
            this.selectedImages[i].champSkins = this.allChampSkins[champion]
            if(this.difficulty == "facile"){
                championSkin = 0
                this.selectedImages[i].guessName = this.allChampSkins[champion].name
            }
            else if (this.difficulty == "moyen") {
                championSkin = getRandomInt(this.selectedImages[i].champSkins.skins.length - 2) + 1;
                this.selectedImages[i].guessName = this.allChampSkins[champion].name
            }
            else {
                championSkin = getRandomInt(this.selectedImages[i].champSkins.skins.length - 2) + 1;
                console.log(championSkin)
                this.selectedImages[i].guessName = this.allChampSkins[champion].skins[championSkin].name
            }
            this.selectedImages[i].skinNumber = this.allChampSkins[champion].skins[championSkin].id
            console.log(this.selectedImages[i])
        }
        this.setGuessImage(this.getSkinPath(this.selectedImages[0].champSkins.id,this.selectedImages[0].skinNumber))
    }

    setGuessImage(imgSrc:string) {
        this.guessImage.src = imgSrc
    }

    getSkinPath(champId:number,skinsId:number):string{
        return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champId}/${skinsId}.jpg`
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