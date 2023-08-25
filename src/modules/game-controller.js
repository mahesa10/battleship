import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";

const player1 = new Player('Player 1');
const player2 = new Player('Computer');

const player1Board = new Gameboard();
const player2Board = new Gameboard();

const player1Ships = [new Ship('Carrier', 5), new Ship('Battleship', 4), new Ship('Destroyer', 3), new Ship('Submarine', 3), new Ship('Patrol Boat', 2)];

const player2Ships = [new Ship('Carrier', 5), new Ship('Battleship', 4), new Ship('Destroyer', 3), new Ship('Submarine', 3), new Ship('Patrol Boat', 2)]

const player1PlaceShip = () => {
  player1Board.placeShip(player1Ships[0], [2, 3])
  player1Board.placeShip(player1Ships[1], [3, 2])
  player1Board.placeShip(player1Ships[2], [0, 1])
  player1Board.placeShip(player1Ships[3], [7, 5])
  player1Board.placeShip(player1Ships[4], [8, 3])
}

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

const checkWinner = () => {
  if (player1Board.isAllShipsSunk()) return 'Computer';
  else if (player2Board.isAllShipsSunk()) return 'Player';
}

export { player1, player2, player1Board, player2Board, player1PlaceShip, computerPlaceShip, checkWinner, getRandomCoordinate }