class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    let bid = Math.random() * (gameState.players[gameState.in_action].stack / 10);

    bet(Math.round(gameState.current_buy_in - gameState.players[gameState.in_action].bet + Math.max(bid, gameState.minimum_raise)));
  }

  static showdown(gameState) {
  }

  static getCards(gameState) {
    return gameState.community_cards.concat(gameState.players[gameState.in_action].hole_cards);
  }

  static isRoyalFlush(gameState) {

  }
}

module.exports = Player;

function checkFourOfAKind(gameState) {
  let cards = 0;
}
