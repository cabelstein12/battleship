const { default: expect } = require('expect');
const game = require('./gameLogic');
let playerOne = game.playerOne;
let GameBoard = game.GameBoard;
let playerTwo = game.playerTwo;

beforeEach(() => {
    playerOne = game.playerOne
  });

  test('players grid should be 100 (10 x 10)', () => {
      expect(playerOne.grid.length).toBe(100);
  });
test('placing a ship vertically should add an object to the grid location', () => {
    playerOne.placeShip(50, "vertical", playerOne.ships[4]);
    expect(typeof playerOne.grid[50][2]).toBe('object');
    expect(typeof playerOne.grid[60][2]).toBe('object');
    expect(typeof playerOne.grid[49][2]).not.toBe('object');
    expect(typeof playerOne.grid[51][2]).not.toBe('object');
    expect(typeof playerOne.grid[53][2]).not.toBe('object');
});

test('placing vertically out of bounds should fail', () => {
    expect(playerOne.placeShip(90,'vertical', playerOne.ships[4])).toBe(false);
    expect(playerOne.placeShip(80,'vertical', playerOne.ships[4])).toBe(true);
})

test.only('placing a ship horizontally should add an object to the grid location', () => {
    playerOne.placeShip(50, "horizontal", playerOne.ships[4]);
    expect(typeof playerOne.grid[51][2]).toBe('object');
    expect(typeof playerOne.grid[49][2]).not.toBe('object');
    expect(typeof playerOne.grid[53][2]).not.toBe('object');
    expect(typeof playerOne.grid[60][2]).not.toBe('object');
});
test('placing a ship horizontally out of bounds should fail', () => {
    expect(playerOne.placeShip(8,'horizontal', playerOne.ships[4])).not.toBe(false);
    expect(playerOne.placeShip(8,'horizontal', playerOne.ships[3])).toBe(false);
    expect(playerOne.placeShip(7,'horizontal', playerOne.ships[3])).toBe(true);

})
test('receiveAttack() logs a hit or a miss', () => {
    playerOne.placeShip(50, "vertical", playerOne.ships[4]);
    expect(playerOne.receiveAttack(50)).toBe('Hit!');
    expect(playerOne.receiveAttack(49)).toBe('Miss!');
    expect(playerOne.missedShotLog[0]).toBe(49)
});
test('when receiveAttack equals length, ship is sunk', () => {
    playerOne.placeShip(50, "vertical", playerOne.ships[4]);
    expect(playerOne.ships[4].sunk).toBe(false)
    playerOne.receiveAttack(50);
    playerOne.receiveAttack(60);
    expect(playerOne.ships[4].sunk).toBe(true)
});
test('when all ships are sunk, game is over', () => {
    playerOne.placeShip(0, "horizontal", playerOne.ships[4]);
    playerOne.placeShip(10, "horizontal", playerOne.ships[3]);
    playerOne.placeShip(20, "horizontal", playerOne.ships[2]);
    playerOne.placeShip(30, "horizontal", playerOne.ships[1]);
    playerOne.placeShip(40, "horizontal", playerOne.ships[0]);
    hits(0, playerOne.ships[4].length);
    hits(10, playerOne.ships[3].length)
    hits(20, playerOne.ships[2].length)
    hits(30, playerOne.ships[1].length);
    hits(40, playerOne.ships[0].length);

    function hits(location, size){
        for(let i = 0; i < size; i++){
            playerOne.receiveAttack(location);
            location++;
        }
    }
    expect(playerOne.casualties.length).toBe(5);
    expect(playerOne.checkDefeat()).toBeTruthy()
})