gameState = {  "community_cards": [                            // Finally the array of community cards.
    {
      "rank": "10",
      "suit": "hearts"
    },
    {
      "rank": "10",
      "suit": "hearts"
    },
    {
      "rank": "10",
      "suit": "hearts"
    },
    {
      "rank": "3",
      "suit": "hearts"
    },
  ],
  "in_action": 0,
  "players": [{
    "hole_cards": [
      {
        "rank": "10",
        "suit": "hearts"
      },
      {
        "rank": "A",
        "suit": "hearts"
      }
    ]
  }]
};

function getCards(gameState) {
  let cards = gameState.community_cards.concat(gameState.players[gameState.in_action].hole_cards);
  cards.forEach(card => card.rank = getCardValue(card));
  console.log(cards);
  return cards;
}

function getCardValue(card) {
  const values = {"J": 11, "Q": 12, "K": 13, "A": 14};
  if (isNaN(card.rank)) {
    return values[card.rank]
  } else {
    return parseInt(card.rank);
  }
}

function sortCards(cards) {
  return cards.sort(function (first, second) {
    return first.rank - second.rank;
  });
}

/*function getCards(gameState) {
  return gameState.community_cards;
}*/

function straight(cards) {
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

function hasStraightFlush(cards) {

}

function hasStraight(cards) {
  let result = straight(cards);
  return result.hasStraight;
}

function hasFlush(cards) {
  result = straight(cards);
  return result.hasStraight && result.sameSuit && (result.highestCard.rank === "14")
}

function hasFullHouse(cards) {
  let counts = countRanks(cards);
  return counts.includes(3) && counts.includes(2);
}

function hasTwoPairs(cards) {
  return this.countRanks(cards).filter(count => count === 2).length >= 2;
}

function howManyOfAKind(cards) {
  return this.countRanks(cards)[0];
}

function handRank(cards) {
  if (this.hasRoyalFlush(cards)) return 10;
  if (this.hasStraightFlush(cards)) return 9;
  let sameRanks = this.howManyOfAKind(cards);
  if (sameRanks === 4) return 8;
  if (this.hasFullHouse(cards)) return 7;
  if (this.hasFlush(cards)) return 6;
  if (hasStraight(cards)) return 5;
  if (sameRanks === 3) return 4;
  if (this.hasTwoPairs(cards)) return 3;
  if (sameRanks === 2) return 2;
  return 1;
}

function countRanks(cards) {
  let rankCount = new Map([...Array(13).keys()].map(n => [n + 2, 0]));
  let ranks = cards.map(card => card.rank);
  ranks.forEach(rank => rankCount.set(+rank, rankCount.get(+rank) + 1));
  return [...rankCount.values()].sort((a, b) => b - a);
}

let cards = getCards(gameState);
cards = sortCards(cards);
let result = straight(cards);

console.log(result);
if (howManyOfAKind(cards) === 4) {
  console.log("There is a straight in the cards")
}
