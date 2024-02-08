import * as Phaser from 'phaser';

/**
 * Load assets
 * 
 * @param {Phaser.Scene} scene - Scene to load
 */
export default function loadDogAssets(scene: Phaser.Scene) {
    scene.load.image('dog', 'assets/components/dog/doggy.png');
    scene.load.atlas('circle', 'assets/components/dog/circle/circle.png', 'assets/components/dog/circle/circle.json');
}
