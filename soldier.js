class Soldier {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 100
        this.mouseClicked = false;
        this.mouseHeld = false;

        // for animation locking
        this.inAnim = false;
        this.endTime = 0;

        // Soldier state variables
        this.action = 0; // 0 = Idle, 1 = walk, 2 = sprint, 3 = meelee, 4 = accurate fire, 5 = rapid fire, 6 = reload, 7 = hurt, 8 = grenade, 9 = explosion, 10 = dead
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;
        this.magSize = 25;

        // dk what to use this for yet
        this.velocity = {x:0, y:0};
        this.fallAcc = 562.5

        // the soldier's animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 11; i ++) { // 11 states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // 2 directions
                this.animations[i].push([]);
            }
        }
        //0 = Idle, 1 = walk, 2 = sprint, 3 = meelee, 4 = accurate fire, 5 = rapid fire, 6 = reload, 7 = hurt, 8 = grenade, 9 = explosion, 10 = dead

        // ############### Idle animations for state = 0 ########################
        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 1152, 130, 128, 128, 7, 0.2, 120, false); // Facing right
        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 1152, 130, 128, 128, 7, 0.2, 128, true); // Facing left

        // ############### Walk animations for state = 1 ########################
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 1152, 258, 128, 128, 7, 0.15, 128, false); // Facing right
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 1152, 258, 128, 128, 7, 0.15, 128, true); // Facing left

        // ############### Sprint animations for state = 2 ########################
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 386, 128, 128, 8, 0.07, 128, false); // Facing right
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 386, 128, 128, 8, 0.07, 128, true); // Facing left

        // ############### meelee animations for state = 3 ########################
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 1664, 0, 128, 128, 3, 0.15, 128, false); // Facing right
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 1664, 0, 128, 128, 3, 0.15, 128, true); // Facing left

        // ############### rapid fire animations for state = 4 ########################
        this.animations[4][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 514, 128, 128, 4, 0.06, 128, false); // Facing right
        this.animations[4][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 514, 128, 128, 4, 0.06, 128, true); // Facing left

        // ############### single shot animations for state = 5 ########################
        this.animations[5][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 512, 514, 128, 128, 4, 0.06, 128, false); // Facing right
        this.animations[5][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 512, 514, 128, 128, 4, 0.06, 128, true); // Facing left

        // ############### reload animations for state = 6 ########################
        this.animations[6][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 0, 128, 128, 13, 0.2, 128, false);     // Facing right
        this.animations[6][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 0, 128, 128, 13, 0.2, 128, true); // Facing left

        // ############### hurt animations for state = 7 ########################
        this.animations[7][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 1543, 386, 128, 128, 3, 0.4, 128, false); // Facing right
        this.animations[7][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 1543, 386, 128, 128, 3, 0.4, 128, true); // Facing left

        // ############### grenade animations for state = 8 ########################
        this.animations[8][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 258, 128, 128, 9, 0.15, 128, false);    // Facing right
        this.animations[8][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 258, 128, 128, 9, 0.15, 128, true); // Facing left

        // ############### explosion animations for state = 9 ########################
        this.animations[9][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 130, 128, 128, 9, 0.15, 128, false);   // Facing right
        this.animations[9][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 0, 130, 128, 128, 9, 0.15, 128, true); // Facing left

        // ############### dead animations for state = 10 ########################
        this.animations[10][0] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 1031, 386, 128, 128, 4, 0.2, 128, false); // Facing right
        this.animations[10][1] = new Animator(ASSET_MANAGER.getAsset("./res/Player/Soldier1_Spritesheet.png"), 1031, 386, 128, 128, 4, 0.2, 128, true); // Facing left

    };

    update(keys) {
        this.animationLock();

        if (this.magSize === 0) {
            this.action = 6; // reload
            this.endTime = 2600;
            this.inAnim = true;
            this.timer = Date.now();
            this.magSize = 25;
            this.game.updateAmmo(this.magSize);
            return;
        }
            
        if (!this.inAnim) {
            this.action = 0; // default to idle
        
            if (keys["ShiftLeft"] && keys["KeyA"]) {
                this.x -= 4;
                this.facing = 1;
                this.action = 2; // Sprinting
            } else if (keys["KeyA"]) {
                this.x -= 2;
                this.facing = 1;
                this.action = 1; // walking
            }
            if (keys["ShiftLeft"] && keys["KeyD"]) {
                this.x += 4;
                this.facing = 0;
                this.action = 2; // sprinting
            } else if (keys["KeyD"]) {
                this.x += 2;
                this.facing = 0;
                this.action = 1; // walking
            }
            if (keys["KeyQ"]) {
                this.action = 3; // meelee
                this.endTime = 450;
                this.inAnim = true;
                this.timer = Date.now();
            }
            if (keys["KeyR"]) {
                this.action = 6; // reload
                this.endTime = 2600;
                this.inAnim = true;
                this.timer = Date.now();
                this.magSize = 25;
                this.game.updateAmmo(this.magSize);
            }
            if (keys["KeyG"]) {
                this.action = 8; // grenade
                this.endTime = 1350;
                this.inAnim = true;
                this.timer = Date.now();

                const grenade = new Grenade(this.game, this.facing, this.x, this.y, this.scale);
                this.game.addEntity(grenade);
            }
            if (this.mouseClicked) {
                this.action = 5; // single shot
                this.endTime = 240;
                this.inAnim = true;
                this.timer = Date.now();
                this.magSize -= 1;
                this.game.updateAmmo(this.magSize);
            }
            if (this.mouseHeld) {
                this.action = 4; // rapid fire
                this.endTime = 240;
                this.inAnim = true;
                this.timer = Date.now();
                this.magSize -= 1;
                this.game.updateAmmo(this.magSize);
            }
        }
        
    };

    animationLock() {
        if (this.endTime <= Date.now() - this.timer) {
            this.endTime = 0;
            this.inAnim = false;
            console.log("exited animation lock")
        }
    }

    draw(ctx) {
        if (this.dead) {
            this.animations[10][0].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else {
            this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    };
};