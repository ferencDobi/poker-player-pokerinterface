gameState = {  "community_cards": [                            // Finally the array of community cards.
    {
      "rank": "9",
      "suit": "hearts"
    },
    {
      "rank": "13",
      "suit": "hearts"
    },
    {
      "rank": "12",
      "suit": "hearts"
    },
    {
      "rank": "11",
      "suit": "hearts"
    },
    {
      "rank": "10",
      "suit": "hearts"
    },
    {
      "rank": "14",
      "suit": "hearts"
    }
  ]
};


function sortCards(cards) {
  return cards.sort(function (first, second) {
    return first.rank - second.rank;
  });
}

function getCards(gameState) {
  return gameState.community_cards;
}

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


let cards = getCards(gameState);
cards = sortCards(cards);
let result = straight(cards);

console.log(result);
if (hasFlush(cards)) {
  console.log("There is a straight in the cards")
}
