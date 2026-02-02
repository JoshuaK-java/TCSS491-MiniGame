class BackgroundLayer {
    constructor(game, imagePath, speed) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = 1344;
        this.height = 768;
        this.image = ASSET_MANAGER.getAsset(imagePath);
        this.speed = speed; // speed at which this layer moves
    }

    update(keys) {
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}