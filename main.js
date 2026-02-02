const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const DEFAULT_X = 400;
const DEFAULT_Y = 475;
const GAME_WIDTH = 1344;
const GAME_HEIGHT = 768;

ASSET_MANAGER.queueDownload("./res/map/Background.png");
ASSET_MANAGER.queueDownload("./res/Player/Soldier1_Spritesheet.png");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	

	// entities
	player = new Soldier(gameEngine, DEFAULT_X, DEFAULT_Y);
	gameEngine.addEntity(player);

	gameEngine.init(ctx);

	gameEngine.start();
});
