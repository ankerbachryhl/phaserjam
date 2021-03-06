var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', '../images/sky.png');
    game.load.image('ground', '../images/platform.png');
    game.load.image('star', '../images/star.png');
    game.load.image('cat_evovle2', '../images/cat_evovle2.png');
    game.load.spritesheet('dude', '../images/dude.png', 32, 48);

    game.load.image('cat_left', '../images/stading-lvl1-right2left.png')

    game.load.image('bird', '../images/bird.png', 40, 40);

    //Map
    this.game.load.tilemap('tilemap', '../levels/level0.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('tiles128', '../images/tilesheet.png')
}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

var enemy;
var bird;
var map;
var backgroundlayer;

function create() {

    //Map

    map = game.add.tilemap('tilemap');
    map.addTilesetImage('tiles128', 'tiles')

    backgroundlayer = this.map.createLayer('BackgroundLayer');
    groundLayer = this.map.createLayer('GroundLayer');

    //Before you can use the collide function you need to set what tiles can collide
    map.setCollisionBetween(1, 100, true, 'GroundLayer');

    //Change the world size to match the size of this layer
    groundLayer.resizeWorld();

    game.camera.follow(player)





    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // enemy = game.add.sprite(20, 0, 'bird')
    // game.physics.arcade.enable(enemy);
    // enemy.enableBody = true;
    // enemy.body.gravity.y = 300;



    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    bird = game.add.sprite(100, 400, 'bird')
    bird.anchor.setTo(0.5, 9.5)

    game.physics.enable(bird, Phaser.Physics.ARCADE);
    bird.body.immovable = true;
    bird.body.collideWorldBounds = true;

    bird.body.allowGravity = false;

    birdTween = game.add.tween(bird).to({
      y: bird.y + 200
    }, 2000, 'Linear', true, 0, 150, true);

}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(enemy, platforms);

    if (game.physics.arcade.collide(player, enemy)) {
      score -= 10;
      scoreText.text = 'Score: ' + score;
    }

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Reset the players velocity (movement)
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

    if (score > 30) {
      evovle2()
    }

    if (score < 30) {
      evovle1()
    }

    //Enemy overlap

    if (checkOverlap(player, bird)) {
      resetPlayer()
    }

}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function evovle2() {
  player.loadTexture('cat_evovle2', 0)
}

function evovle1() {
  player.loadTexture('dude', 0)
}

//Bird

function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB)

}

function resetPlayer() {
  player.reset(0, 450)
}
