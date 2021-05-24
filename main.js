const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        if(Array.isArray(field)) {
            this._field = field;
        } else {
            throw Error('Invalid input for Field object. Must be an array!');
        }
        this._currentPosition = [0,0];
    }

    get currentPosition() {
        return this._currentPosition;
    }

    print() {
        this._field.forEach(row => {
            console.log(row.join(''));
        })
    }

    listen() {
        const answer = prompt('Which direction would you like to go? ').toUpperCase();
        switch(answer) {
            case 'U': {
                this._currentPosition = [this._currentPosition[0]-1, this._currentPosition[1]];
                break;
            }
            case 'D': {
                this._currentPosition = [this._currentPosition[0]+1, this._currentPosition[1]];
                break;
            }
            case 'L': {
                this._currentPosition = [this._currentPosition[0], this._currentPosition[1]-1];
                if(this._currentPosition[1] < 0 || this._currentPosition[1] >= this._field[0].length) {
                    console.log('Out of bounds; you lose! :(');
                    process.exit();
                } else {
                    break;
                }
            } 
            case 'R': {
                this._currentPosition = [this._currentPosition[0], this._currentPosition[1]+1];
                if(this._currentPosition[1] < 0 || this._currentPosition[1] >= this._field[0].length) {
                    console.log('Out of bounds; you lose! :(');
                    process.exit();
                } else {
                    break;
                }
            }
        }
    }

    checkProgress() {
        try {
            if(this._field[this._currentPosition[0]][this._currentPosition[1]] === 'O') {
                console.log('You fell in a hole! You lose! :(');
            } else if(this._field[this._currentPosition[0]][this._currentPosition[1]] === '^') {
                console.log('You found your hat! You win!! :D');
            } else {
                this._field[this._currentPosition[0]][this._currentPosition[1]] = '*';
                console.log(this._currentPosition);
                this.print();
                this.listen();
                console.clear();
                this.checkProgress();
            }
        } catch (TypeError) {
            console.log('Out of bounds; you lose! :(');
            process.exit();
        }

    }
}

const field = new Field([
    ['*', '░', '░'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

console.clear();
field.checkProgress();