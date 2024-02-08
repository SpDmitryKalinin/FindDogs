import * as Phaser from 'phaser';

/**
 * Load assets
 * 
 * @param {Phaser.Scene} scene - Scene to load
 */
export default function loadSceneAssets(scene: Phaser.Scene) {
    scene.load.image('background', 'assets/scene/back_five_dogs.jpg');
}
