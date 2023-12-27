let minRange = 1000;
let maxRange = 9999;
let secretPIN;
let attempts = 0;


function resetPIN() {
    maxRange = 9999;
    minRange = 1000;
    secretPIN = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts = 0;
    score = 0;
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('pin').textContent = secretNumber;
    document.getElementById('score').textContent = score;
    document.getElementById('pinInput1').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('pinInput1').disabled = false;
    document.getElementById('guessButton').disabled = false; 
    closeModal();
}