import './style.css';
import {playerOne, playerTwo} from './gameLogic.js';
import { updateGameboards, generateDefenseGrid, setupPlayerGrids, clearGrid} from './gameboardManager.js';
import { updateLog } from './eventLog.js';
import handlePlayerChange from './passDeviceHandler.js';
import { setupPlayerControls, chooseOpponent, generateRandomNumber } from './pregameSetup.js';

function component(){
  let currentPlayer = playerOne;
  let nextPlayer = playerTwo;
  let shipDirection = 'horizontal';
  const currentPlayerID = document.querySelector('#currentPlayerID');
      
  setupPlayerGrids();
  setupPlayerControls(currentPlayer, shipDirection, () => {
    placeShipsAtRandom();
    generateDefenseGrid(currentPlayer);
    document.getElementById('currentPlayerID').textContent = `${currentPlayer.name}, click anywhere on your grid to confirm`;
  });
  chooseOpponent(playerTwo);

  const defenseCoordinates = document.querySelectorAll('#defense .coordinate');
  const attackCoordinates = document.querySelectorAll("#offense .coordinate");
  const defenseController = new AbortController();

  beginShipFormation(playerOne);
  
  function changePlayer(){
    if(currentPlayer == playerOne){
      currentPlayer = playerTwo;
      nextPlayer = playerOne;
    }else {
      currentPlayer = playerOne;
      nextPlayer = playerTwo;
    }
    currentPlayerID.textContent = `${currentPlayer.name}'s turn`;
    updateGameboards(currentPlayer, nextPlayer);
  };
  
  function placeShipsAtRandom(){
    const binaryRandomNumber = generateRandomNumber(2);
    const inRangeRandomNumber = generateRandomNumber(100);
    while(currentPlayer.ships.length > 0){
      addShipToUi(
        binaryRandomNumber((num) => num == 0 ? 'horizontal' : 'vertical'), 
        inRangeRandomNumber((num) => document.getElementById(num)),
        currentPlayer,
        true
      )};
  };
  function addShipToUi(direction, coordinate, player, isRandom){
    let target = parseInt(coordinate.getAttribute('id'));
    if(player.ships.length > 0){
      let ship = player.ships.shift();
    if(player.placeShip(target, direction, ship, isRandom) == true){
        generateDefenseGrid(player);
        return;
      }else {
      player.ships.unshift(ship);
      return;
      };
    };
    updateLog(`${currentPlayer.name}'s ships in formation`);
    setUpNextPlayer();
  };

  function setUpNextPlayer(){
    if(currentPlayer == playerOne){
      changePlayer();
      beginShipFormation(playerTwo);
    }else{
      updateGameboards(currentPlayer, nextPlayer);
      changePlayer();
      defenseController.abort();
      document.querySelectorAll('.setupButton').forEach((e) => e.remove())
      startAttacks();
    };
  };

  function beginShipFormation(player){
    currentPlayer = player;
    currentPlayerID.textContent = `${player.name}, place your ships`;

    const { signal } = defenseController;
    if(player.type == 'human'){
      defenseCoordinates.forEach((e) => {
        e.addEventListener('click', () => {addShipToUi(shipDirection, e, currentPlayer)}, {signal});
      });
    }else {
        placeShipsAtRandom();
        setUpNextPlayer();
    };
  };

  function startAttacks(){
    const attackController = new AbortController();
    const { signal } = attackController;

    function computerGeneratedAttack(){
      const inRangeRandomNumber = generateRandomNumber(100);
      let randomNumber = inRangeRandomNumber();
      if(playerOne.receiveAttack(randomNumber) == 'Try Again'){
        computerGeneratedAttack();
      }
    }

    function placeAttack(){
      let target = parseInt(this.getAttribute('id'));
      let attack = nextPlayer.receiveAttack(target);
      if(nextPlayer.checkDefeat()){
        return endGame(attackController);
      }
      if(attack !== "Try Again"){
        if(playerTwo.type == 'human'){
          handlePlayerChange();
          changePlayer(); 
        }else{
            computerGeneratedAttack();
        };
      };
      updateGameboards(currentPlayer, nextPlayer);
    };

    attackCoordinates.forEach((e) => {
      e.addEventListener('click', placeAttack, { signal });
      });
  };

  function endGame(abortCntrl){
    updateLog(`${currentPlayer.name} Wins`);
    document.querySelector('#currentPlayerID').textContent = `GAME OVER ${currentPlayer.name} Wins`
    abortCntrl.abort();
    clearGrid();
    fillBoards()
    function fillBoards(){
      for(let i = 0; i < 100; i++){
          document.querySelector('#defense .grid').children[i].classList.add('gameEnd')
    };
    // updateGameboards(currentPlayer, nextPlayer);
    return;
    };
  };
};
component();