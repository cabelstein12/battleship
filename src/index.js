import './style.css';
import {playerOne, playerTwo} from './gameLogic.js';
import { updateGameboards, generateDefenseGrid } from './gameboardManager.js';
import { setupPlayerGrids } from './gridSetup.js';
import { updateLog } from './eventLog.js';

function component(){
  let currentPlayer = playerOne;
  let nextPlayer = playerTwo;
  let shipDirection = 'horizontal';
  const currentPlayerID = document.querySelector('#currentPlayerID');
      
  setupPlayerGrids();
  setupPlayerControls();
  chooseOpponent();

  const defenseCoordinates = document.querySelectorAll('#defense .coordinate');
  const attackCoordinates = document.querySelectorAll("#offense .coordinate");
  const defenseController = new AbortController();

  beginShipFormation(playerOne);

  function chooseOpponent(){
    const popup = document.createElement('div');
    popup.setAttribute('id', 'popup');
    document.body.append(popup);

    const playerSelectDiv = document.createElement('div');
          playerSelectDiv.setAttribute('id', 'playerQuestion');
          playerSelectDiv.textContent = 'Choose Your Opponent:';
          popup.append(playerSelectDiv);
    const buttonDiv = document.createElement('div');
          buttonDiv.setAttribute('id', 'buttonBar');
    popup.append(buttonDiv);

    const humanSelector = document.createElement('button');
          humanSelector.textContent = 'Human';
          humanSelector.addEventListener('click', () => {
            playerTwo.type = 'human';
            popup.remove();
          });
    const computerSelector = document.createElement('button');
          computerSelector.textContent = 'Computer';
          computerSelector.addEventListener('click', () => {
            playerTwo.type = 'computer';
            popup.remove();
          });
    buttonDiv.append(humanSelector);
    buttonDiv.append(computerSelector);
  };

  function setupPlayerControls(){
    const playerInfo = document.querySelector('.playerInfo');
    const directionButton = document.createElement('button');
          directionButton.classList.add('setupButton');
          directionButton.textContent = `Place ${shipDirection}ly`;
          directionButton.addEventListener('click', changeShipDirection);
    playerInfo.append(directionButton);

    const autoDeployShipsButton = document.createElement('button');
          autoDeployShipsButton.textContent = 'Auto Place Ships';
          autoDeployShipsButton.classList.add('setupButton');
          autoDeployShipsButton.addEventListener('click', () => {
            placeShipsAtRandom();
            generateDefenseGrid(currentPlayer);
            document.getElementById('currentPlayerID').textContent = `${currentPlayer.name}, click anywhere on your grid to confirm`;
          });
    playerInfo.append(autoDeployShipsButton);

    function changeShipDirection(){
      shipDirection == 'vertical' ? shipDirection = 'horizontal' : shipDirection = 'vertical'; 
      directionButton.textContent = `Placed ${shipDirection}ly`;
    };
  };
  
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

  function generateRandomNumber(max){
    const highestNum = max;
    return function randomNum(cb){
      let num = Math.floor(Math.random() * highestNum);
      if(!cb){
        return num;
      }else {
        return cb(num);
      };
    };
  };

  function startAttacks(){
    const attackController = new AbortController();
    const { signal } = attackController;

    function computerGeneratedAttack(){
      const inRangeRandomNumber = generateRandomNumber(100);
      playerOne.receiveAttack(inRangeRandomNumber());
    }

    function placeAttack(){
      let target = parseInt(this.getAttribute('id'));
      let attack = nextPlayer.receiveAttack(target);
      if(nextPlayer.checkDefeat()){
        return endGame(attackController);
      }
      if(attack !== "Try Again"){
        if(playerTwo.type == 'human'){
          changePlayer(); 
        }else{
          setTimeout(() => {
            computerGeneratedAttack();
          }, 500);
        };
      };
      updateGameboards(currentPlayer, nextPlayer);
    };

    attackCoordinates.forEach((e) => {
      e.addEventListener('click', placeAttack, { signal });
      });
  };

  function endGame(abortCntrl){
    updateLog("GAME OVER", `${currentPlayer.name} Wins`);
    abortCntrl.abort();
    updateGameboards(currentPlayer, nextPlayer);
    return;
  };
};
component();
