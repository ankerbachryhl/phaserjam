

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    //Loader assets

    game.load.tilemap('mario', '../levels/level final.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.image('tiles', '../images/tilesheet.png')
    game.load.image('tiles2', '../images/prison.png')
    game.load.spritesheet('dude', '../images/standing-lvl1-left2-right-UPSCALED.png', 40, 29);

    //Katte

    game.load.image('cat_left', '../images/standing-lvl1-right2left-UPSCALED_FIXED.png', 40, 29)
    game.load.spritesheet('cat_right', '../images/standing-lvl1-left2-right-UPSCALED.png', 40, 29);

    //Mad
    game.load.image('cake', '../images/cake-UPSCALED.png', 40, 25);

    //Fugl
    game.load.image('bird', '../images/fugl.png', 50, 50);

    //Hund
    game.load.image('dog', '../images/ny_hund.png', 20, 20
  );
}


var map;
var groundlayer;
var backgroundlayer;
var player;
var cursors;
var jumpCount;
var jumpkey;
var stars;

var score = 0;
var scoreText;

var birds;
var dogs;

function create() {

  game.stage.backgroundColor = '#63cbf9';

  // Laver tilemap
  map = game.add.tilemap('mario');
  map.addTilesetImage('tiles128', 'tiles');
  map.addTilesetImage('tet', 'tiles2');
  backgroundlayer = map.createLayer('Background');
  groundlayer = map.createLayer('Tile Layer 2');

  groundlayer.resizeWorld();
  map.setCollisionBetween(0, 100000, true, 'Tile Layer 2');


  //Spiller

  player = game.add.sprite(50, game.world.centerY, 'dude');
  game.physics.arcade.enable(player);

  //Physics på spiller
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 600;
  player.body.velocity.x = 50;
  player.body.collideWorldBounds = true;

  //Lad kameraet følge dem
  game.camera.follow(player);

  //Kage og mad

  stars = game.add.group();
  game.physics.arcade.enable(stars);

  //  We will enable physics for any star that is created in this group
  stars.enableBody = true;

  //  Here we'll create 12 of them evenly spaced apart
  for (var i = 0; i < 50; i++) {
      var number = Math.random() * (500 - 100) + 100;
      //  Create a star inside of the 'stars' group
      var star = stars.create(i * number, 0, 'cake');

      //  Let gravity do its thing
      star.body.gravity.y = 200;

      //  This just gives each star a slightly random bounce value
      star.body.bounce.y = 0.1;
  }


  //Lav cursors der laver controls
  cursors = game.input.keyboard.createCursorKeys();

  scoreText = game.add.text(16, 16, 'Food: 0', { fontSize: '32px', fill: '#fff' });
  scoreText.fixedToCamera = true;

  //Fugl
  birds = game.add.group();

  game.physics.enable(birds, Phaser.Physics.ARCADE);
  birds.collideWorldBounds = true;

  birds.allowGravity = false;

  //Laver Hunde

  birds = game.add.group();
  birds.enableBody = true;

  for (var i = 0; i < 25; i++) {
      var number = Math.random() * (600 - 150) + 150;
      //  Create a star inside of the 'stars' group
      var bird = birds.create(i * number, 0, 'bird');

      //  Let gravity do its thing
      bird.body.gravity.y = 200;


      birdTween = game.add.tween(bird).to({
        y: bird.y + 270
      }, 2000, 'Linear', true, 0, 150, true);
    }

  dogs = game.add.group();
  dogs.enableBody = true;

  // Spawner hunde
  for (var i = 0; i < 50; i++) {
      var number = Math.random() * (500 - 100) + 100;
      //  Create a star inside of the 'stars' group
      var dog = dogs.create(i * number, 0, 'dog');

      //  Let gravity do its thing
      dog.body.gravity.y = 200;


      dogTween = game.add.tween(dog).to({
        x: dog.x + 100
      }, 2000, 'Linear', true, 0, 150, true);
    }



  game.physics.enable(dogs, Phaser.Physics.ARCADE);
  dogs.immovable = true;
  dogs.collideWorldBounds = true;


}

function update() {

  //Score


  //Laver tilemaps collisions
  game.physics.arcade.collide(player, groundlayer);
  game.physics.arcade.collide(stars, groundlayer);
  game.physics.arcade.collide(dogs, groundlayer);

  game.physics.arcade.overlap(player, stars, collectStar, null, this);
  game.physics.arcade.overlap(player, dogs, minusScore, null, this);

  //Laver controls

  player.body.velocity.x = 0;

  if (cursors.left.isDown)
  {
      //  Move to the left
      player.body.velocity.x = -150;

      player.loadTexture('cat_left', 0)
  }
  else if (cursors.right.isDown)
  {
      // Gå til højre
      player.body.velocity.x = 150;

      player.loadTexture('cat_right', 0)
  }
  else {
      //Stå stille
      player.animations.stop();

      player.frame = 4;
  }

  // Forhindre double jumps
  if (cursors.up.isDown && player.body.onFloor()) {
          player.body.velocity.y = -400;
  }


  if (checkBirdOverlap(player, birds)) {
    score = 0;
    resetPlayer()
  }

}

function collectStar(player, star) {
    // Removes the star from the screen
    star.kill();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Food: ' + score;
}

function checkBirdOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB)
}

// function checkDogOverlap(spriteA, spriteB) {
//   var boundsA = spriteA.getBounds();
//   var boundsB = spriteB.getBounds();
//
//   return Phaser.Rectangle.intersects(boundsA, boundsB)
//
// }

function resetPlayer() {
  player.reset(0, 450)
}

function minusScore(player, dog) {
  dog.kill();

  score -= 10;
  scoreText.text = 'Food: ' + score;
}
