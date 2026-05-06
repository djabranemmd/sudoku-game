const board = document.getElementById("sudoku-board");

const puzzle = [
  [5,3,0, 0,7,0, 0,0,0],
  [6,0,0, 1,9,5, 0,0,0],
  [0,9,8, 0,0,0, 0,6,0],

  [8,0,0, 0,6,0, 0,0,3],
  [4,0,0, 8,0,3, 0,0,1],
  [7,0,0, 0,2,0, 0,0,6],

  [0,6,0, 0,0,0, 2,8,0],
  [0,0,0, 4,1,9, 0,0,5],
  [0,0,0, 0,8,0, 0,7,9]
];

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

      if (puzzle[row][col] !== 0) {
        cell.value = puzzle[row][col];
        cell.disabled = true;
        cell.classList.add("fixed");
      }

      cell.addEventListener("input", () => {
        const value = cell.value;

        if (!/^[1-9]$/.test(value)) {
          cell.value = "";
          cell.classList.remove("error");
          return;
        }

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        const boardValues = getBoardValues();

        boardValues[row][col] = 0;

        if (
          !isValidRow(boardValues, row, value) ||
          !isValidCol(boardValues, col, value) ||
          !isValidBox(boardValues, row, col, value)
        ) {
          cell.classList.add("error");
        } else {
          cell.classList.remove("error");
        }

        if (checkWin()) {
          showWinMessage();
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
      const cell = cells[i * 9 + j];
      values[i][j] = cell.value || 0;
    }
  }

  return values;
}

function isValidRow(boardValues, row, num) {
  for (let col = 0; col < 9; col++) {
    if (boardValues[row][col] == num) {
      return false;
    }
  }
  return true;
}

function isValidCol(boardValues, col, num) {
  for (let row = 0; row < 9; row++) {
    if (boardValues[row][col] == num) {
      return false;
    }
  }
  return true;
}

function isValidBox(boardValues, row, col, num) {
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (boardValues[r][c] == num) {
        return false;
      }
    }
  }
  return true;
}

function checkWin() {
  const cells = document.querySelectorAll(".cell");

  for (let cell of cells) {
    if (cell.value === "") {
      return false;
    }

    if (cell.classList.contains("error")) {
      return false;
    }
  }

  return true;
}

function showWinMessage() {
  setTimeout(() => {
    alert("🎉 Congratulations! You solved the Sudoku!");
  }, 100);
}

createBoard();