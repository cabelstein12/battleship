function getTime(){
    const date = new Date();
    const [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    return `${hours}:${minutes}:${seconds}`;
}
const logs = document.querySelector('.logs')
function updateLog(text){
    const newEntry = document.createElement('div');
    newEntry.setAttribute('class', 'entry');
    const time = document.createElement('span');
          time.setAttribute('id', 'time')
          time.textContent = getTime();
    const event = document.createElement('span');
          event.setAttribute('id', 'event')
          event.textContent = text;

    newEntry.append(time);
    newEntry.append(event);
    logs.prepend(newEntry)
}
export { updateLog }
