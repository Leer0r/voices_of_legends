"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllChampionSkins = void 0;
async function getAllChampSkins() {
    let allChampSkins = [];
    const champId = await getAllChampId();
    for (let i = 1; i < champId.length; i++) {
        allChampSkins.push(await getChampSkins(champId[i]));
    }
    return allChampSkins;
}
async function getChampSkins(champId) {
    let champSkins = {
        id: 0,
        name: "",
        skins: []
    };
    const fetchLocation = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/fr_fr/v1/champions/${champId}.json`;
    const response = await fetch(fetchLocation);
    const result = await response.json();
    champSkins = {
        name: result["name"].toLowerCase(),
        skins: [],
        id: result['id']
    };
    for (let i = 0; i < result["skins"].length; i++) {
        const newSkin = {
            id: result["skins"][i]["id"],
            splashPath: result["skins"][i]["splashPath"],
            name: result["skins"][i]["name"].toLowerCase()
        };
        champSkins["skins"].push(newSkin);
    }
    return champSkins;
}
function arrayContains(array, element) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] = element) {
            return true;
        }
    }
    return false;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomArray(max, length) {
    const rangeArray = [...Array(max).keys()].map(x => x + 1);
    const randArray = [];
    let randNumber;
    for (let i = 0; i < length; i++) {
        randNumber = getRandomInt(rangeArray.length - 1);
        randArray.push(rangeArray[randNumber]);
        rangeArray.splice(randNumber, 1);
    }
    console.log(randArray);
    return randArray;
}
async function getAllChampId() {
    const returnArray = [];
    const fetchLocation = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json`;
    const response = await fetch(fetchLocation);
    const res = await response.json();
    const resArray = res;
    for (let i = 1; i < resArray.length; i++) {
        returnArray.push(resArray[i]["id"]);
    }
    return returnArray;
}
async function getAllChampionSkins() {
    const storageLocation = `${process.cwd()}/ressources/gameData`;
    const championArray = await getAllChampSkins();
}
exports.getAllChampionSkins = getAllChampionSkins;
