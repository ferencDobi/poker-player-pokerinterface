class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    let bid = Math.random() * (gameState.players[gameState.in_action].stack / 10);

    let player = gameState.players[gameState.in_action];
    let cards = gameState.community_cards;

    if (this.smallCards(player.hole_cards) && this.notSameSuit(player.hole_cards) && this.cardsToFar(player.hole_cards)) {
      bet(0);
    }

    bet(Math.round(gameState.current_buy_in - gameState.players[gameState.in_action].bet + Math.max(bid, gameState.minimum_raise)));
  }

  static showdown(gameState) {
  }

  static getCardValue(card) {
    const values = {"J": 11, "Q": 12, "K": 13, "A": 14};
    if (isNaN(card.rank)) {
      return values[card.rank]
    } else {
      return parseInt(card.rank);
    }
  }

  static smallCards(cards) {
    return (this.getCardValue(cards[0]) + this.getCardValue(cards[1])) / 2 < 7;
  }

  static notSameSuit(cards) {
    return cards[0].suit !== cards[1].suit;
  }

  static cardsToFar(cards) {
    return Math.abs(this.getCardValue(cards[0]) - this.getCardValue(cards[1])) > 3;
  }

  static getCards(gameState) {
    return gameState.community_cards.concat(gameState.players[gameState.in_action].hole_cards);
  }

  static isRoyalFlush(cards) {

  }

  static howManyOfAKind(cards) {
    let ranks = cards.filter(card => card.rank);
    let sameRanks = 1;
    ranks.forEach(rank => {
      sameRanks = Math.max(ranks.filter(card => card === rank).length, sameRanks);
    });
    return sameRanks;
  }
  static checkThreeOfAKind(gameState) {
    let cards = getCards(gameState);
    return false

  }
}

module.exports = Player;
