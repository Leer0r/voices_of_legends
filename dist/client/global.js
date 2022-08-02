"use strict";
function changePage(newPage, method, args) {
    const form = document.createElement("form");
    form.method = method;
    form.action = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${newPage}`;
    for (let i = 0; i < args.length; i++) {
        const input = document.createElement("input");
        input.type = 'hidden';
        input.name = args[i].title;
        input.value = args[i].value;
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}
function sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) { /* Do nothing */ }
}
async function getAllChampSkins() {
    let allChampSkins = [];
    const champId = await getAllChampId();
    for (let i = 1; i < champId.length; i++) {
        allChampSkins.push(await getChampSkins(champId[i]));
    }
    return allChampSkins;
}
async function getNbChampSkins(nb) {
    let allChampSkins = [];
    const champId = await getAllChampId();
    const randArray = getRandomArray(champId.length, nb);
    for (let i = 0; i < randArray.length; i++) {
        allChampSkins.push(await getChampSkins(champId[randArray[i]]));
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
