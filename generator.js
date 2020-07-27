const Transformer = require('./transformer');

/**
 * Iterates of each cell, collects surrounding cells and tracks exact cell how is changed.
 * @constructor
 * @param Number width - Width of grid
 * @param Number height - Height of grid
 * @param Array initialState - Array with rows and columns
 * @param Number x1 - x coordinate of cell that will be tracked
 * @param Number y1 - y coordinate of cell that will be tracked
 * @param Number n - Turns of the game
 */
class Generator {
  constructor(width, height, initialState, x1, y1, n) {
    this.width = width;
    this.height = height;
    this.initialState = initialState;
    this.currentState = initialState;
    this.x1 = x1;
    this.y1 = y1;
    this.n = n;
  }

  start() {
    console.log(this.track());
  }

  getSurroundings(row, column) {
    const surroundings = [];

    for (let currentRow = row - 1; currentRow <= row + 1; currentRow++) {
      for (
        let currentColumn = column - 1;
        currentColumn <= column + 1;
        currentColumn++
      ) {
        if (
          currentRow >= 0 &&
          currentRow < this.height &&
          currentColumn >= 0 &&
          currentColumn < this.width
        ) {
          surroundings.push(this.currentState[currentRow][currentColumn]);
        }
      }
    }

    return surroundings;
  }

  track() {
    let greenOccurencies = this.initialState[this.x1][this.y1];

    for (let stateCount = 1; stateCount < this.n; stateCount++) {
      let newState = [];

      this.currentState.forEach((row, rowIndex) => {
        newState[rowIndex] = [];
        row.forEach((value, columnIndex) => {
          const transformer = new Transformer(
            value,
            this.getSurroundings(rowIndex, columnIndex)
          );
          newState[rowIndex][columnIndex] = transformer.transform();
        });
      });

      greenOccurencies += newState[this.x1][this.y1];

      this.currentState = newState;
    }

    return greenOccurencies;
  }
}

module.exports = Generator;
