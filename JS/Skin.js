class Skin {
    constructor(show, head) {
        this.show = (...args) => {return show(this.frameIndex, ...args);};
        this.head = head;
        this.frameIndex = 0;
    }

    next() {
        this.frameIndex++;
    }

    reset() {
        this.frameIndex = 0;
    }
}



/*- skins creating-*/
function skin1(frameIndex, index, length, x, y, contSquares, headRotation) {
    stroke(color(200, 147, 10));
    drawBorder(contSquares, x, y, game.maze.xTileSize, game.maze.yTileSize);
}

function skin2(frameIndex, index, length, x, y, contSquares, headRotation) {
    let rainbowColors = colors['rainbow'];

    noStroke();
    fill(rainbowColors[(index+frameIndex)%rainbowColors.length]);
    rect(x, y, game.maze.xTileSize, game.maze.yTileSize);
}

function skin3(frameIndex, index, length, x, y, contSquares, headRotation) {
    if (index == length-1) {
        let headImg = images['Cannabis'];

        push();
        imageMode(CENTER);
        translate(x+game.maze.xTileSize/2, y+game.maze.yTileSize/2);
        rotate(headRotation);
        image(headImg, 0, 0, game.maze.xTileSize, headImg.height*(game.maze.yTileSize/headImg.width));
        pop();
    } else {
        skins['Classic'].show(index, length, x, y, contSquares);
    }
}

function skin4(frameIndex, index, length, x, y, contSquares, headRotation) {
    if (index == length-1) {
        let headImg = images['Jacket'];

        push();
        imageMode(CENTER);
        translate(x+game.maze.xTileSize/2, y+game.maze.yTileSize/2);
        rotate(headRotation);
        image(headImg, 0, 0, game.maze.xTileSize, headImg.height*(game.maze.yTileSize/headImg.width));
        pop();
    } else {
        skins['Classic'].show(index, length, x, y, contSquares);
    }
}

let skins = {};
/*- -*/



let drawBorder = function(blocks, x, y, xSize, ySize) {
    let code = (pos) => {return (pos[0]+1)+3*(pos[1]+1)};
    let decode = (n) => {return [n%3-1, floor(n/3)-1]};

    let bx = [x, x+xSize];
    let by = [y, y+ySize];

    for (let borderX of [0, 1]) {
        if (!blocks.includes(code([map(borderX, 0, 1, -1, 1), 0]))) {
            line(bx[borderX], y, bx[borderX], y+ySize);
        }
    }
    for (let borderY of [0, 1]) {
        if (!blocks.includes(code([0, map(borderY, 0, 1, -1, 1)]))) {
            line(x, by[borderY], x+xSize, by[borderY]);
        }
    }
}
