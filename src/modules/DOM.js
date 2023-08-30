import { player1, player2, player1Board, player2Board, player1Ships, getWinner, resetGameboards, resetWinner, computerPlaceShip } from "./game-controller";

const p1BoardDiv = document.querySelector('.player1-board');
const p2BoardDiv = document.querySelector('.player2-board');
const infoText = document.querySelector('.info-text');
const startButton = document.querySelector('.start-button');
const resetButton = document.querySelector('.reset-button');
const rotateButton = document.querySelector('.rotate-button');

const displayBoardGrid = (player) => {
  let boardDiv = player.name === 'Player 1'? p1BoardDiv : p2BoardDiv;

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const boardGrid = document.createElement('div');
      if (player.name === 'Computer') {
        boardGrid.className = 'board-grid flex justify-center items-center border border-solid border-black hover:bg-sky-200';
      } else {
        boardGrid.className = 'board-grid flex justify-center items-center border border-solid border-black';
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
        coordinateDisplay.classList.add('placed-ship', 'bg-gray-300', 'cursor-not-allowed');
      }
    }
  }
}

const playerPlaceShipDOM = () => {
  if (p1BoardDiv.classList.contains('pointer-events-none')) {
    p1BoardDiv.classList.remove('pointer-events-none')
  }

  const boardGrids = p1BoardDiv.querySelectorAll('.board-grid');
  let i = 0;
  let axis = 'x';
  let forbidden = false;

  rotateButton.addEventListener('click', () => {
    axis = axis === 'x' ? 'y' : 'x';
  })

  boardGrids.forEach(grid => {
    grid.addEventListener('mouseover', (e) => {
      let length = player1Ships[i].length
      let x = Number(e.target.dataset.row);
      let y = Number(e.target.dataset.col);
      let lastHovered = axis === 'x' ? y + length - 1 : x + length - 1;

      if (lastHovered > 9) {
        lastHovered = 9
        p1BoardDiv.classList.add('cursor-not-allowed');
      }

      if (axis === 'x') {
        while (y <= lastHovered) {
          const hoveredGrid = p1BoardDiv.querySelector(`[data-row="${x}"][data-col="${y}"]`);
          hoveredGrid.classList.add('hovered-grid', 'bg-gray-200');
          if (hoveredGrid.classList.contains('placed-ship')) forbidden = true;
          y++
        }
      } else {
        while (x <= lastHovered) {
          const hoveredGrid = p1BoardDiv.querySelector(`[data-row="${x}"][data-col="${y}"]`);
          hoveredGrid.classList.add('hovered-grid', 'bg-gray-200');
          if (hoveredGrid.classList.contains('placed-ship')) forbidden = true;
          x++
        }
      }

      if (forbidden) p1BoardDiv.classList.add('cursor-not-allowed');
    })

    grid.addEventListener('mouseout', () => {
      const hoveredGrid = document.querySelectorAll('.hovered-grid')
      hoveredGrid.forEach(grid => {
        grid.classList.remove('hovered-grid', 'bg-gray-200')
        p1BoardDiv.classList.remove('cursor-not-allowed');
        forbidden = false;
      })
    })

    grid.addEventListener('click', (e) => {
      let x = Number(e.target.dataset.row);
      let y = Number(e.target.dataset.col);
      
      let placeStatus = player1Board.placeShip(player1Ships[i], [x, y], axis);
      if (!placeStatus) return;

      if (i === 4) {
        p1BoardDiv.classList.add('pointer-events-none');
        startButton.disabled = false;
      }

      displayPlayerShip()
      
      i++
    })
  })
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

  if (getWinner()) return;

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

  let winner = getWinner();
  if (winner) {
    displayWinner(winner);
    hideButton(startButton);
    showButton(resetButton);
  };
}

const displayWinner = (winner) => {
  if (winner === 'Player') updateInfoText('You Win !');
  else if (winner === 'Computer') updateInfoText('Computer Wins');
}

const startGame = () => {
  p2BoardDiv.classList.remove('pointer-events-none', 'opacity-30');
  startButton.disabled = true;
  updateInfoText('Your Turn');
  rotateButton.disabled = true;
}

const resetGame = () => {
  p1BoardDiv.innerHTML = '';
  p2BoardDiv.innerHTML = '';
  displayBoardGrid(player1);
  displayBoardGrid(player2);
  resetGameboards();
  resetWinner();
  playerPlaceShipDOM();
  displayPlayerShip();
  computerPlaceShip();
  showButton(startButton);
  hideButton(resetButton);
  disableComputerBoard();
  updateInfoText('Place your ships');
  startButton.disabled = true;
  rotateButton.disabled = false;
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

startButton.addEventListener('click', startGame);

resetButton.addEventListener('click', resetGame);

export { displayBoardGrid, displayPlayerShip, playerPlaceShipDOM }