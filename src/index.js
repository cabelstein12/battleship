import './style.css';
import {playerOne, playerTwo} from './gameLogic.js';


function component(){
  let currentPlayer = playerOne;
  let nextPlayer = playerTwo;

  const content = document.querySelector('.content');
  const currentPlayerID = document.querySelector('#currentPlayerID');
        currentPlayerID.textContent = `${currentPlayer.name}, place your ships`;

  const defenseGridElement = document.getElementById('defense');
  const offenseGridElement = document.getElementById('offense');

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
  }

  createGrid(defenseGridElement);
  createGrid(offenseGridElement);
  
  const defenseGrid = document.querySelector('#defense .grid');
  const attackGrid = document.querySelector('#offense .grid');

  function generateDefenseLayout(player){
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
  }

  function generateOffenseLogs(player){
    for(let i = 0; i < player.grid.length; i++){
      if(typeof player.grid[i][2] === 'string'){
        attackGrid.children[i].classList.add('noJoy');
      }
      if(player.grid[i].length == 4){
        attackGrid.children[i].classList.add('joy')
      }
    }
  }

  const defenseCoordinates = document.querySelectorAll('#defense .coordinate');
  const attackCoordinates = document.querySelectorAll("#offense .coordinate");
  
  function refreshGrid(){
    defenseCoordinates.forEach((e) => {
      e.classList.remove('occupied');
      e.classList.remove('hit');
      e.classList.remove('miss');
    })
    attackCoordinates.forEach((e) => {
      e.classList.remove('joy');
      e.classList.remove('noJoy');
    })
  }

  function updateGameboards(){
    refreshGrid();
    generateDefenseLayout(currentPlayer);
    generateOffenseLogs(nextPlayer);
  }
  
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
  }
  
  let shipDirection = 'vertical';

  function changeShipDirection(){
    shipDirection == 'vertical' ? shipDirection = 'horizontal' : shipDirection = 'vertical'; 
    directionButton.textContent = `Placed ${shipDirection}ly`;
  }

  const playerInfo = document.querySelector('.playerInfo');
  let directionButton = document.createElement('button');
      directionButton.classList.add('directionButton');
      directionButton.textContent = `Place ${shipDirection}ly`;
      directionButton.addEventListener('click', changeShipDirection);
      playerInfo.append(directionButton);
      // document.body.insertBefore(directionButton, content);

  beginShipFormation(playerOne);
  updateGameboards();

  function beginShipFormation(player){
    currentPlayer = player
    currentPlayerID.textContent = `${player.name}, place your ships`;
    const defenseController = new AbortController();
    const { signal } = defenseController;

    defenseCoordinates.forEach((e) => {
      e.addEventListener('click', () => {addShipToUi(shipDirection, e, currentPlayer)}, {signal});
    })

    function addShipToUi(direction, coordinate, player){
      let target = parseInt(coordinate.getAttribute('id'));
      if(player.ships.length > 0){
        let ship = player.ships.shift();
        if(player.placeShip(target, direction, ship) == true){
          generateDefenseLayout(player);
          return;
        }else {
        player.ships.unshift(ship);
        return;
        };
      }else {
        defenseController.abort()
        setUpNextPlayer();
      };
    };
    function setUpNextPlayer(){
      console.log(`${player.name}'s ships in formation`);
      refreshGrid();
      changePlayer();
      if(player == playerOne){
        beginShipFormation(playerTwo);
      }else{
        updateGameboards();
        directionButton.remove();
        startAttacks();
      };
    };
  };

  function startAttacks(){
    const attackController = new AbortController();
    const { signal } = attackController;
    attackCoordinates.forEach((e) => {
      e.addEventListener('click', function(){
          console.log(currentPlayer.name)
          let target = parseInt(this.getAttribute('id'));
          let attack = nextPlayer.receiveAttack(target);
          if(nextPlayer.checkDefeat()){
            return endGame(attackController);
          }
          if(attack !== "Try Again"){
            changePlayer(); 
          }
          updateGameboards();
        }, { signal })
      })
  }
  function endGame(abortCntrl){
    console.log("GAME OVER", `${currentPlayer.name} Wins`);
    abortCntrl.abort();
    updateGameboards();
    return;
  }

}
component();