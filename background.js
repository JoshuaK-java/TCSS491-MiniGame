class Background {
    constructor(game) {
        this.game = game;

        this.x = 0;
        this.y = 0;
        this.width = 1344;
        this.height = 768;

        this.image = ASSET_MANAGER.getAsset("./res/map/back.png");
        this.image2 = ASSET_MANAGER.getAsset("./res/map/middle.png");
        this.image3 = ASSET_MANAGER.getAsset("./res/map/front.png");

        this.init();
    }

    init() {
        this.layers = [];
        this.layers.push(new BackgroundLayer(this.game, "./res/map/back.png", 0.2));
        this.layers.push(new BackgroundLayer(this.game, "./res/map/middle.png", 0.5));
        this.layers.push(new BackgroundLayer(this.game, "./res/map/front.png", 1));

        // add layers into the provided game engine instance
        this.game.addEntity(this.layers[0], 0);
        this.game.addEntity(this.layers[1], 0);
        this.game.addEntity(this.layers[2], 2);
        

        // this.layers.forEach(layer => {
        //     GameEngine.addEntity(layer, 2);
        // });
    }

    
    update(keys) {
        this.layers.forEach(layer => {
            layer.update(keys);
        });
    }


    draw(ctx) {
        this.layers.forEach(layer => {
            layer.draw(ctx);
        });
    }
}