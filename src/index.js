import './style.css';
import { displayBoardGrid, displayPlayerShip, playerPlaceShipDOM } from './modules/DOM';
import { player1, player2, computerPlaceShip } from './modules/game-controller';

displayBoardGrid(player1);
displayBoardGrid(player2);
playerPlaceShipDOM();
displayPlayerShip();
computerPlaceShip();