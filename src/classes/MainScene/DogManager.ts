import { CustomScene, DogArrayItem, dogItem } from "../../interfaces/interfaces";
import DefaultScreen from "./DefaultStage";




export default class DogManager extends DefaultScreen {
    introContainer: Phaser.GameObjects.Container | boolean;
    dogsArray: dogItem[];
    dogsArraySprite: DogArrayItem[];
    finishFunction: () => void;
    constructor(scene: CustomScene, updateSizesScene: () => void, needUpdatePush: (value: any) => void, sceneWidth: number, sceneHeight: number, isHorizontal: boolean, dogsArray: dogItem[], finishFunction: () => void) {
        super(scene, updateSizesScene, needUpdatePush, sceneWidth, sceneHeight, isHorizontal)
        this.introContainer = false;
        this.dogsArray = dogsArray;
        this.dogsArraySprite = [];
        this.finishFunction = finishFunction;
        this.init();
    }

    init() {
        this.createAnims();
        this.dogsArraySprite = this.createDogItems();
        this.addListeners();
    }

    createAnims() {
        this.scene.anims.create({
            key: 'circle-anim',
            frames: this.scene.anims.generateFrameNames('circle', {
                start: 1,
                end: 8,
                prefix: `circle_`,
                suffix: '.png',
            }),
            frameRate: 15,
            repeat: 0,
        })
    }

    createDogItems() {
        const dogSrpitesArray = this.dogsArray.map(dog => {
            const { x, y, mx, my, scale } = dog;

            let dogItem;
            if (this.isHorizontal) {
                dogItem = this.scene.add.container(x, y,);

            }
            else {
                dogItem = this.scene.add.container(mx, my);
            }
            const circle = this.scene.add.sprite(60, 70, 'circle');
            circle.visible = false;

            const dogSprite = this.scene.add.sprite(0, 0, 'dog').setOrigin(0, 0)
            dogItem.add([dogSprite, circle])
            dogItem.setDepth(0);
            dogItem.setScale(scale[0], scale[1]);

            this.needUpdatePush({
                item: dogItem,
                desktopUpdate: (item: any) => {
                    item.x = x;
                    item.y = y
                },
                mobileUpdate: (item: any) => {
                    item.x = mx;
                    item.y = my;
                }
            })

            return { item: dogItem, active: false };
        })
        return dogSrpitesArray;

    }

    addListeners() {
        this.dogsArraySprite.forEach((dogArrayItem => {

            const [sprite, circle] = dogArrayItem.item.list;
            sprite.setInteractive({ cursor: 'pointer' });
            sprite.on('pointerdown', () => {
                if (dogArrayItem.active === false) {
                    //@ts-ignore
                    circle.play('circle-anim');
                    //@ts-ignore
                    circle.visible = true;
                    dogArrayItem.active = true;
                }
                this.checkWin();
            })
        }))
    }

    checkWin() {
        const isWin = this.dogsArraySprite.every((item) => item.active === true);
        if (isWin) {
            this.finishFunction();
        }
    }
}