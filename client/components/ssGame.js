import Rx from 'rxjs';
import constants from '../common/constants';
import helpers from '../common/helpers';
import { clickToStart$, clickToRestart$ } from './initSettings';
import { allStars$, animeAllStars } from './gameStuff/stars';
import { allEnemies$, animeAllEnemies } from './gameStuff/enemies';
import { heroShots$, animeAllHeroShots } from './gameStuff/heroShots';



export const gameAnime$ = Rx.Observable
  .merge(clickToStart$, clickToRestart$)
  .switchMapTo(Rx.Observable.interval(constants.GAME_SPEED))
  .withLatestFrom(
    allStars$,
    allEnemies$,
    heroShots$,
    (time, stars, enemies, heroShots) => {
      stars = animeAllStars(stars);
      heroShots = animeAllHeroShots(heroShots);
      enemies = animeAllEnemies(enemies, time%25 ===0);
      
      return {stars, enemies, heroShots}
    })
  //.do(x=> console.log(x))
  .share();


export const gameScore$ = gameAnime$
  .map(({enemies, heroShots}) => {
    // check if collision
    let thisScore = 0;
    enemies.map(enemy => {
      heroShots.forEach(heroShot => {
        if (enemy.ship.isActive && helpers.isCollision(heroShot, enemy.ship)) {
          thisScore += 1;
          enemy.ship.isActive = false;
          enemy.ship.x = -100;
          enemy.ship.y = -100;
          heroShot.isActive = false;
          heroShot.x = -100;
          heroShot.y = -100;
        }
      });
    });
    return thisScore;
  })
  .scan((score,thisScore) => {
    return score+thisScore;
  }, 0)
  .startWith(0);