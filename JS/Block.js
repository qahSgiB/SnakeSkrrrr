class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        stroke(25, 185, 6);
        fill(200, 14, 93);

        rect(this.x*game.maze.xTileSize, this.y*game.maze.yTileSize, game.maze.xTileSize, game.maze.yTileSize);
    }
}
