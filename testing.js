class Test {

  static betRequest(gameState, bet) {

    let player = gameState.players[gameState.in_action];
    let cards = gameState.community_cards;

    let holdingBet = gameState.current_buy_in - player.bet;

    if (cards.length === 0) {
      if (this.smallCards(player.hole_cards) && this.notSameSuit(player.hole_cards) && this.cardsToFar(player.hole_cards) && this.bothCardTooSmall(player.hole_cards)) {
        bet(0);
      }
    } else if (cards.length === 3) {
      if (this.handRank(this.getCards(gameState)) === 1) {
        if (this.isTrue(70)) {
          bet(0);
        } else {
          bet(holdingBet);
        }
      } else if (this.handRank(this.getCards(gameState)) < 4) {
        if (holdingBet < (player.stack - player.bet) / 4) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      }
    } else if (cards.length === 4) {
      if (this.handRank(this.getCards(gameState)) === 1) {
        if (this.isTrue(90)) {
          bet(0);
        } else {
          bet(holdingBet);
        }
      } else if (this.handRank(this.getCards(gameState)) < 4) {
        if (holdingBet < (player.stack - player.bet) / 5) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      }
    } else {
      if (this.handRank(this.getCards(gameState)) === 1) {
        bet(0);
      } else if (this.handRank(this.getCards(gameState)) < 4) {
        if (holdingBet < (player.stack - player.bet) / 2 && this.isTrue(30)) {
          bet(holdingBet);
        } else {
          bet(0);
        }
      }
    }

    bet(holdingBet);
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

  static bothCardTooSmall(cards) {
    return this.getCardValue(cards[0]) < 8 && this.getCardValue(cards[1]) < 8;
  }

  static getCards(gameState) {
    let cards = gameState.community_cards.concat(gameState.players[gameState.in_action].hole_cards);
    cards.forEach(card => card.rank = this.getCardValue(card.rank));
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
}

gameState = {
  "tournament_id":"550d1d68cd7bd10003000003",
  "game_id":"550da1cb2d909006e90004b1",
  "round":0,
  "bet_index":0,
  "small_blind": 10,
  "current_buy_in": 320,
  "pot": 400,
  "minimum_raise": 240,
  "dealer": 1,
  "orbits": 7,
  "in_action": 1,
  "players": [
    {
      "id": 0,
      "name": "Albert",
      "status": "active",
      "version": "Default random player",
      "stack": 1010,
      "bet": 320
    },
    {
      "id": 1,
      "name": "Bob",
      "status": "active",
      "version": "Default random player",
      "stack": 1590,
      "bet": 80,
      "hole_cards": [
        {
          "rank": "6",
          "suit": "hearts"
        },
        {
          "rank": "K",
          "suit": "spades"
        }
      ]
    },
    {
      "id": 2,
      "name": "Chuck",
      "status": "out",
      "version": "Default random player",
      "stack": 0,
      "bet": 0
    }
  ],
  "community_cards": [
    {
      "rank": "4",
      "suit": "spades"
    },
    {
      "rank": "A",
      "suit": "hearts"
    },
    {
      "rank": "6",
      "suit": "clubs"
    }
  ]
};

let value = Test.getCards(gameState);
console.log(value);
