import { player1, player2, player1Board, player2Board, checkWinner, player1PlaceShip, computerPlaceShip } from "./game-controller";

const p1BoardDiv = document.querySelector('.player1-board');
const p2BoardDiv = document.querySelector('.player2-board');
const infoText = document.querySelector('.info-text');
const startButton = document.querySelector('.start-button');
const resetButton = document.querySelector('.reset-button');

const displayBoardGrid = (player) => {
  let boardDiv = player.name === 'Player 1'? p1BoardDiv : p2BoardDiv;

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const boardGrid = document.createElement('div');
      if (player.name === 'Computer') {
        boardGrid.className = 'flex justify-center items-center border border-solid border-black hover:bg-sky-200';
      } else {
        boardGrid.className = 'flex justify-center items-center border border-solid border-black';
      }
      boardGrid.setAttribute('data-row', x);
      boardGrid.setAttribute('data-col', y);

      if (player.name === 'Computer') {
        boardGrid.addEventListener('click', () => {
          attackShipDOM(player1, [x, y]);
          setTimeout(() => {
            attackShipDOM(player2)
          }, 500);
        })
      }

      boardDiv.appendChild(boardGrid);
    }
  }

}

const displayPlayerShip = () => {
  let boardToDisplay = p1BoardDiv;
  let gameboard = player1Board;

  for (let x = 0; x < gameboard.board.length; x++) {
    for (let y = 0; y < gameboard.board.length; y++) {
      if (gameboard.board[x][y].shipType !== null) {
        const coordinateDisplay = boardToDisplay.querySelector(`[data-row="${x}"][data-col="${y}"]`)
        coordinateDisplay.className += ' bg-gray-300'
      }
    }
  }
}

const displayAttackedCoordinate = (boardDiv, coordinate, attackStatus) => {
  let [x, y] = [...coordinate]
  let coordinateDiv = boardDiv.querySelector(`[data-row="${x}"][data-col="${y}"]`);
  let bulletDiv = document.createElement('div');
  bulletDiv.className = 'h-3/6 w-3/6 rounded-full bg-black';
  coordinateDiv.appendChild(bulletDiv);

  if (attackStatus === 'hit'){
    coordinateDiv.classList.add('bg-red-400')
  }

  coordinateDiv.classList.add('pointer-events-none')
}

const attackShipDOM = (player, coordinate = null) => {
  let [x, y] = coordinate ? coordinate : [null, null];
  let boardDiv, attackedBoard;

  if (player.name === 'Player 1') {
    boardDiv = p2BoardDiv;
    attackedBoard = player2Board;
  } else if (player.name === 'Computer') {
    boardDiv = p1BoardDiv;
    attackedBoard = player1Board;
  }

  if (checkWinner()) return;

  let attackStatus, text;
  if (player.name === 'Player 1') {
    attackStatus = player.attack([x, y], attackedBoard);
    text = 'Computer Turn';
  } else if (player.name === 'Computer') {
    let comAttack = player.randomAttack(attackedBoard);
    attackStatus = comAttack.attackStatus;
    [x, y] = comAttack.coordinate;
    text = 'Your Turn';
  }

  displayAttackedCoordinate(boardDiv, [x, y], attackStatus);

  updateInfoText(text);

  let winner = checkWinner();
  if (winner) {
    displayWinner(winner);
    hideButton(startButton);
    showButton(resetButton);
  };
}

const displayWinner = (winner) => {
  if (winner === 'Player') updateInfoText('You Win !');
  else if (winner === 'Computer') updateInfoText('Computer Win');
}

const startGame = () => {
  p2BoardDiv.classList.remove('pointer-events-none', 'opacity-30');
  startButton.disabled = true;
  updateInfoText('Your Turn');
}

const resetGame = () => {
  p1BoardDiv.innerHTML = '';
  p2BoardDiv.innerHTML = '';
  displayBoardGrid(player1);
  displayBoardGrid(player2);
  player1PlaceShip();
  displayPlayerShip();
  computerPlaceShip();
  showButton(startButton);
  hideButton(resetButton);
  disableComputerBoard();
}

const hideButton = (btn) => {
  btn.classList.add('hidden');
}

const showButton = (btn) => {
  btn.classList.remove('hidden');
  if (btn.disabled) btn.disabled = false;
}

const disableComputerBoard = () => {
  p2BoardDiv.classList.add('pointer-events-none', 'opacity-30');
}

const updateInfoText = (text) => {
  infoText.innerText = text
}

(function() {
  startButton.addEventListener('click', () => { startGame() });
})();

(function() {
  resetButton.addEventListener('click', () => { resetGame() });
})();

export { displayBoardGrid, displayPlayerShip }