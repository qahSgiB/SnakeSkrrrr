/*- Surpeme -*/
function supremeText(t, x, y, boxColor, textColor) {
    push();

    textFont(fonts['Supreme']);

    noStroke();
    if (boxColor != undefined) {
        fill(boxColor);
    } else {
        noFill();
    }
    rectMode(CORNER);

    let fontSize = textSize(t);
    let w = textWidth(t)+fontSize;
    let h = supremeText.textHeight(fontSize);

    rect(x-w/2, y-h*(1/3), w, h);

    noStroke();
    fill(textColor);
    textAlign(CENTER, CENTER);

    text(t, x, y);

    pop();
}
supremeText.textHeight = (fontSize) => {return fontSize*(6/5);};

class SupremeMenuItem extends MenuItem {
    constructor(onSelect, text, boxColor, textColor, backgroundColor) {
        super(onSelect);

        this.text = text;
        this.boxColor = boxColor;
        this.textColor = textColor;
        this.backgroundColor = backgroundColor;
    }

    static textHeight(...args) {
        return supremeText.textHeight(...args);
    }

    showMain(x, y, mainMenuItem) {
        supremeText(this.text, x, y, this.boxColor, this.textColor);
    }

    showNormal(x, y, mainMenuItem) {
        supremeText(this.text, x, y, undefined, mainMenuItem.boxColor);
    }
}
/*- -*/

/*- Sh -*/
class ShText {
    constructor(t, x, y, color, tSize, maxOffset, offsetVel) {
        this.t = t;
        this.x = x;
        this.y = y;
        this.color = color;
        this.tSize = tSize;
        this.maxOffset = maxOffset;
        this.offsetVel = offsetVel;
        this.f = fonts['Simplifica'];

        let textBound = this.f.textBounds(this.t, 0, 0, this.tSize);
        this.textPoints = this.f.textToPoints(this.t, this.x-textBound.w/2, this.y+textBound.h/2, this.tSize);

        this.textOffsets = [];
        for (let i=0; i<this.textPoints.length; i++) {
            this.textOffsets[i] = [];
            for (let j=0; j<this.textPoints[i].length; j++) {
                this.textOffsets[i][j] = [random(-this.maxOffset, this.maxOffset), random(-this.maxOffset, this.maxOffset)];
            }

            endShape(CLOSE);
        }
    }

    show() {
        push();

        textFont(this.f);

        fill(200);
        stroke(200);

        for (let i=0; i<this.textPoints.length; i++) {
            let charPoints = this.textPoints[i];
            let charOffsets = this.textOffsets[i];

            beginShape();

            for (let j=0; j<charPoints.length; j++) {
                let charPoint = charPoints[j];
                let pointOffset = charOffsets[j];
                vertex(charPoint.x+pointOffset[0]+5, charPoint.y+pointOffset[1]+5);
            }

            endShape(CLOSE);
        }

        fill(this.color);
        stroke(this.color);

        for (let i=0; i<this.textPoints.length; i++) {
            let charPoints = this.textPoints[i];
            let charOffsets = this.textOffsets[i];

            beginShape();

            for (let j=0; j<charPoints.length; j++) {
                let charPoint = charPoints[j];
                let pointOffset = charOffsets[j];
                vertex(charPoint.x+pointOffset[0], charPoint.y+pointOffset[1]);

                pointOffset[1] = random(-this.maxOffset, this.maxOffset);
                pointOffset[0] = random(-this.maxOffset, this.maxOffset);
            }

            endShape(CLOSE);
        }

        pop();
    }
}

function shText(t, x, y, maxOffset, color1, color2, textCount, textXOffset, textYOffset, noF) {
    push();
    let f = fonts['Simplifica'];

    let tSize = textSize();
    let textBound = f.textBounds(t, 0, 0, tSize);
    textPoints = f.textToPoints(t, x-textBound.w/2, y+textBound.h/2, tSize);

    let textOffsets = [];
    for (let i=0; i<textPoints.length; i++) {
        textOffsets[i] = [];

        for (let j=0; j<textPoints[i].length; j++) {
            textOffsets[i][j] = [random(-maxOffset, maxOffset), random(-maxOffset, maxOffset)];
        }
    }

    for (let i=textCount-1; i>=0; i--) {
        let c = lerpColor(color1, color2, i/(textCount));
        // console.log(c);
        let xOffset = textXOffset*i;
        let yOffset = textYOffset*i;

        stroke(c);
        if (noF) {
            noFill();
        } else {
            fill(c);
        }

        for (let i=0; i<textPoints.length; i++) {
            let charPoints = textPoints[i];
            let charOffsets = textOffsets[i];

            beginShape();

            for (let j=0; j<charPoints.length; j++) {
                let charPoint = charPoints[j];
                let charOffset = charOffsets[j]
                vertex(charPoint.x+charOffset[0]+xOffset, charPoint.y+charOffset[1]+yOffset);
            }

            endShape(CLOSE);
        }
    }

    pop();
}
/*- -*/
