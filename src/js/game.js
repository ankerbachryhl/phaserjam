var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('level1', level_one);
game.state.add('level2', second_level);
game.state.add('level3', third_level);

game.state.start('level2');
