const Player = (name, gamePiece) => {
    return {name, gamePiece};
};

let player1;
let player2;

const players = (function() {
    function createPlayers() {
        const playerOneValue = document.querySelector('#playerOne').value;
        const playerTwoValue = document.querySelector('#playerTwo').value;
        
        player1 = Player(playerOneValue, 'X');
        player2 = Player(playerTwoValue, 'O');
    }

    return {
        createPlayers: createPlayers,
    }
})()

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
    let currentPlayer;

    function whosNext(current) {
        if (current == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function updateSquareDisplay(square) {
        square.innerHTML = currentPlayer['gamePiece'];
        whosNext(currentPlayer);    
    }


    gameSquare.forEach((square) => {
        square.addEventListener('click', (e) => {
            updateSquareDisplay(square);
            gameboard.updateSquare(e.target.dataset.row, e.target.dataset.square, tempVar); 
        })
    })

    submitBtn.addEventListener('click', () => {
        players.createPlayers();
        currentPlayer = player1;
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