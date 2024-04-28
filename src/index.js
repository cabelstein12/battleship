import './style.css';
import {playerOne, playerTwo} from './gameLogic.js';

function initGame(){
  let currentPlayer = playerOne;
  let nextPlayer = playerTwo;

  const currentPlayerID = document.querySelector('#currentPlayerID');
        currentPlayerID.textContent = `${currentPlayer.name}, place your ships`;

  const defenseGridElement = document.getElementById('defense');
  const offenseGridElement = document.getElementById('offense');

  createGrid(defenseGridElement);
  createGrid(offenseGridElement);
  
  const defenseGrid = document.querySelector('#defense .grid');
  const attackGrid = document.querySelector('#offense .grid');
  
  const defenseCoordinates = document.querySelectorAll('#defense .coordinate');
  const attackCoordinates = document.querySelectorAll("#offense .coordinate");

  let shipDirection = 'horizontal';
  const playerInfo = document.querySelector('.playerInfo');
  const directionButton = document.createElement('button');
        directionButton.classList.add('directionButton');
        directionButton.textContent = `Place ${shipDirection}ly`;
        directionButton.addEventListener('click', changeShipDirection);
    playerInfo.append(directionButton);
  const placeRandomly = document.createElement('button');
        placeRandomly.textContent = 'Place Randomly';
        placeRandomly.addEventListener('click', () => {
          placeShipsAtRandom();
          generateDefenseGrid(currentPlayer);
          console.log(currentPlayer.grid);
        });
    playerInfo.append(placeRandomly);

  const defenseController = new AbortController();
  beginShipFormation(playerOne);

  function createGrid(parent){
      const coordinateContainer = document.createElement('div');
            coordinateContainer.classList.add('grid');
            parent.append(coordinateContainer);

      for(let i = 0; i < 100; i++){
          let element = document.createElement('div');
          element.classList.add('coordinate');
          element.setAttribute('id', i);
          coordinateContainer.append(element);
      }
  };

  function generateDefenseGrid(player){
    for(let i = 0 ; i < player.grid.length; i++){
      if(player.grid[i].length == 4){
        defenseGrid.children[i].classList.add('hit')
      }
      if(typeof player.grid[i][2] === "object"){
        defenseGrid.children[i].classList.add('occupied');
      }
      if(typeof player.grid[i][2] === 'string'){
        defenseGrid.children[i].classList.add('miss');
      }
    }
  };

  function generateOffenseGrid(player){
    for(let i = 0; i < player.grid.length; i++){
      if(typeof player.grid[i][2] === 'string'){
        attackGrid.children[i].classList.add('noJoy');
      }
      if(player.grid[i].length == 4){
        attackGrid.children[i].classList.add('joy')
      }
    }
  };

  function clearGrid(){
    defenseCoordinates.forEach((e) => {
      e.classList.remove('occupied');
      e.classList.remove('hit');
      e.classList.remove('miss');
    })
    attackCoordinates.forEach((e) => {
      e.classList.remove('joy');
      e.classList.remove('noJoy');
    })
  };

  function updateGameboards(){
    clearGrid();
    generateDefenseGrid(currentPlayer);
    generateOffenseGrid(nextPlayer);
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
    updateGameboards();
  };
  
  function changeShipDirection(){
    shipDirection == 'vertical' ? shipDirection = 'horizontal' : shipDirection = 'vertical'; 
    directionButton.textContent = `Placed ${shipDirection}ly`;
  };

  function placeShipsAtRandom(){
    const binaryRandomNumber = generateRandomNumber(2);
    const inRangeRandomNumber = generateRandomNumber(100);
    while(currentPlayer.ships.length > 0){
      addShipToUi(
        binaryRandomNumber((num) => num == 0 ? 'horizontal' : 'vertical'), 
        inRangeRandomNumber((num) => document.getElementById(num)),
        currentPlayer
      )};
  };
  function addShipToUi(direction, coordinate, player){
    let target = parseInt(coordinate.getAttribute('id'));
    if(player.ships.length > 0){
      let ship = player.ships.shift();
    if(player.placeShip(target, direction, ship) == true){
        generateDefenseGrid(player);
        return;
      }else {
      player.ships.unshift(ship);
      return;
      };
    };
    setUpNextPlayer();
    
  };
  function setUpNextPlayer(){
    console.log(`${currentPlayer.name}'s ships in formation`);
    if(currentPlayer == playerOne){
      changePlayer();
      beginShipFormation(playerTwo);
    }else{
      updateGameboards();
      defenseController.abort();
      placeRandomly.remove();
      directionButton.remove();
      changePlayer();
      startAttacks();
    };
  };

  function beginShipFormation(player){
    currentPlayer = player
    currentPlayerID.textContent = `${player.name}, place your ships`;

    const { signal } = defenseController;
    if(player.type == 'human'){
      defenseCoordinates.forEach((e) => {
        e.addEventListener('click', () => {addShipToUi(shipDirection, e, currentPlayer)}, {signal});
      })
    }else {
      placeShipsAtRandom();
    };
  };
  const randomNumberHistory = [];
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
      playerOne.receiveAttack(inRangeRandomNumber())
    }

    function placeAttack(){
      console.log(currentPlayer.name)
      let target = parseInt(this.getAttribute('id'));
      let attack = nextPlayer.receiveAttack(target);
      if(nextPlayer.checkDefeat()){
        return endGame(attackController);
      }
      if(attack !== "Try Again"){
        if(playerTwo.type == 'human'){
          changePlayer(); 
        }else{
          computerGeneratedAttack();
        }
      }
      updateGameboards();
    }

    attackCoordinates.forEach((e) => {
      e.addEventListener('click', placeAttack, { signal })
      })
  };
  function endGame(abortCntrl){
    console.log("GAME OVER", `${currentPlayer.name} Wins`);
    abortCntrl.abort();
    updateGameboards();
    return;
  };

};
initGame();