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
    let clickTracker = 0;
    let winnerTracker = false;



    let gameSquareFunctions = function(e) {
        updateSquareDisplay(e.target);
        gameboard.update(e.target.dataset.row, e.target.dataset.square, e.target.innerHTML);
        determineWinner();
        e.target.removeEventListener('click', gameSquareFunctions);
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

        clickTracker++;

        if (r1s0 == 'X' && r2s0 == 'X' && r3s0 == 'X' || r1s0 == 'O' && r2s0 == 'O' && r3s0 == 'O') {
            (r1s0 == 'X') ? (winner('player1'), winnerTracker = true) : (winner('player2'), winnerTracker = true) ;
        } else if (r1s1 == 'X' && r2s1 == 'X' && r3s1 == 'X' || r1s1 == 'O' && r2s1 == 'O' && r3s1 == 'O') {
            (r1s1 == 'X') ? (winner('player1'), winnerTracker = true) : (winner('player2'), winnerTracker = true) ;
        } else if (r1s2 == 'X' && r2s2 == 'X' && r3s2 == 'X' || r1s2 == 'O' && r2s2 == 'O' && r3s2 == 'O') {
            (r1s2 == 'X') ? (winner('player1'), winnerTracker = true) : (winner('player2'), winnerTracker = true) ;
        } else if (r1s0 == 'X' && r1s1 == 'X' && r1s2 == 'X' || r1s0 == 'O' && r1s1 == 'O' && r1s2 == 'O') {
            (r1s0 == 'X') ? (winner('player1'), winnerTracker = true) : (winner('player2'), winnerTracker = true) ;
        } else if (r2s0 == 'X' && r2s1 == 'X' && r2s2 == 'X' || r2s0 == 'O' && r2s1 == 'O' && r2s2 == 'O') {
            (r2s0 == 'X') ? (winner('player1'), winnerTracker = true) : (winner('player2'), winnerTracker = true) ;
        } else if (r3s0 == 'X' && r3s1 == 'X' && r3s2 == 'X' || r3s0 == 'O' && r3s1 == 'O' && r3s2 == 'O') {
            (r3s0 == 'X') ? (winner('player1'), winnerTracker = true) : (winner('player2'), winnerTracker = true) ;
        } else if (r1s0 == 'X' && r2s1 == 'X' && r3s2 == 'X' || r1s0 == 'O' && r2s1 == 'O' && r3s2 == 'O') {
            (r1s0 == 'X') ? (winner('player1'), winnerTracker = true) : (winner('player2'), winnerTracker = true) ;
        } else if (r1s2 == 'X' && r2s1 == 'X' && r3s0 == 'X' || r1s2 == 'O' && r2s1 == 'O' && r3s0 == 'O') {
            (r1s2 == 'X') ? (winner('player1'), winnerTracker = true) : (winner('player2'), winnerTracker = true) ;
        } else if (clickTracker == 9 && winnerTracker == false) {
            tieGame();
        }
    }

    function displayWinner(player) {    
        const winnerText = document.querySelector('#winnerText');

        winnerText.innerHTML = `${players.getPlayer(player).name} Wins!`;
    }

    function gameButtonsDisplay(boolean) {
        const gameButtons =  document.querySelector('#gameButtons');
    
        boolean ? gameButtons.classList.remove('displayRemove') : gameButtons.classList.add('displayRemove');
    }

    function gameSquareEventListener(val) {
        const gameSquare = document.querySelectorAll('.gameSquare');

        gameSquare.forEach((square) => {
            if (val) {
                square.addEventListener('click', gameSquareFunctions);
            } else if (!val) {
                square.removeEventListener('click', gameSquareFunctions);
            }
        })
    }

    function hightlightCurrentPlayer(del) {
        const player1Display = document.querySelector('#player1Display');
        const player2Display = document.querySelector('#player2Display');

        if (del) {
            player1Display.classList.remove('displayHighlightLeft');
            player2Display.classList.remove('displayHighlightRight');
        } else if (currentPlayer == player1) {
            player1Display.classList.add('displayHighlightLeft');
            player2Display.classList.remove('displayHighlightRight');
        } else if (currentPlayer == player2) {
            player1Display.classList.remove('displayHighlightLeft');
            player2Display.classList.add('displayHighlightRight');
        }
    }

    function playAgain() {
        clickTracker = 0;
        winnerTracker = false;

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
        clickTracker = 0;
        winnerTracker = false;

        gameboard.reset();
        players.delete();        

        clearDisplayWinner();
        clearPlayerInputs();
        clearSquaresDisplay();

        gameButtonsDisplay(false);
        gameSquareEventListener(false);
        hightlightCurrentPlayer(true);
        playerInputDisplay(true);
        updateScoreDisplay('clear');
    }

    function setPlayers() {
        player1 = players.getPlayer('player1');
        player2 = players.getPlayer('player2');
    }

    function startGame() {
        players.create();

        setPlayers();
        currentPlayer = player1;
        hightlightCurrentPlayer();

        gameButtonsDisplay(true);
        gameSquareEventListener(true);
        playerInputDisplay(false);
    }

    function tieGame() {
        const tieGame = document.querySelector('#winnerText');

        tieGame.innerHTML = 'Tie game, play again!';
    }

    function updatePlayerScore(player) {
        players.updateScore(player);
    }

    function updateScoreDisplay(player) {
        const player1Score = document.querySelector('#player1Score');
        const player2Score = document.querySelector('#player2Score');

        if (player == 'player1') {
            player1Score.innerHTML = players.getScore('player1');
        } else if (player == 'player2') {
            player2Score.innerHTML = players.getScore('player2');
        } else if (player == 'clear') {
            player1Score.innerHTML = '0';
            player2Score.innerHTML = '0';
        }
    }

    function updateSquareDisplay(square) {
        square.innerHTML = currentPlayer.gamePiece;
        whosNext(currentPlayer);    
    }

    function validateForm() {
        const playerOneInput = document.querySelector('#playerOne').value;
        const playerTwoInput = document.querySelector('#playerTwo').value;

        if (playerOneInput == '' && playerTwoInput == '') {
            alert('Both player names missing. Enter player names.')
        } else if (playerOneInput == '') {
            alert('Player 1 name is missing. Enter player 1 name.')
        } else if (playerTwoInput == '') {
            alert('Player 2 name is missing. Enter player 2 name.') 
        } else {
            startGame();
        }
    }

    function whosNext(current) {
        if (current == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }

        hightlightCurrentPlayer();
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
        validateForm();
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

    function getPlayer(player) {
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
        getScore: returnPlayerScore,
        getPlayer: getPlayer,
        updateScore: updateScore,
    }
})()