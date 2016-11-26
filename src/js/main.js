

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    //Map
    game.load.tilemap('mario', '../levels/level3.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.image('tiles', '../images/tilesheet.png')
    game.load.spritesheet('dude', '../images/40x40-square.png', 40, 40);
}


var map;
var layer;
var player;
var cursors;
var jumpCount;
var jumpkey;

function create() {

  game.stage.backgroundColor = '#787878';

  //  The 'mario' key here is the Loader key given in game.load.tilemap
  map = game.add.tilemap('mario');

  //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
  //  The second parameter maps this name to the Phaser.Cache key 'tiles'
  map.addTilesetImage('tiles', 'tiles');

  //  Creates a layer from the World1 layer in the map data.
  //  A Layer is effectively like a Phaser.player, so is added to the display list.
  layer = map.createLayer('World1');

  //  This resizes the game world to match the layer dimensions
  layer.resizeWorld();
  map.setCollisionBetween(0, 4, true, 'World1');

  //Before you can use the collide function you need to set what tiles can collide


  //Add the player to the game and enable arcade physics on it
  player = game.add.sprite(50, game.world.centerY, 'dude');
  game.physics.arcade.enable(player);

  //Change the world size to match the size of this layer


  //Set some physics on the player
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.velocity.x = 50;
  player.body.collideWorldBounds = true;


  //Create a running animation for the player and play i

  //Make the camera follow the player
  game.camera.follow(player);

  //Enable cursor keys so we can create some controls
  cursors = game.input.keyboard.createCursorKeys();





}

function update() {

  player.body.velocity.x = 0;

  if (cursors.left.isDown)
  {
      //  Move to the left
      player.body.velocity.x = -150;

      player.loadTexture('cat_left', 0)
  }
  else if (cursors.right.isDown)
  {
      //  Move to the right
      player.body.velocity.x = 150;

      player.animations.play('right');
  }
  else
  {
      //  Stand still
      player.animations.stop();

      player.frame = 4;
  }

  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down)
  {
      player.body.velocity.y = -350;
  }



  game.physics.arcade.collide(player, layer);

  //Make the player jump when the up key is pushed

  if (cursors.up.isDown && player.body.onFloor())

      {
          player.body.velocity.y = -350;
      }



  //tells phaser to fire jumpCheck() ONCE per onDown event.jumpCheck = function(){   if (player.jumpCount < 2){      player.jump();      player.jumpCount ++;   }}

}
