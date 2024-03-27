let minRange = 1000;
let maxRange = 9999;
let secretPIN;
let attempts = 0;

function moveFocus(input, nextInput) {
    var maxLength = input.getAttribute("maxlength");
    var currentLength = input.value.length;

    if (currentLength >= maxLength) {
        nextInput.focus();
    }
}
function update_score(){
    secretPIN = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    document.getElementById('score').textContent = score;
    attempts = 0;
    document.getElementById('attempts').textContent = attempts;
    // document.getElementById('pin').textContent = secretPIN;
}

function resetPIN() {
    maxRange = 9999;
    minRange = 1000;
    secretPIN = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts = 0;
    score = 0;
    document.getElementById('attempts').textContent = attempts;
    // document.getElementById('pin').textContent = secretPIN;
    document.getElementById('score').textContent = score;
    document.getElementById('message').textContent = '';
    document.getElementById('pinInput1').disabled = false;
    document.getElementById('guessButton').disabled = false;
    
    closeModal();
}

function checkGuess() {
    var pin1 = document.getElementById("pinInput1").value;
    var pin2 = document.getElementById("pinInput2").value;
    var pin3 = document.getElementById("pinInput3").value;
    var pin4 = document.getElementById("pinInput4").value;
    
    var pin = pin1 + pin2 + pin3 + pin4;
    attempts += 1;
    var scPin = secretPIN.toString();
    if (scPin === pin) {
        for (var i = 1; i <= 4; i++) {
            var pinInput = document.getElementById("pinInput" + i);
            pinInput.value = '';
            pinInput.style.backgroundColor = "white";
            pinInput.style.color = "#333";
        }
        if (attempts < 10 ) {
            up_sc = 1000 - attempts*100;
            score += up_sc;
        }
        document.getElementById('modalScore').textContent = up_sc;
        update_score();
        displayModal();
    } else {
        for (var i = 0; i < pin.length; i++) {
            if (scPin[i] === pin[i]) {
                document.getElementById("pinInput" + (i + 1)).style.backgroundColor = "#27ae60";
                document.getElementById("pinInput" + (i + 1)).style.color = "white";
            } else if (scPin.includes(pin[i])) { 
                document.getElementById("pinInput" + (i + 1)).style.backgroundColor = "#F5DD61";
            }else{
                document.getElementById("pinInput" + (i + 1)).style.backgroundColor = "white";
            }
        }
    }
    if (attempts > 10) {
        resetPIN();
    }
    document.getElementById('attempts').textContent = attempts;
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

document.getElementById("pinInput1").addEventListener("input", function() {
    if (document.getElementById("pinInput1").value.length != "") {
        moveFocus(this, document.getElementById("pinInput2"));
    }
});
document.getElementById("pinInput2").addEventListener("input", function() {
    if (document.getElementById("pinInput2").value.length != "") {
        moveFocus(this, document.getElementById("pinInput3"));
    }
});
document.getElementById("pinInput3").addEventListener("input", function() {
    if (document.getElementById("pinInput3").value.length != "") {
        moveFocus(this, document.getElementById("pinInput4"));
    }
});
// Function to focus on the previous input field
function focusPreviousInput(currentInput, previousInput) {
    if (currentInput.value === '') {
        previousInput.focus();
    }
}

// Function to handle keyup events for pin input
function handlePinInput(currentInput, previousInput) {
    return function(event) {
        switch(event.key) {
            case 'Enter':
                checkGuess();
                break;
            case 'Backspace0':
                focusPreviousInput(currentInput, previousInput);
                break;
            default:
                if (event.key.length === 1 && !/[0-9]/.test(event.key)) {
                    event.preventDefault();
                }
                break;
        }
    };
}

// Get input elements
const pinInput4 = document.getElementById('pinInput4');
const pinInput3 = document.getElementById('pinInput3');
const pinInput2 = document.getElementById('pinInput2');
const pinInput1 = document.getElementById('pinInput1');

// Add event listeners to pin inputs
pinInput4.addEventListener('keyup', handlePinInput(pinInput4, pinInput3, null));
pinInput3.addEventListener('keyup', handlePinInput(pinInput3, pinInput2, pinInput4));
pinInput2.addEventListener('keyup', handlePinInput(pinInput2, pinInput1, pinInput3));
pinInput1.addEventListener('keyup', handlePinInput(pinInput1, null, pinInput2));

function showHelp() {
    document.getElementById("helpbox").style.display = "block";
}
function hideHelp() {
    document.getElementById("helpbox").style.display = "none";
    
}
function main_menu(){
    window.location.href = '../index.html'
}


document.addEventListener('DOMContentLoaded', function() {
    resetPIN();
});