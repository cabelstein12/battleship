
function component(){
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
    
    const carrier = new Ship(5), 
    battleship = new Ship(4),
    cruiser = new Ship(3),
    submarine = new Ship(3),
    destroyer = new Ship(2);
    
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
                // console.log(board)
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
                // this.grid[start].push('o');
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
                // console.log(this.missedShotLog)
                return "Miss!"
            }
        }
    }
    
    const playerOne = new GameBoard();
    const playerTwoDefense = new GameBoard();
    // playerOne.placeShip(50, "vertical", destroyer);
    // playerOne.receiveAttack(50);
    // playerOne.receiveAttack(60);
    // console.log(playerOne)
    
    
    module.exports = {playerOne, playerTwoDefense, carrier, battleship, cruiser, destroyer, submarine, GameBoard}
};

// document.body.appendChild(component())