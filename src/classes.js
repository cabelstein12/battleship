
    class Ship {
        constructor(length){
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
                console.log('Sunk!');
            }
        }
    }
    
    const ships = [
        new Ship('Carrier', 5),
        new Ship('Battleship',4),
        new Ship('Cruiser', 3),
        new Ship('Submarine',3),
        new Ship('Destroyer',2)
    ]
    
    class GameBoard{
        constructor(){
            this.grid = [];
            for(let x = 0; x < 10; x++){
                for(let y = 0; y < 10; y++){
                    this.grid.push([x,y]);
                }
            }
        }
    
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
            if(this.grid[coord][2] !== undefined){
                ship.hit();
                if(ship.sunk){this.casualties.push(ship)};
                return "Hit!"
            }else{
                this.missedShotLog.push(coord);
                return "Miss!"
            }
        }
    }
    
    const playerOne = new GameBoard();
    const playerTwo = new GameBoard();    
    export {playerOne, playerTwo, ships}