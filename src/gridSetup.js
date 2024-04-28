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

export{setupPlayerGrids}