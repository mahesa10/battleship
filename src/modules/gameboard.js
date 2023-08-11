class Gameboard {
  constructor() {
    this.board = Array(10).fill().map(() => Array(10).fill().map(() => ({ shipType: null, isAttacked: false })));
    this.ships = [];
  }

  placeShip(ship, coordinate, axis = 'x') {
    let x = coordinate[0];
    let y = coordinate[1];

    //Return if the coordinate is beyond the board and not empty
    if (axis === 'x') {
      if ((y + ship.length - 1) > 9) return false;

      let tempY = y;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][tempY].shipType !== null) return false;
        tempY++
      }
    } else {
      if ((x + ship.length - 1) > 9) return false;

      let tempX = x;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[tempX][y].shipType !== null) return false;
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

    return true;
  }

  receiveAttack(x, y) {
    if (this.board[x][y].isAttacked) return false;

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