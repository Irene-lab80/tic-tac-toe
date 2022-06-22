const playingField = document.querySelector('.playing-field');
const boxes = Array.from(document.querySelectorAll('.box'));
const newGameBtn = document.querySelector('.new-game-btn');
let scoreX = document.querySelector('.score-x');
let scoreO = document.querySelector('.score-o');
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
const audio = new Audio()

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

// звук при клике
function playSound() {
    audio.src = `./sound.mp3`;
    audio.currentTime = 0;
    audio.play();
}

// обновление счета
function scoreUpdate(player){
    if (player === 1){
        scoreCountX = scoreCountX * 1 + 1;
        scoreX.innerHTML = `: ${scoreCountX}`;
        localStorage.setItem('scoreX', scoreCountX);

    } else if (player === 2){
        scoreCountO = scoreCountO * 1 + 1;
        scoreO.innerHTML = `: ${scoreCountO}`;
        localStorage.setItem('scoreO', scoreCountO);
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
        winner.innerText = `The winner is Player-X! 
        Game won in ${move} moves.
        `;
    } else if (victor === 2){
        winner.innerText = `The winner is Player-O! 
        Game won in ${move} moves.
        `;
    } else if (victor === 3) {
        winner.innerText = `It's a draw! It was 
        ${move} moves before a draw.
        `;
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

// local storage
function scoreUpdateRefresh1(score1) {
    scoreX.innerHTML = `: ${score1}`;
} 

function scoreUpdateRefresh2(score2) {
    scoreO.innerHTML = `: ${score2}`;
} 

function getLocalStorage1() {
    if(localStorage.getItem('scoreX')) {
      scoreCountX = localStorage.getItem('scoreX');
      scoreUpdateRefresh1(scoreCountX);
    };
}

function getLocalStorage2() {
    if (localStorage.getItem('scoreO')) {
        scoreCountO = localStorage.getItem('scoreO');
        scoreUpdateRefresh2(scoreCountO)
    }
}
// клик по ячейке 
playingField.addEventListener('click', makeMove);
playingField.addEventListener('click', playSound);

// клик по кнопке новая игра
newGameBtn.addEventListener('click', newGame);

// get local storage при обновлении страницы
window.addEventListener('load', getLocalStorage1);
window.addEventListener('load', getLocalStorage2);