var game = new Phaser.Game(800, 600, Phaser.AUTO, 'app');

var player;
var textScore;
var score;
var mainSoundtrack;
var obstacles;

var GameState = {

	preload: function() {
		game.load.image('bg', 'assets/img/background.png');

		game.load.image('d1', 'assets/img/d1.png');
		game.load.image('d2', 'assets/img/d2.png');
		game.load.image('d3', 'assets/img/d3.png');
		game.load.image('d4', 'assets/img/d4.png');
		game.load.image('u1', 'assets/img/u1.png');
		game.load.image('u2', 'assets/img/u2.png');
		game.load.image('u3', 'assets/img/u3.png');
		game.load.image('obs', 'assets/img/obs.png');

		game.load.spritesheet('player', 'assets/img/player.png', 45, 45, 4)

		game.load.audio('mainSoundtrack', 'assets/sounds/maintheme.mp3');
	},

	create: function() {
		background = game.add.tileSprite(0, 0, 800, 600, 'bg');
		mainSoundtrack = game.sound.play('mainSoundtrack');
		player = game.add.sprite(45, game.world.centerY, 'player');
		player.animations.add('flying');
		player.animations.play('flying', 10, true);
		score = 0;
		obstacles = game.add.group();

		game.physics.arcade.enable;

		game.physics.arcade.enable(player);
		player.body.gravity.y = 800;

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);
		this.textScore = game.add.text(600, 100, "Score: " + score, { font: "16px Arial", fill: "#ffffff", align: "center" });

		this.timer = game.time.events.loop(3000, this.addRowObstacles, this);
	},

	update: function() {
		background.tilePosition.x -= 1;

		score += 0.1;
		this.textScore.text = "Score: " + Math.round(score);

		if(player.y < 0 || player.y > 600 ) this.gameRestart();

		game.physics.arcade.overlap(player, obstacles, this.gameRestart, null, this);


	},
	jump: function() {
		player.body.velocity.y -= 350;
	},

	createObstacle: function(x, y) {
		var obs = game.add.sprite(x, y, 'obs');
		obstacles.add(obs);
		game.physics.arcade.enable(obs);
		obs.body.velocity.x = -100;

		obs.checWorldBounds = true;
		obs.outOfBoundsKill = true;
	},

	addRowObstacles: function() {
		var hole = Math.floor(Math.random()*7)+1;

		for(var i=0; i<10; i++)
			if(i != hole && i != hole + 1 && i != hole + 2 )
				this.createObstacle(800, i*60 + 10);
	},

	gameRestart: function() {
		mainSoundtrack.destroy();
		game.state.start('GameState');
	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
