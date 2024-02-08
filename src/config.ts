import * as Phaser from "phaser";
import checkHorizontal from "./utils/checkHorizontal";


export const config = {
	type: Phaser.WEBGL,
	parent: 'game',
	backgroundColor: '#000000',
	pixelArt: false,
	scale: {
		width: checkHorizontal() ? 1024 : 600,
		height: checkHorizontal() ? 768 : 1000,
		mode: Phaser.Scale.FIT,
    	autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
			fps: 60,
            debug: false,
        }
    },
};
