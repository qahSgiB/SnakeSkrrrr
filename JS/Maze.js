class Maze {
    constructor(xSize, ySize, xStart, yStart, blocks) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.xStart = xStart;
        this.yStart = yStart;

        this.xTileSize = width/this.xSize;
        this.yTileSize = width/this.ySize;

        blocks = blocks==undefined ? [] : blocks
        this.blocks = []

        for (let i=0; i<blocks.length; i++) {
            this.blocks.push(new Block(blocks[i][0], blocks[i][1]));
        }
    }

    createBorder() {
        for (let x=0; x<this.xSize; x++) {
            this.blocks.push(new Block(x, 0));
            this.blocks.push(new Block(x, this.ySize-1));
        }
        
        for (let y=1; y<this.ySize-1; y++) {
            this.blocks.push(new Block(0, y));
            this.blocks.push(new Block(this.xSize-1, y));
        }
    }

    show() {
        for (let i=0; i<this.blocks.length; i++) {
            this.blocks[i].show()
        }
    }
}
