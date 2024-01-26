"use strict";

function goToMenuPage() {
    const page = document.querySelector("[data-main]");
    const button = document.querySelector("[data-go-to-menu-page-button]");
    button.addEventListener("click", () => {
        page.style.translate = "-100vw";
    });
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
    const page = document.querySelector("[data-main]");
    const button = document.querySelector("[data-go-to-home-page-button]");
    button.addEventListener("click", () => {
        page.style.translate = "0vw";
    });
}
goToHomePage();

function displayMenuItemDropdown() {
    const buttons = document.querySelectorAll("[data-menu-item]");
    const dropdowns = document.querySelectorAll("[data-menu-item-dropdown]");
    const CLASS = "display-menu-item-with-js";

    buttons.forEach((eachButton) => {
        eachButton.addEventListener("click", () => {
            dropdowns.forEach((eachDropdown) => {
                eachDropdown.classList.remove(CLASS);
            });

            const ownDropdown = eachButton.nextElementSibling;
            ownDropdown.classList.add(CLASS);
        });
    });
}
displayMenuItemDropdown();