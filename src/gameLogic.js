import { updateLog } from "./eventLog";

class Ship {
    constructor(name, length, player){
        this.name = name;
        this.length = length;
        this.player = player;
        this.timesHit = 0;
        this.sunk = false;
    }
    hit(){
        if(!this.sunk){this.timesHit++}
        this.isSunk();
    }
    isSunk(){
        if(this.timesHit == this.length){
            this.sunk = true;
            updateLog(`Your ${this.name} has sunk, ${this.player.name}!`);
        }
    }
}

class GameBoard{
    constructor(name, type){
        this.type = type;
        this.name = name;
        this.grid = [];
        for(let x = 0; x < 10; x++){
            for(let y = 0; y < 10; y++){
                this.grid.push([x,y]);
            }
        }
    }
    checkDefeat(){
        if(this.casualties.length == 5){
            updateLog(`${this.name} LOST`);
            return true;
        }
    }
    ships = [
        new Ship('Carrier', 5, this),
        new Ship('Battleship', 4, this),
        new Ship('Cruiser', 3, this),
        new Ship('Submarine', 3, this),
        new Ship('Destroyer', 2, this)
    ]
    placeShip(startIndex, direction = 'horizontal', ship, isRandom){
        let board = this;
        let start = startIndex;
        let counter = ship.length
        while(counter > 0){
            if(checkOutOfBounds() == false || board.grid[start][2] !== undefined){
                if(!isRandom){
                    updateLog(`${this.name}, Invalid Location. Try Again.`);
                }
                return false;
            }
            counter--;
            direction == "horizontal" ? start++ : start += 10; 
        }
        for(let i = 0; i < ship.length; i++){
            board.grid[startIndex].push(ship);
            direction == "horizontal" ? startIndex++ : startIndex += 10; 
        }
        return true;
        
    
        function checkOutOfBounds(){
            return (direction == 'horizontal' && board.grid[startIndex][1] + ship.length <= 10) ||
                   (direction == 'vertical' && board.grid[startIndex][0] + ship.length <= 10)
        }
    }
    missedShotLog = [];
    casualties = [];

    receiveAttack(coord){
        let ship = this.grid[coord][2];

        if(typeof this.grid[coord][2] == 'object' && this.grid[coord].length < 4){
            ship.hit(); 
            if(ship.sunk){
                this.casualties.push(ship);
            };
            this.grid[coord].push('Hit!');
            updateLog(`${this.name} was Hit!`);
            return "Hit!";
        }
        else if(this.grid[coord][2] == undefined){
            this.grid[coord][2] = 'miss'
            this.missedShotLog.push(coord);
            updateLog(`${this.name} was Missed!`);
            return "Miss!";
        }
        else {
            updateLog('Coordinate already played... Try again');
            return "Try Again";
        }
    }
}

const playerOne = new GameBoard('Player One', 'human');
const playerTwo = new GameBoard('Player Two', undefined);

export {playerOne, playerTwo};