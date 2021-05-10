let grid;
let width;
const cols = 10;
const rows = 10;
const numOfMines = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  width = windowHeight * 0.08;
  grid = get2DArray(cols, rows);
  setMines(numOfMines, grid);

  setCells();
  countMines();
}

function draw() {
  background(22, 100, 0);

  grid.forEach((col) => {
    col.forEach((row) => {
      row.show();
    });
  });
}

function setCells() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (!grid[i][j]) {
        grid[i][j] = new Cell(i, j, width, false);
      }
    }
  }
}

function countMines() {
  grid.forEach((col) => {
    col.forEach((row) => {
      row.countMines();
    });
  });
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();

        if (grid[i][j].isMine) {
          gameOver();
        }
      }
    }
  }
}

function gameOver() {
  grid.forEach((col) => {
    col.forEach((row) => {
      row.reveal();
      // alert("You Lost");
    });
  });
}
