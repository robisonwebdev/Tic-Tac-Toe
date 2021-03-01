const Player = (name, gamePiece) => {
    return {name, gamePiece};
};

let player1;
let player2;

const gameboard = (function() {
    let gameboard = {
        row1: [],
        row2: [],
        row3: []
    };

    function updateSquare(row, square, value) {
        gameboard[row][square] = value;
    }

    return {
        updateSquare: updateSquare,
        gameboard: gameboard,
    }
})();

const gameControls = (function() {
    const gameSquare = document.querySelectorAll('.gameSquare');
    const submitBtn = document.querySelector('#submitBtn');

    let tempVar = 'X';

    function createPlayers() {
        const playerOneValue = document.querySelector('#playerOne').value;
        const playerTwoValue = document.querySelector('#playerTwo').value;
        
        player1 = Player(playerOneValue, 'X');
        player2 = Player(playerTwoValue, 'O');        
    }

    gameSquare.forEach((square) => {
        square.addEventListener('click', (e) => {

            if (tempVar == 'X') {
                tempVar = 'O';
            } else {
                tempVar = 'X';
            }

            gameboard.updateSquare(e.target.dataset.row, e.target.dataset.square, tempVar);
        })
    })

    submitBtn.addEventListener('click', () => {
        console.log('click');
        createPlayers();
    })

    return {
        
    }
})();

    




// Saved for later
// e.target.dataset.row



// let myArray = [
//     {
//         row1: 
//             {
//                 square1: 'X',
//                 square2: 'X',
//                 square3: 'O'
//             },
//         row2: 
//             {
//                 square1: 'O',
//                 square2: 'X',
//                 square3: 'O'
//             },
//         row3: 
//             {
//                 square1: 'X',
//                 square2: 'X',
//                 square3: 'X'
//             }
//     }
// ]