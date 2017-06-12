(function(){
var ROW_COUNT = 6;
var COLUMN_COUNT = 7;
var BUTTON_WIDTH = 80;

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Four in a row', 
  {
    preload : preload,
    create: create, 
    update: update, 
    render: render
  });

var sprites = [];
var coords = [];

var currentDisk;

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#fff';
  
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  // Set the world (global) gravity
  game.physics.arcade.gravity.y = 800;

  game.load.image('blue', 'img/blue-circle.png');
  game.load.image('red', 'img/red-circle.png');

  initCoords();
  initSprites();
}

function initCoords() {
  var intervalX = Math.floor( (game.width - BUTTON_WIDTH * COLUMN_COUNT) / (COLUMN_COUNT + 1) );
  var intervalY = Math.floor( (game.height - BUTTON_WIDTH * ROW_COUNT) / (ROW_COUNT + 1) );
  var interval = Math.min(intervalX, intervalY);
  
  var y = Math.floor(( game.height - BUTTON_WIDTH * ROW_COUNT - interval * (ROW_COUNT - 1) ) / 2);
  for (var i = 0; i < ROW_COUNT; i++) {
    coords[i] = [];
    var x = Math.floor(( game.width - BUTTON_WIDTH * COLUMN_COUNT - interval * (COLUMN_COUNT - 1) ) / 2);
    for (var j = 0; j < COLUMN_COUNT; j++) {
      coords[i][j] = {x: x, y: y};
      x += interval + BUTTON_WIDTH;
    }
    y += interval + BUTTON_WIDTH;
  }
}

function initSprites() {
  for (var i = 0; i < ROW_COUNT; i++) {
    sprites[i] = [];
  }
}

function createDisk(i, j, color) {
  var c = coords[i][j];

  var disk = game.add.sprite(c.x, c.y, color);
  game.physics.enable(disk, Phaser.Physics.ARCADE);
  
  // This makes the game world bounce-able
  disk.body.collideWorldBounds = true;
  disk.body.checkCollision.up = false;
  disk.body.checkCollision.down = false;
  
  // This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
  disk.body.bounce.set(0.1);
  
  // Enables all kind of input actions on this image (click, etc)
  disk.inputEnabled = true;
  disk.input.enableDrag();

  // Input event listeners
  disk.events.onInputDown.add(inputDownListener, disk);
  disk.events.onInputUp.add(inputUpListener, disk);
  disk.events.onDragStart.add(startDrag, this);
  disk.events.onDragStop.add(stopDrag, this);

  sprites[i][j] = disk;
  return disk;
}

function startDrag(sprite) {
  //  You can't have a sprite being moved by physics AND input, so we disable the physics while being dragged
  sprite.body.moves = false;
}

function stopDrag(sprite) {
  //  And re-enable it upon release
  sprite.body.moves = true;
}

function inputDownListener() {
  currentDisk = this;
  
  // remember coordinates where input holds the disk
  currentDisk.holdX = game.input.activePointer.x;
  currentDisk.holdY = game.input.activePointer.y;
}

function inputUpListener() {
  currentDisk = null;
}

function create() {
  for (var i = 0; i < 1; i++) {
    for (var j = 0; j < COLUMN_COUNT; j++) {
      var color = (i+j) % 2 == 0 ? 'blue': 'red';
      createDisk(i, j, color);
    }
  }
}

function update() {
  if (currentDisk) {
//    currentDisk.x = game.input.activePointer.x;
//    currentDisk.y = game.input.activePointer.y;
  }
}

function render() {
//    game.debug.geom(rect, 'rgba(200,0,0,0.5)');
//    game.debug.geom(circle, 'rgba(0,0,255,0.5)');

    //var intersects = Phaser.Circle.intersection(circle, rect);

    //game.debug.geom(intersects, 'rgba(255,255,255,1)');

    //game.debug.pixel( 200, 280, 'rgba(0,0,255,1)' );
    
    //game.debug.pointer( game.input.activePointer );
  }
})();
