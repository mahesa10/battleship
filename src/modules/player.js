class Player {
  constructor(name) {
    this.name = name;
  }

  attack(coordinate, gameboard) {
    let x = coordinate[0];
    let y = coordinate[1];
    gameboard.receiveAttack(x, y);
  }

  randomAttack(gameboard) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    let attacked = gameboard.receiveAttack(x, y);
    if (!attacked) this.randomAttack(gameboard);
  }
}

export default Player;