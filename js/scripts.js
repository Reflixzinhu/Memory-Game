const FRONT = 'cardFront';
const BACK = 'cardBack';
const CARD = 'card';
const ICON = 'icon';

startGame();

function startGame() {
  initializeGame(game.createCardsFromImages());
  let gameOverText = document.getElementById('gameOver');
  let n = Math.floor(Math.random() * 10);
  setTimeout(() => {
    if (n >= 1 && n <= 3) {
      gameOverText.firstElementChild.innerText =
        'Parabéns, você completou o jogo.';
    } else if (n >= 4 && n <= 6) {
      gameOverText.firstElementChild.innerText =
        'Você é incrível por ter completado esse jogo.';
    } else if (n >= 7 && n <= 9) {
      gameOverText.firstElementChild.innerText = 'Você completou o jogo :))';
    } else {
      gameOverText.firstElementChild.innerText =
        'Tu ta de parabéns, completou o jogo e ainda tirou o final com 25% de chance.';
    }
  }, 1000);
}

function initializeGame() {
  let gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  game.cards.forEach((card) => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.classList.add(card.icon);

    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, cardElement) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);
  if (face === FRONT) {
    let img = document.createElement('img');
    img.classList.add(ICON);
    img.src = `./assets/${card.icon}.png`;
    cardElementFace.appendChild(img);
  } else {
    cardElementFace.innerHTML = '&lt/&gt';
  }
  cardElement.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip');
    if (game.secondCard) {
      if (game.checkMatch()) {
        let firstCardView = document.getElementById(game.firstCard.id);
        let secondCardView = document.getElementById(game.secondCard.id);

        firstCardView.firstChild.classList.add('matchBorder');
        secondCardView.firstChild.classList.add('matchBorder');
        game.clearCards();
        if (game.checkGameOver()) {
          let gameOverMessage = document.getElementById('gameOver');
          gameOverMessage.classList.remove('hide');
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflipCards();
        }, 500);
      }
    }
  }
}

function restartGame() {
  game.clearCards();
  startGame();
  let gameOverMessage = document.getElementById('gameOver');
  gameOverMessage.classList.add('hide');
}
