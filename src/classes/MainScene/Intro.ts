import {CustomScene} from "../../interfaces/interfaces";
import DefaultScreen from "./DefaultStage";

export default class Intro extends DefaultScreen {
    introContainer: Phaser.GameObjects.Container | boolean;
    constructor(scene: CustomScene, updateSizesScene: () => void, needUpdatePush: (value: any) => void, sceneWidth: number, sceneHeight: number, isHorizontal: boolean) {
        super(scene, updateSizesScene, needUpdatePush, sceneWidth, sceneHeight, isHorizontal)
        this.introContainer = false;
        this.init();
    }

    init() {
        this.createElements();
    }

    createElements() {
        //container for all elements
        const introContainer = this.createIntroContainer();
        //elements
        const containerAnim = this.createContainerAnim();
        const overlay = this.createOverlay();
        const textString = this.createTextString();
        const textStringSecond = this.createTextStringSecond();
        //argument end textString coord
        const dogSprite = this.createDogSprite(textString.width / 2);

        containerAnim.add([textString, textStringSecond, dogSprite]);
        if(typeof introContainer !== 'boolean') {
            introContainer.add([overlay, containerAnim]);
            this.animationIntro(introContainer)
        }
    }

    createIntroContainer() {
        this.introContainer = this.scene.add.container(0, 0);
        if(typeof this.introContainer !== 'boolean')
        this.introContainer.setDepth(1)
        //container for scale animation
        

        this.needUpdatePush(
            {
                item: this.introContainer,
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

        return this.introContainer;
    }

    createContainerAnim() {
        const containerAnim = this.scene.add.container(this.sceneWidth / 2, this.sceneHeight / 2);

        this.needUpdatePush(
            {
                item: containerAnim,
                desktopUpdate: (item: any) => {
                    item.x = this.scene.sceneWidth / 2;
                    item.y = this.scene.sceneHeight / 2
                },
                mobileUpdate: (item: any) => {
                    item.x = this.scene.sceneWidth / 2;
                    item.y = this.scene.sceneHeight / 2
                }

            }
        )
        return containerAnim;
    }

    createOverlay() {
        const overlay = this.scene.add.graphics();
        overlay.fillStyle(0x000000);
        overlay.fillRect(0, 0, this.scene.sceneWidth, this.scene.sceneHeight);
        overlay.setAlpha(0);

        this.needUpdatePush(
            {
                item: overlay,
                desktopUpdate: (item: any) => {
                    const alpha = item.alpha;
                    item.clear();
                    item.fillStyle(0x000000);
                    item.fillRect(0, 0, this.scene.sceneWidth, this.scene.sceneHeight);
                    item.alpha = alpha
                },
                mobileUpdate: (item: any) => {
                    const alpha = item.alpha;
                    item.clear();
                    item.fillStyle(0x000000);
                    item.fillRect(0, 0, this.scene.sceneWidth, this.scene.sceneHeight);
                    item.alpha = alpha;
                }

            }
        )
        return overlay;
    }

    createTextString() {
        const textString = this.scene.make.text({
            x: -50,
            y: -40,
            text: '5 Hidden Dogs',
            style: {
                font: 'bold 50px monospace',
                color: '#ffffff',
            }
        });
        textString.setOrigin(0.5, 0.5);
        return textString;
    }

    createTextStringSecond() {
        const textStringSecond = this.scene.make.text({
            x: 0,
            y: 40,
            text: 'Can you spot them?',
            style: {
                font: 'bold 50px monospace',
                color: '#ffffff',
            }
        });

        textStringSecond.setOrigin(0.5, 0.5);

        return textStringSecond;
    }

    createDogSprite(x: number) {
        const dogSprite = this.scene.add.sprite(x, -50, 'dog');
        dogSprite.setOrigin(0.5, 0.5)
        dogSprite.setScale(-0.8, 0.8)
        return dogSprite;
    }

    animationIntro(container: Phaser.GameObjects.Container) {
        const overlay = container.list[0];
        const containerAnim: Phaser.GameObjects.Container = container.list[1] as Phaser.GameObjects.Container;
        containerAnim.setScale(0.8);
        containerAnim.setAlpha(0.3);

        this.scene.tweens.add({
            targets: overlay,
            alpha: 0.8,
            duration: 1000,
            ease: 'Linear',
            delay: 0,
        });

        this.scene.tweens.add({
            targets: containerAnim,
            alpha: 1,
            duration: 1000,
            ease: 'Linear',
            delay: 0,
        });

        this.scene.tweens.add({
            targets: containerAnim,
            scale: 1,
            duration: 2000,
            ease: 'Linear',
            delay: 0,
            onComplete: () => {
                this.hideIntro();
            }
        });
    }

    hideIntro() {
        let timer = this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.scene.tweens.add({
                    targets: this.introContainer,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear',
                    delay: 0,
                });

            },
            callbackScope: this,
            loop: false,
        });
    }
}