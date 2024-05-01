
function generateDefenseGrid(player){
    const defenseGrid = document.querySelector('#defense .grid');
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
    const attackGrid = document.querySelector('#offense .grid');
    for(let i = 0; i < player.grid.length; i++){
      if(typeof player.grid[i][2] === 'string'){
        attackGrid.children[i].classList.add('noJoy');
      };
      if(player.grid[i].length == 4){
        attackGrid.children[i].classList.add('joy')
      };
    };
  };

  function clearGrid(){
    const defenseCoordinates = document.querySelectorAll('#defense .coordinate');
    const attackCoordinates = document.querySelectorAll("#offense .coordinate");    
    defenseCoordinates.forEach((e) => {
      e.classList.remove('occupied');
      e.classList.remove('hit');
      e.classList.remove('miss');
    });
    attackCoordinates.forEach((e) => {
      e.classList.remove('joy');
      e.classList.remove('noJoy');
    });
  };

  function updateGameboards(currentPlayer, nextPlayer){
    clearGrid();
    generateDefenseGrid(currentPlayer);
    generateOffenseGrid(nextPlayer);
  };
  function setupPlayerGrids(){
    const defenseGridElement = document.getElementById('defense');
    const offenseGridElement = document.getElementById('offense');
    
    createGrid(defenseGridElement);
    createGrid(offenseGridElement);
  }

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

  export {updateGameboards, generateDefenseGrid, setupPlayerGrids , clearGrid};