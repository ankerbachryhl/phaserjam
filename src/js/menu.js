var menuState = {
  create: function() {
    var nameLabel = game.add.text(80, 80, 'Our AWESOME GAME', { font: '25px Arial', fill: '#ffff'})
    var startLabel = game.add.text(80, game.world.height - 80, 'Press space to start', { font: '25px Arial', fill: '#ffff'})

    var space_key = game.input.keyboard.addKey(Phaser.Keyboard.W)
    space_key.onDown.addOnce(this.start, this)

  },

  start: function() {
    game.state.start('play')
  }
}


module.exports = menuState;
