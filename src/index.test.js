const game = require('./gameLogic');
let playerOne = game.playerOne;
let destroyer = game.destroyer,
carrier = game.carrier,
submarine = game.submarine,
cruiser = game.cruiser,
battleship = game.battleship;

let GameBoard = game.GameBoard

afterEach(() => {
    playerOne = new GameBoard();
})

test('players grid should be 100 (10 x 10)', () => {
    expect(playerOne.grid.length).toBe(100)
});
test('placing a ship horizontally should add an "o" to the grid location', () => {
    playerOne.placeShip(50, "horizontal", destroyer);
    expect(typeof playerOne.grid[50][2]).toBe('object');
    expect(typeof playerOne.grid[51][2]).toBe('object');
    expect(typeof playerOne.grid[49][2]).not.toBe('object');
    expect(typeof playerOne.grid[53][2]).not.toBe('object');
    expect(typeof playerOne.grid[60][2]).not.toBe('object');
});
test('placing a ship vertically should add an "o" to the grid location', () => {
    playerOne.placeShip(50, "vertical", destroyer);
    expect(typeof playerOne.grid[50][2]).toBe('object');
    expect(typeof playerOne.grid[60][2]).toBe('object');
    expect(typeof playerOne.grid[49][2]).not.toBe('object');
    expect(typeof playerOne.grid[51][2]).not.toBe('object');
    expect(typeof playerOne.grid[53][2]).not.toBe('object');
});
test('receiveAttack() logs a hit or a miss', () => {
    playerOne.placeShip(50, "vertical", destroyer);
    expect(playerOne.receiveAttack(50)).toBe('Hit!');
    expect(playerOne.receiveAttack(49)).toBe('Miss!');
    expect(playerOne.missedShotLog[0]).toBe(49)
});
test('when receiveAttack equals length, ship is sunk', () => {
    playerOne.placeShip(50, "vertical", destroyer);
    expect(destroyer.sunk).toBe(false)
    playerOne.receiveAttack(50);
    playerOne.receiveAttack(60);
    expect(destroyer.sunk).toBe(true)
});
test.only('when all ships are sunk, game is over', () => {
    playerOne.placeShip(50, "vertical", destroyer);
    playerOne.placeShip(0, "horizontal", carrier);
    playerOne.placeShip(51, "horizontal", battleship);
    playerOne.placeShip(90, "horizontal", cruiser);
    playerOne.placeShip(14, "vertical", submarine);
    hits(50, destroyer.size);
    hits(0, carrier.size)
    hits(51, battleship.size)
    hits(90, cruiser.size);
    console.log(playerOne.grid)
    expect(playerOne.casualties.length).toBe(5);
})

function hits(location, size){
    for(let i = 0; i < size; i++){
        playerOne.receiveAttack(location);
        location++;
    }
}
