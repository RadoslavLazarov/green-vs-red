const readline = require('readline');
const Generator = require('./generator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Collects user input through readline.
 * Creates initial state and starts the game.
 */
class Game {
  static start() {
    this.init();
  }

  static getGridSize() {
    return new Promise((resolve, reject) => {
      rl.question('Enter comma separated size of the grid: ', (answer) => {
        const grid = answer.split(',');

        if (grid[0] >= 1000 || grid[1] >= 1000) {
          throw new Error('X and Y should be less than 1000.');
        }

        resolve(grid);
      });
    });
  }

  static getCharacters() {
    return new Promise((resolve, reject) => {
      rl.question('Enter characters: ', (answer) => {
        resolve(answer);
      });
    });
  }

  static getCoordinates() {
    return new Promise((resolve, reject) => {
      rl.question('Enter comma separated coordinates: ', (answer) => {
        resolve(answer.split(','));
      });
    });
  }

  static generationN() {
    return new Promise((resolve, reject) => {
      rl.question('Enter generation N: ', (answer) => {
        resolve(+answer);
      });
    });
  }

  static async init() {
    const size = await this.getGridSize();
    const width = +size[0];
    const height = +size[1];
    const characters = await this.getCharacters();
    const coordinates = await this.getCoordinates();
    const x1 = +coordinates[0];
    const y1 = +coordinates[1];
    const n = await this.generationN();

    const initialState = () => {
      const getChars = characters.split('').map((el) => +el);

      const result = new Array(Math.ceil(getChars.length / height))
        .fill()
        .map((el) => getChars.splice(0, height));
      return result;
    };

    const generator = new Generator(width, height, initialState(), x1, y1, n);
    generator.start();
    rl.close();
  }
}

module.exports = Game;
