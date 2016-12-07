import Rx from 'rxjs';
import constants from '../../common/constants';
import uiElements from '../../common/uiElements';
import { clickToStart$, clickToRestart$ } from '../initSettings';


const clickKeyDown$ = Rx.Observable.fromEvent(document, 'keydown');
const clickKeyUp$ = Rx.Observable.fromEvent(document, 'keyup');
//++++++++++++++++++++++++++++++++++++++++++++++++
// heroShip$ + animation
//++++++++++++++++++++++++++++++++++++++++++++++++
export const clickToMove$ = clickKeyDown$
  .filter(e => e.keyCode === 37 || e.keyCode === 39) //37=left;39=right
  .switchMap(e => Rx.Observable
    .interval(constants.HEROSHIP_SPEED)
    .mapTo(e.keyCode === 37? -1: 1)
  )
  .takeUntil(clickKeyUp$)
  .repeat()
  .share();

export const heroShip$ = Rx.Observable
  .combineLatest(
    Rx.Observable.merge(clickToStart$, clickToRestart$),
    Rx.Observable.of({
      x: constants.HEROSHIP_INIT_X,
      y: constants.HEROSHIP_INIT_Y
    }),
    clickToMove$.startWith(0),
    (event, ship, moveTo) => {
      if(ship.x >= constants.STAGE_WIDTH && moveTo===1) {
        return { x: constants.STAGE_WIDTH, y: constants.HEROSHIP_INIT_Y };
      } else if(ship.x <= 0 && moveTo===-1) {
        return { x: 0, y: constants.HEROSHIP_INIT_Y };
      } else {
        return Object.assign(ship, {
          x: ship.x + moveTo * constants.HEROSHIP_STEP
        });
      }
    }
  )
  //.do(x => console.log(x))
  .share();
//++++++++++++++++++++++++++++++++++++++++++++++++
// drawHeroShip
//++++++++++++++++++++++++++++++++++++++++++++++++
export const moveHeroShipElm = (ship) => {
  uiElements.heroShip.style.left = ship.x+'px';
};








