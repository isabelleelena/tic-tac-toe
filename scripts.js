// What we need is a game board that allows us to click parts of the board to lay down noughts or crosses
// Each time a piece is played, it must check how many of itself are near it to determine if hte game is won or not

// the game board should be a grid 
// we need two players who are randomly assigned either noughts or crosses 

let gameboardSection = document.querySelector(".gameboard");
let noughtsPlayer = document.querySelector(".player-one");
let crossesPlayer = document.querySelector(".player-two");
let buttonSection = document.querySelector(".buttons");
let scoreSection = document.querySelector(".score");

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
        
        return array;

    }

    return { generateArray };

})();

// Now I've got my board, I need to make my players. This should probably be a factory function!

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

// How to play the game?

// First, each player needs to be able to place a piece on the board

// Then, as each piece is placed, the game needs to check if there are three of the same piece in a row

// If there are not, the game continues

function game(playerOne, playerTwo) {

    createPlayer(playerOne);
    createPlayer(playerTwo);

    const playerOneName = playerOne.playerName;
    const playerTwoName = playerTwo.playerName;

    const newBoard = gameboard.generateArray();

    const checkScore = () => {

        let scoreText = document.createElement('p');
        scoreSection.appendChild(scoreText);

        if ((newBoard[0] === "X" && newBoard[1] === "X" && newBoard[2] === "X") 
            || (newBoard[3] === "X" && newBoard[4] === "X" && newBoard[5] === "X")
            || (newBoard[6] === "X" && newBoard[7] === "X" && newBoard[8] === "X")
            || (newBoard[0] === "X" && newBoard[3] === "X" && newBoard[6] === "X")
            || (newBoard[4] === "X" && newBoard[7] === "X" && newBoard[3] === "X")
            || (newBoard[2] === "X" && newBoard[5] === "X" && newBoard[8] === "X")
            || (newBoard[0] === "X" && newBoard[4] === "X" && newBoard[8] === "X")
            || (newBoard[2] === "X" && newBoard[4] === "X" && newBoard[6] === "X")) {

                if (playerOne.noughtOrCross === "X") {
                    playerOne.increaseScore();
                    scoreText.textContent = `Well done, ${playerOne.playerName}, you win! Your score has increased by 1 and is now ${playerOne.getScore()}`;
                }

                else if (playerTwo.noughtOrCross === "X") {
                    playerTwo.increaseScore();
                    scoreText.textContent = `Well done ${playerTwo.playerName}, you win! Your score has increased by 1 and is now ${playerTwo.getScore()}`;
                };

            }

        else if ((newBoard[0] === "0" && newBoard[1] === "0" && newBoard[2] === "0") 
            || (newBoard[3] === "0" && newBoard[4] === "0" && newBoard[5] === "0")
            || (newBoard[6] === "0" && newBoard[7] === "0" && newBoard[8] === "0")
            || (newBoard[0] === "0" && newBoard[3] === "0" && newBoard[6] === "0")
            || (newBoard[4] === "0" && newBoard[7] === "0" && newBoard[3] === "0")
            || (newBoard[2] === "0" && newBoard[5] === "0" && newBoard[8] === "0")
            || (newBoard[0] === "0" && newBoard[4] === "0" && newBoard[8] === "0")
            || (newBoard[2] === "0" && newBoard[4] === "0" && newBoard[6] === "0")) {

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
            scoreText.textContent = "No one has won yet! Keep playing.";
        }

            for (let i = 0; i < newBoard.length; i++) {
                newBoard[i] = '';
            }

        }

        const resetBoard = () => {

            for (let i = 0; i < newBoard.length; i++) {
                newBoard[i] = '';
            }

            return newBoard;

        }

    let gameButtons = document.querySelectorAll(".player-square");

    for (let i = 0; i < gameButtons.length; i++) {
        gameButtons[i].addEventListener('click', () => {

            if (noughtsPlayer.dataset.active === "true" && gameButtons[i].textContent === "") {
                gameButtons[i].textContent = "0";
                newBoard[i] = "0";
                noughtsPlayer.dataset.active = "false";
                crossesPlayer.dataset.active = "true";
                crossesPlayer.style.backgroundColor = "red"
                noughtsPlayer.style.backgroundColor = "white";
                checkScore();
            }

            else if (crossesPlayer.dataset.active === "true" && gameButtons[i].textContent === "") {
                gameButtons[i].textContent = "X";
                newBoard[i] = "X"
                noughtsPlayer.dataset.active = "true";
                crossesPlayer.dataset.active = "false";
                crossesPlayer.style.backgroundColor = "white"
                noughtsPlayer.style.backgroundColor = "red";
                checkScore()
            }
        })
    }

    //let playerButtonOne = document.querySelector('[data-number="0"]');
    //let playerButtonTwo = document.querySelector('[data-number="1"]');
    //let playerButtonThree = document.querySelector('[data-number="2"]');
    //let playerButtonFour = document.querySelector('[data-number="3"]');
    //let playerButtonFive = document.querySelector('[data-number="4"]');
    //let playerButtonSix = document.querySelector('[data-number="5"]');
    //let playerButtonSeven = document.querySelector('[data-number="6"]');
    //let playerButtonEight = document.querySelector('[data-number="7"]');
    //let playerButtonNine = document.querySelector('[data-number="8"]');

    //const turnPurple = 

    return { playerOneName, playerTwoName, checkScore, resetBoard, newBoard }
    
}

let newGame = game(izzy, dan);


// functionality that checks player's score




// random assignment of piece 


    //const noughtOrCross = () => {
//
  //      let randomInt = Math.floor(Math.random() * 2) + 1;
    //    let playerPiece
//
  //      if (randomInt === 1) {
    //        playerPiece = "nought";
      //      return { playerPiece };
        //}
//        else if (randomInt === 2) {
  //          playerPiece = "cross";
    //        return { playerPiece };
      //  }
    //}
