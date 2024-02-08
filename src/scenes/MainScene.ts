import loading from "../functions/preloader";
import loadUiAssets from "../functions/load/load-ui-assets";
import loadCharacterAssets from "../functions/load/load-character-assets";
import loadDogAssets from "../functions/load/load-dog-assets";
import loadSceneAssets from "../functions/load/load-scene.assets";
import Intro from "../classes/MainScene/Intro";
import DogManager from "../classes/MainScene/DogManager";
import { dogs } from "../utils/vars";
import Outro from "../classes/MainScene/Outro";

interface UpdateObjectInterface extends Phaser.Scene {
    item: any;
    desktopUpdate: (item: any) => void;
    mobileUpdate: (item: any) => void;
}


export default class MainScene extends Phaser.Scene {
    sceneWidth: number = 0;
    sceneHeight: number = 0;
    isHorizontal: boolean;
    needUpdateItems: UpdateObjectInterface[];
    buttonPlay: Phaser.GameObjects.Container | boolean;
    constructor() {
        super('MainScene')
        this.sceneWidth;
        this.sceneHeight;
        this.isHorizontal = false;
        this.buttonPlay = false;
        this.needUpdateItems = [];
    }
    
	preload() {
        //loading screen
        loading(this);

        //load assets
        loadUiAssets(this);
        loadCharacterAssets(this);
        loadDogAssets(this);
        loadSceneAssets(this);
    }

    create() {
        //Determining screen size and type
        this.updateSizesScene();
        this.scale.on('resize', () => {
            this.updateSizesScene();
        })
        this.createScene();
        //create Intro
        const instanceIntro = new Intro(this, this.updateSizesScene, this.needUpdatePush.bind(this), this.sceneWidth, this.sceneHeight, this.isHorizontal);
        //create Outro
        const instanceOutro= new Outro(this, this.updateSizesScene, this.needUpdatePush.bind(this), this.sceneWidth, this.sceneHeight, this.isHorizontal, this.startButtonAnim.bind(this));
        //on Outro Screen
        const finishFunction = () => instanceOutro.onScreen();
        //create Dogs
        const instanceDogManager = new DogManager(this, this.updateSizesScene, this.needUpdatePush.bind(this), this.sceneWidth, this.sceneHeight, this.isHorizontal, dogs, finishFunction);
        
    };

    //Method for updating coordinates, dimensions and components when the screen is resized
    updateSizesScene() {
        this.sceneWidth = this.scale.width;
        this.sceneHeight = this.scale.height;
        this.isHorizontal = this.sceneWidth > this.sceneHeight;

        this.needUpdateItems.forEach((object => {
            if(this.isHorizontal) {
                object.desktopUpdate(object.item);
            }
            else {
                object.mobileUpdate(object.item)
            }
        }))
    }

    //Method for adding an element to an array, which will be redrawn when the screen is resized
    needUpdatePush(item: UpdateObjectInterface) {
        this.needUpdateItems.push(item);
    }

    createScene() {
        this.createBackground();
        this.createButton();
    }

    createBackground() {
        const background = this.add.image(this.isHorizontal ? this.sceneWidth / 2 : this.sceneWidth / 4, this.sceneHeight / 2, 'background');
        //Picture proportions should not change with mobile resolution
        const aspectRation = 1024/768;

        background.setDisplaySize(this.sceneHeight * aspectRation, this.sceneHeight )
        background.setOrigin(0.5, 0.5);
        // @ts-ignore
        this.needUpdatePush({
            item: background,
            mobileUpdate: (item) => {
                item.setPosition(this.sceneWidth / 4, this.sceneHeight / 2);
                const aspectRation = 1024/768;
                background.setDisplaySize(this.sceneHeight * aspectRation, this.sceneHeight )
            },
            desktopUpdate: (item) => {
                item.setPosition(this.sceneWidth / 2, this.sceneHeight / 2);
                const aspectRation = 1024/768;
                background.setDisplaySize(this.sceneHeight * aspectRation, this.sceneHeight )
            }
        })

    }

    createButton() {
        const button = this.add.sprite(0, 0, 'button');
        button.setDepth(1);

        const text = this.add.text(0, 0, 'Play Now', { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff' });
        text.setOrigin(0.5, 0.5);
        
        this.buttonPlay = this.add.container(this.sceneWidth / 2, this.sceneHeight  - 100, [button, text]);
        if(!this.isHorizontal) {
            this.buttonPlay.setScale(1.2)
        }
        
        text.setPosition(this.buttonPlay.width / 2, this.buttonPlay.height / 2);

        // @ts-ignore
        this.needUpdatePush({
            item: this.buttonPlay,
            desktopUpdate: (item) => {
                item.x = this.sceneWidth / 2;
                item.y = this.sceneHeight  - 50
                item.setPosition(this.sceneWidth / 2, this.sceneHeight  - 100)
                item.setScale(1);
            },
            mobileUpdate: (item) => {
                item.setPosition(this.sceneWidth / 2, this.sceneHeight  - 100)
                item.setScale(1.2)
            }
        })

        this.buttonPlay.setDepth(2);
        this.buttonPlay.setSize(281, 113)
        this.buttonPlay.setInteractive();
        this.buttonPlay.on('pointerdown', () => {
            window.location.href = 'https://www.g5.com/ru';
        })
    }

    startButtonAnim() {
        if(typeof this.buttonPlay === 'boolean') {
            return
        }
        this.tweens.add({
            targets: this.buttonPlay,
            scaleX: this.buttonPlay.scaleX * 1.1,
            scaleY: this.buttonPlay.scaleY * 1.1,
            duration: 1000, 
            ease: 'Linear', 
            yoyo: true, 
            repeat: -1 
        });
    }
}


