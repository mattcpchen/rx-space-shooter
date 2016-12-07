

const gameStageWidth = 700;
const gameStageHeight = 500;

export default {
  STAGE_WIDTH: gameStageWidth,
  STAGE_HEIGHT: gameStageHeight,
  GAMEOVER_HEIGHT: 200,
  
  GAME_SPEED: 40,
  STAR_TOTAL: 200,
  ENEMY_GENERATE_FREQ: 1500,
  GAME_BGS: [
    './images/universe_01.jpg',
    './images/universe_02.jpg',
    './images/universe_03.jpg',
    './images/universe_04.jpg'
  ],
  
  HEROSHIP_SPEED: 10,
  HEROSHIP_STEP: 3,
  HEROSHIP_INIT_X: gameStageWidth/2,
  HEROSHIP_INIT_Y: gameStageHeight-5
}
