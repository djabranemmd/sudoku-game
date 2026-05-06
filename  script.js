const board = document.getElementById("sudoku-board");

for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 1;
  input.classList.add("cell");

  board.appendChild(input);
}
