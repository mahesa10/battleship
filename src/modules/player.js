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

    if (!this.attack([x, y], gameboard)) this.randomAttack();
    else this.attack([x, y], gameboard);
  }
}

export default Player;