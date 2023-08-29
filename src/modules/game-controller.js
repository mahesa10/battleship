import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";

const player1 = new Player('Player 1');
const player2 = new Player('Computer');

let player1Board = new Gameboard();
let player2Board = new Gameboard();

const createShips = () => {
  return [new Ship('Carrier', 5), new Ship('Battleship', 4), new Ship('Destroyer', 3), new Ship('Submarine', 3), new Ship('Patrol Boat', 2)]
}

let [player1Ships, player2Ships] = [createShips(), createShips()];

let winner = null;

const getRandomCoordinate = () => {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);

  return [x, y];
}

const getRandomAxis = () => {
  return Math.random() < 0.5 ? 'x' : 'y';
}

const computerPlaceShip = () => {
  player2Ships.forEach(ship => {
    let shipPlaced = player2Board.placeShip(ship, getRandomCoordinate(), getRandomAxis());
    while (!shipPlaced) {
      shipPlaced = player2Board.placeShip(ship, getRandomCoordinate(), getRandomAxis());
    }
  })
}

const resetGameboards = () => {
  player1Board = new Gameboard();
  player2Board = new Gameboard();
  player1Ships = createShips()
  player2Ships = createShips()
}

const resetWinner = () => {
  winner = null;
}

const getWinner = () => {
  if (player1Board.isAllShipsSunk()) winner = 'Computer';
  else if (player2Board.isAllShipsSunk()) winner = 'Player';
  return winner;
}

export { player1, player2, player1Board, player2Board, player1Ships, computerPlaceShip, resetGameboards, getWinner, resetWinner, getRandomCoordinate }