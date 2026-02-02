const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const DEFAULT_X = 400;
const DEFAULT_Y = 475;
const GAME_WIDTH = 1344;
const GAME_HEIGHT = 768;

ASSET_MANAGER.queueDownload("./res/map/back.png");
ASSET_MANAGER.queueDownload("./res/map/middle.png");
ASSET_MANAGER.queueDownload("./res/map/front.png");
ASSET_MANAGER.queueDownload("./res/Player/player_spritesheet.png");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	

	// entities
	player = new Player(gameEngine, DEFAULT_X, DEFAULT_Y);
	background = new Background(gameEngine);

	// adding entities
	gameEngine.addEntity(player, 1);
	//gameEngine.addEntity(background, 2);

	gameEngine.init(ctx);

	gameEngine.start();
});
