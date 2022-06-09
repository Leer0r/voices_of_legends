const popupContainer:HTMLDivElement = <HTMLDivElement>document.querySelector(".popupContainer")
const confirmButton:HTMLDivElement = <HTMLDivElement>document.querySelector(".popupContainer .popup .quitButton")
const popupTitle:HTMLDivElement = <HTMLDivElement>document.querySelector(".popupContainer .popup .title")
const popupContent:HTMLDivElement = <HTMLDivElement>document.querySelector(".popupContainer .popup .content")


confirmButton.addEventListener("click", () => {
    popupContainer.style.display = "none"
})