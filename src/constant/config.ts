// Game config constant variables
export const GAME_TITLE: string = 'A Phaser 3 Project Template with Typescript and webpack';
export const WIDTH: number = 320;
export const HEIGHT: number = 192;
export const GRAVITY: number = 1000;
export const FONT: string = 'galaxy8';
export const FONT_SIZE: number = 8;

/**
 * Enum with scene names
 */
export const enum SCENE_NAME
{
    GAME_OVER = 'GameOverScene',
    GAME = 'GameScene',
    HUD = 'HudScene',
    LOADING = 'LoadingScene',
    LOGO = 'LogoScene',
}
