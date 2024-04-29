function getTime(){
    const date = new Date();
    const [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    return `${hours}:${minutes}:${seconds}`;
}
function updateLog(text){
    const newEntry = document.createElement('div');
    newEntry.textContent = `${getTime()}--- ${text}`
    document.getElementById('gameLog').append(newEntry)
}
export { updateLog }
