class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {

    let player = gameState.players[gameState.in_action];
    let cards = gameState.community_cards;

    if (cards.length === 0) {
      if (this.smallCards(player.hole_cards) && this.notSameSuit(player.hole_cards) && this.cardsToFar(player.hole_cards)) {
        bet(0);
      }
    }

    if (gameState.current_buy_in - gameState.players[gameState.in_action].bet > 400) {
      bet(0);
    }

    bet(this.betRaiseCount(gameState, this.handRank(this.getCards(gameState))));
  }

  static showdown(gameState) {
  }

  static betRaiseCount(gameState, handRank) {
    let minToCheck = gameState.current_buy_in - gameState.players[gameState.in_action].bet;
    let raiseAmount = gameState.minimum_raise * (1 + handRank / 10);
    let amount = Math.round(minToCheck + raiseAmount);
    return amount
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
    let cards = gameState.community_cards.concat(gameState.players[gameState.in_action].hole_cards);
    return cards.map(card => this.getCardValue(card.rank));
  }

  static hasRoyalFlush(cards) {
    if (!this.hasFlush()) return false;
    return false; // TODO
  }

  static hasFlush(cards) {
    let suits = cards.filter(card => card.suit);
    let sameSuits = 1;
    suits.forEach(suit => {
      sameSuits = Math.max(suits.filter(card => card === suit).length, sameSuits);
    });
    return sameSuits === 5;
  }

  static howManyOfAKind(cards) {
    let ranks = cards.filter(card => card.rank);
    let sameRanks = 1;
    ranks.forEach(rank => {
      sameRanks = Math.max(ranks.filter(card => card === rank).length, sameRanks);
    });
    return sameRanks;
  }

  // Returning true or false if the random number is less then the @maxChance given as parameter.
  static getChance(maxChance) {
    return Math.round(Math.random() * 100);
  }
}

module.exports = Player;
