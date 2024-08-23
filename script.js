var gameMaster = (() => {
  var player1 = player("Gobi", "X");
  var player2 = player("Broccoli", "O");
  var playerChance = 1;
  var isGameRunning = true;

  function stopGame(){
    isGameRunning = false;
    display.stopHover();
  }

  function resetGame(){
    boardMaster.createBoard();
  }

  function playGame(e) {
    //functions
    function winCond(playerToken, playerName) {
      var rowTokens = 0;
      var colTokens = 0;
      var board = boardMaster.getBoard();
      //check for row win
      for(let i = 0; i<3; i++){
        board[i].forEach((square) => {
          if (square.getToken() === playerToken) {
            
            rowTokens++;
            console.log(rowTokens);
          }
        });
        if (rowTokens === 3) {
          stopGame();
          console.log("row");
          return 0;
        } else {
          rowTokens = 0;
        }
      }
      //check for column win
      for (let i = 0; i < 3; i++) {
        board.forEach((row) => {
          if (row[i].getToken() === playerToken) {
            colTokens++;
          }
        });
        if (colTokens === 3) {
          stopGame();
          console.log("column");
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
        stopGame();
        console.log("dia");
        return 0;
      }
      return 0;
    }
    function checkDraw() {
      var emptyCellCounter = 0;
      boardMaster.getBoard().forEach((row) => {
        row.forEach((square) => {
          if (square.getToken() === "#") {
            emptyCellCounter++;
          }
        });
      });
      if (emptyCellCounter === 0) {
        stopGame();
        console.log("draw");
      }
    }
    function playTurn(player, coordinates) {
      //updates board
      return boardMaster.updateCell(coordinates, player.getPlayerToken());
    }
    function getInput(e) {
      //fetches coordinates from screen
      var coordinates = [+e.target.dataset.row, +e.target.dataset.col];
      return coordinates;
    }
    
    //meat of the game
    if (!isGameRunning) {
      //disable buttons
      return 0;
    }
    
    if (playerChance === 1) {
      //shuffle between two players
      if (playTurn(player1, getInput(e))) {
        playerChance = 2;
        display.displayToken(player1.getPlayerToken(), e);
      } else {
        playerChance = 1;
      }
      winCond(player1.getPlayerToken(), player1.getName());
    } 
    else {
      if (playTurn(player2, getInput(e))) {
        playerChance = 1;
        display.displayToken(player2.getPlayerToken(), e);
      } else {
        playerChance = 2;
      }
      winCond(player2.getPlayerToken(), player2.getName());
    }
    if(isGameRunning !== false) checkDraw();//in a if() becuase it used to print draw even after winning without the if
    boardMaster.printBoard();
  }

  return { playGame, isGameRunning, resetGame };
})();

var display = (() => {
  const main = document.querySelector("main");
  function displayBoard() {
    var boardArray = [[], [], []];
    boardArray.forEach((row, index) => {
      for (let i = 0; i < 3; i++) {
        row.push(document.createElement("button"));
        main.appendChild(row[i]);
        row[i].setAttribute("class", "hover")
        row[i].setAttribute("data-row", `${index}`);
        row[i].setAttribute("data-col", `${i}`);
        row[i].addEventListener("click", gameMaster.playGame);
      }
    });
  }

  function displayToken(token, cell) {
    cell.target.textContent = token;
  }

  function stopHover(){
    const gridButtons = document.querySelectorAll("main>button");
    gridButtons.forEach((item) => 
    {
      console.log(item);
      item.classList.toggle("hover");
    })
  }
  return { displayBoard, displayToken, stopHover };
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
