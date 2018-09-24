class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {

    let player = gameState.players[gameState.in_action];
    let cards = gameState.community_cards;

    let holdingBet = gameState.current_buy_in - player.bet;

    if (cards.length === 0) {
      if (this.smallCards(player.hole_cards) && this.notSameSuit(player.hole_cards) && this.cardsToFar(player.hole_cards)) {
        bet(0);
      }
    }

    let amountToBet = this.betCount(gameState);
    bet(amountToBet);
  }

  static showdown(gameState) {
  }

  static betCount(gameState) {
    let bid = Math.random() * (gameState.players[gameState.in_action].stack / 10);
    let amount = Math.round(gameState.current_buy_in - gameState.players[gameState.in_action].bet + Math.max(bid, gameState.minimum_raise));
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

  static howManyOfAKind(cards) {
    let ranks = cards.filter(card => card.rank);
    let sameRanks = 1;
    ranks.forEach(rank => {
      sameRanks = Math.max(ranks.filter(card => card === rank).length, sameRanks);
    });
    return sameRanks;
  }

  static sortCards(cards) {
    return cardsArray = cards.sort(function (first, second) {
      return first.rank - second.rank;
    });
  }

  static straight(cards) {
    let straight = {
      hasStraight: true,
      sameSuit: true
    };
    cards = sortCards(cards);
    let card = cards[0];
    cards.forEach(currentCard => {
      if (currentCard !== card) {
        if (parseInt(card.rank) + 1 !== parseInt(currentCard.rank)) {
          straight.hasStraight = false;
        } else if (card.suit !== currentCard.suit) {
          straight.sameSuit = false;
        }
      }
      card = currentCard;
    });
    straight.highestCard = card;
    return straight;
  }

  static hasRoyalFlush(cards) {
    result = straight(cards);
    return result.hasStraight && result.sameSuit && (result.highestCard.rank === "14")
  }

  static hasStraightFlush(cards) {
    let result = straight(cards);
    return result.hasStraight && result.sameSuit;
  }

  static hasStraight(cards) {
    let result = straight(cards);
    return result.hasStraight;
  }
  // Returning true if the random number is less then the @maxChance given as parameter.
  static isTrue(maxChance) {
    return Math.round(Math.random() * 100) < maxChance;
  }
}

module.exports = Player;
