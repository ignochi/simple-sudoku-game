"use strict";

function goToMenuPage() {
    function fromHomePage() {
        const page = document.querySelector("[data-home-and-menu-page-container]");
        const button = document.querySelector("[data-go-to-menu-page-button]");
        button.addEventListener("click", () => {
            page.style.translate = "-100vw";
        });
    }
    fromHomePage();

    function fromMenuItemPage() {
        const pages = document.querySelectorAll("[data-menu-item-page]");
        const buttons = document.querySelectorAll("[data-back-to-menu-page-button]");
        const CLASS = "display-menu-item-page-with-js";
    
        buttons.forEach((eachButton, index) => {
            eachButton.addEventListener("click", () => {
                pages.item(index).classList.remove(CLASS);
            });
        });
    }
    fromMenuItemPage();
}
goToMenuPage();

function handleRandomFact() {

    async function getText(file) {
        let myObject = await fetch(file);
        let fetchedValue = await myObject.text();

        outputRandomFact(fetchedValue);
    }

    function outputRandomFact(fetchedValue) {
        const display = document.querySelector("[data-random-facts-main-content]");
        let quote = JSON.parse(fetchedValue);
        let length = quote.length;
        let index = Math.floor(Math.random() * length);

        console.log(quote[index]);
        display.textContent = quote[index];
    }
    getText("sudoku.json");

}
handleRandomFact();

function goToHomePage() {
    const page = document.querySelector("[data-home-and-menu-page-container]");
    const button = document.querySelector("[data-go-to-home-page-button]");
    button.addEventListener("click", () => {
        page.style.translate = "0vw";
    });
}
goToHomePage();

function displayMenuItemPage() {
    const buttons = document.querySelectorAll("[data-menu-item]");
    const pages = document.querySelectorAll("[data-menu-item-page]");
    const CLASS = "display-menu-item-page-with-js";

    buttons.forEach((eachButton, index) => {
        eachButton.addEventListener("click", () => {
            pages.item(index).classList.add(CLASS);
        });
    });
}
displayMenuItemPage();