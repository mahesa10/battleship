class Ship {
  constructor(type, length) {
    this.type = type;
    this.length = length;
    this.hitCount = 0;
  }

  hit() {
    this.hitCount++;
  }

  isSunk() {
    if (this.hitCount === this.length) return true;
    else return false;
  }
}

export default Ship;