export interface CustomScene extends Phaser.Scene {
    sceneWidth: number;
    sceneHeight: number;
}

export interface dogItem {
    x: number;
    y: number;
    mx: number;
    my: number;
    scale: number[];
}

export interface DogArrayItem {
    item: Phaser.GameObjects.Container;
    active: boolean;
}