import { uiFire, uiShowSunkShip, uiShowSunkShipCount, uiShowWinner } from "../modules/ui";

export function createGame(player1, player2, playerOneBoard, playerTwoBoard) {
  let currentPlayer = player1;
  let opponentPlayer = player2;

  function startGame() {
    removeDraggable();
    hideButtons();
    showComputerBoard();
    displayTurn();
    displayShipCount();
    hideCurrentBoard();
    playerTwoBoard.addEventListener('click', handlePlayerClick);
  }

  function removeDraggable() {
    const draggable = document.querySelectorAll('[draggable="true"]');
    draggable.forEach(item => {
      item.setAttribute('draggable', false);
    });
  }

  function hideButtons() {
    document.querySelector('.button-container').style.display = "none";
  }

  function showComputerBoard() {
    const computerBoard = document.querySelector('.enemy-waters');
    computerBoard.style.display = "block";
  }

  function displayTurn() {
    const turnDiv = document.querySelector('.content__text')
    if(currentPlayer.getName() === 'player1')
      turnDiv.innerHTML = "YOUR turn"
    else 
      turnDiv.innerHTML = "COMPUTER's turn"
  }

  function sunkenShip(pos, player) {
    const index = player.board.checkforShip(pos);
    if(index !== -1) {
      const firedShip = player.board.ships[index];
      if(firedShip.isSunk())  {
        uiShowSunkShip(firedShip, player.getName());
        uiShowSunkShipCount(player.getName());
      }
    }
  }

  function displayShipCount() {
    document.querySelector('.ship-count-container').style.visibility = "visible";
  }

  function randomFire(player) {
    const firedLocation = player.board.getRandomFirePosition();
    const attackMsg = player.fire(firedLocation);
    const uiFiredLocation = document.querySelector(`[data-location="${firedLocation}"]`);
  
    const isHit = uiFire(uiFiredLocation, attackMsg);
    if(isHit)
      sunkenShip(firedLocation, player);
  }

  function fireOpponentBoard(e, player) {
    const location = e.target.dataset.location;
    
    if(location !== undefined) {
      const pos = location.split(',').map(Number);
      const attackMsg = player.fire(pos);
  
      const isHit = uiFire(e.target, attackMsg);
      if(isHit)
        sunkenShip(pos, player);
    }
  }

  function hideCurrentBoard() {
    const currentPlayerBoard = currentPlayer.getName() === 'player1' ? playerOneBoard : playerTwoBoard;
    const opponentPlayerBoard = currentPlayer.getName() === 'player1' ? playerTwoBoard : playerOneBoard;

    currentPlayerBoard.style.opacity = 0.5;
    currentPlayerBoard.style.pointerEvents = "none";

    opponentPlayerBoard.style.opacity = 1;
    opponentPlayerBoard.style.pointerEvents = "initial";
  }

  function switchPlayer () {
    currentPlayer = currentPlayer === player1 ? player2 : player1; 
    opponentPlayer = opponentPlayer === player1 ? player2 : player1; 
    hideCurrentBoard();
    displayTurn();
  }

  function disableBoardListeners() {
    playerOneBoard.removeEventListener('click', handlePlayerClick);
    playerTwoBoard.removeEventListener('click', handlePlayerClick);
  }

  function gameOver() {
    if (currentPlayer.isGameOver()) {
      uiShowWinner(opponentPlayer.getName());
      disableBoardListeners();
      return true;
    }

    return false;
  }

  function computerTurn() {
    if (currentPlayer === player2) {
      randomFire(opponentPlayer);

      if (!gameOver())
        switchPlayer();
    }
  }

  function handlePlayerClick(e) {
    if (!e.target.classList.contains('missed') && !e.target.classList.contains('damaged')) {
      fireOpponentBoard(e, opponentPlayer);

      if (!gameOver()) {
        switchPlayer();
        setTimeout(computerTurn, 1000);
      }
    }
  }

  return {
    startGame
  };
}