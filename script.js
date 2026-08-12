const container = document.querySelector(".grid-container");
const gameStatus = document.querySelector(".game-status");
const restartBtn = document.querySelector(".restart");

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
      renderBoard();

      /*
      board.forEach((item, index) => {
        let box = document.createElement("div");
        box.className = `box box-${index}`;
        box.textContent = `${item}`;
        container.append(box);

        container.innerHTML += `
         <div data-index=${index} class="box box${index}">${item}</div>`;
      });

      */
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
    // console.log(`currentBoard: ${currentBoard}`);

    for (let i = 0; i < patterns.length; i++) {
      const currentPattern = patterns[i];

      const value1 = currentBoard[currentPattern[0]];
      const value2 = currentBoard[currentPattern[1]];
      const value3 = currentBoard[currentPattern[2]];

      // console.log(`values${i}: ${value1}, ${value2}, ${value3}`);

      if (value1 === value2 && value2 === value3 && value1 !== "?") {
        isGameOver = true;
        return "win";
      }
    }

    if (!isFull) {
      if (!currentBoard.includes("?")) {
        isFull = true;
        isGameOver = true;
        gameController.restartGame();

        return "draw";
      }
    }

    return "continue";
  };

  return {
    playRound: function (index) {
      let message;
      if (!isGameOver) {
        if (gameBoard.putMarker(index, activePlayer.marker)) {
          console.clear();
          message = `Marker ${activePlayer.marker} is added at spot ${index + 1}`;

          console.log(message);
          gameStatus.textContent = message;
          gameBoard.displayBoard();
          const result = checkWin();
          if (result === "win") {
            message = `${activePlayer.name}(${activePlayer.marker}) won`;
            console.log(`${activePlayer.name}(${activePlayer.marker}) won`);
            setTimeout(() => {
              this.restartGame();
            }, 2000);

            gameStatus.textContent = message;
          } else if (result === "draw") {
            message = `Draw`;
            console.log("It's a draw!");

            setTimeout(() => {
              this.restartGame();
            }, 2000);
            gameStatus.textContent = message;
          } else if (result === "continue") {
            activePlayer =
              activePlayer === players[0] ? players[1] : players[0];
            console.log(`${activePlayer.name}(${activePlayer.marker}) turn`);
            message = `${activePlayer.name}(${activePlayer.marker}) turn`;
            gameStatus.textContent = message;
          }
        } else
          console.log("The spot is already taken or out of bounds. Try Again");
      } else {
        setTimeout(() => {
          this.restartGame();
        }, 2000);
        console.log("Game is Over!");
      }
    },
    getActivePlayer: function () {
      return activePlayer;
    },
    restartGame: function () {
      gameBoard.resetBoard();

      isGameOver = false;
      activePlayer = players[0];
      renderBoard();
      gameStatus.textContent = "";
    },
  };
})();

// gameController.playRound(2);
// gameController.playRound(4);
// gameController.playRound(0);
// gameController.playRound(1);
// gameController.playRound(7);
// gameController.playRound(3);
// gameController.playRound(5);
// gameController.playRound(8);
// gameController.playRound(6);
// gameController.playRound(0);
// gameController.playRound(1);
renderBoard();
function renderBoard() {
  container.innerHTML = "";

  let arr = gameBoard.getBoard();
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    container.innerHTML += ` 
   <div data-index=${i} class="box box${i}">${element}</div>`;
  }
}

// container.addEventListener("click", (event) => {
//   let box = event.target;

//   let indexOfBox = parseInt(box.dataset.index);
//   if (box.classList.contains("box")) {
//     console.log(`clicked box: ${indexOfBox}`);
//   }
// });
// console.log(container.innerHTML);

container.addEventListener("click", (event) => {
  let clickedBox = event.target;
  if (clickedBox.classList.contains("box") && clickedBox.textContent === "?") {
    let indexOfBox = parseInt(clickedBox.dataset.index);
    let activePlayer = gameController.getActivePlayer();
    clickedBox.textContent = activePlayer.marker;

    gameController.playRound(indexOfBox);
  }
});
restartBtn.addEventListener("click", () => {
  gameController.restartGame();
});
