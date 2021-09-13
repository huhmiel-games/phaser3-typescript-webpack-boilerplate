import { Scene } from 'phaser';
import { FONT, FONT_SIZE, HEIGHT, SCENE_NAME, WIDTH } from '../constant/config';
import GameScene from './GameScene';


/**
 * @description a hud scene example
 * @author © Philippe Pereira 2020
 * @export
 * @class HudScene
 * @extends {Scene}
 */
export default class HudScene extends Scene
{
    private mainScene: GameScene;
    private lifeText: Phaser.GameObjects.BitmapText;

    constructor ()
    {
        super({ key: SCENE_NAME.HUD as string, active: false });
    }

    public create (): void
    {
        this.mainScene = this.scene.get(SCENE_NAME.GAME) as GameScene;

        this.scene.bringToTop(SCENE_NAME.HUD);

        this.cameras.main.setPosition(0, 0)
            .setSize(WIDTH, HEIGHT / 8)
            .setAlpha(0);

        this.lifeText = this.add.bitmapText(WIDTH / 2, HEIGHT / 16, FONT, '3', FONT_SIZE, 1)
            .setOrigin(0.5, 0.5);

        this.mainScene.events.on('setHealth', (life: number ) =>
        {
            this.lifeText.setText(life.toString());
        });

        this.showtHud();
    }

    private showtHud (): void
    {
        this.cameras.main.setAlpha(1);
    }
}
