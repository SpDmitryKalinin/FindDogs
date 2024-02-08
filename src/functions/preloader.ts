import * as Phaser from "phaser";

//reference https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/

export default function loading(scene: Phaser.Scene) {
    //create variables
    const sceneWidth = scene.game.scale.width;
    const sceneHeight = scene.game.scale.height;

    //create elements
    const overlay = createOverlay();
    const progressBox = createProgressBox()
    const progressBar = createProgressBar();
    const loadingText = createLoadingText();
    const assetText = createAssetText();
    const percentText = createPercentText();

    const assets = [overlay,progressBar, progressBox, loadingText, percentText, assetText];
    assets.forEach((asset, i) => {
        asset.depth = 1000000;
    });
    scene.load.on('fileprogress', (file: Phaser.Loader.File) => {
        assetText.setText('Loading asset: ' + file.key);
    });

    scene.load.on('complete', () => {
        scene.add.tween({
            targets: assets,
            ease: 'Sine.easeInOut',
            duration: 800,
            delay: 0,
            alpha: {
              getStart: () => 1,
              getEnd: () => 0
            },
            onComplete: () => {
              assets.forEach(asset => asset.destroy());
            }
        });
    });

    function createOverlay() {
        const overlay = scene.add.graphics();
        
        overlay.fillStyle(0x000000);
        overlay.fillRect(0, 0, sceneWidth, sceneHeight);
        return overlay;
    }

    function createPercentText() {
        const percentText = scene.make.text({
            x: sceneWidth / 2,
            y: sceneHeight / 2 + 50,
            text: '0%',
            style: {
                font: '18px monospace',
                color: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        return percentText;
    }

    function createAssetText() {
        const assetText = scene.make.text({
            x: sceneWidth / 2,
            y: sceneHeight / 2 + 100,
            text: '',
            style: {
                font: '18px monospace',
                color: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        return assetText;
    }

    function createLoadingText() {
        const loadingText = scene.make.text({
            x: sceneWidth / 2,
            y: sceneHeight / 2,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                color: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        return loadingText;
    }

    function createProgressBox() {
        const progressBox = scene.add.graphics();
        const length = sceneWidth / 2;
        const x = sceneWidth / 2 - length / 2;
        const y = sceneHeight / 2 + 25;
        const height = 50;
        progressBox.fillStyle(0x222222, 0.5);
        progressBox.fillRect(x, y, length , height);
        return progressBox;
    }

    function createProgressBar() {
        const progressBar = scene.add.graphics();
        const length = (sceneWidth / 2) - 4;
        const x = sceneWidth / 2 - length / 2 + 2;
        const y = (sceneHeight / 2 + 25) + 5;
        
        const height = 50 - 10;
        scene.load.on('progress', (value: number) => {
            percentText.setText(`${(value * 100).toFixed(0)}%`);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 0.5);
            progressBar.fillRect(x, y, length * value, height);
        });
        return progressBar;
    }
}