let minRange = 1;
let maxRange = 100;
let secretNumber;
let attempts = 0;
let score = 0;

function setDifficulty(selectedDifficulty) {
    switch (selectedDifficulty) {
        case 'easy':
            minRange = 1;
            maxRange = 50;
            var button1 = document.getElementById('easy');
            var button2 = document.getElementById('medium');
            var button3 = document.getElementById('hard');
            button1.style.backgroundColor = '#27ae60';
            button2.style.backgroundColor = 'transparent';
            button3.style.backgroundColor = 'transparent';
            break;
        case 'medium':
            minRange = 1;
            maxRange = 100;
            var button2 = document.getElementById('easy');
            var button1 = document.getElementById('medium');
            var button3 = document.getElementById('hard');
            button1.style.backgroundColor = '#27ae60';
            button2.style.backgroundColor = 'transparent';
            button3.style.backgroundColor = 'transparent';
            break;
        case 'hard':
            minRange = 1;
            maxRange = 1000;
            var button3 = document.getElementById('easy');
            var button2 = document.getElementById('medium');
            var button1 = document.getElementById('hard');
            button1.style.backgroundColor = '#27ae60';
            button2.style.backgroundColor = 'transparent';
            button3.style.backgroundColor = 'transparent';
            break;
        default:
            break;
    }
    resetGame();
}

function update_score(){
    secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    document.getElementById('score').textContent = score;
    attempts = 0;
    document.getElementById('attempts').textContent = attempts;
    // document.getElementById('sec_num').textContent = secretNumber;
}


function resetGame() {
    secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts = 0;
    score = 0;

    document.getElementById('minRange').textContent = minRange;
    document.getElementById('maxRange').textContent = maxRange;
    document.getElementById('attempts').textContent = attempts;
    // document.getElementById('sec_num').textContent = secretNumber;
    document.getElementById('score').textContent = score;
    document.getElementById('guessInput').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessButton').disabled = false; 
    closeModal();    
}


function checkGuess() {
    const guessInput = document.getElementById('guessInput');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const scoreDisplay = document.getElementById('score');

    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < minRange || userGuess > maxRange) {
        message.textContent = `Please enter a valid number between ${minRange} and ${maxRange}.`;
        return;
    }

    attempts++;

    if (userGuess === secretNumber) {
        score += calculateScore();
        displayModal();
        document.getElementById('modalScore').textContent = score;
        update_score();
    } else {
        message.textContent = userGuess < secretNumber ? 'Too low. Try again!' : 'Too high. Try again!';
    }

    attemptsDisplay.textContent = attempts;
    scoreDisplay.textContent = score;
}

function displayModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    window.onclick = function (event) {
        if (event.target == modal || event.key === ' ' || event.key === 'Enter') {
            closeModal();
        }
    };

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';

    document.body.style.overflow = 'auto';

    window.onclick = null;
}


window.addEventListener('keydown', function (event) {
    if (event.key === ' ' || event.key === 'Enter') {
        closeModal();
    }
});

function calculateScore() {
    const maxScore = 1000;
    const baseScore = maxScore - (attempts - 1) * 10;

    return Math.max(baseScore, 0);
}


document.addEventListener('DOMContentLoaded', function() {
    resetGame();
});

document.getElementById('guessInput').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

function main_menu(){
    window.location.href = '../index.html'
}