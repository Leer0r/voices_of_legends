"use strict";
const popupContainer = document.querySelector(".popupContainer");
const confirmButton = document.querySelector(".popupContainer .popup .quitButton");
const popupTitle = document.querySelector(".popupContainer .popup .title");
const popupContent = document.querySelector(".popupContainer .popup .content");
confirmButton.addEventListener("click", () => {
    popupContainer.style.display = "none";
});
