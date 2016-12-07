import Rx from 'rxjs';
import uiElements from '../../common/uiElements';
import constants from '../../common/constants';
import helpers from '../../common/helpers';
import { clickToStart$, clickToRestart$ } from '../initSettings';


//++++++++++++++++++++++++++++++++++++++++++++++++
// allEnemies$
//++++++++++++++++++++++++++++++++++++++++++++++++
export const allEnemies$ = Rx.Observable
  .merge(clickToStart$, clickToRestart$)
  .switchMapTo(Rx.Observable.interval(constants.ENEMY_GENERATE_FREQ))
  .scan((enemies, enemy, i) => {
    return [...enemies,{
      index: i,
      ship: {
        x: parseInt( 50 + Math.floor(Math.random()*(constants.STAGE_WIDTH-100)) ),
        y: -10,
        yMove: 5+Math.floor(Math.random()*5),
        isActive: true
      },
      shots: []
    }];
  }, [])
  //.do(x=> console.log(x))
  .map(enemies => {
    // generate new enemyElm
    const i = enemies.length-1;
    // div
    const div = document.createElement("div");
    div.setAttribute('class', 'enemy');
    div.setAttribute('id', 'enemy_' + i);
    div.style.top = '-100px';
    div.style.left = '-100px';
    // divDiv
    const divDiv = document.createElement("div");
    divDiv.setAttribute('class', 'enemyShape');
    div.appendChild(divDiv);
    // append
    uiElements.enemies.appendChild(div);
    uiElements.enemyElms=[
      ...uiElements.enemyElms,
      document.querySelector('#enemy_'+i)
    ];
    uiElements.enemyShotElms[i]=[];
    
    return enemies;
  })
  .startWith([]);
//++++++++++++++++++++++++++++++++++++++++++++++++
// animeAllEnemies
//++++++++++++++++++++++++++++++++++++++++++++++++
export const animeAllEnemies = (enemies, generateShot) => {
  return enemies
    .map(enemy => {
      
      // anime ship
      if(enemy.ship.isActive) {
        enemy.ship.x += helpers.getRandomInt(-5, 5);
        enemy.ship.y += enemy.ship.yMove;
        if(enemy.ship.y >= constants.STAGE_HEIGHT) {
          enemy.ship.isActive = false;
        }
        if(enemy.ship.isActive===false) {
          enemy.ship.x = -100;
          enemy.ship.y = -100;
        }
      }
      
      // generate new shot
      if(enemy.ship.isActive) {
        const randomToGenerateShot = Math.floor(Math.random()*2)===0;
        const notTooManyShots = enemy.shots.length <= 3;
        if(generateShot && randomToGenerateShot && notTooManyShots) {
          // generate new enemyShot
          const timestamp = new Date().getTime();
          // div
          const div = document.createElement("div");
          div.setAttribute('class', 'enemyShot');
          div.setAttribute('id', 'enemyShot_' + timestamp);
          div.style.top = '-100px';
          div.style.left = '-100px';
          // append
          uiElements.enemyShots.appendChild(div);
          uiElements.enemyShotElms[enemy.index]=[
            ...uiElements.enemyShotElms[enemy.index],
            document.querySelector('#enemyShot_'+timestamp)
          ];
          // shots
          enemy.shots = [
            ...enemy.shots,
            {x: enemy.ship.x, y: enemy.ship.y, isActive:true}
          ];
        }
      }
      
      // anime shots
      enemy.shots = enemy.shots
        .map(shot => {
          shot.y += 10;
          if(shot.y >=constants.STAGE_HEIGHT) {
            shot.isActive=false;
          }
          if(shot.isActive===false) {
            shot.x = -100;
            shot.y = -100;
          }
          return shot;
        });
      
      return enemy;
    });
};
//++++++++++++++++++++++++++++++++++++++++++++++++
// drawAllEnemies
//++++++++++++++++++++++++++++++++++++++++++++++++
export const moveAllEnemyElms = (enemies) => {
  enemies.map(enemy => {
    const ship = enemy.ship;
    const shots = enemy.shots;
    
    // ship
    const enemyElm = uiElements.enemyElms[enemy.index];
    enemyElm.style.left = ship.x+'px';
    enemyElm.style.top = ship.y+'px';
    
    // shots
    shots.forEach((shot,i) => {
      const enemyShotElm = uiElements.enemyShotElms[enemy.index][i];
      enemyShotElm.style.left = shot.x+'px';
      enemyShotElm.style.top = shot.y+'px';
    });
  });
};