// What we need is a game board that allows us to click parts of the board to lay down noughts or crosses
// Each time a piece is played, it must check how many of itself are near it to determine if hte game is won or not

// the game board should be a grid 
// we need two players who are randomly assigned either noughts or crosses 

// The DOM nodes I need to access

let gameboardSection = document.querySelector(".gameboard");
let noughtsPlayer = document.querySelector(".player-one");
let crossesPlayer = document.querySelector(".player-two");
let buttonSection = document.querySelector(".buttons");
let scoreSection = document.querySelector(".score");
let resetSection = document.querySelector(".reset")

// The function that generates the gameboard

const gameboard = (() => {

    let array;

    const generateArray = () => {

        array = ['', '', '', '', '', '', '', '', ''];

        for (let i = 0; i < array.length; i++) {

            let playerSquare = document.createElement("button");
            playerSquare.classList = "player-square";
            playerSquare.dataset.number = `${i}`;
            gameboardSection.appendChild(playerSquare);

        }
        
        return { array };

    }

    return { generateArray, array, };

})();

// The function that generates the player, assigns them a piece, and gets and increases their score

function createPlayer(name, number, piece) {

    const playerName = `${name}`;

    const noughtOrCross = piece;

    if (piece === "0") {
        noughtsPlayer.id = `${name}`;
    }

    else if (piece === "X") {
        crossesPlayer.id = `${name}`;
    };

    noughtsPlayer.dataset.active = "true";
    noughtsPlayer.style.backgroundColor = "red";
    crossesPlayer.dataset.active = "false";
    crossesPlayer.style.backgroundColor = "white";

    let score = 0

    const getScore = () => score;
    const increaseScore = () => { score++; };

    return { playerName, getScore, increaseScore, noughtOrCross, };
}

// current players

let izzy = createPlayer("izzy", "1", "0");
let dan = createPlayer("dan", 2, "X")

// The function that creates the game

function game(playerOne, playerTwo) {

    // Here we're creating our two player instances

    createPlayer(playerOne);
    createPlayer(playerTwo);

    const playerOneName = playerOne.playerName;
    const playerTwoName = playerTwo.playerName;

    const newBoard = gameboard.generateArray();

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
        crossesPlayer.style.backgroundColor = "white"
        noughtsPlayer.style.backgroundColor = "red";

        return newBoard;

    }

    // section that creates the reset button

    let resetButton = document.createElement('button');
    resetButton.classList = ".reset-button";
    resetButton.textContent = "Reset game";
    resetSection.appendChild(resetButton);
    resetButton.addEventListener('click', resetBoard);

    // This is the function where we check the score and change the win state depending on how the game is being played

    const checkScore = () => {

        let scoreText = document.createElement('p');
        scoreSection.appendChild(scoreText);

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
                    scoreText.textContent = `Well done, ${playerOne.playerName}, you win! Your score has increased by 1 and is now ${playerOne.getScore()}`; 
                }

                else if (playerTwo.noughtOrCross === "X") {
                    playerTwo.increaseScore();
                    scoreText.textContent = `Well done ${playerTwo.playerName}, you win! Your score has increased by 1 and is now ${playerTwo.getScore()}`;
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
                    scoreText.textContent = `Well done ${playerOne.playerName}, you win! Your score has increased by 1 and is now ${playerOne.getScore()}`;
                }

                else if (playerTwo.noughtOrCross === "0") {
                    playerTwo.increaseScore();
                    scoreText.textContent = `Well done ${playerTwo.playerName}, you win! Your score has increased by 1 and is now ${playerTwo.getScore()}`;
                };
            
            }

        else {
            winState = false;
            scoreText.textContent = "No one has won yet! Keep playing.";
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
                    crossesPlayer.style.backgroundColor = "red"
                    noughtsPlayer.style.backgroundColor = "white";
                    checkScore();
                }

                else if (crossesPlayer.dataset.active === "true" && gameButtons[i].textContent === "") {
                    gameButtons[i].textContent = "X";
                    newBoard.array[i] = "X"
                    noughtsPlayer.dataset.active = "true";
                    crossesPlayer.dataset.active = "false";
                    crossesPlayer.style.backgroundColor = "white"
                    noughtsPlayer.style.backgroundColor = "red";
                    checkScore()
                }
            }
        })
    }

    return { playerOneName, playerTwoName, newBoard, checkScore, resetBoard, winState, }
    
}

let newGame = game(izzy, dan);


