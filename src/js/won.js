var won = {
  create: function() {

    labelText = game.add.text(16, 16, 'YOU WON CONGRATS!', { fontSize: '32px', fill: '#fff' });
    labelText.fixedToCamera = true;

    labelText1 = game.add.text(16, 100, 'THANKS FOR PLAYING OUR GAME!', { fontSize: '32px', fill: '#fff' });
    labelText1.fixedToCamera = true;

    labelText2 = game.add.text(16, 200, 'Press 1 for restarting the game at level 1', { fontSize: '32px', fill: '#fff' });
    labelText2.fixedToCamera = true;

    var space_key = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    space_key.onDown.addOnce(start, this)

  }
}

function start() {
  game.state.add('level1', level_one)
  game.state.start('level1')
}
