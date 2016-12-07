import Rx from 'rxjs';
import styles from './app.scss';
import uiElements from './common/uiElements';
import constants from './common/constants';
import helpers from './common/helpers';
import { clickToStart$, clickToRestart$ } from './components/initSettings';
import { moveAllStarElms } from './components/gameStuff/stars';
import { moveAllEnemyElms } from './components/gameStuff/enemies';
import { heroShip$, moveHeroShipElm } from './components/gameStuff/heroShip';
import { moveAllHeroShotElms } from './components/gameStuff/heroShots';
import { gameBGPos$, moveGameBGElm } from './components/gameStuff/gameBG';
import { gameAnime$, gameScore$ } from './components/ssGame';





helpers.initAllUI();
//++++++++++++++++++++++++++++++++++++++++++++++++
// init
//++++++++++++++++++++++++++++++++++++++++++++++++
clickToStart$.subscribe(event => {
  uiElements.title.innerHTML = 'sCorE:';
  uiElements.introHolder.style.display = 'none';
  uiElements.introCtrls.style.display = 'none';
  uiElements.gameHolder.style.display = 'block';
  uiElements.gameCtrls.style.display = 'none';
});

clickToRestart$.subscribe(e => {
  uiElements.gameHolder.style.height = constants.STAGE_HEIGHT + 'px';
  uiElements.gameOver.style.display = 'none';
  uiElements.gameCtrls.style.display = 'none';
});
//++++++++++++++++++++++++++++++++++++++++++++++++
// subscribe
//++++++++++++++++++++++++++++++++++++++++++++++++
const game$ = Rx.Observable
  .combineLatest(
    gameAnime$,
    gameScore$,
    heroShip$,
    gameBGPos$,
    ({stars, enemies, heroShots}, score, heroShip, gameBGPos) => ({
      stars, enemies, heroShots, score, heroShip, gameBGPos
    })
  )
  .takeWhile(({enemies, heroShip, gameBGPos}) => {
    let isGameOver = false;
    enemies.forEach((enemy) => {
      const enemyShip = enemy.ship;
      const clashEnemyShip = helpers.isCollision(enemyShip, heroShip);
      const clashEnemyShot = enemy.shots.some((shot) => helpers.isCollision(shot, heroShip));
      if(clashEnemyShip || clashEnemyShot) {
        helpers.resetAllUI();
        heroShip.x = constants.HEROSHIP_INIT_X;
        uiElements.heroShip.style.left = heroShip.x + 'px';
        gameBGPos = 0;
        uiElements.gameBG.style.left = '0px';
        uiElements.gameHolder.style.height = constants.GAMEOVER_HEIGHT + 'px';
        uiElements.gameOver.style.display = 'block';
        uiElements.gameCtrls.style.display = 'block';
        isGameOver = true;
      }
    });
    
    return isGameOver === false;
  })
  .repeat();


game$.subscribe(response => {
  // drawAll
  moveAllStarElms(response.stars);
  moveAllEnemyElms(response.enemies);
  moveHeroShipElm(response.heroShip);
  moveAllHeroShotElms(response.heroShots);
  moveGameBGElm(response.gameBGPos);
  // score
  uiElements.gameScore.innerHTML = response.score;
});


