let statusDisplay = document.querySelector('.game-control'); 

let gameActive  = true; 

let currentPlayer = "X"; 

let gameState = ["", "", "", "", "", "", "", "", "",]; 

let winnerMessage = () => `Player ${currentPlayer} has won!`; 
let drawMessage = () => `Game ended in a draw!`; 
let currentPlayerTurn = () => `It's ${currentPlayer}'s turn`; 

statusDisplay.innerHTML = currentPlayerTurn(); 

document.querySelector('.cell').forEach(cell => cell.addEventListener('click', handleCellClick)); 
document.querySelector('.game-reset').addEventListener('click', handleRestartGame); 

function handleCellClick(clickCellEvent) {
    let clickedCell = clickCellEvent.target; 
    let clickCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    ); 

    if (gameState[clickCellIndex] !== "" || !gameActive) {
        return; 
    }

    handleCellPlayed(clickedCell, clickCellIndex); 
    handleResultValidation(); 

}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer; 
    clickedCell.innerHTML = currentPlayer; 
}

let winnerConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; 
function handleResultValidation() {
    let roundWon = false; 
    for (let i = 0; i <= 7; i++) {
        let winnerCondition = winnerConditions[i]; 
        let a = gameState[winnerCondition[0]]; 
        let b = gameState[winnerCondition[1]]; 
        let c = gameState[winnerCondition[2]]; 
        if (a== '' || b === '' || c === '') {
            continue; 
        }
        if (a === b && b === c) {
            roundWon = true; 
            break
        }
    }
if (roundWon) {
    statusDisplay.innerHTML = winnerMessage(); 
    gameActive = false; 
    return; 
}

let roundDraw = !gameState.includes(""); 
if (roundWon) {
    statusDisplay.innerHTML = drawMessage(); 
    gameActive = false; 
    return; 
    }
    handlePlayerChange(); 
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; 
    statusDisplay.innerHTML = currentPlayerTurn(); 
}

function handleRestartGame() {
    gameActive = true; 
    currentPlayer = "X"; 
    gameState = ["", "", "", "", "", "", "", "", "", ""]; 
    statusDisplay.innerHTML = currentPlayerTurn(); 
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = ""); 
}