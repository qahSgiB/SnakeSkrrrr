class Game {
    constructor(maze) {
        this.maze = maze;
        this.snake = new Snake();
        this.game = false;

        this.activeBoosts = {};
    }

    start() {
        this.snake.start(this.maze.xStart, this.maze.yStart);

        for (let boostName in boosts) {
            this.activeBoosts[boostName] = [];
        }

        this.game = true;
    }

    end() {
        for (let boostName in boosts) {
            boosts[boostName].Data.sound.stop();
        }

        this.game = false;

        sceneManager.setScene('gameEnd');
    }

    getBoosts(x, y) {
        let foundBoosts = [];

        for (let boostName in this.activeBoosts) {
            let activeBoostsT = this.activeBoosts[boostName];
            for (let i=0; i<activeBoostsT.length; i++) {
                let boost = activeBoostsT[i];

                if (boost.x == x && boost.y == y) {
                    foundBoosts.push(boost);
                    activeBoostsT.splice(i, 1); // yes, it works
                }
            }
        }

        return foundBoosts;
    }

    spawn(boostName) {
        let x, y;
        [x, y] = this.findFree();

        this.activeBoosts[boostName].push(new boosts[boostName].Boost(x, y));
    }

    update() {
        if (updateFrame) {
            this.snake.update();
        }
        if (this.snake.boostIsActive('Boost3')) {
            this.snake.boost3Temp++;
        }

        for (let boostName in this.activeBoosts) {
            let activeBoostsT = this.activeBoosts[boostName];
            for (let i=0; i<activeBoostsT.length; i++) {
                let boost = activeBoostsT[i];

                boost.update();
            }
        }

        for (let boostName in boosts) {
            let boostInfo = boosts[boostName];
            let attamptCount = boostInfo.MaxCount-this.activeBoosts[boostName].length;
            let spawnChance = boostInfo.SpawnChance;

            for (let i=0; i<attamptCount; i++) {
                let boostGroupCount = 0;
                let boostGroup = boostInfo.group;

                for (let i=0; i<boostGroup.length; i++) {
                    boostGroupCount += this.activeBoosts[boostGroup[i]].length;
                }

                if (floor(random(0, spawnChance)) == 0 && boostGroupCount < boostInfo.groupMaxCount) {
                    this.spawn(boostName);
                }
            }
        }
    }

    show() {
        this.snake.show();
        this.maze.show();

        for (let boostName in this.activeBoosts) {
            let activeBoostsT = this.activeBoosts[boostName];
            for (let i=0; i<activeBoostsT.length; i++) {
                let boost = activeBoostsT[i];

                boost.show();
            }
        }

        /*- Boost3 - BigShaq -*/
        if (this.snake.boostIsActive('Boost3')) {
            textAlign(CENTER, CENTER);
            textFont('sans-serif');

            textSize(height*(1/5));
            stroke(0);
            noFill();
            text(this.snake.boost3Temp+' C', width/2, height/2);

            textSize(height*(1/15));
            stroke(0);
            noFill();
            text('Mans not hot!', width/2, height*(1/2+1/5));
        }
        /*- -*/

        /*- Boosts info -*/
        let boostMsgs = [];

        for (let boostName in boosts) {
            if (this.snake.boostIsActive(boostName)) {
                let msg = boosts[boostName].msg;
                if (msg != undefined) {
                    boostMsgs.push(msg);
                }
            }
        }

        if (boostMsgs.length > 0) {
            let size = min(height/6, (height*(2/3)/boostMsgs.length));
            let posY = height/2-((boostMsgs.length-1)/2)*size;

            textAlign(CENTER, CENTER);
            textFont(fonts['OldLondon']);
            textSize(size*(5/6))
            fill(150, 255/2);
            noStroke();

            for (let i=0; i<boostMsgs.length; i++) {
                text(boostMsgs[i], width/2, posY);
                posY += size;
            }
        }
        /*- -*/
    }

    findFree() {
        let free = false;
        let x;
        let y;

        while (!free) {
            x = floor(random(0, this.maze.xSize));
            y = floor(random(0, this.maze.ySize));

            free = !(this.isBlock(x, y) || this.isSnake(x, y));

            for (let boostName in this.activeBoosts) {
                let activeBoostsT = this.activeBoosts[boostName];
                for (let i=0; i<activeBoostsT.length; i++) {
                    let boost = activeBoostsT[i];

                    if (boost.x == x && boost.y == y) {
                        free = false;
                        break;
                    }
                }
            }
        }

        return [x, y];
    }

    isBlock(x, y) {
        let res = false;

        for (let i=0; i<this.maze.blocks.length; i++) {
            let block = this.maze.blocks[i];
            if (block.x == x && block.y == y) {
                res = true;
                break;
            }
        }

        return res;
    }

    isSnake(x, y) {
        let res = false;

        for (let i=0; i<this.snake.pos.length; i++) {
            let pos = this.snake.pos[i];
            if (pos.x == x && pos.y == y) {
                res = true;
                break;
            }
        }

        return res;
    }
}
