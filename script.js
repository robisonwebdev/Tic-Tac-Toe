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

    function gameSquareEventListener() {
        const gameSquare = document.querySelectorAll('.gameSquare');

        gameSquare.forEach((square) => {
            square.addEventListener('click', (e) => {
                updateSquareDisplay(square);
                gameboard.updateSquare(e.target.dataset.row, e.target.dataset.square, square.innerHTML); 
            })
        })
    }

    function playerInputDisplay(boolean) {
        const playerInput = document.querySelector('#playerInput');

        boolean ? playerInput.classList.remove('displayRemove') : playerInput.classList.add('displayRemove');
    }

    submitBtn.addEventListener('click', () => {
        players.createPlayers();
        currentPlayer = player1;
        gameSquareEventListener();
        playerInputDisplay(false);
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