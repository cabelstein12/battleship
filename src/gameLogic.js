class Ship {
    constructor(name, length){
        this.name = name;
        this.length = length;
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
            console.log(`Our ${this.name} has sunk, Captain!`);
        }
    }
}

class GameBoard{
    constructor(name){
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
            console.log(`${this.name} LOST`);
            return true;
        }
    }
    ships = [
        new Ship('Carrier', 5),
        new Ship('Battleship', 4),
        new Ship('Cruiser', 3),
        new Ship('Submarine', 3),
        new Ship('Destroyer', 2)
    ]
    placeShip(startIndex, direction = 'horizontal', ship){
        let board = this;
        let lengthCount = ship.length;
        let start = startIndex
        while(lengthCount > 0){
            if(checkValid() == false || this.grid[start][2] !== undefined){
                console.log('invalid location');
                return false;
            }
            this.grid[start].push(ship);
            direction == "horizontal" ? start++ : start = start + 10; 
            lengthCount--;
        }
        return true;
        function checkValid(){
            return (direction == 'horizontal' && board.grid[startIndex][1] + ship.length <= 10) || (direction == 'vertical' && board.grid[startIndex][0] + ship.length <= 10)
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
            console.log('Hit!');
            return "Hit!";
        }
        else if(this.grid[coord][2] == undefined){
            this.grid[coord][2] = 'miss'
            this.missedShotLog.push(coord);
            console.log('Missed!');
            return "Miss!";
        }
        else {
            console.log('Coordinate already played... Try again');
            return "Try Again";
        }
    }
}

function tempPlace(player, start){
    for(let i = 0; i < 5; i++){
        player.placeShip(start + i, "vertical", player.ships[i]);
    }
}
const playerOne = new GameBoard('Player One');
const playerTwo = new GameBoard('Player Two');
// tempPlace(playerOne, 0);
// tempPlace(playerTwo, 0);

function tempAttack(player){
    for(let i = 0; i < 38; i++){
        player.receiveAttack(i)
    }
}
// tempAttack(playerOne);
// tempAttack(playerTwo)

module.exports = {playerOne, playerTwo};