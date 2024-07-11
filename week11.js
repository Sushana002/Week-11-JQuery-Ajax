document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'X';
    let grid = document.querySelectorAll('#ticTacToeGrid div');
    let turnIndicator = document.getElementById('turnIndicator');
    let resetButton = document.getElementById('resetButton');
    let winnerMessage = document.getElementById('winnerMessage');

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

        for (let combination of winningCombinations) {
            let [a, b, c] = combination;
            if (grid[a].textContent && grid[a].textContent === grid[b].textContent && grid[a].textContent === grid[c].textContent) {
                return grid[a].textContent;
            }
        }

        return Array.from(grid).every(cell => cell.textContent) ? 'Draw' : null;
    }

    function handleCellClick() {
        if (this.textContent === '' && !winnerMessage.textContent) {
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

    function resetGame() {
        grid.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        turnIndicator.textContent = `${currentPlayer}'s Turn`;
        winnerMessage.textContent = '';
        winnerMessage.classList.add('hidden');
    }

    grid.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});