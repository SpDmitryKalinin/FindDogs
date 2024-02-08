import { CustomScene } from "../../interfaces/interfaces";

//This class acts as an interface to many other classes.
export default class DefaultScreen {
    scene: CustomScene;
    updateSizesScene: () => void;
    needUpdatePush: (value: any) => void;
    sceneWidth: number;
    sceneHeight: number;
    isHorizontal: boolean;
    constructor(scene: CustomScene, updateSizesScene: () => void, needUpdatePush: (value: any) => void, sceneWidth: number, sceneHeight: number, isHorizontal: boolean) {
        this.scene = scene;
        this.updateSizesScene = updateSizesScene;
        this.needUpdatePush = needUpdatePush;
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
        this.isHorizontal = isHorizontal;
    }
}