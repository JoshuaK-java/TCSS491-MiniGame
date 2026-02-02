class Grenade {
    constructor(game, facing, x, y) {
        this.game = game;
        this.y = y - 90;
        this.speed = 100;

        // make sure grenade spawns in hand
        if (facing === 0) {
            this.x = x + 50;
        } else {
            this.x = x - 50;
        }

        // Grenade state variables
        this.action = 0; // 0 = frag
        this.facing = facing; // 0 = right, 1 = left

        // grenade starts off as dead until thrown by entity
        this.dead = true;
        setTimeout(() => {
            this.dead = false;
        }, 1100);

        // dk what to use this for yet
        this.velocity = {x:Math.cos(Math.PI/4) * this.speed, y:Math.sin(Math.PI/4) * this.speed * -1};
        this.fallAcc = 0.033;

        // the grenade's animations
        this.animations = [];
        this.loadAnimations();
        
    };

    loadAnimations() {
        for (var i = 0; i < 1; i ++) { // 1 states
            this.animations.push([]);
        }
        // 0 = frag, 

        // ############### frag animations for state = 0 ########################
        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 130, 128, 128, 7, 0.2, 120, false); // Facing right

    };

    update(keys) {
        if (!this.dead) {
            setTimeout(() => {
                this.dead = true;
                this.removeFromWorld = true;
            }, 1350);  

            setTimeout(() => {
                this.deployed = true;
            }, 600);  
            
            if (!this.deployed) {
                if (this.facing === 0) {
                    this.x += this.velocity.x * this.fallAcc;
                    this.y += this.velocity.y * this.fallAcc;
                    this.velocity.x += Math.PI/1.5;
                    this.velocity.y += Math.PI/1.5;
                } else {
                    this.x -= this.velocity.x * this.fallAcc;
                    this.y += this.velocity.y * this.fallAcc;
                    this.velocity.x += Math.PI/1.5;
                    this.velocity.y += Math.PI/1.5;
                }
            }
        }
    };

    draw(ctx) {
        if (!this.dead)
            this.animations[this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
};