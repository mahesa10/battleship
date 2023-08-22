import './style.css';
import { displayBoardGrid, displayComputerShip, displayPlayerShip } from './modules/DOM';
import { player1, player2, player1Board, player2Board, player1PlaceShip, computerPlaceShip } from './modules/game-controller';

displayBoardGrid(player1);
displayBoardGrid(player2);
player1PlaceShip();
displayPlayerShip();
computerPlaceShip();
displayComputerShip();