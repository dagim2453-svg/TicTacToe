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
      board = ["", "", "", "", "", "", "", "", ""];
      console.log("resetted.");
    },
    getBoard: function () {
      return board;
    },
  };
})();

gameBoard.putMarker(0, "X");
gameBoard.putMarker(1, "X");
gameBoard.putMarker(5, "O");
gameBoard.putMarker(7, "O");
gameBoard.displayBoard();
gameController.playRound(7);
