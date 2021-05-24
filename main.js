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

    playGame() {
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
                this.playGame();
            }
        } catch (TypeError) {
            console.log('Out of bounds; you lose! :(');
            process.exit();
        }

    }

    static generateHatLocation(height, width) {
        const hatLocation = [Math.floor(Math.random()*height), Math.floor(Math.random()*width)];
        if(hatLocation === [0, 0]) {
            generateHatLocation();
        } else {
            return hatLocation;
        }
    }

    static generateField(height, width, percentChance) {
        const hatLocation = Field.generateHatLocation(height, width);
        let newField = [];
        for(let i=0; i<height; i++) {
            newField.push([]);
            for(let j=0; j<width; j++) {
                if(i === 0 && j === 0) {
                    newField[0][0] = '*';
                } else if(i === hatLocation[0] && j === hatLocation[1]) {
                    newField[i][j] = '^';
                } else {
                    const chance = Math.random();
                    if(chance < percentChance) {
                        newField[i][j] = 'O';
                    } else {
                        newField[i][j] = '░';
                    }
                }
            }
        }
        return newField;
    }
}

const height = Math.floor(Math.random()*12+3);
const width = Math.floor(Math.random()*12+3);
const percentChance = Math.random()*(.4-.1)+.1;

const field = new Field(Field.generateField(height, width, percentChance));
field.playGame();