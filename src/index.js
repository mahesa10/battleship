import './style.css';
import { displayBoardGrid, displayPlayerShip, playerPlaceShipDOM } from './modules/DOM';
import { player1, player2, player1Board, player2Board, computerPlaceShip } from './modules/game-controller';

displayBoardGrid(player1);
displayBoardGrid(player2);
// player1PlaceShip();
playerPlaceShipDOM()
displayPlayerShip();
computerPlaceShip();