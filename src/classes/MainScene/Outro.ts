import { GameObjects } from "phaser";
import { CustomScene } from "../../interfaces/interfaces";
import DefaultScreen from "./DefaultStage";


export default class Outro extends DefaultScreen {
    outroContainer: Phaser.GameObjects.Container | boolean;
    buttonStartAnimation: () => void
    constructor(scene: CustomScene, updateSizesScene: () => void, needUpdatePush: (value: any) => void, sceneWidth: number, sceneHeight: number, isHorizontal: boolean, buttonStartAnimation: () => void) {
        super(scene, updateSizesScene, needUpdatePush, sceneWidth, sceneHeight, isHorizontal)
        this.outroContainer = false;
        this.buttonStartAnimation = buttonStartAnimation;
        this.init()


    }
    init() {
        this.createElements();
        if (typeof this.outroContainer === 'boolean') {
            return
        }
        this.outroContainer.alpha = 0;
    }

    onScreen() {
        this.scene.tweens.add({
            targets: this.outroContainer,
            alpha: 1,
            duration: 1000,
            ease: 'Linear',
            delay: 0,
        });
        this.buttonStartAnimation();
    }

    createElements() {
        //container for elements
        const outroContainer = this.createOutroContiner();
        //elements
        const overlay = this.createOverlay();
        const logo = this.createLogo();
        const char = this.createChar();
        const title = this.createTitle();
        const string = this.createString();

        outroContainer.add([overlay, logo, char, title, string]);
    }

    createOutroContiner() {
        this.outroContainer = this.scene.add.container(0, 0);
        this.outroContainer.setDepth(1);

        this.needUpdatePush(
            {
                item: this.outroContainer,
                desktopUpdate: (item: any) => {
                    item.x = 0;
                    item.y = 0;
                },
                mobileUpdate: (item: any) => {
                    item.x = 0;
                    item.y = 0;
                }
            }
        )

        return this.outroContainer;
    }

    createTitle() {
        const coordsTitle = this.isHorizontal ? { x: this.sceneWidth / 2, y: 330 } : { x: this.sceneWidth / 2, y: 620 };
        const title = this.scene.make.text({
            x: coordsTitle.x,
            y: coordsTitle.y,
            text: 'Great Job',
            style: {
                font: 'bold 100px monospace',
                color: 'gold',
            }
        });
        title.setOrigin(0.5, 0.5);

        this.needUpdatePush(
            {
                item: title,
                desktopUpdate: (item: any) => {
                    item.x = this.scene.sceneWidth / 2;
                    item.y = 330;
                },
                mobileUpdate: (item: any) => {
                    item.x = this.scene.sceneWidth / 2;
                    item.y = 620;
                }
            }
        )
        return title;
    }

    createString() {
        const coordsString = this.isHorizontal ? { x: this.sceneWidth / 2, y: 450 } : { x: this.sceneWidth / 2, y: 730 };
        const textString = this.scene.make.text({
            x: coordsString.x,
            y: coordsString.y,
            text: 'Can you solve every mystery?',

            style: {
                font: 'bold 50px monospace',
                color: '#ffffff',
                align: 'center',
            }
        });
        textString.setWordWrapWidth(390)
        textString.setOrigin(0.5, 0.5);

        this.needUpdatePush(
            {
                item: textString,
                desktopUpdate: (item: any) => {
                    item.x = this.scene.sceneWidth / 2;
                    item.y = 450;
                },
                mobileUpdate: (item: any) => {
                    item.x = this.scene.sceneWidth / 2;
                    item.y = 730;
                }
            }
        )
        return textString;
    }

    createChar() {
        const coordsChar = this.isHorizontal ? { x: 100, y: 400 } : { x: this.sceneWidth / 2, y: 600 };
        const scaleChar = this.isHorizontal ? { x: 0.9, y: 0.9 } : { x: -0.6, y: 0.6 };
        const char = this.scene.add.sprite(coordsChar.x, coordsChar.y, 'char');
        char.setOrigin(0.5, 0.5);
        char.setScale(scaleChar.x, scaleChar.y);

        this.needUpdatePush(
            {
                item: char,
                desktopUpdate: (item: any) => {
                    item.x = 100;
                    item.y = 400;
                    char.setScale(0.9, 0.9);
                },
                mobileUpdate: (item: any) => {
                    item.x = this.scene.sceneWidth / 2;
                    item.y = 600;
                    char.setScale(-0.6, 0.6);
                }
            }
        )
        return char;
    }

    createOverlay() {
        const overlay = this.scene.add.graphics();
        overlay.fillStyle(0x000000);
        overlay.fillRect(0, 0, this.scene.sceneWidth, this.scene.sceneHeight);
        overlay.setAlpha(0.8);
        overlay.setDepth(0)

        this.needUpdatePush(
            {
                item: overlay,
                desktopUpdate: (item: any) => {
                    const alpha = item.alpha;
                    overlay.clear();
                    overlay.fillStyle(0x000000);
                    overlay.fillRect(0, 0, this.scene.sceneWidth, this.scene.sceneHeight);
                    overlay.alpha = alpha
                },
                mobileUpdate: (item: any) => {
                    const alpha = item.alpha;
                    overlay.clear();
                    overlay.fillStyle(0x000000);
                    overlay.fillRect(0, 0, this.scene.sceneWidth, this.scene.sceneHeight);
                    overlay.alpha = alpha;
                }

            }
        )
        return overlay;
    }

    createLogo() {
        const logo = this.scene.add.sprite(this.sceneWidth / 2, 150, 'logo');
        logo.setOrigin(0.5, 0.5);

        this.needUpdatePush(
            {
                item: logo,
                desktopUpdate: (item: any) => {
                    item.x = this.scene.sceneWidth / 2;
                    item.y = 150;
                },
                mobileUpdate: (item: any) => {
                    item.x = this.scene.sceneWidth / 2;
                    item.y = 150;
                }

            }
        )

        return logo;
    }
}