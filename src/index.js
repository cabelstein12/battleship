import './style.css';
import {playerOne, playerTwo, ships} from './gameLogic.js';

function component(){
  // console.log(playerOne)
  // console.log(playerTwo)
  let currentPlayer = playerOne;
  let nextPlayer = playerTwo;
  const content = document.querySelector('.content');
  const currentPlayerID = document.querySelector('#currentPlayerID');
  currentPlayerID.textContent = `${currentPlayer.name}'s turn`;
  const defenseGridElement = document.createElement('div');
        defenseGridElement.setAttribute('id', 'defense');

  const offenseGridElement = document.createElement('div');
        offenseGridElement.setAttribute('id', 'offense');

        content.append(defenseGridElement);
        content.append(offenseGridElement);

  function createGrid(parent, name){
      const gridID = document.createElement('div');
            gridID.textContent = name;
            gridID.classList.add('gridID');
            parent.append(gridID);
      
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
  createGrid(defenseGridElement, "Defensive Armada");
  createGrid(offenseGridElement, "Enemy Waters");
  
  const defenseGrid = document.querySelector('#defense .grid');
  const attackGrid = document.querySelector('#offense .grid');

  function generateDefenseLayout(player){
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

  function updateLogs(){
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
    updateLogs();
  }
  
// console.log(coordinates)
  attackCoordinates.forEach((e) => {
    e.addEventListener('click', function(){
      let target = parseInt(this.getAttribute('id'));
      console.log(target);
      nextPlayer.receiveAttack(target);
      changePlayer(); 
      updateLogs();
    })
  })
  
  // changePlayer();
  updateLogs();

}
component();