class Menu {
    constructor(x, y, menuItemClass, minFontSize, maxFontSize, visibleItemsCount) {
        this.x = x;
        this.y = y;
        this.menuItemClass = menuItemClass;
        this.minFontSize = minFontSize;
        this.maxFontSize = maxFontSize;
        this.visibleItemsCount = visibleItemsCount;

        this.index = 0;
        this.menuItems = [];

        this.indexY = 0;
        this.indexYdefaultVel = 1/10;
        this.vel = 0;

        this.fontSizeChange = (this.maxMenuItemFontSize-this.minMenuItemFontSize)/this.visibleItemsCount;
    }

    addMenuItem(text, ...args) {
        this.menuItems.push(new this.menuItemClass(text, ...args));
    }

    moveIndex(move) {
        let originalIndex = this.index;
        this.index += move;

        if (this.index < 0) {
            this.index = this.menuItems.length-1;
        } else if (this.index >= this.menuItems.length) {
            this.index = 0;
        }

        this.vel = (this.index-originalIndex)*this.indexYdefaultVel;
    }

    up() {
        this.moveIndex(-1);
    }

    down() {
        this.moveIndex(1);
    }

    select() {
        this.menuItems[this.index].onSelect();
    }

    update() {
        this.indexY += this.vel;

        if (((this.indexY >= this.index) == (this.vel >= 0)) && (this.indexY != this.index)) {
            this.indexY = this.index;
            this.vel = 0;
        }
    }

    show() {
        let main = this.menuItems[this.index];

        let middle = round(this.indexY);
        let realVisibleItemsCount = floor(this.visibleItemsCount);

        textSize(this.fontSize);

        for (let i=max(0, middle-realVisibleItemsCount); i<=min(this.menuItems.length-1, middle+realVisibleItemsCount); i++) {
            let offsetY = i-this.indexY;
            let y = this.y+offsetY*this.menuItemClass.textHeight(this.maxFontSize);
            // textSize(map(sin(map(abs(offsetY), 0, this.visibleItemsCount, PI/2, 0)), 0, 1, this.minFontSize, this.maxFontSize));
            // console.log(offsetY,textSize());
            textSize(map(abs(offsetY), 0, this.visibleItemsCount, this.maxFontSize, this.minFontSize));

            this.menuItems[i].show(i==this.index, this.x, y, main);
        }
    }
}

class MenuItem {
    constructor(onSelect) {
        this.onSelect = onSelect;
    }

    static textHeight() {
        return 0;
    }

    showMain() {

    }

    showNormal() {

    }

    show(main, ...args) {
        if (main) {
            this.showMain(...args);
        } else {
            this.showNormal(...args);
        }
    }
}
