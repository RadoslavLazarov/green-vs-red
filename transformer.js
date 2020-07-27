const RED_VALUE = 0;
const GREEN_VALUE = 1;

/**
 * Transforms cell depending on game rules.
 * @constructor
 * @param Number cellValue - Value of cell
 * @param Array surroundings - Surrounding cells
 * @returns - Changed cell
 */
class Transformer {
  constructor(cellValue, surroundings) {
    this.cellValue = cellValue;
    this.surroundings = surroundings;
  }

  getCellCount(cellValue) {
    return this.surroundings.filter((value) => value === cellValue).length;
  }

  transform() {
    if (this.cellValue === RED_VALUE) {
      const count = this.getCellCount(GREEN_VALUE);

      if (count === 3 || count === 6) {
        return GREEN_VALUE;
      }
    }

    if (this.cellValue === GREEN_VALUE) {
      const count = this.getCellCount(RED_VALUE);

      if (count !== 2 && count !== 3 && count !== 6) {
        return RED_VALUE;
      }
    }

    return this.cellValue;
  }
}

module.exports = Transformer;
