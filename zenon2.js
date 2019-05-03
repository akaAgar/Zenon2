var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    antialias: false,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);

var keyUp, keyDown, keyLeft, keyRight;

var imgBackground, imgPlayer, imgTitle, imgBriefing, imgBonus;

function preload ()
{
  this.load.image('background', 'bg.png');
  this.load.image('title', 'title.png');
  this.load.image('player', 'player.png');
  this.load.image('briefing', 'briefing.png');
  this.load.image('bonus', 'bonus.png');

  this.load.audio('theme', [ 'theme.ogg','theme.mp3' ]);
}

function create ()
{
  // Create sprites
  imgBackground = this.add.image(0, -600, 'background').setOrigin(0);
  imgBonus = this.add.image(400, 300, 'bonus').setOrigin(0);
  imgPlayer = this.add.image(384, 492, 'player').setOrigin(0);
  imgTitle = this.add.image(199, 8, 'title').setOrigin(0);
  imgBriefing = this.add.image(256, 553, 'briefing').setOrigin(0);

  keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

  var music = this.sound.add("theme");
  music.volume = 0.35; music.loop = true;
  music.play();
}

function update()
{
  imgBackground.y++;
  if (imgBackground.y > 0) imgBackground.y -= 600;

  var moveDir = new Phaser.Math.Vector2(0, 0);
  var moveCount = 0;
  
  if (keyUp.isDown) { moveDir.y = -1; moveCount++; }
  else if (keyDown.isDown) { moveDir.y = 1; moveCount++; }
  if (keyLeft.isDown) { moveDir.x = -1; moveCount++; }
  else if (keyRight.isDown) { moveDir.x = 1; moveCount++; }
  
  if (moveCount > 0)
  {
    if (moveCount == 2) moveDir = moveDir.scale(0.7071);

    var speed = 8;
    var speedMult = Math.max(0.01, Math.pow(imgPlayer.x - 384, 2) + Math.pow(imgPlayer.y - 284, 2));
    if (speedMult < 3000) speedMult = 0; else speedMult /= 30000;
    speed *= speedMult;
    if (speed < 0.1)
    {
      if (
          (keyLeft.isDown && !keyRight.isDown && (imgPlayer.x < 384)) ||
          (keyRight.isDown && !keyLeft.isDown && (imgPlayer.x > 384)) ||
          (keyUp.isDown && !keyDown.isDown && (imgPlayer.y < 284)) ||
          (keyDown.isDown && !keyUp.isDown && (imgPlayer.y > 284))
         ) speed = 0.1;
    }
    if (speed > 8) speed = 8;

    moveDir = moveDir.scale(speed);
    imgPlayer.x += moveDir.x;
    imgPlayer.y += moveDir.y;

    imgPlayer.x = Math.max(0, Math.min(736, imgPlayer.x));
    imgPlayer.y = Math.max(0, Math.min(536, imgPlayer.y));
  }
}