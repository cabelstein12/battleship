function chooseOpponent(opponent){
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
            opponent.type = 'human';
            popup.remove();
          });
    const computerSelector = document.createElement('button');
          computerSelector.textContent = 'Computer';
          computerSelector.addEventListener('click', () => {
            opponent.type = 'computer';
            popup.remove();
          });
    buttonDiv.append(humanSelector);
    buttonDiv.append(computerSelector);
  };
  
  function setupPlayerControls(player, direction, cb){
    const playerInfo = document.querySelector('.playerInfo');
    const directionButton = document.createElement('button');
          directionButton.classList.add('setupButton');
          directionButton.textContent = `Placed ${direction}ly`;
          directionButton.addEventListener('click', changeShipDirection);
    playerInfo.append(directionButton);

    const autoDeployShipsButton = document.createElement('button');
          autoDeployShipsButton.textContent = 'Auto Place Ships';
          autoDeployShipsButton.classList.add('setupButton');
          autoDeployShipsButton.addEventListener('click', () => {cb(player)});
    playerInfo.append(autoDeployShipsButton);

    function changeShipDirection(){
      direction == 'vertical' ? direction = 'horizontal' : direction = 'vertical'; 
      directionButton.textContent = `Placed ${direction}ly`;
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
  

  export {setupPlayerControls, chooseOpponent, generateRandomNumber}