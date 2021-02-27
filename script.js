const gameboard = (function() {
    let gameboardArray = [];

    const rowInfo = (square1, square2, square3) => {
        gameboardArray.push({ square1, square2, square3});
    }

    function getRow(rowNumber) {
        const square1 = document.querySelector(`#${rowNumber} .square1`).innerHTML;
        const square2 = document.querySelector(`#${rowNumber} .square2`).innerHTML;
        const square3 = document.querySelector(`#${rowNumber} .square3`).innerHTML;

        const row = rowInfo(square1, square2, square3);
    }

    return {
        gameboardArray: gameboardArray,
        getRow: getRow,
    }
})();