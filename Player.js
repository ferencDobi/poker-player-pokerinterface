class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    let bid = Math.random() * (gameState.players[gameState.in_action].stack / 4);

    bet(gameState.current_buy_in - gameState.players[gameState.in_action].bet + Math.max(bid, gameState.minimum_raise));
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
