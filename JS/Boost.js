class Boost {
    constructor(name, x, y, img) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = img;
    }

    show() {
        image(this.img, this.x*game.maze.xTileSize, this.y*game.maze.yTileSize, game.maze.xTileSize, game.maze.yTileSize);
    }

    update() {

    }

    getTime() {
        let boostInfo = boosts[this.name];
        return random(boostInfo.minTime, boostInfo.maxTime);
    }
}

class BoostInfo {
    constructor(boost, spawnChance, maxCount, group, groupMaxCount, minTime, maxTime, msg, data) { // To do: start using lowercase
        this.Boost = boost;
        this.SpawnChance = spawnChance;
        this.MaxCount = maxCount;
        this.group = group;
        this.groupMaxCount = groupMaxCount;
        this.minTime = minTime;
        this.maxTime = maxTime;
        this.msg = msg;
        this.Data = data;
    }
}



class Food extends Boost {
    constructor(x, y) {
        super('Food', x, y, images['DollarTrump']);

        let r = this.img.width/this.img.height;
        this.imgWidth = min(game.maze.xTileSize, game.maze.yTileSize)/sqrt(1+(1/pow(r, 2)));
        this.imgHeight = this.imgWidth/r;

        this.imgRotation = floor(random(0, 360));
        this.imgRotationVel = (floor(random(4, 20))/10)*random([-1, 1]);

        // this.sound = sounds['M+'];
    }

    show() {
        push()

        stroke(59, 47, 115);
        fill(216, 246, 8);

        translate((this.x+1/2)*game.maze.xTileSize, (this.y+1/2)*game.maze.yTileSize);
        rotate(radians(this.imgRotation))

        imageMode(CENTER);
        image(this.img, 0, 0, this.imgWidth, this.imgHeight);

        pop()
    }

    update() {
        this.imgRotation += this.imgRotationVel;
    }
}

class Boost1 extends Boost {
    constructor(x, y) {
        super('Boost1', x, y, images['Cocaine']);
    }
}
class Boost2 extends Boost {
    constructor(x, y) {
        super('Boost2', x, y, images['CannabisLogo']);
    }
}
class Boost3 extends Boost {
    constructor(x, y) {
        super('Boost3', x, y, images['BigShaq']);
    }
}



let boosts = {};
