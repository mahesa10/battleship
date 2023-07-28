class Player {
  constructor(name) {
    this.name = name;
  }

  attack(coordinate, gameboard) {
    let x = coordinate[0];
    let y = coordinate[1];
    gameboard.receiveAttack(x, y);
  }
}