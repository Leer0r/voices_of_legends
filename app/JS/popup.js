var popupContainer = document.querySelector(".popupContainer");
var confirmButton = document.querySelector(".popupContainer .popup .quitButton");
var popupTitle = document.querySelector(".popupContainer .popup .title");
var popupContent = document.querySelector(".popupContainer .popup .content");
confirmButton.addEventListener("click", function () {
    popupContainer.style.display = "none";
});
