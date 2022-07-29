"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function getAllChampSkins() {
    return __awaiter(this, void 0, void 0, function* () {
        let allChampSkins = [];
        for (let i = 1; i < 10; i++) {
            allChampSkins.push(yield getChampSkins(i));
        }
        return allChampSkins;
    });
}
function getChampSkins(champId) {
    return __awaiter(this, void 0, void 0, function* () {
        let champSkins = {
            id: 0,
            name: "",
            skins: []
        };
        const fetchLocation = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/fr_fr/v1/champions/${champId}.json`;
        const response = yield fetch(fetchLocation);
        const result = yield response.json();
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
    });
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
