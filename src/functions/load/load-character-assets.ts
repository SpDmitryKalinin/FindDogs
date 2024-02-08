import * as Phaser from 'phaser';

/**
 * Load assets
 * 
 * @param {Phaser.Scene} scene - Scene to load
 */
export default function loadCharacterAssets(scene: Phaser.Scene) {
    scene.load.image('char', 'assets/components/сharacter/char.png');
}
