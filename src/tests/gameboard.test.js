import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

const gameboard = new Gameboard();
const ship = new Ship('Destroyer', 3);
const ship2 = new Ship('Patrol Boat', 2);
const ship3 = new Ship('Battleship', 4);

describe.only('Place Ship', () => {
  test('Ship is placed on the coordinate', () => {
    gameboard.placeShip(ship, [4, 5], 'y');
    gameboard.placeShip(ship, [0, 5]);
    expect(gameboard.board[4][5]).not.toBe(null);
    expect(gameboard.board[5][5]).not.toBe(null);
    expect(gameboard.board[6][5]).not.toBe(null);
  
    expect(gameboard.board[0][5]).not.toBe(null);
    expect(gameboard.board[0][6]).not.toBe(null);
    expect(gameboard.board[0][7]).not.toBe(null);    
  })
  
  test('Coordinate is beyond the board', () => {
    gameboard.placeShip(ship, [8, 5], 'y');
    expect(gameboard.board[8][5]).toBe(null);    
  })

  test('Coordinate is not empty', () => {
    gameboard.placeShip(ship, [6, 4]);
    expect(gameboard.board[6][4]).toBe(null);
  })
})

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