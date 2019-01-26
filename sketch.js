let sceneManager;

let game;
let mainMenu;
let updateFrame;

let imageNames = ['DollarTrump', 'Cocaine', 'CannabisLogo', 'Cannabis', 'LSD', 'BigShaq', 'Jacket', 'GucciSnake', 'GucciBee', 'GucciLion'];
let images = {};
let soundNames = ['M+', 'Esketit', 'Cocaine', 'Cannabis', 'XP', 'BigShaq', 'FunrealMarchShort'];
let sounds = {};
let fontNames = ['Supreme', 'Simplifica', 'Montserrat', 'OldLondon'];
let fonts = {}
let colors;

let gucciImageIndex;
let gucciImages = ['GucciSnake', 'GucciBee', 'GucciLion'];

let deadTextState;
let deadTextState0Time;
let deadTextState1Time;
let deadTextState1BlinkTime;
let deadSoundDelay;
let deadSoundWait;

function preload() {
    for (let i=0; i<imageNames.length; i++) {
        let imageName = imageNames[i];
        images[imageName] = loadImage('Data/Images/'+imageName+'.png');
    }

    for (let i=0; i<soundNames.length; i++) {
        let soundName = soundNames[i];
        sounds[soundName] = loadSound('Data/Sounds/'+soundName+'.mp3');
    }

    for (let i=0; i<fontNames.length; i++) {
        let fontName = fontNames[i];
        fonts[fontName] = loadFont('Data/Fonts/'+fontName+'.ttf');
    }

    colors = loadJSON('Data/Colors/Colors.json');
}

function setup() {
    createCanvas(400, 400);
    pixelDensity(1);

    sceneManager = new SceneManager();
    sceneManager.addScene(startScene);
    sceneManager.addScene(gameScene);
    sceneManager.addScene(gameEndScene);
    sceneManager.addScene(testingScene);
    sceneManager.setScene('start');

    boosts = {
        'Food': new BoostInfo(Food, 1, 1, [], 1, 0, 0, undefined, {'sound': sounds['M+']}),
        'Boost1': new BoostInfo(Boost1, 120, 1, ['Boost2', 'Boost3'], 1, 15, 30, 'Cocaine overdose', {'skin': 'Rainbow', 'sound': sounds['Cocaine']}),
        'Boost2': new BoostInfo(Boost2, 120, 1, ['Boost1', 'Boost3'], 1, 15, 30, undefined, {'skin': 'Smoking', 'sound': sounds['Cannabis']}),
        'Boost3': new BoostInfo(Boost3, 120, 1, ['Boost1', 'Boost2'], 1, 15, 30, undefined, {'skin': 'BigShaq', 'sound': sounds['BigShaq']}),
    };
    skins = {
        'Classic': new Skin(skin1, false),
        'Rainbow': new Skin(skin2, false),
        'Smoking': new Skin(skin3, true),
        'BigShaq': new Skin(skin4, true),
    };

    let maze = new Maze(20, 20, 10, 10);
    maze.createBorder();
    game = new Game(maze);

    let menuItems = [
        ['Play', () => {sceneManager.setScene('game');}],
        ['Game mode', () => {}],
        ['High scores', () => {}],
        ['Settings', () => {}],
        ['Help', () => {}],
        ['Gucci', () => {gucciImageIndex++; gucciImageIndex%=gucciImages.length;}],
    ];
    mainMenu = new Menu(width/2, height*(1/2), SupremeMenuItem, 0, 50, 2.9);
    for (let i=0; i<menuItems.length; i++) {
        let menuItem = menuItems[i]
        mainMenu.addMenuItem(menuItem[1], menuItem[0], colors['supreme']['box'][i], colors['supreme']['text'][i], colors['supreme']['background'][i]);
    }

    gucciImageIndex = 0;

    deadTextState = false;
    deadTextState0Time = 0;
    deadTextState1Time = 0;
    deadTextState1BlinkTime = 2;
    deadSoundDelay = 60;
}

function draw() {
    sceneManager.onDraw();
}

function keyPressed() {
    sceneManager.onEvent('onKeyPressed');
}
