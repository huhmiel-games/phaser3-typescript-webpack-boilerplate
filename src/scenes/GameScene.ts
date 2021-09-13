import { Scene } from 'phaser';
import { WIDTH, HEIGHT, FONT, FONT_SIZE, SCENE_NAME } from '../constant/config';

/**
 * @description a main game scene example
 * @author © Philippe Pereira 2020
 * @export
 * @class GameScene
 * @extends {Scene}
 */
export default class GameScene extends Scene
{
    private life: number = 3;
    constructor ()
    {
        super({ key: SCENE_NAME.GAME as string });
    }

    public init (): void
    {
        // reset life, needed after game over
        this.life = 3;

        // fading the scene from black
        this.cameras.main.fadeIn(500);
    }


    public create (): void
    {
        // set the fps to 120 for good collisions at high speed (only if needed)
        // this.physics.world.setFPS(120);

        this.add.image(WIDTH / 2, HEIGHT / 2, 'background');

        this.add.bitmapText(WIDTH / 2, HEIGHT / 2, FONT, 'game scene', FONT_SIZE, 1)
            .setOrigin(0.5, 0.5);
        
        this.add.bitmapText(WIDTH / 2, HEIGHT / 4 * 3, FONT, 'press any key', FONT_SIZE, 1)
            .setOrigin(0.5, 0.5);

        // Launch the HUD Scene
        this.scene.launch(SCENE_NAME.HUD).setActive(true, SCENE_NAME.HUD);

        // Example emitting data to HUD scene
        this.input.keyboard.on('keydown', () =>
        {
            this.life -= 1;

            // emit setHealth event
            this.events.emit('setHealth', this.life);

            // start the game over scene
            if (this.life === 0)
            {
                this.scene.start(SCENE_NAME.GAME_OVER);
            }
        });
    }

    public update (time: number, delta: number): void
    {
        // Handle logic here
    }
}
