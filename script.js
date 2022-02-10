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
function check() {    
    for (i = 0; i < winningCombo.length; i++){
        let a = boxes[winningCombo[i][0]];
        let b = boxes[winningCombo[i][1]];
        let c = boxes[winningCombo[i][2]];
        if (a.innerHTML == 'X' && b.innerHTML == 'X' && c.innerHTML == 'X'){
            result = 'Player-X';
            
            showResult(result);
            scoreUpdate(result);
            a.style.color = 'brown';
            b.style.color = 'brown';
            c.style.color = 'brown';
            break

        } else if (a.innerHTML == 'O' && b.innerHTML == 'O' && c.innerHTML == 'O'){
            result = 'Player-O';
            showResult(result);
            scoreUpdate(result);
            a.style.color = 'brown';
            b.style.color = 'brown';
            c.style.color = 'brown';
            break
        }  else if (move === 8 ){
            winner.innerHTML = "It's a draw!"
        };
    };
    move = move + 1;
}

// при клике ставит крестик или нолик
function makeMove(e) {
    if (e.target.classList.contains('box')) {
        if (move < 9 && move % 2 === 0 && e.target.innerHTML == '') {
            e.target.innerHTML = 'X';
        } else if (move < 9 && move % 2 !== 0 && e.target.innerHTML == ''){
            e.target.innerHTML = 'O';
        } 
    };
    check();
}

// клик по ячейке 
playingField.addEventListener('click', makeMove)

// обновление счета
function scoreUpdate(player){
    if (player === 'Player-X'){
        scoreCountX = scoreCountX + 1;
        scoreX.innerHTML = `: ${scoreCountX}`;
    } else if (player === 'Player-O'){
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
    winner.innerHTML = `The winner is ${victor} !`;
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