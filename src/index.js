import './style.css';
import {playerOne, playerTwo, ships} from './gameLogic.js';

function component(){
  console.log(playerOne)
  let currentPlayer = playerOne;
  let nextPlayer = playerTwo;
  const content = document.querySelector('.content');
  const currentPlayerID = document.querySelector('#currentPlayerID');
  currentPlayerID.textContent = `${currentPlayer.name}'s turn`;
  const defenseGrid = document.createElement('div');
        defenseGrid.setAttribute('id', 'defense');

  const offenseGrid = document.createElement('div');
        offenseGrid.setAttribute('id', 'offense');

        content.append(defenseGrid);
        content.append(offenseGrid);

  function createGrid(parent, name){
      const gridID = document.createElement('div');
        gridID.textContent = name;
        gridID.classList.add('gridID');
        parent.append(gridID);

      const coordinateContainer = document.createElement('div');
      coordinateContainer.classList.add('grid')
      parent.append(coordinateContainer)
      for(let i = 0; i < 100; i++){
          let element = document.createElement('div');
          element.classList.add('coordinate');
          coordinateContainer.append(element);
      }
  }
  createGrid(defenseGrid, "Defensive Armada");
  createGrid(offenseGrid, "Enemy Waters");


  function generateDefenseLayout(player){
    const defenseGrid = document.querySelector('#defense .grid');
    for(let i = 0 ; i < player.grid.length; i++){
      if(typeof player.grid[i][2] === "object"){
        defenseGrid.children[i].classList.add('occupied');
      }
      if(typeof player.grid[i][2] === 'string'){
        defenseGrid.children[i].classList.add('miss');
      }
      if(player.grid[i].length == 4){
        defenseGrid.children[i].classList.add('hit')
      }
    }
  }
  function generateAttackLogs(player){
    const attackGrid = document.querySelector('#offense .grid');
    for(let i = 0; i < player.grid.length; i++){
      if(typeof player.grid[i][2] === 'string'){
        attackGrid.children[i].classList.add('noJoy');
      }
      if(player.grid[i].length == 4){
        attackGrid.children[i].classList.add('joy')
      }
  }
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
  }
  // changePlayer();
  function updateLogs(){
    generateDefenseLayout(currentPlayer);
    generateAttackLogs(nextPlayer);
  }
  updateLogs();
}
component();

// document.body.append(component())
