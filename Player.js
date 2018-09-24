class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    let bid = Math.random() * (gameState.players[in_action].stack / 4);
    bet(gameState.current_buy_in - gameState.players[in_action].bet + Math.max(bid, gameState.minimum_raise));
  }

  static showdown(gameState) {
  }

  static straightFlush(gameState) {
    let cards = gameState.community_cards;
    cards.add(gameState.players[gameState.in_action].hole_cards)
  }
}

module.exports = Player;
