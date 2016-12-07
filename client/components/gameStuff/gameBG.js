import Rx from 'rxjs';
import constants from '../../common/constants';
import uiElements from '../../common/uiElements';
import { clickToStart$, clickToRestart$ } from '../initSettings';
import { clickToMove$ } from './heroShip';





export const gameBGPos$ = Rx.Observable
  .combineLatest(
    Rx.Observable.merge(clickToStart$, clickToRestart$),
    clickToMove$.startWith(0),
    (event, moveTo) => moveTo
  )
  .scan((pos,moveTo) => {
    const movingSpeed = 0.3;
    let newPos = pos - (movingSpeed)*moveTo;
    const totalMoving = movingSpeed*(constants.STAGE_WIDTH/constants.HEROSHIP_STEP)/2;
    if(newPos<=-totalMoving) newPos=-totalMoving;
    if(newPos>=totalMoving) newPos=totalMoving;
    return newPos;
  },0)
  .share();


//++++++++++++++++++++++++++++++++++++++++++++++++
// drawGameBG
//++++++++++++++++++++++++++++++++++++++++++++++++
export const moveGameBGElm = (pos) => {
  uiElements.gameBG.style.left = pos+'px';
};








