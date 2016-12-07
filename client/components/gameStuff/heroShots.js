import Rx from 'rxjs';
import uiElements from '../../common/uiElements';
import { clickToStart$, clickToRestart$ } from '../initSettings';
import { heroShip$ } from './heroShip';




//++++++++++++++++++++++++++++++++++++++++++++++++
// heroShots$
//++++++++++++++++++++++++++++++++++++++++++++++++
const clickToShot$ = Rx.Observable
  .fromEvent(document, 'keydown')
  .filter(e => e.keyCode === 32); //32=SPACE

export const heroShots$ = Rx.Observable
  .combineLatest(
    Rx.Observable.merge(clickToStart$, clickToRestart$),
    clickToShot$,
    (startEvent, clickEvent) => {
      return clickEvent;
    })
  .withLatestFrom(heroShip$, (event, ship) => ({
    x: ship.x,
    y: ship.y,
    isActive: true
  }))
  .scan((shots, shot) => {
    return [...shots, shot]
  }, [])
  .map(shots => {
    // generate new heroShot
    const i = shots.length-1;
    const div = document.createElement("div");
    div.setAttribute('class', 'heroShot');
    div.setAttribute('id', 'heroShot_' + i);
    div.style.top = '-100px';
    div.style.left = '-100px';
    uiElements.heroShots.appendChild(div);
    uiElements.heroShotElms=[
      ...uiElements.heroShotElms,
      document.querySelector('#heroShot_'+i)
    ];
    
    return shots;
  })
  //.do(x => console.log(x))
  .startWith([]);
//++++++++++++++++++++++++++++++++++++++++++++++++
// animeAllHeroShots
//++++++++++++++++++++++++++++++++++++++++++++++++
export const animeAllHeroShots = (heroShots) => {
  return heroShots
    .map((heroShot,i) => {
      heroShot.y = heroShot.y-10;
      if(heroShot.y <= 0) heroShot.isActive = false;
      if(heroShot.isActive===false) {
        heroShot.x = -100;
        heroShot.y = -100;
      }
      return heroShot;
    });
};
//++++++++++++++++++++++++++++++++++++++++++++++++
// drawHeroShots
//++++++++++++++++++++++++++++++++++++++++++++++++
export const moveAllHeroShotElms = (heroShots) => {
  heroShots.forEach((heroShot,i) => {
    const heroShotElm = uiElements.heroShotElms[i];
    heroShotElm.style.left = heroShot.x+'px';
    heroShotElm.style.top = heroShot.y+'px';
  });
};







