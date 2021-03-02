const gameboard = (function() {
    let gameboard = {
        row1: [],
        row2: [],
        row3: []
    };

    function resetGameBoard() {
        gameboard.row1 = [];
        gameboard.row2 = [];
        gameboard.row3 = [];
    }

    function updateSquare(row, square, value) {
        gameboard[row][square] = value;
    }

    return {
        gameboard: gameboard,
        reset: resetGameBoard,
        update: updateSquare,        
    }
})();

const gameControls = (function() {
    const playAgainBtn = document.querySelector('#playAgainBtn');
    const quitBtn = document.querySelector('#quitBtn');
    const submitBtn = document.querySelector('#submitBtn');

    let currentPlayer;
    let player1;
    let player2;

    function clearSquaresDisplay() {
        const gameSquare = document.querySelectorAll('.gameSquare');

        gameSquare.forEach((square) => {
            square.innerHTML = '';
        })
    }

    function gameButtonsDisplay(boolean) {
        const gameButtons =  document.querySelector('#gameButtons');
    
        boolean ? gameButtons.classList.remove('displayRemove') : gameButtons.classList.add('displayRemove');
    }

    function gameSquareEventListener() {
        const gameSquare = document.querySelectorAll('.gameSquare');

        gameSquare.forEach((square) => {
            square.addEventListener('click', (e) => {
                updateSquareDisplay(square);
                gameboard.update(e.target.dataset.row, e.target.dataset.square, square.innerHTML); 
            })
        })
    }

    function playerInputDisplay(boolean) {
        const playerInput = document.querySelector('#playerInput');

        boolean ? playerInput.classList.remove('displayRemove') : playerInput.classList.add('displayRemove');
    }

    function setPlayers() {
        player1 = players.returnPlayer('player1');
        player2 = players.returnPlayer('player2');
    }

    function updateSquareDisplay(square) {
        square.innerHTML = currentPlayer.gamePiece;
        whosNext(currentPlayer);    
    }

    function whosNext(current) {
        if (current == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    playAgainBtn.addEventListener('click', () => {
        gameboard.reset();
        clearSquaresDisplay();
    })

    quitBtn.addEventListener('click', () => {
        gameboard.reset();
        clearSquaresDisplay();
    })

    submitBtn.addEventListener('click', () => {
        players.createPlayers();
        setPlayers();
        currentPlayer = player1;
        gameSquareEventListener();
        playerInputDisplay(false);
        gameButtonsDisplay(true);
    })

    gameButtonsDisplay(false);
    
    return {
        
    }
})();

const players = (function() {
    const Player = (name, gamePiece, score) => {
        return {name, gamePiece, score}
    };

    let player1;
    let player2;

    function createPlayers() {

        const playerOneValue = document.querySelector('#playerOne').value;
        const playerTwoValue = document.querySelector('#playerTwo').value;
        
        player1 = Player(playerOneValue, 'X', 0);
        player2 = Player(playerTwoValue, 'O', 0);
    }

    function returnPlayer(player) {
        if (player == 'player1') {
            return player1;
        } else if (player == 'player2') {
            return player2;
        }
    }

    function returnPlayerScore(player) {
        if (player == 'player1') {
            return player1.score;
        } else if (player == 'player2') {
            return player2.score;
        }
    }

    function updateScore(player) {
        if (player == 'player1') {
            player1.score += 1;
        } else if (player == 'player2') {
            player2.score += 1;
        }
    }

    return {
        createPlayers: createPlayers,
        playerScore: returnPlayerScore,
        returnPlayer: returnPlayer,
        updateScore: updateScore,
    }
})()