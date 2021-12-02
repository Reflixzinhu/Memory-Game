let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];

    if (card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },
  checkGameOver: function () {
    return this.cards.filter((card) => !card.flipped).length == 0;
  },

  clearCards: function () {
    this.lockMode = false;
    this.firstCard = null;
    this.secondCard = null;
  },

  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  images: [
    "1image",
    "2image",
    "3image",
    "4image",
    "5image",
    "6image",
    "7image",
    "8image",
    "9image",
    "10image",
  ],
  cards: null,
  createCardsFromImages: function () {
    this.cards = [];

    this.images.forEach((image) => {
      this.cards.push(this.createPairFromImages(image));
    });

    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.card;
  },

  createPairFromImages: function (image) {
    return [
      {
        id: this.createIdWithImage(image),
        icon: image,
        flipped: false,
      },
      ,
      {
        id: this.createIdWithImage(image),
        icon: image,
        flipped: false,
      },
    ];
  },

  createIdWithImage: function (image) {
    return image + Math.floor(Math.random() * 1000);
  },
  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  },
};
