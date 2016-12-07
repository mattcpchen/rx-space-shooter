import Rx from 'rxjs';


export const clickToStart$ = Rx.Observable
  .fromEvent(document.querySelector("#startBtn"), 'click')
  .share();

export const clickToRestart$ = Rx.Observable
  .fromEvent(document.querySelector("#restartBtn"), 'click')
  .share();








