class Snake {
    constructor() {
        this.x = undefined;
        this.y = undefined;
        this.velX = undefined;
        this.velY = undefined;
        this.pos = [];

        this.len = undefined;
        this.score = undefined;

        this.velChanged = false;

        this.skin = undefined;

        this.activeBoosts = {};
    }

    start(x, y) {
        this.x = x;
        this.y = y;
        this.velX = 1;
        this.velY = 0;
        this.pos = [];

        this.len = 5;
        this.score = 0;

        this.velChanged = false;

        this.skin = 'Classic';
        this.boost2Smoke = new ParticleSystem(width/2, height*(4/5), 16, -1, 1, -1, -5, 3, 5, 1/4, 3/4, color(255, 25));
        this.boost3Temp = 18;

        for (let skinName in skins) {
            skins[skinName].reset();
        }

        this.activeBoosts = {};
        for (let boostName in boosts) {
            this.activeBoosts[boostName] = [0, 0];
        }
    }

    boostIsActive(boostName) {
        return this.activeBoosts[boostName][0] > 0;
    }

    getActiveSkin() {
        let skin = this.skin;
        let minTime = Infinity;

        for (let boostName in boosts) {
            if (this.boostIsActive(boostName) && boosts[boostName].Data.skin != undefined) {
                if (this.activeBoosts[boostName][1] < minTime) {
                    skin = boosts[boostName].Data.skin;
                    minTime = this.activeBoosts[boostName][1];
                }
            }
        }

        return skin;
    }

    changeVel(velX, velY) {
        if (this.boostIsActive('Boost1')) {
            velX *= -1;
            velY *= -1;
        }

        if (-velX != this.velX && -velY != this.velY && !this.velChanged) {
            this.velX = velX;
            this.velY = velY;

            this.velChanged = true;
        }
    }

    update() {
        this.velChanged = false;

        let newX = this.x+this.velX;
        let newY = this.y+this.velY;

        if (game.isBlock(newX, newY) || game.isSnake(newX, newY)) {
            game.end();
            return;
        }

        this.x = newX;
        this.y = newY;

        let pos = {};
        pos.x = this.x;
        pos.y = this.y;
        this.pos.push(pos)
        if (this.pos.length > this.len) {
            this.pos.splice(0, 1);
        }

        let eatenBoosts = game.getBoosts(this.x, this.y)
        for (let i=0; i<eatenBoosts.length; i++) {
            let eatenBoost = eatenBoosts[i];

            this.activeBoosts[eatenBoost.name][0] = eatenBoost.getTime();
            this.activeBoosts[eatenBoost.name][1] = 0;

            let sound = boosts[eatenBoost.name].Data.sound;
            if (sound != undefined) {
                sound.play();
            }

            if (eatenBoost.name == 'Food') {
                this.len++;
                this.score++;

            } else if (eatenBoost.name == 'Boost1') {
                this.score += 5;

            } else if (eatenBoost.name == 'Boost2') {
                this.score += 5;

                this.boost2Smoke.reset();

                this.pos.reverse();

                let last1 = this.pos[this.pos.length-1];
                let last2 = this.pos[this.pos.length-2];
                this.velX = last1.x-last2.x;
                this.velY = last1.y-last2.y;

                this.x = this.pos[this.pos.length-1].x;
                this.y = this.pos[this.pos.length-1].y;

            } else if (eatenBoost.name == 'Boost3') {
                this.score += 5;

            }
        }

        if (this.boostIsActive('Boost2')) {
            this.boost2Smoke.x = this.x*game.maze.xTileSize+game.maze.xTileSize/2;
            this.boost2Smoke.y = this.y*game.maze.yTileSize+game.maze.yTileSize/2-this.boost2Smoke.r;

            this.boost2Smoke.update();
        }

        for (let boostName in boosts) {
            if (this.boostIsActive(boostName)) {
                this.activeBoosts[boostName][0]--;
                this.activeBoosts[boostName][1]++;

                /*- Boost deactivated -*/
                if (!this.boostIsActive(boostName)) {
                    if (boosts[boostName].Data.skin != undefined) {
                        skins[boosts[boostName].Data.skin].reset()
                    }
                }
                /*- -*/
            }
        }

        skins[this.getActiveSkin()].next();
    }

    show() {
        let skin = skins[this.getActiveSkin()];
        let headRotation = atan2(this.velY, this.velX);

        for (let i=0; i<this.pos.length; i++) {
            /*- calculate corners -*/
            let x = [this.pos[i].x*game.maze.xTileSize,
                     this.pos[i].x*game.maze.xTileSize+game.maze.xTileSize];
            let y = [this.pos[i].y*game.maze.yTileSize,
                     this.pos[i].y*game.maze.yTileSize+game.maze.yTileSize];
            /*- -*/

            /*- calculate next and previos squares -*/
            let code = (pos) => {return (pos[0]+1)+3*(pos[1]+1)};
            let decode = (n) => {return [n%3-1, floor(n/3)-1]};

            let blocks = [];
            if (i!=0) {
                let block = this.pos[i-1];
                blocks.push(code([block.x-this.pos[i].x, block.y-this.pos[i].y]))
            }
            if ((i!=this.pos.length-1) && !(i==this.pos.length-2 && (skin.head))) {
                let block = this.pos[i+1];
                blocks.push(code([block.x-this.pos[i].x, block.y-this.pos[i].y]))
            }
            /*- -*/

            skin.show(i+(this.len-this.pos.length), this.len, x[0], y[0], blocks, headRotation)
        }

        if (this.getActiveSkin() == 'Smoking') {
            this.boost2Smoke.show();
        }
    }
}
