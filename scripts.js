// The DOM nodes I need to access

let gameboardSection = document.querySelector(".gameboard");
let scoreSection = document.querySelector(".score");
let resetGameboardSection = document.querySelector(".reset-gameboard");
let playerInputs = document.querySelector(".player-inputs");
let playerOneInfo = document.querySelector("#first-player");
let playerTwoInfo = document.querySelector('#second-player');
let submitButton = document.querySelector('[type="submit"]');
let resetWholeGameButton = document.querySelector('.reset-whole-game');

gameboardSection.dataset.active = "false";

const startGame = submitButton.addEventListener('click', (e) => {
        
        e.preventDefault();

        if (playerOneInfo.value === "" || playerTwoInfo.value === "") {

            playerInputs.dataset.state = "error";

            if (document.querySelector('.error-message') === null) {

                let errorSection = document.createElement('div');
                errorSection.classList = "error-section";
                playerInputs.appendChild(errorSection);

                errorSection.dataset.active = "true"
                let errorMessage = document.createElement('p');
                errorMessage.classList = "error-message";
                errorMessage.textContent = "Please input two player names before creating the game."
                errorSection.appendChild(errorMessage);

            }
            
            else {
                let errorMessage = document.querySelector(".error-message");
                errorMessage.textContent = "PLEASE input two player names before creating the game."
            };
        }

        else {

            playerInputs.dataset.state = "game";

            if (document.querySelector('.error-message') !== null) {
                let errorSection = document.querySelector(".error-section");
                errorSection.remove();
            }
            
            let playerInfo = document.createElement('div');
            playerInfo.classList = "player-information";
            playerInputs.appendChild(playerInfo);

            let firstInput = playerOneInfo.value;
            let secondInput = playerTwoInfo.value;

            let playerOneAnnouncement = document.createElement('p');
            playerOneAnnouncement.textContent = `Player One: ${firstInput}, piece: 0`;
            playerInfo.appendChild(playerOneAnnouncement);
            let playerTwoAnnouncement = document.createElement('p');
            playerTwoAnnouncement.textContent = `Player Two: ${secondInput}, piece: X`;
            playerInfo.appendChild(playerTwoAnnouncement)

            let newGame = game(firstInput, secondInput);

            playerOneInfo.value = '';
            playerTwoInfo.value = '';

            gameboardSection.dataset.active = "true";

        }
    }
)

// The function that generates the gameboard

const gameboard = (() => {

    let array;

    const generateArray = () => {

        let playerBoard = document.createElement('div');
        playerBoard.classList = "player-board";
        gameboardSection.appendChild(playerBoard);

        array = ['', '', '', '', '', '', '', '', ''];

        for (let i = 0; i < array.length; i++) {

            let playerSquare = document.createElement("button");
            playerSquare.classList = "player-square";
            playerSquare.dataset.number = `${i}`;
            playerBoard.appendChild(playerSquare);

        }
        
        return { array };

    }

    return { generateArray, array, };

})();

// The function that generates the player, assigns them a piece, and gets and increases their score

function createPlayer(name, number, piece) {

    const playerName = `${name}`;

    const noughtOrCross = piece;

    let score = 0

    const getScore = () => score;
    const increaseScore = () => { score++; };

    return { playerName, getScore, increaseScore, noughtOrCross, };
}

// The function that creates the game

function game(firstPlayer, secondPlayer) {

    // Here we're creating our two player instances

    let playerOne = createPlayer(`${firstPlayer}`, "1", "0");
    let playerTwo = createPlayer(`${secondPlayer}`, "2", "X");

    const playerOneName = playerOne.playerName;
    const playerTwoName = playerTwo.playerName;

    const newBoard = gameboard.generateArray();

    let noughtsPlayer = document.createElement("button");
    let crossesPlayer = document.createElement("button");
    let buttonSection = document.createElement("div");
    noughtsPlayer.classList = "player-one";
    noughtsPlayer.textContent = "Player One: Noughts"
    crossesPlayer.classList = "player-two";
    crossesPlayer.textContent = "Player Two: Crosses"
    buttonSection.classList = 'buttons';
    playerInputs.appendChild(buttonSection);
    buttonSection.appendChild(noughtsPlayer);
    buttonSection.appendChild(crossesPlayer);

    noughtsPlayer.id = playerOne.playerName;

    crossesPlayer.id = playerTwo.playerName;

    noughtsPlayer.dataset.active = "true";
    crossesPlayer.dataset.active = "false";

    let tally = document.createElement('div');
    tally.classList = "tally";
    gameboardSection.appendChild(tally);

    let tallyInfoPlayerOne = document.createElement('p');
    tallyInfoPlayerOne.classList = "tally-info-one";
    tallyInfoPlayerOne.textContent = `${playerOneName}: ${playerOne.getScore()}`;
    let tallyInfoPlayerTwo = document.createElement('p');
    tallyInfoPlayerTwo.classList = "tally-info-two";
    tallyInfoPlayerTwo.textContent = `${playerTwoName}: ${playerTwo.getScore()}`;
    tally.appendChild(tallyInfoPlayerOne);
    tally.appendChild(tallyInfoPlayerTwo);

    let winState = false;

    // this function resets the board

    const resetBoard = () => {

        for (let i = 0; i < newBoard.array.length; i++) {
            newBoard.array[i] = '';
        }

        for (let i = 0; i < gameButtons.length; i++) {
            gameButtons[i].textContent = '';
        }

        scoreSection.replaceChildren();

        winState = false;

        noughtsPlayer.dataset.active = "true";
        crossesPlayer.dataset.active = "false";

        return newBoard;

    }

    // section that creates the reset button

    let resetButton = document.createElement('button');
    resetButton.classList = "reset-button";
    resetButton.textContent = "Reset board";
    resetGameboardSection.appendChild(resetButton);
    resetButton.addEventListener('click', resetBoard);

    // This is the function where we check the score and change the win state depending on how the game is being played

    const checkScore = () => {

        let scoreText = document.createElement('p');

        if ((newBoard.array[0] === "X" && newBoard.array[1] === "X" && newBoard.array[2] === "X") 
            || (newBoard.array[3] === "X" && newBoard.array[4] === "X" && newBoard.array[5] === "X")
            || (newBoard.array[6] === "X" && newBoard.array[7] === "X" && newBoard.array[8] === "X")
            || (newBoard.array[0] === "X" && newBoard.array[3] === "X" && newBoard.array[6] === "X")
            || (newBoard.array[1] === "X" && newBoard.array[4] === "X" && newBoard.array[7] === "X")
            || (newBoard.array[4] === "X" && newBoard.array[7] === "X" && newBoard.array[3] === "X")
            || (newBoard.array[2] === "X" && newBoard.array[5] === "X" && newBoard.array[8] === "X")
            || (newBoard.array[0] === "X" && newBoard.array[4] === "X" && newBoard.array[8] === "X")
            || (newBoard.array[2] === "X" && newBoard.array[4] === "X" && newBoard.array[6] === "X")) {

                winState = true;

                if (playerOne.noughtOrCross === "X") {
                    playerOne.increaseScore();
                    scoreSection.replaceChildren(scoreText, `Well done, ${playerOne.playerName}, you win! Your score has increased by 1 and is now ${playerOne.getScore()}`); 
                    tallyInfoPlayerOne.textContent = `${playerOneName}: ${playerOne.getScore()}`;
                    tallyInfoPlayerTwo.textContent = `${playerTwoName}: ${playerTwo.getScore()}`;
                }

                else if (playerTwo.noughtOrCross === "X") {
                    playerTwo.increaseScore();
                    scoreSection.replaceChildren(scoreText, `Well done ${playerTwo.playerName}, you win! Your score has increased by 1 and is now ${playerTwo.getScore()}`);
                    tallyInfoPlayerOne.textContent = `${playerOneName}: ${playerOne.getScore()}`;
                    tallyInfoPlayerTwo.textContent = `${playerTwoName}: ${playerTwo.getScore()}`;
                };

            }

        else if ((newBoard.array[0] === "0" && newBoard.array[1] === "0" && newBoard.array[2] === "0") 
            || (newBoard.array[3] === "0" && newBoard.array[4] === "0" && newBoard.array[5] === "0")
            || (newBoard.array[6] === "0" && newBoard.array[7] === "0" && newBoard.array[8] === "0")
            || (newBoard.array[0] === "0" && newBoard.array[3] === "0" && newBoard.array[6] === "0")
            || (newBoard.array[1] === "0" && newBoard.array[4] === "0" && newBoard.array[7] === "0")
            || (newBoard.array[4] === "0" && newBoard.array[7] === "0" && newBoard.array[3] === "0")
            || (newBoard.array[2] === "0" && newBoard.array[5] === "0" && newBoard.array[8] === "0")
            || (newBoard.array[0] === "0" && newBoard.array[4] === "0" && newBoard.array[8] === "0")
            || (newBoard.array[2] === "0" && newBoard.array[4] === "0" && newBoard.array[6] === "0")) {

                winState = true;

                if (playerOne.noughtOrCross === "0") {
                    playerOne.increaseScore();
                    scoreSection.replaceChildren(scoreText, `Well done ${playerOne.playerName}, you win! Your score has increased by 1 and is now ${playerOne.getScore()}`);
                    tallyInfoPlayerOne.textContent = `${playerOneName}: ${playerOne.getScore()}`;
                    tallyInfoPlayerTwo.textContent = `${playerTwoName}: ${playerTwo.getScore()}`;
                }

                else if (playerTwo.noughtOrCross === "0") {
                    playerTwo.increaseScore();
                    scoreSection.replaceChildren(scoreText, `Well done ${playerTwo.playerName}, you win! Your score has increased by 1 and is now ${playerTwo.getScore()}`);
                    tallyInfoPlayerOne.textContent = `${playerOneName}: ${playerOne.getScore()}`;
                    tallyInfoPlayerTwo.textContent = `${playerTwoName}: ${playerTwo.getScore()}`;
                };
            
            }

        else {

            if (newBoard.array.every(item => item !== "")) {
                scoreSection.replaceChildren(scoreText, "It's a draw! Reset board to keep playing.");
            }

            else {
                winState = false;
                scoreSection.replaceChildren(scoreText, "No one has won yet! Keep playing.");
            }
        }

        }

    let gameButtons = document.querySelectorAll(".player-square");

    // This for loop allows the game to be playable

    for (let i = 0; i < gameButtons.length; i++) {
        gameButtons[i].addEventListener('click', () => {

            if (winState === false) {

                if (noughtsPlayer.dataset.active === "true" && gameButtons[i].textContent === "") {
                    gameButtons[i].textContent = "0";
                    newBoard.array[i] = "0";
                    noughtsPlayer.dataset.active = "false";
                    crossesPlayer.dataset.active = "true";
                    checkScore();
                }

                else if (crossesPlayer.dataset.active === "true" && gameButtons[i].textContent === "") {
                    gameButtons[i].textContent = "X";
                    newBoard.array[i] = "X"
                    noughtsPlayer.dataset.active = "true";
                    crossesPlayer.dataset.active = "false";
                    checkScore()
                }
            }
        })
    }

    return { playerOneName, playerTwoName, newBoard, checkScore, resetBoard, winState, }
    
}

resetWholeGameButton.addEventListener('click', () => {
    location.reload();
})



