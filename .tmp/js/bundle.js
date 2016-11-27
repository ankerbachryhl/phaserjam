(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var draaber;
var dogs;

//Skyder ting

var weapons;

var shootLeft1;
var shootRight1;

var left;

var nextLevel1;


var level_two = {
  preload: function () {

      //Loader assets

      game.load.tilemap('mario', '../levels/leveldims.json', null, Phaser.Tilemap.TILED_JSON)
      game.load.image('tiles21', '../images/durt.png')
      game.load.image('tiles22', '../images/twee.png')

      //Katte

      game.load.spritesheet('cat', '../images/evovle2.png', 65, 54);

      //Mad
      game.load.image('cake', '../images/cake-UPSCALED.png', 40, 25);

      //Fugl
      game.load.image('bird', '../images/vandråbe.png', 50, 50);

      //Hund
      game.load.image('dog', '../images/ny_hund.png', 20, 20);

      //Kastestjerne

      game.load.image('weapon', '../images/dank-star-UPSCALED.png', 20, 20);

      //Bar
      game.load.image('bar-0', '../images/foodbar-stage0_10.png');
      game.load.image('bar-1', '../images/foodbar-stage1_10.png');
      game.load.image('bar-2', '../images/foodbar-stage2_10.png');
      game.load.image('bar-3', '../images/foodbar-stage3_10.png');
      game.load.image('bar-4', '../images/foodbar-stage4_10.png');
      game.load.image('bar-5', '../images/foodbar-stage5_10.png');
      game.load.image('bar-6', '../images/foodbar-stage6_10.png');
      game.load.image('bar-7', '../images/foodbar-stage7_10.png');
      game.load.image('bar-8', '../images/foodbar-stage8_10.png');
      game.load.image('bar-9', '../images/foodbar-stage9_10.png');
      game.load.image('bar-10', '../images/foodbar-stage10_10.png');

      //Door

      game.load.image('dark_door', '../images/lvl2-door-UPSCALED.png')
  },




  create: function () {



    game.stage.backgroundColor = '#63cbf9';

    // Laver tilemap
    map = game.add.tilemap('mario');
    map.addTilesetImage('taskerneslort', 'tiles21');
    map.addTilesetImage('tiles12821', 'tiles22');

    backgroundlayer = map.createLayer('background');
    groundlayer = map.createLayer('Tile Layer 2');

    groundlayer.resizeWorld();
    map.setCollisionBetween(0, 100000, true, 'Tile Layer 2');


    //Spiller

    player = game.add.sprite(50, game.world.centerY, 'cat');
    game.physics.arcade.enable(player);

    //Physics på spiller
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    player.body.velocity.x = 50;
    player.body.collideWorldBounds = true;

    //Animationer
    player.animations.add('left', [2, 4, 6, 8], 10, true)
    player.animations.add('right', [1, 3, 5, 7], 10, true)

    //Lad kameraet følge dem
    game.camera.follow(player);

    //Kage og mad

    stars = game.add.group();
    game.physics.arcade.enable(stars);

    stars.enableBody = true;

    for (var i = 0; i < 50; i++) {
        var number = Math.random() * (500 - 100) + 100;
        var star = stars.create(i * number, 0, 'cake');

        if (star.position.x < 25) {
          star.kill()
        }
        star.body.gravity.y = 200;

        star.body.bounce.y = 0.1;
    }


    //Lav cursors der laver controls
    cursors = game.input.keyboard.createCursorKeys();
    shootLeft1 = game.input.keyboard.addKey(Phaser.Keyboard.X)
    shootRight1 = game.input.keyboard.addKey(Phaser.Keyboard.C)



    //Fugl
    birds = game.add.group();

    game.physics.enable(birds, Phaser.Physics.ARCADE);
    birds.collideWorldBounds = true;

    birds.allowGravity = false;

    //Laver fugle

    draaber = game.add.group();

    game.physics.enable(draaber, Phaser.Physics.ARCADE);

    //Laver fugle

    draaber = game.add.group();
    draaber.enableBody = true;


    //Laver hunden
    dogs = game.add.group();
    dogs.enableBody = true;

    // Spawner hunde
    for (var i = 0; i < 50; i++) {
        var number = Math.random() * (500 - 100) + 100;
        //  Create a star inside of the 'stars' group
        var dog = dogs.create(i * number, 0, 'dog');

        dog.scale.setTo(0.9)

        //  Let gravity do its thing
        dog.body.gravity.y = 200;


        dogTween = game.add.tween(dog).to({
          x: dog.x + 100
        }, 2000, 'Linear', true, 0, 150, true);
      }



    game.physics.enable(dogs, Phaser.Physics.ARCADE);
    dogs.immovable = true;
    dogs.collideWorldBounds = true;

    //Dør
    door1 = game.add.sprite(3120, 719, 'dark_door');

    game.physics.enable(door1, Phaser.Physics.ARCADE)

    //kastetjerne
    weapons = game.add.group()
    weapons.enableBody = true;

    weapons.physicsBodyType = Phaser.Physics.ARCADE;
    weapons.createMultiple(5, 'weapon')

    weapons.setAll('anchor.x', 0.5)
    weapons.setAll('anchor.y', 0.5)

    weapons.setAll('outOfBoundsKill', true)
    weapons.setAll('checkWorldBounds', true)

    setInterval(function() {
      for (var i = 0; i < 150; i++) {
          var number = Math.floor(Math.random() * (2000 - 50 + 1)) + 50;;

          var draabe = draaber.create(i * number, 0, 'bird');

          draabe.body.gravity.y = 100;

          if (draabe.position.x < 25) {
            draabe.kill()
          }
          draabe.checkWorldBounds = true;
          draabe.events.onOutOfBounds.add(boundsKill, this)
          if (draabe.outOfBoundsKill) {
            draabe.kill()

          }

        }
    }, 6000);

    bar = game.add.sprite(400, 50, 'bar-0');
    bar.fixedToCamera = true;
    bar.scale.setTo(5.0)



  },

   update: function() {

     if (bar_state == 10) {
       game.state.add('won', won)
       game.state.start('won')
     }

    //Score
    if (score < 1) {
      bar = game.add.sprite(400, 50, 'bar-0');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 0;
    }

    if (score == 10) {
      bar = game.add.sprite(400, 50, 'bar-1');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 1;
    } else if (score == 20) {
      bar = game.add.sprite(400, 50, 'bar-2');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 2;
    } else if (score == 30) {

      bar = game.add.sprite(400, 50, 'bar-3');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 3;
    } else if (score == 40) {
      bar = game.add.sprite(400, 50, 'bar-4');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 4;
    } else if (score == 50) {
      bar = game.add.sprite(400, 50, 'bar-5');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 5;
    } else if (score == 60) {
      bar = game.add.sprite(400, 50, 'bar-6');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 6;
    } else if (score == 70) {
      bar = game.add.sprite(400, 50, 'bar-7');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 7;
    } else if (score == 80) {
      bar = game.add.sprite(400, 50, 'bar-8');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 8;
    } else if (score == 90) {
      bar = game.add.sprite(400, 50, 'bar-9');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 9;
    } else if (score == 100) {
      bar = game.add.sprite(400, 50, 'bar-10');
      bar.fixedToCamera = true;
      bar.scale.setTo(5.0)
      bar_state = 10;
      evovle = true;
    }



    //Laver tilemaps collisions
    game.physics.arcade.collide(player, groundlayer);
    game.physics.arcade.collide(stars, groundlayer);
    game.physics.arcade.collide(dogs, groundlayer);

    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, dogs, minusScore, null, this);

    game.physics.arcade.overlap(player, door1, nextLevel1, null, this);
    game.physics.arcade.overlap(player, draaber, birdCollide, null, this);

    game.physics.arcade.overlap(weapons, dogs, shootCollide, null, this);

    //Laver controls

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('right')
        left = true;
    }
    else if (cursors.right.isDown) {

        // Gå til højre
        player.body.velocity.x = 150;

        player.animations.play('left')
        left = false;
    }
    else {
        //Stå stille
        player.animations.stop();
    }

    // Forhindre double jumps
    if (cursors.up.isDown && player.body.onFloor()) {
            player.body.velocity.y = -400;
    }

    //Skyd tjek

    shootLeft1.onDown.add(shootLeft, this)
    shootRight1.onDown.add(shootRight, this)

    // if (left == true) {
    //   shoot.onDown.add(shootLeft, this)
    //   console.log('left = true')
    // } else {
    //   shoot.onDown.add(shootRight, this)
    //   console.log('left = false')
    // }




  }

}

function collectStar(player, star) {
    // Removes the star from the screen
    star.kill();
    //  Add and update the score
    score += 10;
}

// function checkDogOverlap(spriteA, spriteB) {
//   var boundsA = spriteA.getBounds();
//   var boundsB = spriteB.getBounds();
//
//   return Phaser.Rectangle.intersects(boundsA, boundsB)
//
// }

function resetPlayer() {
  player.reset(30, 450)
}

function minusScore(player, dog) {
  dog.kill();

  score -= 10;
}

function nextLevel1() {
  nextLevel1 = true;
  game.state.add('level3', third_level)
  game.state.start('level3')
}

function birdCollide() {
  score = 0;
  resetPlayer()
}



function shootCollide(weapon, dog) {
  dog.kill()
}

function shootRight(weapon1) {

  var weapon1 = weapons.create(player.position.x, player.position.y, 'weapon')
  weapon1.body.velocity.x = 200;
  console.log('nu skyder vi til højre')

}

function shootLeft(weapon2) {

  var weapon2 = weapons.create(player.position.x, player.position.y, 'weapon')
  weapon2.body.velocity.x = -200;
  console.log('nu skyder vi til venstre')

}

function shootCollide(weapon, dog) {
  dog.kill()
}

function boundsKill(draabe) {
  draabe.kill()
  console.log("killed drop")
}

},{}]},{},[1]);
