class Board {
  constructor() {
    this.grid = Board.makeGrid();
  }

  isEmpty(pos) {
    if (this.getPos(pos)) {
      return false;
    }
    return true;
  }

  placeMark(pos, currentPlayer, callback) {
    if (!this.isEmpty(pos)) {
      console.log("pos is taken");
    } else {
      this.grid[pos[0]][pos[1]] = currentPlayer.mark;
      callback();
    }
  }

  getPos(pos) {
    return this.grid[pos[0]][pos[1]];
  }

  print() {
    console.log(`${this.grid[0][0]} | ${this.grid[0][1]} | ${this.grid[0][2]}`);
    console.log(`${this.grid[1][0]} | ${this.grid[1][1]} | ${this.grid[1][2]}`);
    console.log(`${this.grid[2][0]} | ${this.grid[2][1]} | ${this.grid[2][2]}`);
  }

  isWon(currentPlayer) {
    let horizontals = Board.DIREC.horizontal;
    let verticals = Board.DIREC.vertical;
    let diagonals = Board.DIREC.diagonal;
    let allPossiblePaths = Array.prototype.concat(
      horizontals,
      verticals,
      diagonals
    );
    let board = this;
    return allPossiblePaths.some(function(path) {
      return path.every(function(pos) {
        return board.getPos(pos) === currentPlayer.mark;
      });

      //in order to use the below code, we need to import
      //underscore in this file as well ro run in node.
      // _.every(path, function(pos) {
      //   return board.getPos(pos) === currentPlayer.mark;
      // });
    });
  }

  static get DIREC() {
    return {
      horizontal: [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]]
      ],
      vertical: [
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[2, 0], [2, 1], [2, 2]]
      ],
      diagonal: [[[0, 0], [1, 1], [2, 2]], [[2, 0], [1, 1], [0, 2]]]
    };
  }

  static makeGrid() {
    return [new Array(3), new Array(3), new Array(3)];
  }
}

module.exports = Board;
