// What we need is a game board that allows us to click parts of the board to lay down noughts or crosses
// Each time a piece is played, it must check how many of itself are near it to determine if hte game is won or not

// the game board should be a grid 
// we need two players who are randomly assigned either noughts or crosses 

let gameboardSection = document.querySelector(".gameboard");
let noughtsPlayer = document.querySelector(".player-one");
let crossesPlayer = document.querySelector(".player-two");
let buttonSection = document.querySelector(".buttons")

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

let newBoard = gameboard.generateArray();

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

    
     noughtsPlayer.addEventListener('click', () => {
         if (noughtsPlayer.dataset.active === "true") {
             noughtsPlayer.dataset.active = 'false';
             crossesPlayer.dataset.active = "true";
             crossesPlayer.style.backgroundColor = "red"
             noughtsPlayer.style.backgroundColor = "white";
         }
         else if (noughtsPlayer.dataset.active === "false") {
             noughtsPlayer.dataset.active = "true";
             crossesPlayer.dataset.active = "false";
             noughtsPlayer.style.backgroundColor = "red"
             crossesPlayer.style.backgroundColor = "white";
         }
     })

     crossesPlayer.addEventListener('click', () => {
         if (crossesPlayer.dataset.active === 'false') {
             noughtsPlayer.dataset.active = "false";
             crossesPlayer.dataset.active = "true";
             crossesPlayer.style.backgroundColor = "red"
             noughtsPlayer.style.backgroundColor = "white";
         }
         else if (crossesPlayer.dataset.active === 'true') {
             noughtsPlayer.dataset.active = "true";
             crossesPlayer.dataset.active = "false";
             noughtsPlayer.style.backgroundColor = "red"
             crossesPlayer.style.backgroundColor = "white";
         }
     })
    

    //const checkWhoPlayed = () => {
      //  buttonSection.addEventListener('click', () => {

        //})
    //}

    //const play = () => {

        //let playerSquare = document.querySelector("#player-square");

        //playerSquare.addEventListener('click', () => )

    //}

    const checkScore = () => {
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
                    console.log(`Well done, ${playerOne.playerName}, you win! Your score has increased by 1 and is now ${playerOne.getScore()}`);
                }

                else if (playerTwo.noughtOrCross === "X") {
                    playerTwo.increaseScore();
                    console.log(`Well done ${playerTwo.playerName}, you win! Your score has increased by 1 and is now ${playerTwo.getScore()}`);
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
                    console.log(`Well done ${playerOne.playerName}, you win! Your score has increased by 1 and is now ${playerOne.getScore()}`);
                }

                else if (playerTwo.noughtOrCross === "0") {
                    playerTwo.increaseScore();
                    console.log(`Well done ${playerTwo.playerName}, you win! Your score has increased by 1 and is now ${playerTwo.getScore()}`);
                };
            
            }

        else {
            console.log("No one has won yet! Keep playing.")
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

    return { playerOneName, playerTwoName, checkScore, resetBoard, }
    
}

let newGame = game(izzy, dan);

newBoard[2] = "0"
newBoard[3] = "X"
newBoard[4] = "X"
newBoard[7] = "X"
newBoard[8] = "X"
newBoard[2] = "0"
newBoard[3] = "X"
newBoard[4] = "X"
newBoard[7] = "X"
newBoard[8] = "X"


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
