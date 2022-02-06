const playingField = document.querySelector('.playing-field');
const players = document.querySelector('.players');
let move = 0;
let result = '';
let winner = document.querySelector('.winner');
const newGameBtn = document.querySelector('.new-game-btn');
const boxes = Array.from(document.querySelectorAll('.box'));
const scoreX = document.querySelector('.score-x');
const scoreO = document.querySelector('.score-o');
let scoreCountO = 0;
let scoreCountX = 0;



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
        if (boxes[winningCombo[i][0]].innerHTML == 'X' && boxes[winningCombo[i][1]].innerHTML == 'X' && boxes[winningCombo[i][2]].innerHTML == 'X'){
            result = 'Player-X';
            showResult(result);
            scoreCountX = scoreCountX + 1;
            scoreX.innerHTML = `: ${scoreCountX}`;
            playingField.style.pointerEvents = "none";


        } else if (boxes[winningCombo[i][0]].innerHTML == 'O' && boxes[winningCombo[i][1]].innerHTML == 'O' && boxes[winningCombo[i][2]].innerHTML == 'O'){
            result = 'Player-O';
            showResult(result);
            scoreCountO = scoreCountO + 1;
            scoreO.innerHTML = `: ${scoreCountO}`;
            playingField.style.pointerEvents = "none";
        }

    };
}

// отображение победителя
function showResult(victor){
    winner.innerHTML = `The winner is ${victor} !`;
}

// клик по клетке
playingField.addEventListener('click', (e) => {
    if (e.target.classList.contains('box') && e.target.innerHTML == '') {
        if (move % 2 === 0) {
            e.target.innerHTML = 'X';
        } else {
            e.target.innerHTML = 'O';
        };
        move = move + 1;
        if (move != 9){
            check();
        } else {
            winner.innerHTML = "It's a draw!"
        }
        
    };
    

})

// новая игра
function newGame(){
    boxes.forEach(el => {
        el.innerHTML = '';
    });
    playingField.style.pointerEvents = "auto";
    winner.innerHTML = '';
    move = 0;
}

newGameBtn.addEventListener('click', newGame);