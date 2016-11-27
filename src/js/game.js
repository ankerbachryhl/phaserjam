var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

var bar_state = 0;

game.state.add('menu', menu)
game.state.add('level1', level_one);
game.state.add('level2', level_two);
game.state.add('level3', third_level);
game.state.add('won',won);

game.state.start('menu');
