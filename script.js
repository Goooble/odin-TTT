var boardMaster = (() => {
  //initial board creation
  var gameBoard = [];
  for (let i = 0; i < 3; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < 3; j++) {
      gameBoard[i].push(cell()); //default state 0
    }
  }

  function updateCell([row, column], playerToken) {
    if (gameBoard[row][column].getToken() === "#") {
      gameBoard[row][column].updateToken(playerToken);
      return 1;
    } else {
      console.log("already placed, choose an empty tile");
      return 0;
    }
  }
  function getBoard() {
    return gameBoard;
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
    console.log("-------------------");
  }

  function cell() {
    //cell is a space on the board
    var token = "#";
    function getToken() {
      return token;
    }

    function updateToken(playerToken) {
      token = playerToken;
    }
    return { getToken, updateToken };
  }

  return { getBoard, printBoard, updateCell };
})();

var gameMaster = (() => {
  var player1 = player("Gobi", "X");
  var player2 = player("Broccoli", "O");
  var playerChance = 1;
  var rounds = 9;

  function playGame() {
    boardMaster.printBoard();
    for (let i = 0; i < rounds; i++) {
      if (playerChance === 1) {
        if (playTurn(player1) === 0) {
          rounds++;
          continue;
        }

        boardMaster.printBoard();
        if (gameMaster.winCond(player1.getPlayerToken(), player1.getName()) === 1) break;
        playerChance = 2;
      } else {
        if (playTurn(player2) === 0) {
          rounds++;
          continue;
        }

        boardMaster.printBoard();
        if (gameMaster.winCond(player2.getPlayerToken(),player1.getName()) === 1) break;
        playerChance = 1;
      }
    }

    function playTurn(player) {
      return boardMaster.updateCell(player.getInput(), player.getPlayerToken());
    }
  }
  function winCond(playerToken, playerName) {
    var rowTokens = 0;
    var colTokens = 0;
    var board = boardMaster.getBoard();
    //check for row win
    board.forEach((row) => {
      row.forEach((square) => {
        if (square.getToken() === playerToken) {
          rowTokens++;
        }
      });
      if (rowTokens === 3) {
        console.log(`${playerName} wins the game!`);
        return 1;
      } else {
        rowTokens = 0;
      }
    });
    //check for column win
    for (let i = 0; i < 3; i++) {
      board.forEach((row) => {
        if(row[i].getToken() === playerToken)
        {
          colTokens++;
        }
      });
      if(colTokens === 3){
        console.log(`${playerName} wins the game!`);
        return 1;
      }else{
        colTokens = 0;
      }
    }

    //check for dia win
    if(board[0][0].getToken() === playerToken && board[1][1].getToken() === playerToken && board[2][2].getToken() === playerToken || board[2][0].getToken() === playerToken && board[1][1].getToken() === playerToken && board[0][2].getToken() === playerToken)
    {
      console.log(`${playerName} wins the game!`);
      return 1
    }
    return 0;
  }



  return { playGame, winCond };
})();

function player(name, token) {
  var playerToken = token;
  var playerName = name;
  function getPlayerToken() {
    return playerToken;
  }

  function getInput() {
    var [row, column] = prompt(
      `enter the cordinates ${playerName}`,
      "22"
    ).split("");
    return [row - 1, column - 1];
  }

  function getName(){
    return playerName;
  }

  return { getPlayerToken, getInput, getName };
}
