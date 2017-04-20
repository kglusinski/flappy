var game = new Phaser.Game(800, 600, Phaser.AUTO, 'app');

var player;
var textScore;
var score;

var GameState = {
	//var background;

	preload: function() {
		game.load.image('bg', 'assets/img/background.png');
		game.load.image('d1', 'assets/img/d1.png');
		game.load.image('d2', 'assets/img/d2.png');
		game.load.image('d3', 'assets/img/d3.png');
		game.load.image('d4', 'assets/img/d4.png');
		game.load.image('u1', 'assets/img/u1.png');
		game.load.image('u2', 'assets/img/u2.png');
		game.load.image('u3', 'assets/img/u3.png');
		game.load.spritesheet('player', 'assets/img/player.png', 45, 45, 4)
	},

	create: function() {
		background = game.add.tileSprite(0, 0, 800, 600, 'bg');
		player = game.add.sprite(45, game.world.centerY, 'player');
		player.animations.add('flying');
		player.animations.play('flying', 10, true);
		score = 0;

		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y = 1000;
		game.physics.p2.restitution = 0;

		game.physics.p2.enable(player);

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
		this.textScore = game.add.text(600, 100, "Score: " + score, { font: "16px Arial", fill: "#ffffff", align: "center" });
	},

	update: function() {
		background.tilePosition.x -= 2;

		score += 0.1;
		this.textScore.text = "Score: " + Math.round(score);


		if(this.spaceKey.isDown) {
				player.body.velocity.y -= 100;
		}

	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
