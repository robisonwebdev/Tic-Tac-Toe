const gameboard = (function() {
    let gameboard = {
        row1: [,,],
        row2: [,,],
        row3: [,,]
    };

    function resetGameBoard() {
        gameboard.row1 = [,,];
        gameboard.row2 = [,,];
        gameboard.row3 = [,,];
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

    let gameSquareFunctions = function(e) {
        updateSquareDisplay(e.target);
        gameboard.update(e.target.dataset.row, e.target.dataset.square, e.target.innerHTML);
        determineWinner();
    }

    function clearDisplayWinner() {
        const winnerText = document.querySelector('#winnerText');

        winnerText.innerHTML = '';
    }

    function clearPlayerInputs() {
        const playerOneInput = document.querySelector('#playerOne');
        const playerTwoInput = document.querySelector('#playerTwo');

        playerOneInput.value = '';
        playerTwoInput.value = '';
    }

    function clearSquaresDisplay() {
        const gameSquare = document.querySelectorAll('.gameSquare');

        gameSquare.forEach((square) => {
            square.innerHTML = '';
        })
    }

    function determineWinner() {
        let r1s0 = gameboard.gameboard.row1[0]
        let r1s1 = gameboard.gameboard.row1[1]
        let r1s2 = gameboard.gameboard.row1[2]

        let r2s0 = gameboard.gameboard.row2[0]
        let r2s1 = gameboard.gameboard.row2[1]
        let r2s2 = gameboard.gameboard.row2[2]

        let r3s0 = gameboard.gameboard.row3[0]
        let r3s1 = gameboard.gameboard.row3[1]
        let r3s2 = gameboard.gameboard.row3[2]


        if (r1s0 == 'X' && r2s0 == 'X' && r3s0 == 'X' || r1s0 == 'O' && r2s0 == 'O' && r3s0 == 'O') {
            (r1s0 == 'X') ? winner('player1') : winner('player2') ;
        } else if (r1s1 == 'X' && r2s1 == 'X' && r3s1 == 'X' || r1s1 == 'O' && r2s1 == 'O' && r3s1 == 'O') {
            (r1s1 == 'X') ? winner('player1') : winner('player2') ;
        } else if (r1s2 == 'X' && r2s2 == 'X' && r3s2 == 'X' || r1s2 == 'O' && r2s2 == 'O' && r3s2 == 'O') {
            (r1s2 == 'X') ? winner('player1') : winner('player2') ;
        } else if (r1s0 == 'X' && r1s1 == 'X' && r1s2 == 'X' || r1s0 == 'O' && r1s1 == 'O' && r1s2 == 'O') {
            (r1s0 == 'X') ? winner('player1') : winner('player2') ;
        } else if (r2s0 == 'X' && r2s1 == 'X' && r2s2 == 'X' || r2s0 == 'O' && r2s1 == 'O' && r2s2 == 'O') {
            (r2s0 == 'X') ? winner('player1') : winner('player2') ;
        } else if (r3s0 == 'X' && r3s1 == 'X' && r3s2 == 'X' || r3s0 == 'O' && r3s1 == 'O' && r3s2 == 'O') {
            (r3s0 == 'X') ? winner('player1') : winner('player2') ;
        } else if (r1s0 == 'X' && r2s1 == 'X' && r3s2 == 'X' || r1s0 == 'O' && r2s1 == 'O' && r3s2 == 'O') {
            (r1s0 == 'X') ? winner('player1') : winner('player2') ;
        } else if (r1s2 == 'X' && r2s1 == 'X' && r3s0 == 'X' || r1s2 == 'O' && r2s1 == 'O' && r3s0 == 'O') {
            (r1s2 == 'X') ? winner('player1') : winner('player2') ;
        }
    }

    function displayWinner(player) {    
        const winnerText = document.querySelector('#winnerText');

        winnerText.innerHTML = `${players.returnPlayer(player).name} Wins!`;
    }

    function gameButtonsDisplay(boolean) {
        const gameButtons =  document.querySelector('#gameButtons');
    
        boolean ? gameButtons.classList.remove('displayRemove') : gameButtons.classList.add('displayRemove');
    }

    function gameSquareEventListener(val) {
        const gameSquare = document.querySelectorAll('.gameSquare');

        gameSquare.forEach((square) => {
            if (val) {
                square.addEventListener('click', gameSquareFunctions)
            } else if (!val) {
                square.removeEventListener('click', gameSquareFunctions)
            }
        })
    }

    function playAgain() {
        gameboard.reset();
 
        clearDisplayWinner();
        clearSquaresDisplay();

        gameSquareEventListener(true);
    }

    function playerInputDisplay(boolean) {
        const playerInput = document.querySelector('#playerInput');

        boolean ? playerInput.classList.remove('displayRemove') : playerInput.classList.add('displayRemove');
    }

    function quitGame() {
        players.delete();
        gameboard.reset();        

        clearDisplayWinner();
        clearPlayerInputs();
        clearSquaresDisplay();

        gameButtonsDisplay(false);
        gameSquareEventListener(false);
        playerInputDisplay(true);
        updateScoreDisplay('clear');
    }

    function setPlayers() {
        player1 = players.returnPlayer('player1');
        player2 = players.returnPlayer('player2');
    }

    function startGame() {
        players.create();

        setPlayers();
        currentPlayer = player1;

        gameSquareEventListener(true);
        playerInputDisplay(false);
        gameButtonsDisplay(true);
    }

    function updatePlayerScore(player) {
        players.updateScore(player);
    }

    function updateScoreDisplay(player) {
        const player1Score = document.querySelector('#player1Score');
        const player2Score = document.querySelector('#player2Score');

        if (player == 'player1') {
            player1Score.innerHTML = players.playerScore('player1');
        } else if (player == 'player2') {
            player2Score.innerHTML = players.playerScore('player2');
        } else if (player == 'clear') {
            player1Score.innerHTML = '0';
            player2Score.innerHTML = '0';
        }
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

    function winner(player) {
        updatePlayerScore(player);
        updateScoreDisplay(player);
        displayWinner(player);
        gameSquareEventListener(false)
    }

    playAgainBtn.addEventListener('click', () => {
        playAgain();
    })

    quitBtn.addEventListener('click', () => {
        quitGame();
    })

    submitBtn.addEventListener('click', () => {
        startGame();
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

    function deletePlayers() {
        player1 = undefined;
        player2 = undefined;
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
        create: createPlayers,
        delete: deletePlayers,
        playerScore: returnPlayerScore,
        returnPlayer: returnPlayer,
        updateScore: updateScore,
    }
})()