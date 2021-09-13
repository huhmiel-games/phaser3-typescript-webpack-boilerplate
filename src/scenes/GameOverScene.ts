import { Scene } from 'phaser';
import { FONT, FONT_SIZE, HEIGHT, WIDTH, SCENE_NAME } from '../constant/config';


/**
 * @description a game over scene example
 * @author © Philippe Pereira 2020
 * @export
 * @class GameOverScene
 * @extends {Scene}
 */
export default class GameOverScene extends Scene
{
    constructor ()
    {
        super({
            key: SCENE_NAME.GAME_OVER
        });
    }

    public create (): void
    {
        this.scene.stop(SCENE_NAME.HUD);

        this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONT, 'game over', FONT_SIZE, 1)
            .setOrigin(0.5, 0.5);
        
        this.add.bitmapText(WIDTH / 2, HEIGHT / 4 * 3, FONT, 'press any key to retry', FONT_SIZE, 1)
            .setOrigin(0.5, 0.5);

        // fading the scene from black
        this.cameras.main.fadeIn(500);

        this.input.keyboard.once('keydown', () =>
        {
            this.scene.start(SCENE_NAME.GAME);
        });
    }
}
