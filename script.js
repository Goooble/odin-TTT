var gameMaster = (() => {
  var playerChance = 1;
  var isGameRunning = true;

  function stopGame() {
    isGameRunning = false;
    display.stopHover();
  }

  function resetGame() {
    boardMaster.createBoard();
    display.resetGrid();
    isGameRunning = true;
    playerChance = 1;
  }
  function createPlayer() {
    return [player("Gobi", "X"), player("Broccoli", "O")];
  }
  function playGame(e) {
    //functions
    function winCond(playerToken, playerName) {
      var rowTokens = 0;
      var colTokens = 0;
      var board = boardMaster.getBoard();
      //check for row win
      for (let i = 0; i < 3; i++) {
        board[i].forEach((square) => {
          if (square.getToken() === playerToken) {
            rowTokens++;
            console.log(rowTokens);
          }
        });
        if (rowTokens === 3) {
          stopGame();
          console.log("row");
          display.displayWin(playerName);
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
          display.displayWin(playerName);
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
        display.displayWin(playerName);
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
        display.displayDraw();
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
    } else {
      if (playTurn(player2, getInput(e))) {
        playerChance = 1;
        display.displayToken(player2.getPlayerToken(), e);
      } else {
        playerChance = 2;
      }
      winCond(player2.getPlayerToken(), player2.getName());
    }
    if (isGameRunning !== false) checkDraw(); //in a if() becuase it used to print draw even after winning without the if
    boardMaster.printBoard();
  }

  return { playGame, isGameRunning, resetGame, createPlayer };
})();

var display = (() => {
  const body = document.querySelector("body");
  const dialog = document.querySelector("dialog");

  const main = document.querySelector("main");
  function displayBoard() {
    var boardArray = [[], [], []];
    boardArray.forEach((row, index) => {
      for (let i = 0; i < 3; i++) {
        row.push(document.createElement("button"));
        main.appendChild(row[i]);
        row[i].setAttribute("class", "hover buttons");
        row[i].setAttribute("data-row", `${index}`);
        row[i].setAttribute("data-col", `${i}`);
        row[i].addEventListener("click", gameMaster.playGame);
      }
    });
  }
  const resetBut = document.querySelector(".reset-but");
  resetBut.addEventListener("click", gameMaster.resetGame);

  function displayToken(token, cell) {
    cell.target.textContent = token;
  }

  function stopHover() {
    gridButtons.forEach((item) => {
      item.classList.toggle("hover");
    });
  }

  function resetGrid() {
    gridButtons.forEach((item) => {
      item.textContent = "";
    });
  }

  function getUserName() {
    player1.setPlayerName(document.querySelector("#player1").value);
    player2.setPlayerName(document.querySelector("#player2").value);
  }
  var count = 0;

  body.addEventListener("click", () => {
    console.log("count");
    console.log(count);

    if (dialog.hasAttribute("open")) {
      if (count === 1) {
        dialog.close();
        console.log("closed");
        count = 0;
        return 0;
      }
      count++;
    }
    
  });



  function displayWin(player) {
    dialog.textContent = `${player} WINS the round!`;
    dialog.showModal();
    console.log("called");
  }

  function displayDraw() {
    dialog.textContent = "It's a DRAW!!";
    dialog.showModal();
  }

  return {
    displayBoard,
    displayToken,
    stopHover,
    resetGrid,
    displayWin,
    getUserName,
    displayDraw,
  };
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
    display.getUserName();
    return playerName;
  }

  function setPlayerName(inName) {
    playerName = inName;
  }

  return { getPlayerToken, getName, setPlayerName };
}
var [player1, player2] = gameMaster.createPlayer();
display.displayBoard();
boardMaster.createBoard();
boardMaster.printBoard();
const gridButtons = document.querySelectorAll(".buttons");
