const board = document.getElementById("sudoku-board");
const timerDisplay = document.getElementById("timer");
const difficultySelect = document.getElementById("difficulty");

let timer = 0;
let interval;

let currentPuzzle = [];

const puzzles = {
  easy: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],

  medium: [
    [0, 0, 0, 6, 0, 0, 4, 0, 0],
    [7, 0, 0, 0, 0, 3, 6, 0, 0],
    [0, 0, 0, 0, 9, 1, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 1, 8, 0, 0, 0, 3],
    [0, 0, 0, 3, 0, 6, 0, 4, 5],
    [0, 4, 0, 2, 0, 0, 0, 6, 0],
    [9, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 1, 0, 0],
  ],

  hard: [
    [0, 0, 0, 0, 0, 0, 0, 1, 2],
    [0, 0, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 4, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 6, 0, 0],
    [0, 0, 0, 5, 0, 9, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 8, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 0],
    [9, 8, 0, 0, 0, 0, 0, 0, 0],
  ],
};

function startTimer() {
  clearInterval(interval);
  timer = 0;

  interval = setInterval(() => {
    timer++;
    let min = String(Math.floor(timer / 60)).padStart(2, "0");
    let sec = String(timer % 60).padStart(2, "0");
    timerDisplay.textContent = `⏱ ${min}:${sec}`;
  }, 1000);
}

function createBoard() {
  board.innerHTML = "";

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("input");
      cell.type = "text";
      cell.maxLength = 1;
      cell.classList.add("cell");

      cell.dataset.row = row;
      cell.dataset.col = col;

      if ((col + 1) % 3 === 0 && col !== 8) {
        cell.classList.add("border-right");
      }

      if ((row + 1) % 3 === 0 && row !== 8) {
        cell.classList.add("border-bottom");
      }

      if (currentPuzzle[row][col] !== 0) {
        cell.value = currentPuzzle[row][col];
        cell.disabled = true;
        cell.classList.add("fixed");
      }

      cell.addEventListener("input", () => {
        const value = cell.value;

        if (!/^[1-9]$/.test(value)) {
          cell.value = "";
          return;
        }

        const r = +cell.dataset.row;
        const c = +cell.dataset.col;

        const boardValues = getBoardValues();
        boardValues[r][c] = 0;

        if (
          !isValidRow(boardValues, r, value) ||
          !isValidCol(boardValues, c, value) ||
          !isValidBox(boardValues, r, c, value)
        ) {
          cell.classList.add("error");
        } else {
          cell.classList.remove("error");
        }

        if (checkWin()) {
          clearInterval(interval);
          setTimeout(() => alert("🎉 You Win!"), 100);
        }
      });

      board.appendChild(cell);
    }
  }
}

function getBoardValues() {
  const cells = document.querySelectorAll(".cell");
  let values = [];

  for (let i = 0; i < 9; i++) {
    values[i] = [];
    for (let j = 0; j < 9; j++) {
      values[i][j] = cells[i * 9 + j].value || 0;
    }
  }

  return values;
}

function isValidRow(b, r, n) {
  for (let c = 0; c < 9; c++) if (b[r][c] == n) return false;
  return true;
}

function isValidCol(b, c, n) {
  for (let r = 0; r < 9; r++) if (b[r][c] == n) return false;
  return true;
}

function isValidBox(b, r, c, n) {
  const sr = Math.floor(r / 3) * 3;
  const sc = Math.floor(c / 3) * 3;

  for (let i = sr; i < sr + 3; i++) {
    for (let j = sc; j < sc + 3; j++) {
      if (b[i][j] == n) return false;
    }
  }
  return true;
}

function checkWin() {
  const cells = document.querySelectorAll(".cell");

  for (let cell of cells) {
    if (cell.value === "" || cell.classList.contains("error")) {
      return false;
    }
  }

  return true;
}

function startGame() {
  currentPuzzle = JSON.parse(JSON.stringify(puzzles[difficultySelect.value]));
  startTimer();
  createBoard();
}

function resetGame() {
  startGame();
}

function newGame() {
  startGame();
}

startGame();
