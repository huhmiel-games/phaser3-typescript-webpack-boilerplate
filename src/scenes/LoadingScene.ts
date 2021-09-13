import { Scene } from 'phaser';
import { FONT, FONT_SIZE, HEIGHT, SCENE_NAME, WIDTH } from '../constant/config';

import background from '../assets/graphics/rocky-tileset-background.png';

/**
 * @description a loading scene example, handle the preload of all assets
 * @author © Philippe Pereira 2020
 * @export
 * @class LoadingScene
 * @extends {Scene}
 */
export default class LoadingScene extends Scene
{
    constructor ()
    {
        super({
            key: SCENE_NAME.LOADING as string
        });
    }

    public preload (): void
    {
        //  Display cover and progress bar textures.
        this.showCover();
        this.showProgressBar();

        // Preload all assets here, ex:
        this.load.image('background', background);
    }

    public create (): void
    {
        this.cameras.main.setRoundPixels(true);

        this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONT, 'loading scene', FONT_SIZE, 1)
            .setOrigin(0.5, 0.5);
    }

    /**
     * Display cover
     */
    private showCover (): void
    {
        this.cameras.main.setRoundPixels(true);

        // progress bar white background
        this.add.image(WIDTH / 2, HEIGHT / 4 * 3 + 2, 'progressBarBg')
            .setDisplaySize(WIDTH / 4 * 3, 6)
            .setVisible(true);
    }

    /**
     * Display progress bar and percentage text
     */
    private showProgressBar (): void
    {
        //  Get the progress bar filler texture dimensions.
        const { width: w, height: h } = this.textures.get('progressBar').get();

        //  Place the filler over the progress bar of the splash screen.
        const img: Phaser.GameObjects.Sprite = this.add.sprite(WIDTH / 2, HEIGHT / 4 * 3, 'progressBar')
            .setOrigin(0.5, 0)
            .setDisplaySize(WIDTH / 4 * 3 - 2, 4);

        // Add percentage text
        const loadingpercentage: Phaser.GameObjects.BitmapText = this.add.bitmapText(WIDTH / 2, HEIGHT - HEIGHT / 8, FONT, 'loading:', FONT_SIZE, 1)
            .setOrigin(0.5, 0.5)
            .setAlpha(1);

        //  Crop the filler along its width, proportional to the amount of files loaded.
        this.load.on('progress', (progress: number) =>
        {
            loadingpercentage.text = `loading: ${Math.round(progress * 100)}%`;

            img.setCrop(0, 0, Math.ceil(progress * w), h);

        }).on('complete', () =>
        {
            loadingpercentage.text = 'press any key to start';

            this.startGameScene();
        });
    }

    private startGameScene (): void
    {
        this.input.keyboard.once('keydown', () =>
        {
            this.scene.start(SCENE_NAME.GAME);
        });
    }
}