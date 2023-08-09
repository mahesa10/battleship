class Gameboard {
  constructor() {
    this.board = Array.from(Array(10), () => Array(10).fill(null));
    this.ships = [];
    this.missed = [];
  }

  placeShip(ship, coordinate, axis = 'x') {
    let x = coordinate[0];
    let y = coordinate[1];

    //Return if the coordinate is beyond the board and not empty
    if (axis === 'x') {
      if ((y + ship.length - 1) > 9) return;

      let tempY = y;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][tempY] !== null) return;
        tempY++
      }
    } else {
      if ((x + ship.length - 1) > 9) return;

      let tempX = x;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[tempX][y] !== null) return;
        tempX++
      }
    }


    //Place the ships according to the axis
    if (axis === 'x') {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y] = ship.type;
        y++
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y] = ship.type;
        x++
      }
    }
    
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    if (this.board[x][y] !== null) {
      let attackedShip = this.ships.find(ship => ship.type === this.board[x][y]);
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