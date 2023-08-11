const boards = document.querySelectorAll('.board');

const displayBoardGrid = () => {
  boards.forEach(item => {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const boardGrid = document.createElement('div');
        boardGrid.className = 'border border-solid border-black';
        boardGrid.setAttribute('data-row', x);
        boardGrid.setAttribute('data-col', y);
        item.appendChild(boardGrid);
      }
    }
  })
}

export { displayBoardGrid }