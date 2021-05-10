function Cell(i, j, w, isMine) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;

  this.isMine = isMine;
  this.revealed = false;
}

Cell.prototype.show = function () {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  stroke(0);
  fill(127);

  if (this.revealed) {
    if (this.isMine) {
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    } else {
      fill(180);
      rect(this.x, this.y, this.w, this.w);
      textAlign(CENTER);
      fill(0);
      this.neighborCount !== 0 && text(this.neighborCount, this.x + this.w / 2, this.y + this.w / 2);
    }
  }
};

Cell.prototype.contains = function (x, y) {
  return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
};

Cell.prototype.reveal = function () {
  this.revealed = true;
  if (this.neighborCount === 0) {
    this.openNeighbors();
    // alert("You Lost");
  }
};

Cell.prototype.openNeighbors = function () {
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      let i = this.i + xoff;
      let j = this.j + yoff;

      if (i > -1 && i < cols && j > -1 && j < rows) {
        let neighbor = grid[i][j];
        if (!neighbor.revealed && !neighbor.isMine) {
          neighbor.reveal();
        }

        if (!neighbor.revealed && !neighbor.neighborCount === 0) {
          neighbor.openNeighbors();
        }
      }
    }
  }
};

Cell.prototype.countMines = function () {
  if (this.isMine) {
    this.neighborCount - 1;
  }

  let total = 0;

  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      let i = this.i + xoff;
      let j = this.j + yoff;

      if (i > -1 && i < cols && j > -1 && j < rows) {
        let neighbor = grid[i][j];
        if (neighbor.isMine) {
          total++;
        }
      }
    }
  }

  this.neighborCount = total;
};
