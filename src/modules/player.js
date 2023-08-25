class Player {
  constructor(name) {
    this.name = name;
  }

  attack(coordinate, gameboard) {
    let x = coordinate[0];
    let y = coordinate[1];
    return gameboard.receiveAttack(x, y);
  }

  randomAttack(gameboard) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let attackStatus = this.attack([x, y], gameboard);
    while (!attackStatus) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      attackStatus = this.attack([x, y], gameboard);
    }

    return { attackStatus, coordinate: [x, y] }
  }
}

export default Player;