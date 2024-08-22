var gameMaster = (() => {
  var player1 = player("Gobi", "X");
  var player2 = player("Broccoli", "O");
  var playerChance = 1;
  var isGameRunning = true;

  function playGame(e) {
    //   boardMaster.createBoard();
    //   boardMaster.printBoard();
    //   for (let i = 0; i < rounds; i++) {
    //     if (playerChance === 1) {
    //       if (playTurn(player1) === 0) {
    //         rounds++;
    //         continue;
    //       }
    //       boardMaster.printBoard();
    //       if (gameMaster.winCond(player1.getPlayerToken(), player1.getName()) === 1) break;
    //       playerChance = 2;
    //     } else {
    //       if (playTurn(player2) === 0) {
    //         rounds++;
    //         continue;
    //       }
    //       boardMaster.printBoard();
    //       if (gameMaster.winCond(player2.getPlayerToken(),player1.getName()) === 1) break;
    //       playerChance = 1;
    //     }
    //   }
    //   gameMaster.checkDraw();
    //   boardMaster.createBoard();
    //
    // }
    // function checkDraw(){
    //   boardMaster.getBoard().forEach((row) => {
    //     row.forEach((square) => {
    //       if (square.getToken() === '#') {
    //         return 0;
    //       }
    //     });
    //   });
    //   console.log("its a draw!");


    //functions
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
          isGameRunning = false;
          return 0;
        } else {
          rowTokens = 0;
        }
      });
      //check for column win
      for (let i = 0; i < 3; i++) {
        board.forEach((row) => {
          if (row[i].getToken() === playerToken) {
            colTokens++;
          }
        });
        if (colTokens === 3) {
          isGameRunning = false;
          return 0;
        } else {
          colTokens = 0;
        }
      }
  
      //check for dia win
      if (
        (board[0][0].getToken() === playerToken &&
          board[1][1].getToken() === playerToken &&
          board[2][2].getToken() === playerToken) ||
        (board[2][0].getToken() === playerToken &&
          board[1][1].getToken() === playerToken &&
          board[0][2].getToken() === playerToken)
      ) {
        isGameRunning = false;
        return 0;
      }
      return 0;
    }
    function checkDraw(){
      var emptyCell = []
      boardMaster.getBoard().forEach((row) => {
      emptyCell = row.filter((square) => {
          if (square.getToken() === '#') {
            return true;
          }
        });
      });
      if(!emptyCell.length)
      {console.log(emptyCell.length)
      isGameRunning = false;}
    }
    function playTurn(player, coordinates) {//updates board
      return boardMaster.updateCell(
        coordinates,
        player.getPlayerToken()
      );
    }
    function getInput(e) {//fetches coordinates from screen
      var coordinates = [+e.target.dataset.row, +e.target.dataset.col];
      console.log(coordinates)
      return coordinates;
    }

    //meat of the game
    if(!isGameRunning){//disable buttons
      console.log("calle")
      return 0;
    }

    if (playerChance === 1) {//shuffle between two players
      playTurn(player1, getInput(e))?playerChance=2:playerChance=1;
      winCond(player1.getPlayerToken(), player1.getName());
    }else{
      playTurn(player2, getInput(e))?playerChance=1:playerChance=2;
      winCond(player2.getPlayerToken(), player2.getName());
    }
    checkDraw();
    boardMaster.printBoard();
  }

  

  

  return { playGame};
})();

var display = (() => {
  const main = document.querySelector("main");
  function displayBoard() {
    var boardArray = [[], [], []];
    boardArray.forEach((row, index) => {
      for (let i = 0; i < 3; i++) {
        row.push(document.createElement("button"));
        main.appendChild(row[i]);
        row[i].setAttribute("data-row", `${index}`);
        row[i].setAttribute("data-col", `${i}`);
        row[i].addEventListener("click", gameMaster.playGame);
      }
    });
  }

  return { displayBoard };
})();



var boardMaster = (() => {
  //initial board creation
  var gameBoard = [];
  function createBoard() {
    for (let i = 0; i < 3; i++) {
      gameBoard[i] = [];
      for (let j = 0; j < 3; j++) {
        gameBoard[i].push(cell()); //default state #
      }
    }
  }

  function updateCell([row, column], playerToken) {
    if (gameBoard[row][column].getToken() === "#") {
      gameBoard[row][column].updateToken(playerToken);
      return true;
    } else {
      console.log("already placed, choose an empty tile");
      return false;
    }
  }
  function getBoard() {
    return gameBoard;
  }
  //console printing
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

  return { getBoard, printBoard, updateCell, createBoard };
})();

function player(name, token) {
  var playerToken = token;
  var playerName = name;
  function getPlayerToken() {
    return playerToken;
  }

  function getName() {
    return playerName;
  }

  return { getPlayerToken, getName };
}
display.displayBoard();
boardMaster.createBoard();
boardMaster.printBoard();