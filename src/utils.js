function get2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}

function setMines(cnt, grid) {
  for (let n = 0; n < cnt; n++) {
    putMine(grid);
  }
}

function putMine(grid) {
  let i = Math.floor(Math.random() * cols);
  let j = Math.floor(Math.random() * rows);

  if (!grid[i][j]) {
    grid[i][j] = new Cell(i, j, width, true);
  } else {
    putMine(grid);
  }
}
