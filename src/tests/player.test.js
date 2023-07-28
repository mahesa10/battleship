import Player from "../scripts/player";
import Gameboard from "../scripts/gameboard";
import Ship from "../scripts/ship";

const player1 = new Player('Player 1');
const gameboard = new Gameboard();
const ship1 = new Ship('Submarine', 3);

test('Player Attack', () => {
  gameboard.placeShip(ship1, [1, 2]);

  player1.attack([1, 2], gameboard);
  player1.attack([1, 3], gameboard);
  player1.attack([1, 4], gameboard);

  expect(ship1.hitCount).toBe(3);
  expect(ship1.isSunk()).toBe(true);
});