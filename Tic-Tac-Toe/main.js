/**
 * Mihael Petričević
 * - Započeo: 14.3.2019.
 * - Završio: 15.3.2019.
 */

// All Win Combinations
var winCombo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [6, 4, 2]
];

console.log(winCombo);

var turn = 'x';
var timesPlayed = 0;
var gameOver = false;

// Clicking on the table version of input
function gridClick(grid) {
    if (invalidValue(grid)) {
        if (!gridUsed(grid)) {
            changeGrid(grid);
        }
        else alert("Position already used!\nTry Again.");
    }
}

// Textbox version of input
function myFunction() {
    var input = document.getElementById("textboxInput").value;

    if (invalidValue(input)) {
        if (!gridUsed(input)) {
            changeGrid(input);
        }
        else alert("Position already used!\nTry Again.");
    }
    else alert("Invalid input!");
}

function gridUsed(input) {
    return (document.getElementById("grid" + input).innerText == 'o' || document.getElementById("grid" + input).innerText == 'x');
}

function invalidValue(input) {
    return input >= 0 && input <= 8;
}

function changeGrid(input) {
    document.getElementById("grid" + input).innerText = turn;
  
    timesPlayed++;

    changeTurn();
    checkWin();
}

function checkWin() {
    for (var i = 0; i < winCombo.length; i++) {
        if (document.getElementById("grid" + winCombo[i][0]).innerText == document.getElementById("grid" + winCombo[i][1]).innerText && document.getElementById("grid" + winCombo[i][1]).innerText == document.getElementById("grid" + winCombo[i][2]).innerText) {
            gameOver = true;

            document.getElementById("grid" + winCombo[i][0]).style.color = 'green';
            document.getElementById("grid" + winCombo[i][1]).style.color = 'green';
            document.getElementById("grid" + winCombo[i][2]).style.color = 'green';

            alert(document.getElementById("grid" + winCombo[i][0]).innerText + " wins!");

            // Make resetBtn visible
            document.getElementById("resetBtn").style.visibility = 'visible';
        }
    }

    // check for tie
    if (!gameOver && timesPlayed === 9) {
        alert("It's a tie!");
        document.getElementById("resetBtn").style.visibility = 'visible';
    }
}

function reset() {
    // Reload page thus reseting it
    location.reload();
}

function changeTurn() {
    if (turn === 'x') turn = 'o';
    else turn = 'x';
}
