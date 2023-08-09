import Ship from "../modules/ship.js";

const ship1 = new Ship('Cruiser', 3);

test('Create Ship', () => {
  expect(ship1).toEqual({
  	type: 'Cruiser',
    length: 3,
    hitCount: 0
  })
})

test('Hit ship', () => {
  ship1.hit()
  expect(ship1.hitCount).toBe(1);
})

test('Sunk ship', () => {
	ship1.hit();
	ship1.hit();
	expect(ship1.isSunk()).toBe(true);
})