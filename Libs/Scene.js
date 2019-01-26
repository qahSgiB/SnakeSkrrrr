class SceneManager {
    constructor() {
        this.sceneName = undefined;
        this.scenes = {};
    }

    addScene(scene) {
        this.scenes[scene.name] = scene;
    }

    setScene(sceneName) {
        if (this.actualScene() != undefined) {
            this.actualScene().onEnd();
        }
        this.sceneName = sceneName;
        this.actualScene().onStart();
    }

    onEvent(eventName, ...args) {
        let scene = this.actualScene();

        if (scene[eventName] != undefined) {
            scene[eventName](...args)
        }
    }

    actualScene() {
        return (this.sceneName == undefined) ? undefined : this.scenes[this.sceneName];
    }

    onDraw() {
        this.actualScene().onDraw();
    }
}

class Scene {
    constructor(name) {
        this.name = name;
    }

    onStart() {

    }

    onEnd() {

    }

    onDraw() {

    }
}
