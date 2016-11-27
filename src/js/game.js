var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('level1', level_one);

game.state.start('level1');
