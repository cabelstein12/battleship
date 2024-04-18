import './style.css';
import {playerOne, playerTwo, ships} from './classes.js';
// classes();

function component(){
  console.log(ships)
  // 'use strict';

  // console.log(playerOne)
  const content = document.querySelector('.content');
  // console.log(content)
  const currentPlayer = document.querySelector('#currentPlayer').textContent = 'Player One\'s turn'
  const defenseGrid = document.createElement('div');
        defenseGrid.setAttribute('id', 'defense');

  const offenseGrid = document.createElement('div');
        offenseGrid.setAttribute('id', 'offense');

        content.append(defenseGrid);
        content.append(offenseGrid)

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

}

document.body.append(component())
