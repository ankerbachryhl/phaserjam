var loadState = {
    preload: function() {
      this.game.load.image('logo', 'images/phaser.png');


      this.game.load.tilemap('mario', '../levels/level final.json', null, Phaser.Tilemap.TILED_JSON)
      this.game.load.image('tiles', '../images/tilesheet.png')
      this.game.load.image('tiles2', '../images/prison.png')
      this.game.load.spritesheet('dude', '../images/standing-lvl1-left2-right-UPSCALED.png', 40, 29);

      //Katte

      this.game.load.image('cat_left', '../images/standing-lvl1-right2left-UPSCALED_FIXED.png', 40, 29)
      this.game.load.spritesheet('cat_right', '../images/standing-lvl1-left2-right-UPSCALED.png', 40, 29);

      //Mad
      this.game.load.image('cake', '../images/cake-UPSCALED.png', 40, 25);

      //Fugl
      this.game.load.image('bird', '../images/fugl.png', 50, 50);

      //Hund
      this.game.load.image('dog', '../images/ny_hund.png', 20, 20);
    },
    create: function() {
      game.state.start('menu')
    }
  }


module.exports = loadState;
