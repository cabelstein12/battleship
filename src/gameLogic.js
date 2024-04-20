class Ship {
    constructor(name, length){
        this.name = name;
        this.length = length;
        this.timesHit = 0;
        this.sunk = false;
    }
    hit(){
        if(!this.sunk){this.timesHit++}
        this.isSunk()
    }
    isSunk(){
        if(this.timesHit == this.length){
            this.sunk = true;
            // console.log(this);
            // console.log(`Our ${this.name} has sunk, Captain!`);
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
            console.log(`${this.name} LOST`)
            return true
        }
    }
    ships = [
        new Ship('Carrier', 5),
        new Ship('Battleship', 4),
        new Ship('Cruiser', 3),
        new Ship('Submarine', 3),
        new Ship('Destroyer', 2)
    ]
    placeShip(startIndex, direction, ship){
        let board = this;
        function checkValid(){
            if(direction == "horizontal"){
                if(board.grid[startIndex + ship.length] !== undefined){
                    return true;
                }
            }
            if(direction == "vertical"){
                if(board.grid[(startIndex + 10) * ship.length] !== undefined){
                    return true;
                }
            }
            return false;
        }
        let lengthCount = ship.length;
        let start = startIndex
        while(lengthCount > 0){
            this.grid[start].push(ship);
            if(direction == 'horizontal' && checkValid()){
                start++;
            }
            if(direction == 'vertical' && checkValid){
                start = start + 10
            }
            lengthCount--;
        }
    }
    missedShotLog = [];
    casualties = [];

    receiveAttack(coord){
        let ship = this.grid[coord][2];
        // console.log(this.checkDefeat)

        if(typeof this.grid[coord][2] == 'object'){
            ship.hit(); 
            if(ship.sunk){
                this.casualties.push(ship)
            };
            this.grid[coord].push('Hit!')
            console.log('Hit!')
            return "Hit!"
        }
        if(this.grid[coord][2]== undefined){
            this.grid[coord][2] = 'miss'
            this.missedShotLog.push(coord);
            console.log('Missed!')
            return "Miss!" 
        }
        else {
            console.log('Coordinate already played...');
            return;
            
        }
    }
}

function tempPlace(player, start){
    for(let i = 0; i < 5; i++){

        player.placeShip(start + i, "vertical", player.ships[i])
    }
}


const playerOne = new GameBoard('Player One');
const playerTwo = new GameBoard('Player Two');

// tempPlace(playerOne, 0);
// tempPlace(playerTwo, 50);

// playerOne.receiveAttack(1);
// playerOne.receiveAttack(10);
// playerOne.receiveAttack(22);
// playerOne.receiveAttack(49);
// playerTwo.receiveAttack(0);
// playerTwo.receiveAttack(5);

module.exports = {playerOne, playerTwo}