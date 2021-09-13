import { Scene } from 'phaser';
import { WIDTH, HEIGHT, FONT, FONT_SIZE, SCENE_NAME } from '../constant/config';

// import needed assets files
import progressBar from '../assets/ui/progress-bar.png';
import progressBarBg from '../assets/ui/progress-bar-bg.png';
import galaxy8 from '../assets/fonts/galaxy/galaxy8.png';
import galaxy8XML from '../assets/fonts/galaxy/galaxy8.xml';



/**
 * @description a logo scene example, this is the first scene to load
 * @author © Philippe Pereira 2020
 * @export
 * @class LogoScene
 * @extends {Scene}
 */
export default class LogoScene extends Scene
{
    constructor ()
    {
        super({
            key: SCENE_NAME.LOGO as string
        });
    }

    public preload (): void
    {
        // Preload assets needed for this scene and the loading scene
        this.load.image('progressBar', progressBar);
        this.load.image('progressBarBg', progressBarBg);
        this.load.bitmapFont('galaxy8', galaxy8, galaxy8XML);
    }

    public create (): void
    {
        const sceneTitleText: Phaser.GameObjects.BitmapText = this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONT, 'logo scene', FONT_SIZE, 1)
            .setOrigin(0.5, 0.5)
            .setAlpha(0);

        const tweenSceneTitleText: Phaser.Tweens.Tween = this.tweens.add({
            targets: sceneTitleText,
            ease: 'Sine.easeInOut',
            duration: 2000,
            delay: 1000,
            repeat: 0,
            yoyo: true,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1,
            },
            onComplete: () =>
            {
                this.scene.start(SCENE_NAME.LOADING);
            },
        });

        // to skip this scene
        this.input.keyboard.once('keydown', () =>
        {
            tweenSceneTitleText.stop();

            this.scene.start(SCENE_NAME.LOADING);
        });
    }
}
