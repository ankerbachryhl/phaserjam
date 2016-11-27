
var menu = {
  create: function() {

    labelText = game.add.text(16, 16, 'Welcome To NINJA CAT!', { fontSize: '32px', fill: '#fff' });
    labelText.fixedToCamera = true;

    labelText1 = game.add.text(16, 100, 'Press 1 to enter level 1!', { fontSize: '32px', fill: '#fff' });
    labelText1.fixedToCamera = true;

    labelText2 = game.add.text(16, 100, 'Press 2 to enter level 2!', { fontSize: '32px', fill: '#fff' });
    labelText2.fixedToCamera = true;

    labelText3 = game.add.text(16, 100, 'Press 3 to enter level 3!', { fontSize: '32px', fill: '#fff' });
    labelText3.fixedToCamera = true;

    var space_key = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    space_key.onDown.addOnce(start, this)

    var two_key = game.input.keyboard.addKey(Phaser.Keyboard.TWO)
    two_key.onDown.addOnce(twostart, this)

    var three_key = game.input.keyboard.addKey(Phaser.Keyboard.THREE)
    three_key.onDown.addOnce(threestart, this)

  }
}

function start() {
  game.state.add('level1', level_one)
  game.state.start('level1')
}

function twostart() {
  game.state.add('level2', level_two)
  game.state.start('level2')
}

function threestart() {
  game.state.add('level3', third_level)
  game.state.start('level3')
}
