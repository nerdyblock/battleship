import player from "./modules/player";
import "./style/style.css";
import  { createBoardUi, uiPlaceShips } from "./modules/ui"
import hideComputerBoard, { createShipPlacement } from "./helpers/placeShipStage";
import { createGame } from "./helpers/playGame";

const playerOne = player('player1');
const playerTwo = player('player2');

createBoardUi(playerOne.getName());
createBoardUi(playerTwo.getName());

hideComputerBoard();

document.querySelector("body").style.visibility = "visible";

const placeRandomShips = (player) => {
  player.board.randomBoardGenerator();
}

const showShips = (player) => {
  const ships = player.board.ships;
  const playerName = player.getName();
  uiPlaceShips(ships, playerName);
}

placeRandomShips(playerOne);
placeRandomShips(playerTwo);

showShips(playerOne);

const playerOneBoard = document.querySelector('.player1');
const playerTwoBoard = document.querySelector('.player2');

const currentPlayerTurn = document.querySelector('.current-player h1');

const shipPlacement = createShipPlacement(playerOne, playerOneBoard);
shipPlacement.initialize();

document.querySelector('#start-game').addEventListener('click', () => {
  const game = createGame(playerOne, playerTwo, playerOneBoard, playerTwoBoard);
  game.startGame();
});

document.querySelector('#new-game').addEventListener('click', () => {
  location.reload();
  document.querySelector('dialog').close();
})
