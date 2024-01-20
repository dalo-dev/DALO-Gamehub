let game = true;
const players = ["X", "O"];
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentPlayer = players[0];
let board = ["", "", "", "", "", "", "", "", ""];

const squaresElements = document.getElementsByClassName("square");
const turnElement = document.getElementById("player-turn");
const resetElement = document.getElementById("reset-btn");

const displayCurrentTurn = function () {
  turnElement.innerText = `${currentPlayer}'s turn!`;
};

const updatePlayer = function () {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
};

const checkWin = function (player) {
  for (let combination of winningCombinations) {
    if (
      board[combination[0]] === player &&
      board[combination[1]] === player &&
      board[combination[2]] === player
    ) {
      squaresElements[combination[0]].style.color = "green";
      squaresElements[combination[1]].style.color = "green";
      squaresElements[combination[2]].style.color = "green";
      return true;
    }
  }
  return false;
};

const checkTie = function () {
  for (let square of squaresElements) {
    if (square.innerText === "") return false;
  }
  return true;
};

const startGame = function () {
  game = true;
  currentPlayer = players[0];
  board = ["", "", "", "", "", "", "", "", ""];
  for (let square of squaresElements) {
    square.innerText = "";
    square.style.color = "#faf0e6";
  }
  displayCurrentTurn();
  resetElement.classList.add("hidden");
};

for (let squareId = 0; squareId < squaresElements.length; squareId++) {
  squaresElements[squareId].addEventListener("click", () => {
    if (game) {
      if (board[squareId] === "") {
        board[squareId] = currentPlayer;
        squaresElements[squareId].innerText = currentPlayer;
        if (checkWin(currentPlayer)) {
          game = false;
          turnElement.innerHTML = `${currentPlayer} won`;
          resetElement.classList.remove("hidden");
        } else if (checkTie()) {
          game = false;
          turnElement.innerHTML = "TIE";
          resetElement.classList.remove("hidden");
        } else {
          updatePlayer();
          displayCurrentTurn();
        }
      }
    }
  });
}

startGame();
