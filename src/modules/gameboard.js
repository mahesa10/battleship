class Gameboard {
  constructor() {
    this.board = Array.from(Array(10), () => Array(10).fill(null));
    this.ships = [];
    this.missed = [];
  }

  placeShip(ship, coordinate) {
    let x = coordinate[0];
    let y = coordinate[1];
    let isEmpty = true;

    for (let i = 0; i < ship.length; i++) {
      if (this.board[x][y] !== null) isEmpty = false;
    }

    if (isEmpty === false && (y + ship.length - 1) > 9) return;

    this.ships.push(ship);
    
    for (let i = 0; i < ship.length; i++) {
      this.board[x][y] = ship.type;
      y++
    }

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