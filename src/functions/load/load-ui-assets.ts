import * as Phaser from 'phaser';

/**
 * Load assets
 * 
 * @param {Phaser.Scene} scene - Scene to load
 */
export default function loadUiAssets(scene: Phaser.Scene) {
    scene.load.image('button', 'assets/ui/btn.png');
    scene.load.image('logo', 'assets/ui/logo.png');
}
