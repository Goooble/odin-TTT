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
    }else{
      console.log("already placed, choose an empty tile");

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

  return {printBoard, updateCell};
})();

var gameMaster = (() => {
  var player1 = player("Gobi", "X");
  var player2 = player("Broccoli", "O");
  var lastPlayed;
  
  function playGame() {
    for(let i = 0; i < 9; i++){
      boardMaster.updateCell(player1.getInput(), player1.getPlayerToken());
      boardMaster.printBoard();
      boardMaster.updateCell(player2.getInput(), player2.getPlayerToken());
      boardMaster.printBoard();
    }
  }

  return {playGame};
})();


var display = (() => {

})();


function player(name, token){
  var playerToken = token;
  var playerName = name;
  function getPlayerToken(){
    return playerToken;
  }

  function getInput(){
   var [row, column] = prompt(`enter the cordinates ${playerName}`, "22").split("");
   return [row-1, column-1]
  }

  return{getPlayerToken, getInput};
}


