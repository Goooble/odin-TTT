var boardMaster = (() => {
  //initial board creation
  var gameBoard = [];
  for (let i = 0; i < 3; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < 3; j++) {
      gameBoard[i].push(cell()); //default state 0
    }
  }

  function updateCell(row, column, playerToken) {
    if (gameBoard[row][column].getToken() === 0) {
      gameBoard[row][column].updateToken(playerToken);
    }
  }

  function printBoard() {
    gameBoard
      .map((row) => {
        return row.map((square) => {
          return square.getToken();
        });
      })
      .forEach((cell) => {
        console.log(cell);
      });
  }

  return {gameBoard, printBoard, updateCell};
})();



function cell() {
  //cell is a space on the board
  var token = 0;
  function getToken() {
    return token;
  }

  function updateToken(playerToken) {
    token = playerToken;
  }
  return { getToken, updateToken };
}
