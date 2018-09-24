class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {

    let player = gameState.players[gameState.in_action];
    let startingHandRank = this.playerHoleRank(player);
    let cards = gameState.community_cards;
    let holdingBet = gameState.current_buy_in - player.bet;
    let rank = this.handRank(this.getCards(gameState));


    if (cards.length === 0) {
      if (this.notSameSuit(player.hole_cards) && this.cardsTooFar(player.hole_cards) ||
        this.notSameSuit(player.hole_cards) && this.bothCardTooSmall(player.hole_cards)) {
        bet(0);
      } else {
        if (holdingBet < (player.stack - player.bet) / 8 || startingHandRank > 26) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      }
    } else if (cards.length === 3) {
      if (rank === 1) {
        if (this.isTrue(70)) {
          if (holdingBet < (player.stack - player.bet) / 10) {
            bet(holdingBet);
          } else {
            bet(0);
          }
        } else if (holdingBet < (player.stack - player.bet) / 8) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      } else if (rank < 4) {
        if (holdingBet < (player.stack - player.bet) / 6) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      } else if (rank < 6) {
        if (holdingBet < (player.stack - player.bet) / 5) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      }
    } else if (cards.length === 4) {
      if (rank === 1) {
        if (this.isTrue(90)) {
          if (holdingBet < (player.stack - player.bet) / 12) {
            bet(holdingBet);
          } else {
            bet(0);
          }
        } else {
          bet(holdingBet);
        }
      } else if (rank < 4) {
        if (holdingBet < (player.stack - player.bet) / 5) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      } else if (rank < 6) {
        if (holdingBet < (player.stack - player.bet) / 4) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      }
    } else {
      if (rank === 1) {
        bet(0);
      } else if (rank < 4) {
        if (holdingBet < (player.stack - player.bet) / 2 && this.isTrue(40)) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      } else if (rank < 6) {
        if (holdingBet < (player.stack - player.bet) / 1.5 && this.isTrue(60)) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      }
    }


    bet(this.betRaiseCount(gameState, rank));
  }

  static showdown(gameState) {
  }

  static betRaiseCount(gameState, rank) {
    let minToCheck = gameState.current_buy_in - gameState.players[gameState.in_action].bet;
    let raiseAmount = gameState.minimum_raise * (1 + rank / 10);
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

  static cardsTooFar(cards) {
    return Math.abs(this.getCardValue(cards[0]) - this.getCardValue(cards[1])) > 3;
  }

  static bothCardTooSmall(cards) {
    return this.getCardValue(cards[0]) < 8 && this.getCardValue(cards[1]) < 8;
  }

  static getCards(gameState) {
    let cards = gameState.community_cards.concat(gameState.players[gameState.in_action].hole_cards);
    cards.forEach(card => card.rank = this.getCardValue(card));
    return cards;
  }

  static hasFlush(cards) {
    let suits = cards.filter(card => card.suit);
    let sameSuits = 1;
    suits.forEach(suit => {
      sameSuits = Math.max(suits.filter(card => card === suit).length, sameSuits);
    });
    return sameSuits === 5;
  }

  static hasFullHouse(cards) {
    let counts = this.countRanks(cards);
    return counts.includes(3) && counts.includes(2);
  }

  static hasTwoPairs(cards) {
    return this.countRanks(cards).filter(count => count === 2).length >= 2;
  }

  static howManyOfAKind(cards) {
    return this.countRanks(cards)[0];
  }

  static handRank(cards) {
    if (this.hasRoyalFlush(cards)) return 10;
    if (this.hasStraightFlush(cards)) return 9;
    let sameRanks = this.howManyOfAKind(cards);
    if (sameRanks === 4) return 8;
    if (this.hasFullHouse(cards)) return 7;
    if (this.hasFlush(cards)) return 6;
    if (this.hasStraight(cards)) return 5;
    if (sameRanks === 3) return 4;
    if (this.hasTwoPairs(cards)) return 3;
    if (sameRanks === 2) return 2;
    return 1;
  }

  static countRanks(cards) {
    let rankCount = new Map([...Array(13).keys()].map(n => [n + 2, 0]));
    let ranks = cards.map(card => card.rank);
    ranks.forEach(rank => rankCount.set(+rank, rankCount.get(+rank) + 1));
    return [...rankCount.values()].sort((a, b) => b - a);
  }

  static sortCards(cards) {
    return cards.sort((first, second) => first.rank - second.rank);
  }

  static straight(cards) {
    let straight = {
      hasStraight: true,
      sameSuit: true
    };
    cards = this.sortCards(cards);
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
    let result = this.straight(cards);
    return result.hasStraight && result.sameSuit && (result.highestCard.rank === "14")
  }

  static hasStraightFlush(cards) {
    let result = this.straight(cards);
    return result.hasStraight && result.sameSuit;
  }

  static hasStraight(cards) {
    let result = this.straight(cards);
    return result.hasStraight;
  }
  // Returning true if the random number is less then the @maxChance given as parameter.
  static isTrue(maxChance) {
    return Math.round(Math.random() * 100) < maxChance;
  }

  static playerHoleRank(player) {
    let rank = 0;
    player.hole_cards.forEach(card =>
      rank += this.getCardValue(card));
    return rank;
  }
}

module.exports = Player;
