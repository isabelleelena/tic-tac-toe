// What we need is a game board that allows us to click parts of the board to lay down noughts or crosses
// Each time a piece is played, it must check how many of itself are near it to determine if hte game is won or not

// the game board should be a grid 
// we need two players who are randomly assigned either noughts or crosses 

const gameboard = (() => {

    let array;

    const generateArray = () => {
        array = ['1, 1', '1, 2', '1, 3', '2, 1', '2, 2', '2, 3', '3, 1', '3, 2', '3, 3'];
        return array;
    }

    return { generateArray };
})();

let newBoard = gameboard.generateArray();

// Now I've got my board, I need to make my players. This should probably be a factory function!

function createPlayer(name, number) {

    const noughtOrCross = () => {
        
        let randomInt = Math.floor(Math.random() * 2) + 1;
        let playerPiece

        if (randomInt === 1) {
            playerPiece = "nought";
            return { playerPiece };
        }
        else if (randomInt === 2) {
            playerPiece = "cross";
            return { playerPiece };
        }
    }

    const playerName = `Player ${Number(number)}: ${name}`;

    let score = 0

    const getScore = () => score;
    const increaseScore = () => { score++; };

    return {playerName, getScore, increaseScore, noughtOrCross};
}

let izzy = createPlayer("izzy", "1");
let dan = createPlayer("dan", 2)

izzy.increaseScore();
izzy.increaseScore();
