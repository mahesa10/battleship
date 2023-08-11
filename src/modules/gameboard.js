class Gameboard {
  constructor() {
    this.board = this.createBoard();
    this.ships = [];
    this.missed = [];
  }

  createBoard() {
    let board = [];
    for (let x = 0; x < 10; x++) {
      board[x] = [];
      for (let y = 0; y < 10; y++) {
        board[x][y] = { shipType: null, isAttacked: false };
      }
    }

    return board;
  }

  placeShip(ship, coordinate, axis = 'x') {
    let x = coordinate[0];
    let y = coordinate[1];

    //Return if the coordinate is beyond the board and not empty
    if (axis === 'x') {
      if ((y + ship.length - 1) > 9) return;

      let tempY = y;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][tempY].shipType !== null) return;
        tempY++
      }
    } else {
      if ((x + ship.length - 1) > 9) return;

      let tempX = x;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[tempX][y].shipType !== null) return;
        tempX++
      }
    }


    //Place the ships according to the axis
    if (axis === 'x') {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y].shipType = ship.type;
        y++
      }
    } else if (axis === 'y') {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y].shipType = ship.type;
        x++
      }
    }
    
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    if (this.board[x][y].shipType !== null) {
      let attackedShip = this.ships.find(ship => ship.type === this.board[x][y].shipType);
      attackedShip.hit();
    } else {
      this.missed.push([x, y]);
    }
  }

  isAllShipsSunk() {
    return this.ships.every(ship => ship.isSunk() === true);
  }
}

export default Gameboard;