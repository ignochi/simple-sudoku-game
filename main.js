"use strict";

function setTabindexTo0(CSSProperty, index) {
    const pages = document.querySelectorAll(`[${CSSProperty}]`);
    const focusableElements = pages[index].querySelectorAll('button[tabindex="-1"], [tabindex="-1"]');

    focusableElements.forEach((eachFocusableElement) => {
        eachFocusableElement.tabIndex = 0;
    });
    // console.log(focusableElements);
}

function setTabindexToMinus1(CSSProperty, index) {
    const pages = document.querySelectorAll(`[${CSSProperty}]`);
    const focusableElements = pages[index].querySelectorAll('button, [tabindex]');

    focusableElements.forEach((eachFocusableElement) => {
        eachFocusableElement.tabIndex = -1;
    });
    // console.log(pages, focusableElements);
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

// function checkFocus() {
//     document.addEventListener('focusin', function (event) {
//         const focusedElement = event.target;
//         if (focusedElement.tagName === 'BUTTON') {
//           console.log('Focused button:', focusedElement.classList[0]);
//         }
//       });
// }
// checkFocus();

function goToMenuPage() {
    function fromHomePage() {
        const page = document.querySelector("[data-home-and-menu-page-container]");
        // const pageCSSProperty = "data-home-and-menu-page-container";
        const newPageCSSProperty = "data-menu-page";
        const previousPageCSSProperty = "data-home-page";
        const button = document.querySelector("[data-go-to-menu-page-button]");

        button.addEventListener("click", () => {
            page.style.translate = "-100vw";
            setTabindexTo0(newPageCSSProperty, 0);
            setTabindexToMinus1(previousPageCSSProperty, 0);
            // console.log(button.tabIndex);
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
                // console.log(pages.item(index));
                setTabindexTo0(newPageCSSProperty, 0);
                setTabindexToMinus1(previousPageCSSProperty, index);
            });
        });
    }
    fromMenuItemPage();
}
goToMenuPage();

function goToHomePage() {
    const page = document.querySelector("[data-home-and-menu-page-container]");
    const previousPageCSSProperty = "data-menu-page";
    const newPageCSSProperty = "data-home-page";
    const button = document.querySelector("[data-go-to-home-page-button]");
    button.addEventListener("click", () => {
        page.style.translate = "0vw";
        setTabindexTo0(newPageCSSProperty, 0);
        setTabindexToMinus1(previousPageCSSProperty, 0);
        // console.log(button.tabIndex);
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

function handleThePuzzle() {
    function handlePuzzleAspectRatio() {
        // I created this function as a replacement for the css aspect-ratio
        // proerty, because it doesn't have very good browser support.

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

    function handlePuzzleInput() {
        // handleNumberButtonsKeyPress
        const numberButtons = document.querySelectorAll("[data-number-button]");
        const puzzleAttribute = "data-puzzle";
        const puzzleDefaultValue = "data-default-value";
        let previouslyFocusedElement;
        let parent;
        let cells;

        function checkIfInputIsUnique() {
            // 1. get all the children of parent
            function checkAcrossTheRow() {
                // 2. get all the children of parent that have the same value for the data-row attribute
                // as the previouslyFocusedElement

                // ******* const cellsRow = previouslyFocusedElement.dataset.row;

                // 3. loop through them, if the value of the previouslyFocusedElement occurs twice,
                // mark the previouslyFocusedElement as wrong
            }

            function checkAlongTheColumn() {
                // 2. get all the children of parent that have the same value for the data-column attribute 
                // as the previouslyFocusedElement
                // 3. loop through them, if the value of the previously focused element occurs twice,
                // mark the previouslyFocusedElement as wrong
            }

            function checkthroughTheBlock() {
                // 2. get all the children of parent that have the same value for the data-block attribute 
                // as the previouslyFocusedElement
                // 3. loop through them, if the value of the previously focused element occurs twice,
                // mark the previouslyFocusedElement as wrong
            }

            // checkAcrossTheRow();
            // checkAlongTheColumn();
            // checkthroughTheBlock();
        }

        function checkIfInputIsOutOfRange(largestPossibleInput, input) {
            if (input > 0 && input <= largestPossibleInput) {
                previouslyFocusedElement.innerHTML = input;
                checkIfInputIsUnique();
            } else {
                alert("Invalid Input");
            }
        }

        document.addEventListener('blur', function (event) {
            previouslyFocusedElement = event.target;
            parent = previouslyFocusedElement.parentNode;
        }, true);

        numberButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (
                    // check if the parent of the previously focused element is the puzzle
                    parent.hasAttribute(puzzleAttribute) &&
                    !(previouslyFocusedElement.hasAttribute(puzzleDefaultValue))
                ) {
                    // check if the value can be entered
                    cells = parent.querySelectorAll("[data-cell]");
                    const numberOfCells = cells.length;
                    const largestPossibleInput = Math.sqrt(numberOfCells);
                    // console.log(cells, numberOfCells, largestPossibleInput);
                    checkIfInputIsOutOfRange(largestPossibleInput, button.innerHTML);
                }
            });
        })
    }
    // handlePuzzleInput();

    function clearAllEnteredValues() {
        const restartButtons = document.querySelectorAll("[data-restart-puzzle-button]");
        const puzzle = document.querySelectorAll("[data-puzzle]");
        let interactiveCells;

        restartButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                interactiveCells = puzzle[index].querySelectorAll("[data-puzzle] > div:not([data-default-value])");

                interactiveCells.forEach((eachCell) => {
                    eachCell.innerHTML = "";
                });
                // console.log(interactiveCells);
            });
        });
    }
    clearAllEnteredValues();
}
// handleThePuzzle();

function handlePuzzleAspectRatio() {
    // I created this function as a replacement for the css aspect-ratio
    // proerty, because it doesn't have very good browser support.

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
    // const puzzle = document.querySelector("[data-puzzle]");
    const cells = puzzle.children;
    let cell;
    function createCell() {
        for (let i = 0; i < totalNoOfCells; i++) {
            cell = document.createElement("div");
            puzzle.appendChild(cell);
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

function handlePuzzleInput() {
    // handleNumberButtonsKeyPress
    const numberButtons = document.querySelectorAll("[data-number-button]");
    const puzzleAttribute = "data-puzzle";
    const puzzleDefaultValue = "data-default-value";
    let previouslyFocusedElement;
    let parent;
    let cells;

    function checkIfInputIsUnique() {
        // 1. get all the children of parent
        function checkAcrossTheRow() {
            // 2. get all the children of parent that have the same value for the data-row attribute
            // as the previouslyFocusedElement

            const cellsRow = previouslyFocusedElement.dataset.row;
            let arrayFromCells = [...cells];
            let filteredCells = arrayFromCells.filter(function (element) {
                // return element.hasAttribute('data-row');
                return element.getAttribute('data-row') === cellsRow;
            });
            // console.log(filteredCells[0].innerHTML);

            // 3. loop through them, if the value of the previouslyFocusedElement occurs twice,
            // mark the previouslyFocusedElement as wrong
            filteredCells.forEach((eachCell) => {
                if (
                    eachCell.innerHTML === previouslyFocusedElement.innerHTML &&
                    eachCell !== previouslyFocusedElement
                ) {
                    console.log(eachCell === previouslyFocusedElement);
                    alert("occurs multiple times");
                }
            });
        }

        // function checkAlongTheColumn() {
        // 2. get all the children of parent that have the same value for the data-column attribute 
        // as the previouslyFocusedElement
        // 3. loop through them, if the value of the previously focused element occurs twice,
        // mark the previouslyFocusedElement as wrong
        // }

        // function checkthroughTheBlock() {
        // 2. get all the children of parent that have the same value for the data-block attribute 
        // as the previouslyFocusedElement
        // 3. loop through them, if the value of the previously focused element occurs twice,
        // mark the previouslyFocusedElement as wrong
        // }
        checkAcrossTheRow();
        // checkAlongTheColumn();
        // checkthroughTheBlock();
    }

    function checkIfInputIsOutOfRange(largestPossibleInput, input) {
        if (input > 0 && input <= largestPossibleInput) {
            previouslyFocusedElement.innerHTML = input;
            checkIfInputIsUnique();
        } else {
            alert("Invalid Input");
        }
    }

    function getInput() {
        document.addEventListener('blur', function (event) {
            previouslyFocusedElement = event.target;
            parent = previouslyFocusedElement.parentNode;
        }, true);

        numberButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (
                    // check if the parent of the previously focused element is the puzzle
                    parent.hasAttribute(puzzleAttribute) &&
                    !(previouslyFocusedElement.hasAttribute(puzzleDefaultValue))
                ) {
                    // check if the value can be entered
                    cells = parent.querySelectorAll("div");
                    const numberOfCells = cells.length;
                    const largestPossibleInput = Math.sqrt(numberOfCells);
                    // console.log(cells, numberOfCells, largestPossibleInput);
                    checkIfInputIsOutOfRange(largestPossibleInput, button.innerHTML);
                }
            });
        })
    }
    getInput();
}
handlePuzzleInput();

function clearAllInputtedValues() {
    const restartButtons = document.querySelectorAll("[data-restart-puzzle-button]");
    const puzzle = document.querySelectorAll("[data-puzzle]");
    let interactiveCells;

    restartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            interactiveCells = puzzle[index].querySelectorAll("[data-puzzle] > div:not([data-default-value])");

            interactiveCells.forEach((eachCell) => {
                eachCell.innerHTML = "";
            });
        });
    });
}
clearAllInputtedValues();

function handleEasyLevelPuzzle() {
    const puzzle = document.querySelector("[data-easy-level-puzzle]");
    setupCells(puzzle, 16);
}
handleEasyLevelPuzzle();

function handleMediumLevelPuzzle() {
    const puzzle = document.querySelector("[data-medium-level-puzzle]");
    setupCells(puzzle, 36);
}
handleMediumLevelPuzzle();

function handleHardLevelPuzzle() {
    const puzzle = document.querySelector("[data-hard-level-puzzle]");
    setupCells(puzzle, 81);
}
handleHardLevelPuzzle();