const playingField = document.querySelector('.playing-field');
const boxes = Array.from(document.querySelectorAll('.box'));
const newGameBtn = document.querySelector('.new-game-btn');
const scoreX = document.querySelector('.score-x');
const scoreO = document.querySelector('.score-o');
let scoreCountO = 0;
let scoreCountX = 0;
let move = 0;
let result = '';
let winner = document.querySelector('.winner');
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Проверка победителя
function checkWinner() {    
    for (i = 0; i < winningCombo.length; i++){
        let a = boxes[winningCombo[i][0]];
        let b = boxes[winningCombo[i][1]];
        let c = boxes[winningCombo[i][2]];
        if (a.innerHTML == 'X' && b.innerHTML == 'X' && c.innerHTML == 'X'){
            result = 1;
            showResult(result);
            scoreUpdate(result);
            a.style.color = b.style.color = c.style.color = 'brown';
            break
        } else if (a.innerHTML == 'O' && b.innerHTML == 'O' && c.innerHTML == 'O'){
            result = 2;
            showResult(result);
            scoreUpdate(result);
            a.style.color = b.style.color = c.style.color = 'brown';
            break
        }  else if (move === 9){
            result = 3;
            showResult(result);
        };
    };
}

// при клике ставит крестик или нолик
function makeMove(e) {
    if (e.target.classList.contains('box') && e.target.innerHTML === '') {
        if (move < 9 && move % 2 === 0) {
            e.target.innerHTML = 'X';
        } else if (move < 9 && move % 2 !== 0){
            e.target.innerHTML = 'O';
        };
        move = move + 1;
    };
    checkWinner();
}

// клик по ячейке 
playingField.addEventListener('click', makeMove);

// обновление счета
function scoreUpdate(player){
    if (player === 1){
        scoreCountX = scoreCountX + 1;
        scoreX.innerHTML = `: ${scoreCountX}`;
    } else if (player === 2){
        scoreCountO = scoreCountO + 1;
        scoreO.innerHTML = `: ${scoreCountO}`;
    }
}

function removePointerEvents(){
    playingField.style.pointerEvents = "none";
}

function returnPointerEvents(){
    playingField.style.pointerEvents = "auto";
}

// отображение победителя
function showResult(victor){
    if (victor === 1) {
        winner.innerHTML = `The winner is Player-X!`;
    } else if (victor === 2){
        winner.innerHTML = `The winner is Player-O!`;
    } else if (victor === 3) {
        winner.innerHTML = `It's a draw!`;
    }
    removePointerEvents();
}

// новая игра
function newGame(){
    boxes.forEach(el => {
        el.innerHTML = '';
        el.style.color = 'aliceblue';
    });
    returnPointerEvents();
    winner.innerHTML = '';
    move = 0;
}

newGameBtn.addEventListener('click', newGame);