const elements = [];
const boxes = document.getElementsByClassName('single-container');
const displayCurrentPlayer = document.getElementById('current-player');
const p1Score = document.getElementById('player-1-score');
const p2Score = document.getElementById('player-2-score');


let currentPlayer = 1; //1 or 2, 1====>X and 2====> O
displayCurrentPlayer.innerText = "Player 1";
let selectionCountP1 = 0;
let selectionCountP2 = 0;
let anyPlayerWon = false;

let scores = {
  player1: 0,
  player2: 0,
}
let optionPerCell = {
  _11: '',
  _12: '',
  _13: '',
  _21: '',
  _22: '',
  _23: '',
  _31: '',
  _32: '',
  _33: '',
}
for (let eachBox of boxes) {
  eachBox.addEventListener('click', () => {
    let ifAllBoxesFilled = true;
    for (let key of Object.keys(optionPerCell)) {
      if (!optionPerCell[key]) {
        ifAllBoxesFilled = false;
      }
    }
    if (ifAllBoxesFilled) {
      alert(`Even game! Reset board to play again`);
      return;
    }
    if (anyPlayerWon) {
      alert(`Game over! Reset board to play again`);
      return;
    }
    if (!(eachBox.classList.contains('x-mark') || eachBox.classList.contains('o-mark'))) {
      if (currentPlayer === 1) {
        selectionCountP1++;
        eachBox.classList.add('x-mark');
        eachBox.innerHTML = '<i class="fa-solid fa-xmark icon"></i>'
        optionPerCell['_' + eachBox.id] = 'Player1'
      } else {
        selectionCountP2++;
        eachBox.classList.add('o-mark');
        eachBox.innerHTML = '<i class="fa-regular fa-circle icon"></i>'
        optionPerCell['_' + eachBox.id] = 'Player2'
      }
      if (selectionCountP1 > 2 || selectionCountP2 > 2) {
        validateChoices(currentPlayer);
      }

      currentPlayer = currentPlayer === 1 ? 2 : 1;
      displayCurrentPlayer.innerText = currentPlayer === 1 ? "Player 1" : "Player 2";
    } else {
      alert(`Good choice! but that's already taken!`);
    }
  })
}

function resetBoxes() {
  for (let eachBox of boxes) {
    eachBox.innerHTML = '';
    eachBox.classList.remove(`x-mark`);
    eachBox.classList.remove(`o-mark`);
  }
  currentPlayer = 1;
  anyPlayerWon = false;
  optionPerCell = {
    _11: '',
    _12: '',
    _13: '',
    _21: '',
    _22: '',
    _23: '',
    _31: '',
    _32: '',
    _33: '',
  }
  const diagonal = document.querySelector('.diagonal-line');
  const verticalLine = document.querySelector('.vertical-line');
  const horizontalLine = document.querySelector('.horizontal-line');
  diagonal && diagonal.remove();
  verticalLine && verticalLine.remove();
  horizontalLine && horizontalLine.remove();
  displayCurrentPlayer.innerText = "Player 1";
}

function validateChoices() {
  checkDiagonal();
  if (!anyPlayerWon) {
    checkHorizontal();
  }
  if (!anyPlayerWon) {
    checkVertical();
  }
}

function checkDiagonal() {
  const combo1 = ['11', '22', '33'];
  const combo2 = ['13', '22', '31'];
  analyzer({ combo: combo1, type: 'diagonal', position: 1 });
  if (!anyPlayerWon) {
    analyzer({ combo: combo2, type: 'diagonal', position: 2 });
  }
}

function checkHorizontal() {
  const combo1 = ['11', '12', '13'];
  const combo2 = ['22', '21', '23'];
  const combo3 = ['31', '32', '33'];
  analyzer({ combo: combo1, type: 'horizontal', position: 1 });
  if (!anyPlayerWon) {
    analyzer({ combo: combo2, type: 'horizontal', position: 2 });
  }
  if (!anyPlayerWon) {
    analyzer({ combo: combo3, type: 'horizontal', position: 3 });
  }

}

function checkVertical() {
  const combo1 = ['11', '21', '31'];
  const combo2 = ['12', '22', '32'];
  const combo3 = ['13', '23', '33'];
  analyzer({ combo: combo1, type: 'vertical', position: 1 });
  if (!anyPlayerWon) {
    analyzer({ combo: combo2, type: 'vertical', position: 2 });
  }
  if (!anyPlayerWon) {
    analyzer({ combo: combo3, type: 'vertical', position: 3 });
  }
}

function analyzer(payload) {
  let player1Selections = 0;
  let player2Selections = 0;
  let currentPlayerName = '';
  payload.combo.map(combo => {
    if (optionPerCell['_' + combo] === 'Player1') {
      player1Selections++;
      currentPlayerName = 'Player1'
    } else if (optionPerCell['_' + combo] === 'Player2') {
      player2Selections++;
      currentPlayerName = 'Player2'
    }
  })
  if (player1Selections === 3 || player2Selections === 3) {
    const mainContainer = document.getElementsByClassName('game-container');
    if (payload.type === 'horizontal') {
      const horizontalLine = document.createElement("div");
      horizontalLine.classList.add('horizontal-line');
      horizontalLine.style.bottom = payload.position === 1 ? '25rem' : payload.position === 2 ? '15rem' : '5rem';
      mainContainer[0].appendChild(horizontalLine);
    } else if (payload.type === 'vertical') {
      const verticalLine = document.createElement("div");
      verticalLine.classList.add('vertical-line');
      if (payload.position === 3) {
        verticalLine.style.left = '10.1rem';
      } else {
        verticalLine.style.right = payload.position === 1 ? '10.1rem' : '0rem';
      }
      mainContainer[0].appendChild(verticalLine);
    } else if (payload.type === 'diagonal') {
      const diagonal = document.createElement("div");
      diagonal.classList.add('diagonal-line');
      diagonal.style.rotate = payload.position === 1 ? '315deg' : '45deg';
      mainContainer[0].appendChild(diagonal)
    }
    anyPlayerWon = true;
    if (currentPlayerName === 'Player1') {
      scores.player1++;
      p1Score.innerText = scores.player1;
    } else {
      scores.player2++;
      p2Score.innerText = scores.player2;
    }
    console.log(scores)
  }
}
