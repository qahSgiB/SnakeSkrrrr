/*- Scene: start -*/
let startScene = new Scene('start');

startScene.onDraw = () => {
    background(mainMenu.menuItems[mainMenu.index].backgroundColor);

    let imageName = gucciImages[gucciImageIndex];
    let r = (imageName == 'GucciSnake') ? 4/5 : 3/5;
    image(images[imageName], (1-r)/2*width, (1-r)/2*height, width*r, height*r)

    mainMenu.update();
    mainMenu.show();
}
startScene.onKeyPressed = () => {
    if (keyCode == SPACE) {
        mainMenu.select();
    } else if (keyCode == DOWN_ARROW) {
        mainMenu.down();
    } else if (keyCode == UP_ARROW) {
        mainMenu.up();
    }
}
/*- -*/

/*- Scene: game -*/
let gameScene = new Scene('game');

gameScene.onStart = () => {game.start();};
gameScene.onDraw = () => {
    background(107, 82, 202);

    updateFrame = frameCount%6 == 0;

    game.update();
    game.show();
}
gameScene.onKeyPressed = () => {
    if (keyCode == DOWN_ARROW) {
        game.snake.changeVel(0, 1);
    } else if (keyCode == UP_ARROW) {
        game.snake.changeVel(0, -1);
    } else if (keyCode == RIGHT_ARROW) {
        game.snake.changeVel(1, 0);
    } else if (keyCode == LEFT_ARROW) {
        game.snake.changeVel(-1, 0);
    }
}
/*- -*/

/*- Scene: end -*/
let gameEndScene = new Scene('gameEnd');

gameEndScene.onStart = () => {
    deadTextState0Time = floor(random(180, 240));
    deadSoundWait = 0;
};
gameEndScene.onEnd = () => {
    if (sounds['FunrealMarchShort'].isPlaying()) {
        sounds['FunrealMarchShort'].stop();
    }
};
gameEndScene.onDraw = () => {
    let deadTextColor = color(colors['deadText']);
    let color1;
    let color2;
    let score = game.snake.score;

    if (deadTextState) {
        color1 = deadTextColor;
        color2 = color(0);
    } else {
        color2 = deadTextColor;
        color1 = color(0);
    }
    background(color2);

    if (deadTextState) {
        textSize(200);
        shText('DEAD', width/2-7, height/2, 5, color1, color2, 10, 2.5, 2.5, false);
    } else {
        push();
        translate(width/2-7, height/2);
        rotate(PI);
        textSize(200);
        shText('DEAD', 0, 0, 5, color1, color2, 10, -2.5, -2.5, true);
        pop();
    }

    let scoreText = '+ Score : '+score+' +';

    textFont(fonts['Montserrat']);
    textSize(15);
    textAlign(CENTER, CENTER);

    noStroke();
    fill(color1);
    text(scoreText, 0, height/2);
    text(scoreText, width, height/2);

    noFill();
    stroke(color1);
    line(0, height*(1/4)+10, width, height*(1/4)+10-10);
    line(0, height*(3/4)+10+10, width, height*(3/4)+10);

    if (deadTextState0Time == 0) {
        deadTextState1Time = floor(random(60, 90));
        deadTextState0Time = -1;
    } else if (deadTextState1Time == 0) {
        deadTextState0Time = floor(random(180, 240)/deadTextState1BlinkTime)*deadTextState1BlinkTime;
        deadTextState1Time = -1;
        deadTextState = true;
    }

    if (deadTextState0Time > 0) {
        deadTextState0Time--;
    } else if (deadTextState1Time > 0) {
        deadTextState1Time--;
        if (deadTextState1Time%deadTextState1BlinkTime == 0) {
            deadTextState = !deadTextState
        }
    }

    if (deadSoundWait == 0 && !sounds['FunrealMarchShort'].isPlaying()) {
        sounds['FunrealMarchShort'].play();
        deadSoundWait = deadSoundDelay;
    } else if (deadSoundWait > 0 && !sounds['FunrealMarchShort'].isPlaying()) {
        deadSoundWait--;
    }
}
gameEndScene.onKeyPressed = () => {
    if (keyCode == SPACE) {
        sceneManager.setScene('start');
    }
}
/*- -*/

/*- Scene: testing -*/
let testingScene = new Scene('testing');

testingScene.onStart = () => {};
testingScene.onDraw = () => {

}
/*- -*/
