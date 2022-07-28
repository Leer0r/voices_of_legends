interface skin {
    id:number
    splashPath:string
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
    for(let i = 1; i < 6; i++){
        allChampSkins.push(await getChampSkins(i));
    }
    return allChampSkins;
}

async function getChampSkins(champId:number): Promise<champSkins>{
    let champSkins: champSkins = {
        id:0,
        name: "",
        skins: []
    }
    const fetchLocation = `https://cdn.communitydragon.org/latest/champion/${champId}/data`
    const response = await fetch(fetchLocation);
    const result = await response.json();
    champSkins = {
        name: result["name"],
        skins: [
        ],
        id:result['id']
    }
    for(let i = 0; i < result["skins"].length; i++){
        const newSkin:skin = {
            id: result["skins"][i]["id"],
            splashPath: result["skins"][i]["splashPath"]
        }
        champSkins["skins"].push(newSkin)
    }
    return champSkins
}

function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }