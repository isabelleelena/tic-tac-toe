// What we need is a game board that allows us to click parts of the board to lay down noughts or crosses
// Each time a piece is played, it must check how many of itself are near it to determine if hte game is won or not

// the game board should be a grid 
// we need two players who are randomly assigned either noughts or crosses 

const gameboard = (() => {

    let array;

    const generateArray = () => {
        array = ['', '', '', '', '', '', '', '', ''];
        return array;
    }

    return { generateArray };
})();

let newBoard = gameboard.generateArray();

// Now I've got my board, I need to make my players. This should probably be a factory function!

function createPlayer(name, number, piece) {

    const playerName = `Player ${Number(number)}: ${name}`;

    const noughtOrCross = piece;

    let score = 0

    const getScore = () => score;
    const increaseScore = () => { score++; };

    return { playerName, getScore, increaseScore, noughtOrCross };
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

    function checkScore() {
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
                    console.log(`Well done ${playerOne.playerName}, you win! Your score has increased by 1 and is now ${playerOne.getScore()}`);
                };
                else if (playerTwo.noughtOrCross === "X") {
                    playerTwo.increaseScore();
                    console.log(`Well done ${playerTwo.playerName}, you win! Your score has increased by 1 and is now ${playerTwo.getScore()}`);
                };

            };

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
                };
                else if (playerTwo.noughtOrCross === "0") {
                    playerTwo.increaseScore();
                    console.log(`Well done ${playerTwo.playerName}, you win! Your score has increased by 1 and is now ${playerTwo.getScore()}`);
                };
            
            }

            for (let i = 0; i < newBoard.length; i++) {
                        newBoard[i] = '';
                    }
        }
    
}

game(izzy, dan)

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
