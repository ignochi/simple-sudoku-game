"use strict";

function setTabindexTo0(CSSProperty, index) {
    const pages = document.querySelectorAll(`[${CSSProperty}]`);
    const focusableElements = pages[index].querySelectorAll('button[tabindex="-1"], [tabindex="-1"]');

    focusableElements.forEach((eachFocusableElement) => {
        eachFocusableElement.tabIndex = 0;
    });
}

function setTabindexToMinus1(CSSProperty, index) {
    const pages = document.querySelectorAll(`[${CSSProperty}]`);
    const focusableElements = pages[index].querySelectorAll('button, [tabindex]');

    focusableElements.forEach((eachFocusableElement) => {
        eachFocusableElement.tabIndex = -1;
    });
}

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

function goToMenuPage() {
    function fromHomePage() {
        const page = document.querySelector("[data-home-and-menu-page-container]");
        const newPageCSSProperty = "data-menu-page";
        const previousPageCSSProperty = "data-home-page";
        const button = document.querySelector("[data-go-to-menu-page-button]");

        button.addEventListener("click", () => {
            page.style.translate = "-100vw";
            setTabindexTo0(newPageCSSProperty, 0);
            setTabindexToMinus1(previousPageCSSProperty, 0);
        });
    }
    fromHomePage();

    function fromMenuItemPage() {
        const pages = document.querySelectorAll("[data-menu-item-page]");
        const newPageCSSProperty = "data-menu-page";
        const previousPageCSSProperty = "data-menu-item-page";
        const buttons = document.querySelectorAll("[data-back-to-menu-page-button]");
        const CLASS = "display-menu-item-page-with-js";

        buttons.forEach((eachButton, index) => {
            eachButton.addEventListener("click", () => {
                pages.item(index).classList.remove(CLASS);
                setTabindexTo0(newPageCSSProperty, 0);
                setTabindexToMinus1(previousPageCSSProperty, index);
            });
        });
    }
    fromMenuItemPage();
}
goToMenuPage();

function handleArrowRightAndArrowDownKeypressOnMenuItems() {
    const menuItems = document.querySelectorAll("[data-menu-page] button");

    menuItems.forEach((eachMenuItem, index) => {
        const isLastMenuItem = index === menuItems.length - 1;

        eachMenuItem.addEventListener("keyup", function (event) {
            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                if (isLastMenuItem) {
                    menuItems[0].focus();
                } else {
                    menuItems.item(index + 1).focus();
                }
            }
        });
    });
}
handleArrowRightAndArrowDownKeypressOnMenuItems();

function handleArrowUpAndArrowLeftKeypressOnMenuItems() {
    const menuItems = document.querySelectorAll("[data-menu-page] button");

    menuItems.forEach((eachMenuItem, index) => {
        const isFirstMenuItem = index === 0;

        eachMenuItem.addEventListener("keyup", function (event) {
            if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                if (isFirstMenuItem) {
                    menuItems[menuItems.length - 1].focus();
                } else {
                    menuItems.item(index - 1).focus();
                }
            }
        });
    });
}
handleArrowUpAndArrowLeftKeypressOnMenuItems();

function goToHomePage() {
    const page = document.querySelector("[data-home-and-menu-page-container]");
    const previousPageCSSProperty = "data-menu-page";
    const newPageCSSProperty = "data-home-page";
    const button = document.querySelector("[data-go-to-home-page-button]");
    button.addEventListener("click", () => {
        page.style.translate = "0vw";
        setTabindexTo0(newPageCSSProperty, 0);
        setTabindexToMinus1(previousPageCSSProperty, 0);
    });
}
goToHomePage();

function displayMenuItemPage() {
    const buttons = document.querySelectorAll("[data-menu-item]");
    const pages = document.querySelectorAll("[data-menu-item-page]");
    const CLASS = "display-menu-item-page-with-js";
    const newPageCSSProperty = "data-menu-item-page";
    const previousPageCSSProperty = "data-menu-page";

    buttons.forEach((eachButton, index) => {
        eachButton.addEventListener("click", () => {
            pages.item(index).classList.add(CLASS);
            setTabindexTo0(newPageCSSProperty, index);
            setTabindexToMinus1(previousPageCSSProperty, 0);
        });
    });
}
displayMenuItemPage();

function handlePuzzleAspectRatio() {
    // I created this function as a replacement for the css aspect-ratio
    // property, because it doesn't have very good browser support.

    function resize() {
        const puzzle = document.querySelectorAll("[data-puzzle]");

        puzzle.forEach((eachPuzzle) => {
            eachPuzzle.style.height = `${eachPuzzle.offsetWidth}px`;
        });
    }
    resize();
    window.addEventListener("resize", resize);
}
handlePuzzleAspectRatio();

function setupCells(puzzle, totalNoOfCells) {
    const cells = puzzle.children;
    let cell;

    function createCell() {
        for (let i = 0; i < totalNoOfCells; i++) {
            cell = document.createElement("div");
            puzzle.appendChild(cell);
            cell.classList.add("cell");
        }
    }

    function assignRows() {
        for (let i = 0; i < totalNoOfCells; i++) {
            cells[i].setAttribute(
                "data-row", Math.ceil((i + 1) / Math.sqrt(totalNoOfCells))
            );
        }
    }

    function assignColumns() {
        for (let i = 0; i < totalNoOfCells; i++) {
            cells[i].setAttribute(
                "data-column", ((i + 1) % Math.sqrt(totalNoOfCells) === 0) ? Math.sqrt(totalNoOfCells) : (i + 1) % Math.sqrt(totalNoOfCells)
            );
        }
    }

    function setTabindex() {
        for (let i = 0; i < totalNoOfCells; i++) {
            cells[i].tabIndex = -1;
        }
    }

    createCell();
    assignRows();
    assignColumns();
    setTabindex();
}

function checkIfPuzzleIsComplete(nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
        const cell = nodeList[i];
        const cellContent = cell.innerHTML;

        if (cellContent === "" || (cell.classList.contains("cell-is-in-wrong-row") || cell.classList.contains("cell-is-in-wrong-column") || cell.classList.contains("cell-is-in-wrong-block"))) {
            // Found an empty div
            console.log(cell);
            return false;
        }
    }

    // All divs are not empty
    return true;
}

function handleInputsUniqueness(cellOfInput) {
    const cellOfInputsRow = cellOfInput.dataset.row;
    const cellOfInputsColumn = cellOfInput.dataset.column;
    const cellOfInputBlock = cellOfInput.dataset.block;
    const cells = cellOfInput.parentNode.children;
    const arrayOfCells = Array.from(cells);
    const cellsInFocusedElementsRow = arrayOfCells.filter(function (element) {
        return element.getAttribute('data-row') === cellOfInputsRow;
    });
    const cellsInFocusedElementsColumn = arrayOfCells.filter(function (element) {
        return element.getAttribute('data-column') === cellOfInputsColumn;
    });
    const cellsInFocusedElementsBlock = arrayOfCells.filter(function (element) {
        return element.getAttribute('data-block') === cellOfInputBlock;
    });
    const textContentOfCellsInFocusedElementsRow = cellsInFocusedElementsRow.map(cell => cell.innerHTML);
    const textContentOfCellsInFocusedElementsColumn = cellsInFocusedElementsColumn.map(cell => cell.innerHTML);
    const textContentOfCellsInFocusedElementsBlock = cellsInFocusedElementsBlock.map(cell => cell.innerHTML);

    function getDuplicateNumbers(arr) {
        const testedValues = [];
        const duplicates = [];

        for (let num of arr) {
            if (testedValues.includes(num) && !(duplicates.includes(num))) {
                if (num !== "") {
                    duplicates.push(num);
                }
            }
            testedValues.push(num);

        }
        return duplicates;
    }

    function markWrongInputs(nodeList, arr, CLASS) {
        nodeList.forEach((node) => {
            if (arr.includes(node.innerHTML)) {
                node.classList.add(CLASS);
            }
            else {
                node.classList.remove(CLASS);
            }
        });
    }
    markWrongInputs(cellsInFocusedElementsRow, getDuplicateNumbers(textContentOfCellsInFocusedElementsRow), "cell-is-in-wrong-row");
    markWrongInputs(cellsInFocusedElementsColumn, getDuplicateNumbers(textContentOfCellsInFocusedElementsColumn), "cell-is-in-wrong-column");
    markWrongInputs(cellsInFocusedElementsBlock, getDuplicateNumbers(textContentOfCellsInFocusedElementsBlock), "cell-is-in-wrong-block");

    const isNotEmpty = checkIfPuzzleIsComplete(cells);

    if (isNotEmpty) {
        console.log('There are no empty divs.');
    } else {
        console.log('There is at least one empty div.');
    }
}

function handleOutOfRangeInputs(largestPossibleInput, input, selectedCell) {
    if (input > 0 && input <= largestPossibleInput) {
        selectedCell.innerHTML = input;
        handleInputsUniqueness(selectedCell);
    } else {
        alert("Input is out of range");
    }
}

function getInput(numberButtons, puzzle) {
    let selectedCell;

    puzzle.addEventListener("blur", function (event) {
        selectedCell = event.target;
    }, true);

    numberButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (!(selectedCell.hasAttribute("data-default-value"))) {
                const cells = selectedCell.parentNode.children;
                const numberOfCells = cells.length;
                const largestPossibleInput = Math.sqrt(numberOfCells);
                handleOutOfRangeInputs(largestPossibleInput, button.innerHTML, selectedCell);
            }
        });
    })
}

function handleEasyLevelPuzzle() {
    const puzzle = document.querySelector("[data-easy-level-puzzle]");
    const numberButtons = document.querySelectorAll("[data-easy-level-puzzle-container] [data-number-button]");

    function assignBlock() {
        const cells = document.querySelectorAll("[data-easy-level-puzzle] > div");
        cells.forEach((eachCell) => {
            const row = eachCell.getAttribute('data-row');
            const column = eachCell.getAttribute('data-column');

            if (row <= 2 && column <= 2) {
                eachCell.setAttribute("data-block", 1);
            } else if (row <= 2 && column > 2) {
                eachCell.setAttribute("data-block", 2);
            } else if (row > 2 && column <= 2) {
                eachCell.setAttribute("data-block", 3);
            } else if (row > 2 && column > 2) {
                eachCell.setAttribute("data-block", 4);
            }
        });
    }

    function setDefaultValues() {
        let cells = puzzle.querySelectorAll("div");
        let arrayFromCells = [...cells];
        const arrOfDefaultValues = [2, 1, 2, 3, 1];

        cells.item(0).innerHTML = arrOfDefaultValues[0];
        cells.item(5).innerHTML = arrOfDefaultValues[1];
        cells.item(10).innerHTML = arrOfDefaultValues[2];
        cells.item(12).innerHTML = arrOfDefaultValues[3];
        cells.item(15).innerHTML = arrOfDefaultValues[4];

        let filteredCells = arrayFromCells.filter(function (element) {
            return element.innerHTML != "";
        });

        filteredCells.forEach((eachCell) => {
            eachCell.setAttribute("data-default-value", "");
        });
    }

    function PutBorderBetweenBlocks() {
        const cells = document.querySelectorAll("[data-easy-level-puzzle] > div");

        cells[1].classList.add("border-right");
        cells[4].classList.add("border-bottom");
        cells[5].classList.add("border-right");
        cells[5].classList.add("border-bottom");
        cells[9].classList.add("border-right");
        cells[6].classList.add("border-bottom");
        cells[7].classList.add("border-bottom");
        cells[13].classList.add("border-right");
    }

    setupCells(puzzle, 16);
    assignBlock();
    setDefaultValues();
    PutBorderBetweenBlocks();
    getInput(numberButtons, puzzle);
}
handleEasyLevelPuzzle();

function handleMediumLevelPuzzle() {
    const puzzle = document.querySelector("[data-medium-level-puzzle]");
    const numberButtons = document.querySelectorAll("[data-medium-level-puzzle-container] [data-number-button]");

    function assignBlock() {
        const cells = document.querySelectorAll("[data-medium-level-puzzle] > div");
        cells.forEach((eachCell) => {
            const row = eachCell.getAttribute('data-row');
            const column = eachCell.getAttribute('data-column');

            if (row <= 2 && column <= 3) {
                eachCell.setAttribute("data-block", 1);
            } else if (row <= 2 && column > 3) {
                eachCell.setAttribute("data-block", 2);
            } else if ((row > 2 && row <= 4) && column <= 3) {
                eachCell.setAttribute("data-block", 3);
            } else if ((row > 2 && row <= 4) && column > 3) {
                eachCell.setAttribute("data-block", 4);
            } else if ((row > 4) && column <= 3) {
                eachCell.setAttribute("data-block", 5);
            } else if ((row > 4) && column > 3) {
                eachCell.setAttribute("data-block", 6);
            }
        });
    }

    function setDefaultValues() {
        let cells = puzzle.querySelectorAll("div");
        let arrayFromCells = [...cells];
        const arrOfDefaultValues = [1, 6, 2, 5, 6, 4, 2, 3, 2, 6, 3];

        cells.item(4).innerHTML = arrOfDefaultValues[0];
        cells.item(5).innerHTML = arrOfDefaultValues[1];
        cells.item(6).innerHTML = arrOfDefaultValues[2];
        cells.item(13).innerHTML = arrOfDefaultValues[3];
        cells.item(19).innerHTML = arrOfDefaultValues[4];
        cells.item(20).innerHTML = arrOfDefaultValues[5];
        cells.item(22).innerHTML = arrOfDefaultValues[6];
        cells.item(23).innerHTML = arrOfDefaultValues[7];
        cells.item(25).innerHTML = arrOfDefaultValues[8];
        cells.item(27).innerHTML = arrOfDefaultValues[9];
        cells.item(32).innerHTML = arrOfDefaultValues[10];

        let filteredCells = arrayFromCells.filter(function (element) {
            return element.innerHTML != "";
        });

        filteredCells.forEach((eachCell) => {
            eachCell.setAttribute("data-default-value", "");
        });
    }

    function PutBorderBetweenBlocks() {
        const cells = document.querySelectorAll("[data-medium-level-puzzle] > div");

        cells[2].classList.add("border-right");
        cells[6].classList.add("border-bottom");
        cells[7].classList.add("border-bottom");
        cells[8].classList.add("border-bottom");
        cells[8].classList.add("border-right");
        cells[9].classList.add("border-bottom");
        cells[10].classList.add("border-bottom");
        cells[11].classList.add("border-bottom");
        cells[14].classList.add("border-right");
        cells[18].classList.add("border-bottom");
        cells[19].classList.add("border-bottom");
        cells[20].classList.add("border-bottom");
        cells[20].classList.add("border-right");
        cells[21].classList.add("border-bottom");
        cells[22].classList.add("border-bottom");
        cells[23].classList.add("border-bottom");
        cells[26].classList.add("border-right");
        cells[32].classList.add("border-right");
    }

    setupCells(puzzle, 36);
    assignBlock();
    setDefaultValues();
    PutBorderBetweenBlocks();
    getInput(numberButtons, puzzle);
}
handleMediumLevelPuzzle();

function handleHardLevelPuzzle() {
    const puzzle = document.querySelector("[data-hard-level-puzzle]");
    const numberButtons = document.querySelectorAll("[data-hard-level-puzzle-container] [data-number-button]");

    function assignBlock() {
        const cells = document.querySelectorAll("[data-hard-level-puzzle] > div");
        cells.forEach((eachCell) => {
            const row = eachCell.getAttribute('data-row');
            const column = eachCell.getAttribute('data-column');

            if (row <= 3 && column <= 3) {
                eachCell.setAttribute("data-block", 1);
            } else if (row <= 3 && (column > 3 && column <= 6)) {
                eachCell.setAttribute("data-block", 2);
            } else if (row <= 3 && column > 6) {
                eachCell.setAttribute("data-block", 3);
            } else if ((row > 3 && row <= 6) && column <= 3) {
                eachCell.setAttribute("data-block", 4);
            } else if ((row > 3 && row <= 6) && (column > 3 && column <= 6)) {
                eachCell.setAttribute("data-block", 5);
            } else if ((row > 3 && row <= 6) && column > 6) {
                eachCell.setAttribute("data-block", 6);
            } else if ((row > 6) && column <= 3) {
                eachCell.setAttribute("data-block", 7);
            } else if ((row > 6) && (column > 3 && column <= 6)) {
                eachCell.setAttribute("data-block", 8);
            } else if ((row > 6) && column > 6) {
                eachCell.setAttribute("data-block", 9);
            }
        });
    }

    function setDefaultValues() {
        let cells = puzzle.querySelectorAll("div");
        let arrayFromCells = [...cells];
        const arrOfDefaultValues = [9, 8, 4, 1, 9, 6, 3, 5, 4, 2, 8, 5, 3, 4, 7, 2, 8, 3, 1, 6, 9, 5, 8, 7, 1, 3];

        cells.item(1).innerHTML = arrOfDefaultValues[0];
        cells.item(6).innerHTML = arrOfDefaultValues[1];
        cells.item(8).innerHTML = arrOfDefaultValues[2];
        cells.item(10).innerHTML = arrOfDefaultValues[3];
        cells.item(13).innerHTML = arrOfDefaultValues[4];
        cells.item(18).innerHTML = arrOfDefaultValues[5];
        cells.item(20).innerHTML = arrOfDefaultValues[6];
        cells.item(29).innerHTML = arrOfDefaultValues[7];
        cells.item(34).innerHTML = arrOfDefaultValues[8];
        cells.item(36).innerHTML = arrOfDefaultValues[9];
        cells.item(40).innerHTML = arrOfDefaultValues[10];
        cells.item(42).innerHTML = arrOfDefaultValues[11];
        cells.item(44).innerHTML = arrOfDefaultValues[12];
        cells.item(45).innerHTML = arrOfDefaultValues[13];
        cells.item(47).innerHTML = arrOfDefaultValues[14];
        cells.item(51).innerHTML = arrOfDefaultValues[15];
        cells.item(57).innerHTML = arrOfDefaultValues[16];
        cells.item(59).innerHTML = arrOfDefaultValues[17];
        cells.item(61).innerHTML = arrOfDefaultValues[18];
        cells.item(66).innerHTML = arrOfDefaultValues[19];
        cells.item(69).innerHTML = arrOfDefaultValues[20];
        cells.item(70).innerHTML = arrOfDefaultValues[21];
        cells.item(72).innerHTML = arrOfDefaultValues[22];
        cells.item(73).innerHTML = arrOfDefaultValues[23];
        cells.item(77).innerHTML = arrOfDefaultValues[24];
        cells.item(78).innerHTML = arrOfDefaultValues[25];

        let filteredCells = arrayFromCells.filter(function (element) {
            return element.innerHTML != "";
        });

        filteredCells.forEach((eachCell) => {
            eachCell.setAttribute("data-default-value", "");
        });
    }

    function PutBorderBetweenBlocks() {
        const cells = document.querySelectorAll("[data-hard-level-puzzle] > div");

        cells[2].classList.add("border-right");
        cells[5].classList.add("border-right");
        cells[11].classList.add("border-right");
        cells[14].classList.add("border-right");
        cells[18].classList.add("border-bottom");
        cells[19].classList.add("border-bottom");
        cells[20].classList.add("border-bottom");
        cells[20].classList.add("border-right");
        cells[21].classList.add("border-bottom");
        cells[22].classList.add("border-bottom");
        cells[23].classList.add("border-bottom");
        cells[23].classList.add("border-right");
        cells[24].classList.add("border-bottom");
        cells[25].classList.add("border-bottom");
        cells[26].classList.add("border-bottom");
        cells[29].classList.add("border-right");
        cells[32].classList.add("border-right");
        cells[38].classList.add("border-right");
        cells[41].classList.add("border-right");
        cells[45].classList.add("border-bottom");
        cells[46].classList.add("border-bottom");
        cells[47].classList.add("border-bottom");
        cells[47].classList.add("border-right");
        cells[48].classList.add("border-bottom");
        cells[49].classList.add("border-bottom");
        cells[50].classList.add("border-bottom");
        cells[50].classList.add("border-right");
        cells[51].classList.add("border-bottom");
        cells[52].classList.add("border-bottom");
        cells[53].classList.add("border-bottom");
        cells[56].classList.add("border-right");
        cells[59].classList.add("border-right");
        cells[65].classList.add("border-right");
        cells[68].classList.add("border-right");
        cells[74].classList.add("border-right");
        cells[77].classList.add("border-right");
    }

    setupCells(puzzle, 81);
    assignBlock();
    setDefaultValues();
    PutBorderBetweenBlocks();
    getInput(numberButtons, puzzle);
}
handleHardLevelPuzzle();

function clearAllInputtedValues() {
    const restartButtons = document.querySelectorAll("[data-restart-puzzle-button]");
    const puzzle = document.querySelectorAll("[data-puzzle]");
    let interactiveCells;
    let allCells;

    restartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            interactiveCells = puzzle[index].querySelectorAll("[data-puzzle] > div:not([data-default-value])");
            allCells = puzzle[index].querySelectorAll("[data-puzzle] > div");

            interactiveCells.forEach((eachCell) => {
                eachCell.innerHTML = "";
            });
            allCells.forEach((eachCell) => {
                eachCell.classList.remove("cell-is-in-wrong-row");
                eachCell.classList.remove("cell-is-in-wrong-column");
                eachCell.classList.remove("cell-is-in-wrong-block");
            });
        });
    });
}
clearAllInputtedValues();

function addBgColourToFocusedCellAndItsEnvironment() {
    const cells = document.querySelectorAll("[data-puzzle] > div");
    let focusedCell;
    let row;
    let column;
    let block;
    let focusedCellsSiblings;
    let focusedCellsEnvironment;

    cells.forEach((cell => {
        cell.addEventListener("focus", function (event) {
            focusedCell = event.target;
            row = focusedCell.getAttribute('data-row');
            column = focusedCell.getAttribute('data-column');
            block = focusedCell.getAttribute('data-block');
            focusedCellsSiblings = focusedCell.parentNode.children;

            focusedCellsEnvironment = Array.from(focusedCellsSiblings).filter(function (child) {
                return (
                    (child !== focusedCell && child.getAttribute('data-row') === row) ||
                    (child !== focusedCell && child.getAttribute('data-column') === column) ||
                    (child !== focusedCell && child.getAttribute('data-block') === block)
                );
            });
            focusedCellsEnvironment.forEach((cell) => {
                cell.classList.add("focused-cells-environment");
            });
        });

        cell.addEventListener("blur", () => {
            focusedCellsEnvironment.forEach((cell) => {
                cell.classList.remove("focused-cells-environment");
            });
        });
    }));
}
addBgColourToFocusedCellAndItsEnvironment();