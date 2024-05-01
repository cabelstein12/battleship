export default function handlePlayerChange(){
    const gridBlocker = document.createElement('div');
        gridBlocker.setAttribute('id', 'gridBlocker');
        document.querySelector('.content').append(gridBlocker);

    const clearBlockerButton = document.createElement('button');
          clearBlockerButton.textContent = 'Start Next Move';
          clearBlockerButton.addEventListener('click', () => {
            gridBlocker.remove();
          })
          gridBlocker.append(clearBlockerButton);
} 