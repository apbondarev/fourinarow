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

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#fff';
  
  game.load.image('blue', 'img/blue-circle.png');
  game.load.image('red', 'img/red-circle.png');
}

function create() {
  var intervalX = Math.floor( (game.width - BUTTON_WIDTH * COLUMN_COUNT) / (COLUMN_COUNT + 1) );
  var intervalY = Math.floor( (game.height - BUTTON_WIDTH * ROW_COUNT) / (ROW_COUNT + 1) );
  var interval = Math.min(intervalX, intervalY);
  
  var y = Math.floor(( game.height - BUTTON_WIDTH * ROW_COUNT - interval * (ROW_COUNT - 1) ) / 2);
  for (var i = 0; i < ROW_COUNT; i++) {
    sprites[i] = [];
    var x = Math.floor(( game.width - BUTTON_WIDTH * COLUMN_COUNT - interval * (COLUMN_COUNT - 1) ) / 2);
    for (var j = 0; j < COLUMN_COUNT; j++) {
      ball = game.add.sprite(x, y, (i+j)%2==0 ? 'blue': 'red');
      x += interval + BUTTON_WIDTH;
    }
    y += interval + BUTTON_WIDTH;
  }
}

function update() {
//  circle.x = game.input.activePointer.x;
//  circle.y = game.input.activePointer.y;
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
