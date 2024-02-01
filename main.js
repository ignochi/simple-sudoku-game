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

function handleEasyLevelPuzzle() {
    const puzzle = document.querySelector("[data-easy-level-puzzle]");

    function assignBlock() {
        const cells = document.querySelectorAll("[data-easy-level-puzzle] > div");
        cells.forEach((eachCell) => {
            const row = eachCell.getAttribute('data-row');
            const column = eachCell.getAttribute('data-column');

            if (row <= 2 && column <= 2) {
                eachCell.style.backgroundColor = "red";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 1);
            } else if (row <= 2 && column > 2) {
                eachCell.style.backgroundColor = "yellow";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 2);
            } else if (row > 2 && column <= 2) {
                eachCell.style.backgroundColor = "orange";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 3);
            } else if (row > 2 && column > 2) {
                eachCell.style.backgroundColor = "cyan";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 4);
            }
        });
    }

    setupCells(puzzle, 16);
    assignBlock();

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
            // return element.hasAttribute('data-row');
            return element.innerHTML != "";
        });

        filteredCells.forEach((eachCell)=> {
            eachCell.setAttribute("data-default-value", "");
        });
        // console.log(filteredCells);
    }
    setDefaultValues();
}
handleEasyLevelPuzzle();

function handleMediumLevelPuzzle() {
    const puzzle = document.querySelector("[data-medium-level-puzzle]");

    function assignBlock() {
        const cells = document.querySelectorAll("[data-medium-level-puzzle] > div");
        cells.forEach((eachCell) => {
            const row = eachCell.getAttribute('data-row');
            const column = eachCell.getAttribute('data-column');

            if (row <= 2 && column <= 3) {
                eachCell.style.backgroundColor = "red";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 1);
            } else if (row <= 2 && column > 3) {
                eachCell.style.backgroundColor = "yellow";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 2);
            } else if ((row > 2 && row <= 4) && column <= 3) {
                eachCell.style.backgroundColor = "orange";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 3);
            } else if ((row > 2 && row <= 4) && column > 3) {
                eachCell.style.backgroundColor = "cyan";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 4);
            } else if ((row > 4) && column <= 3) {
                eachCell.style.backgroundColor = "purple";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 5);
            } else if ((row > 4) && column > 3) {
                eachCell.style.backgroundColor = "white";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 6);
            }
        });
    }

    setupCells(puzzle, 36);
    assignBlock();

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
            // return element.hasAttribute('data-row');
            return element.innerHTML != "";
        });

        filteredCells.forEach((eachCell)=> {
            eachCell.setAttribute("data-default-value", "");
        });
        // console.log(filteredCells);
    }
    setDefaultValues();
}
handleMediumLevelPuzzle();

function handleHardLevelPuzzle() {
    const puzzle = document.querySelector("[data-hard-level-puzzle]");

    function assignBlock() {
        const cells = document.querySelectorAll("[data-hard-level-puzzle] > div");
        cells.forEach((eachCell) => {
            const row = eachCell.getAttribute('data-row');
            const column = eachCell.getAttribute('data-column');

            if (row <= 3 && column <= 3) {
                eachCell.style.backgroundColor = "red";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 1);
            } else if (row <= 3 && (column > 3 && column <= 6)) {
                eachCell.style.backgroundColor = "yellow";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 2);
            } else if (row <= 3 && column > 6) {
                eachCell.style.backgroundColor = "orange";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 3);
            } else if ((row > 3 && row <= 6) && column <= 3) {
                eachCell.style.backgroundColor = "cyan";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 4);
            } else if ((row > 3 && row <= 6) && (column > 3 && column <= 6)) {
                eachCell.style.backgroundColor = "purple";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 5);
            } else if ((row > 3 && row <= 6) && column > 6) {
                eachCell.style.backgroundColor = "white";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 6);
            } else if ((row > 6) && column <= 3) {
                eachCell.style.backgroundColor = "teal";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 7);
            } else if ((row > 6) && (column > 3 && column <= 6)) {
                eachCell.style.backgroundColor = "indigo";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 8);
            } else if ((row > 6) && column > 6) {
                eachCell.style.backgroundColor = "yellowgreen";
                // console.log(eachCell);
                eachCell.setAttribute("data-block", 9);
            }
        });
    }

    setupCells(puzzle, 81);
    assignBlock();

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
            // return element.hasAttribute('data-row');
            return element.innerHTML != "";
        });

        filteredCells.forEach((eachCell)=> {
            eachCell.setAttribute("data-default-value", "");
        });
        // console.log(filteredCells);
    }
    setDefaultValues();
}
handleHardLevelPuzzle();

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
                    alert("occurs multiple times across it's row");
                }
            });
        }

        function checkAlongTheColumn() {
            // 2. get all the children of parent that have the same value for the data-column attribute 
            // as the previouslyFocusedElement

            const cellsColumn = previouslyFocusedElement.dataset.column;
            let arrayFromCells = [...cells];
            let filteredCells = arrayFromCells.filter(function (element) {
                // return element.hasAttribute('data-row');
                return element.getAttribute('data-column') === cellsColumn;
            });
            // console.log(filteredCells[0].innerHTML);

            // 3. loop through them, if the value of the previously focused element occurs twice,
            // mark the previouslyFocusedElement as wrong
            filteredCells.forEach((eachCell) => {
                if (
                    eachCell.innerHTML === previouslyFocusedElement.innerHTML &&
                    eachCell !== previouslyFocusedElement
                ) {
                    alert("occurs multiple times along it's column");
                }
            });
        }

        function checkthroughTheBlock() {
            // 2. get all the children of parent that have the same value for the data-block attribute 
            // as the previouslyFocusedElement

            const cellsBlock = previouslyFocusedElement.dataset.block;
            let arrayFromCells = [...cells];
            let filteredCells = arrayFromCells.filter(function (element) {
                // return element.hasAttribute('data-row');
                return element.getAttribute('data-block') === cellsBlock;
            });
            // console.log(filteredCells[0].innerHTML);

            // 3. loop through them, if the value of the previously focused element occurs twice,
            // mark the previouslyFocusedElement as wrong
            filteredCells.forEach((eachCell) => {
                if (
                    eachCell.innerHTML === previouslyFocusedElement.innerHTML &&
                    eachCell !== previouslyFocusedElement
                ) {
                    alert("occurs multiple times along it's block");
                }
            });
        }
        checkAcrossTheRow();
        checkAlongTheColumn();
        checkthroughTheBlock();
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