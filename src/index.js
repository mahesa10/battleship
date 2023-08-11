import './style.css';
import { displayBoardGrid, displayShip } from './modules/DOM';
import { player1, player2, player1Board, player2Board, player1PlaceShip, computerPlaceShip } from './modules/game-controller';

displayBoardGrid();
player1PlaceShip();
displayShip(player1, player1Board);
computerPlaceShip();
displayShip(player2, player2Board);