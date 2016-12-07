import Rx from 'rxjs';
import uiElements from '../../common/uiElements';
import constants from '../../common/constants';
import { clickToStart$, clickToRestart$ } from '../initSettings';



//++++++++++++++++++++++++++++++++++++++++++++++++
// allStars$
//++++++++++++++++++++++++++++++++++++++++++++++++
export const allStars$= Rx.Observable
  .merge(clickToStart$, clickToRestart$)
  // .switchMapTo(Rx.Observable.range(1, constants.STAR_TOTAL))
  // .map(() => ({
  //   x: parseInt( Math.floor(Math.random()*constants.STAGE_WIDTH) ),
  //   y: parseInt( Math.floor(Math.random()*constants.STAGE_HEIGHT) ),
  //   yMove: 0.5+Math.floor(Math.random()*2)
  // }))
  // .toArray()
  .switchMapTo(Rx.Observable.of( Array.apply(null, Array(constants.STAR_TOTAL)) ))
  .map(arr => {
    return arr.map(()=>({
      x: parseInt( Math.floor(Math.random()*constants.STAGE_WIDTH) ),
      y: parseInt( Math.floor(Math.random()*constants.STAGE_HEIGHT) ),
      yMove: 0.5+Math.floor(Math.random()*2)
    }));
  })
  //.do(x=> console.log(x.length))
  .startWith([]);
//++++++++++++++++++++++++++++++++++++++++++++++++
// animeAllStars
//++++++++++++++++++++++++++++++++++++++++++++++++
export const animeAllStars = (stars) => {
  return stars.map(star => {
    return Object.assign(star, {
      y: (star.y>=constants.STAGE_HEIGHT)?0:star.y+star.yMove
    });
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++
// drawAllStars
//++++++++++++++++++++++++++++++++++++++++++++++++
export const moveAllStarElms = (stars) => {
  stars.forEach((star, i) => {
    const starElm = uiElements.starElms[i];
    starElm.style.left = star.x+'px';
    starElm.style.top = star.y+'px';
  });
};
