import * as Phaser from 'phaser';
import {config} from './config';
import MainScene from './scenes/MainScene';
import checkHorizontal from './utils/checkHorizontal';


const isMobile = navigator.userAgent.includes("Mobile");

const game = new Phaser.Game(config);

game.scene.add('MainScene', MainScene);
game.scene.start('MainScene', MainScene);


window.addEventListener('resize', function () {
    if(checkHorizontal()) {
        game.scale.setGameSize(1024, 768)
        game.scale.refresh();
    }
    else {
        game.scale.setGameSize(600, 1000)
        game.scale.refresh();
    }
})