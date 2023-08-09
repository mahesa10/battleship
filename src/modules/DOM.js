const boards = document.querySelectorAll('.board');

const displayBoardGrid = () => {
  boards.forEach(item => {
    for (let i = 0; i < 100; i++) {
      const boardGrid = document.createElement('div');
      boardGrid.className = 'border border-solid border-black';
      item.appendChild(boardGrid);
    }
  })
}

export { displayBoardGrid }