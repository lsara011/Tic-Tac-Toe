let player1, player2;
let currentPlayer;
let gameActive = true;
window.onload = function() {
    document.getElementById("myModal").style.display = "flex";
};

function closeModal() {
    let alert = document.getElementById("alert");
    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;

    if (player1 === "" || player2 === "") {
        alert.textContent = "Please enter the names for the players.";
    } else {
        let player1name = document.getElementById("player1-name");
        let player2name = document.getElementById("player2-name");
        player1name.textContent = player1;
        player2name.textContent = player2;
        document.getElementById("myModal").style.display = "none";
        currentPlayer = player1
        startGame();
    }
}

const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6] 
];


function startGame() {
    let gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(item => {
        item.textContent = '';
        item.addEventListener('click', handleCellClick, { once: true });
    });

    gameActive = true;
    document.getElementById('player-text').textContent = `It's ${currentPlayer}'s turn (X)`;
}

function handleCellClick(event) {
    const cell = event.target;

    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer === player1 ? 'X' : 'O';

    if (checkWin()) {
        document.getElementById('player-text').textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (isDraw()) {
        document.getElementById('player-text').textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        document.getElementById('player-text').textContent = `It's ${currentPlayer}'s turn (${currentPlayer === player1 ? 'X' : 'O'})`;
    }
}

function checkWin() {
    const gridItems = document.querySelectorAll(".grid-item");
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gridItems[index].textContent === (currentPlayer === player1 ? 'X' : 'O');
        });
    });
}

function isDraw() {
    const gridItems = document.querySelectorAll(".grid-item");
    return [...gridItems].every(item => item.textContent !== '');
}

function clearGrid() {
    resetInput()
    document.getElementById("myModal").style.display = "flex";
    startGame();
}

function resetInput(){
    let reset1 = document.getElementById("player1")
    let reset2 = document.getElementById("player2")
    reset1.value = ""
    reset2.value = ""
}