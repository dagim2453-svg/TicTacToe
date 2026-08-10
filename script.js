const gameBoard = (function () {
  let board = ["?", "?", "?", "?", "?", "?", "?", "?", "?"];

  return {
    displayBoard: function () {
      let output = "";
      for (let i = 0; i < board.length; i++) {
        output += board[i] + " ";
        if ((i + 1) % 3 === 0) {
          output += "\n";
        }
      }
      console.log(output);
    },

    putMarker: function (index, marker) {
      if (board[index] === "?" && (marker === "X" || marker === "O")) {
        board[index] = marker;
        return true;
      } else {
        return false;
      }
    },
    resetBoard: function () {
      board = ["?", "?", "?", "?", "?", "?", "?", "?", "?"];
      console.log("board resetted.");
    },
    getBoard: function () {
      return board;
    },
  };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const gameController = (function () {
  const player1 = createPlayer("player1", "X");
  const player2 = createPlayer("player2", "O");
  const players = [player1, player2];

  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  let activePlayer = players[0];
  let isGameOver = false;

  const checkWin = function () {
    let isFull = false;
    const currentBoard = gameBoard.getBoard();
    console.log(`currentBoard: ${currentBoard}`);
    gameBoard.displayBoard();

    for (let i = 0; i < patterns.length; i++) {
      const currentPattern = patterns[i];

      const value1 = currentBoard[currentPattern[0]];
      const value2 = currentBoard[currentPattern[1]];
      const value3 = currentBoard[currentPattern[2]];

      // console.log(`values${i}: ${value1}, ${value2}, ${value3}`);

      if (value1 === value2 && value2 === value3 && value1 !== "?") {
        console.log(`${activePlayer.name}(${activePlayer.marker}) won`);
        isGameOver = true;
        return;
      }
    }

    if (!isFull) {
      if (!currentBoard.includes("?")) {
        isFull = true;
        isGameOver = true;
        console.log("It's a draw!");
        gameController.restartGame();

        return;
      }
    }

    if (!isGameOver) {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
      console.log(`${activePlayer.name} turn`);
    }
  };

  return {
    playRound: function (index) {
      if (!isGameOver) {
        if (gameBoard.putMarker(index, activePlayer.marker)) {
          console.log(
            `Marker ${activePlayer.marker} is added at index ${index}`,
          );
          checkWin();
        } else
          console.log("The spot is already taken or out of bounds. Try Again");
      } else {
        console.log("Game is Over!");
      }
    },
    getActivePlayer: function () {
      return `activePlayer: ${activePlayer.name}(${activePlayer.marker})`;
    },
    restartGame: function () {
      gameBoard.resetBoard();
      isGameOver = false;
      activePlayer = players[0];
      console.log("Game resetted");
    },
  };
})();

gameController.playRound(2);
gameController.playRound(4);
gameController.playRound(6);
gameController.playRound(1);
gameController.playRound(7);
gameController.playRound(8);
gameController.playRound(0);
gameController.playRound(3);
gameController.playRound(5);
