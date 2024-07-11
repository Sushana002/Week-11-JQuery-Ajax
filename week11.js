//Variable to track the current player ('X' or 'O'). 
// Select all the cells in the tic-tac-toe grid. 
// Select the element that displays whose turn it is. 
// Selecting a reset button and the element for the winner message. 

document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'X';
    let grid = document.querySelectorAll('#ticTacToeGrid div');
    let turnIndicator = document.getElementById('turnIndicator');
    let resetButton = document.getElementById('resetButton');
    let winnerMessage = document.getElementById('winnerMessage');

//Creating a function fort a winner/draw, and showing all possible outcomes. 

    function checkWinner() {
        let winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
//Checking the winning combination. 
        for (let combination of winningCombinations) {
            let [a, b, c] = combination;
        // If all three cells in a combination are equal and not empty, we have a winner. 
            if (grid[a].textContent && grid[a].textContent === grid[b].textContent && grid[a].textContent === grid[c].textContent) {
                return grid[a].textContent;
            }
        }
// If no winner is selected, then it's a draw. 
        return Array.from(grid).every(cell => cell.textContent) ? 'Draw' : null;
    }

// A function to handle a clicked cell. 
    function handleCellClick() {
        if (this.textContent === '' && !winnerMessage.textContent) {
        // Set the cell's text to the current player's symbol ('X' or 'O'). Also check to see if there's a winner or draw. 
        // If there is a winner, display the winner. 
            this.textContent = currentPlayer;
            let winner = checkWinner();
            if (winner) {
                winnerMessage.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`;
                winnerMessage.classList.remove('hidden');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                turnIndicator.textContent = `${currentPlayer}'s Turn`;
            }
        }
    }
// Creating a function for the reset button in the game. 
    function resetGame() {
    // Clear all cells. Reset to 'X'. Update who's turn indication. 
        grid.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        turnIndicator.textContent = `${currentPlayer}'s Turn`;
     // Clear the winner message and hide it. 
        winnerMessage.textContent = '';
        winnerMessage.classList.add('hidden');
    }

// Add an even listener for 'click' for each cell. And adding an event-listener for reset button. 
    grid.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});