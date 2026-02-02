class Player {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 100

        // for animation locking
        this.inAnim = false;
        this.endTime = 0;

        // player state variables
        this.action = 0; // 0 = Idle, 1 = walk, 2 = sprint, 3 = jump, 4 = attack 1, 5 = attack 2, 6 = attack 3, 7 = parry, 8 = hurt, 9 = dead
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;
        

        // dk what to use this for yet
        this.velocity = {x:0, y:0};
        this.fallAcc = 562.5

        // the player's animations
        this.spritesheetPath = "./res/Player/player_spritesheet.png";
        this.animations = [];
        this.loadAnimations();
        this.animationSpeed = 0.15;
    };

    loadAnimations() {
        for (var i = 0; i < 10; i ++) { // 10 states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // 2 directions
                this.animations[i].push([]);
            }
        }
        // 0 = Idle, 1 = walk, 2 = sprint, 3 = jump, 4 = attack 1, 5 = attack 2, 6 = attack 3, 7 = parry, 8 = hurt, 9 = dead

        // ############### Idle animations for state = 0 ########################
        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 1152, 128, 128, 128, 6, 0.2, 0, false); // Facing right
        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 1152, 128, 128, 128, 6, 0.2, 0, true); // Facing left

        // ############### walk animations for state = 1 ########################
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 0, 128, 128, 128, 9, 0.15, 0, false); // Facing right
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 0, 128, 128, 128, 9, 0.15, 0, true); // Facing left

        // ############### sprint animations for state = 2 ########################
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 0, 256, 128, 128, 8, 0.07, 0, false); // Facing right
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 0, 256, 128, 128, 8, 0.07, 0, true); // Facing left

        // ############### jump animations for state = 3 ########################
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 0, 0, 128, 128, 9, 0.15, 0, false); // Facing right
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 0, 0, 128, 128, 9, 0.15, 0, true); // Facing left

        // ############### attack 1 animations for state = 4 ########################
        this.animations[4][0] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 0, 384, 128, 128, 4, 0.06, 0, false); // Facing right
        this.animations[4][1] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 0, 384, 128, 128, 4, 0.06, 0, true); // Facing left

        // ############### attack 2 animations for state = 5 ########################
        this.animations[5][0] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 1024, 256, 128, 128, 5, 0.06, 0, false); // Facing right
        this.animations[5][1] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 1024, 256, 128, 128, 5, 0.06, 0, true); // Facing left

        // ############### attack 3 animations for state = 6 ########################
        this.animations[6][0] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 512, 384, 128, 128, 4, 0.2, 0, false); // Facing right
        this.animations[6][1] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 512, 384, 128, 128, 4, 0.2, 0, true); // Facing left

        // ############### parry animations for state = 7 ########################
        this.animations[7][0] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 1664, 384, 128, 128, 2, 0.4, 0, false); // Facing right
        this.animations[7][1] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 1664, 384, 128, 128, 2, 0.4, 0, true); // Facing left

        // ############### hurt animations for state = 8 ########################
        this.animations[8][0] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 1664, 256, 128, 128, 3, 0.15, 0, false); // Facing right
        this.animations[8][1] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 1664, 256, 128, 128, 3, 0.15, 0, true); // Facing left

        // ############### dead animations for state = 9 ########################
        this.animations[9][0] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 1152, 0, 128, 128, 6, 0.15, 0, false);   // Facing right
        this.animations[9][1] = new Animator(ASSET_MANAGER.getAsset(this.spritesheetPath), 1152, 0, 128, 128, 6, 0.15, 0, true); // Facing left

    };

    update(keys) {
        this.animationLock();

        
        // == movement controls ==
        if (!this.inAnim) {

            // == Idle ==
            this.action = 0; 
        
            // == left sprint/walk ==
            if (keys["ShiftLeft"] && keys["KeyA"]) {
                this.x -= 4;
                this.facing = 1;
                this.action = 2; // Sprinting
            } else if (keys["KeyA"]) {
                this.x -= 2;
                this.facing = 1;
                this.action = 1; // walking
            }

            // == right sprint/walk ==
            if (keys["ShiftLeft"] && keys["KeyD"]) {
                this.x += 4;
                this.facing = 0;
                this.action = 2; // sprinting
            } else if (keys["KeyD"]) {
                this.x += 2;
                this.facing = 0;
                this.action = 1; // walking
            }

            if (keys["Space"]) {
                this.action = 3; // jumping
                this.velocity.y = -325;
            }

            // == attack 1 ==
            if (keys["0"]) {
                this.action = 4;
                //this.inAnim = true;
                this.endTime = Date.now() + 300; // lock for 300 ms
                console.log("entered animation lock")
            }

            // == attack 2 ==
            if (keys["KeyS"]) {
                this.action = 5;
                //this.inAnim = true;
                this.endTime = Date.now() + 300; // lock for 300 ms
                console.log("entered animation lock")
            }

            // == attack 3 ==
            if (keys["KeyW"]) {
                this.action = 6;
                //this.inAnim = true;
                this.endTime = Date.now() + 300; // lock for 300 ms
                console.log("entered animation lock")
            }

            // == parry ==
            if (keys["2"]) {
                this.action = 7;
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