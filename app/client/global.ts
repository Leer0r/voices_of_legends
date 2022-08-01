interface skin {
    id:number
    splashPath:string,
    name:string
}

interface champSkins{
    name:string,
    skins: Array<skin>,
    id:number
}

function changePage(newPage:string,method:keyof requestsMethods,args:Array<args>) {
    const form = document.createElement("form");
    form.method = method;
    form.action = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${newPage}`;
    for(let i = 0; i < args.length; i++){
        const input = document.createElement("input");
        input.type = 'hidden';
        input.name = args[i].title;
        input.value = args[i].value;
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}

function sleepFor(sleepDuration:number){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}




async function getAllChampSkins(): Promise<Array<champSkins>>{
    let allChampSkins:Array<champSkins> = []
    const champId:Array<number> = await getAllChampId()
    for(let i = 1; i < champId.length; i++){
        allChampSkins.push(await getChampSkins(champId[i]));
    }
    return allChampSkins;
}

async function getChampSkins(champId:number): Promise<champSkins>{
    let champSkins: champSkins = {
        id:0,
        name: "",
        skins: []
    }
    const fetchLocation = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/fr_fr/v1/champions/${champId}.json`
    const response = await fetch(fetchLocation);
    const result = await response.json();
    champSkins = {
        name: result["name"].toLowerCase(),
        skins: [
        ],
        id:result['id']
    }
    for(let i = 0; i < result["skins"].length; i++){
        const newSkin:skin = {
            id: result["skins"][i]["id"],
            splashPath: result["skins"][i]["splashPath"],
            name: result["skins"][i]["name"].toLowerCase()
        }
        champSkins["skins"].push(newSkin)
    }
    return champSkins
}

function arrayContains<T>(array:Array<T>,element:T):boolean{
    for(let i = 0; i < array.length; i++){
        if(array[i] = element){
            return true
        }
    }
    return false
}

function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}

function getRandomArray(max:number,length:number):Array<number> {
    const rangeArray = [...Array(max).keys()].map(x => x + 1);
    const randArray:Array<number> = []
    let randNumber;
    for(let i = 0; i < length; i++){
        randNumber = getRandomInt(rangeArray.length - 1);
        randArray.push(rangeArray[randNumber])
        rangeArray.splice(randNumber,1);
    }
    console.log(randArray)
    return randArray
}

async function getAllChampId():Promise<Array<number>>{
    const returnArray:Array<number> = []
    const fetchLocation = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json`
    const response = await fetch(fetchLocation)
    const res = await response.json()
    const resArray:Array<any> = <Array<any>> res;
    for(let i:number = 1; i < resArray.length; i++){
        returnArray.push(resArray[i]["id"])
    }
    return returnArray
}