import Gameboard from "../scripts/gameboard";
import Ship from "../scripts/ship";

const gameboard = new Gameboard();
const ship = new Ship('Destroyer', 3);
const ship2 = new Ship('Patrol Boat', 2);
const ship3 = new Ship('Battleship', 4);

test('Attack Ship', () => {
  gameboard.placeShip(ship, [3, 6]);
  gameboard.placeShip(ship2, [5, 7]);
  
  gameboard.receiveAttack(3, 6);
  gameboard.receiveAttack(3, 7);

  expect(ship.hitCount).toBe(2);
});

test('Report if all ships have been sunk', () => {
  gameboard.placeShip(ship2, [5, 7]);
  gameboard.placeShip(ship3, [7, 3]);
  
  gameboard.receiveAttack(3, 8);
  gameboard.receiveAttack(5, 7);
  gameboard.receiveAttack(5, 8);
  gameboard.receiveAttack(7, 3);
  gameboard.receiveAttack(7, 4);
  gameboard.receiveAttack(7, 5);
  gameboard.receiveAttack(7, 6);
  
  expect(gameboard.isAllShipsSunk()).toBe(true);

})