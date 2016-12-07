import constants from './constants';
import uiElements from './uiElements';





//++++++++++++++++++++++++++++++++++++++++++++++++
// reused methods
//++++++++++++++++++++++++++++++++++++++++++++++++
const getRandomInt = (min, max) => {
  return min + Math.floor( Math.random()*(max-min+1) );
};

const isCollision = (target1, target2) => {
  return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
    (target1.y > target2.y - 20 && target1.y < target2.y + 20);
};
//++++++++++++++++++++++++++++++++++++++++++++++++
// initAllUI
//++++++++++++++++++++++++++++++++++++++++++++++++
const initAllUI = () => {
  // stars
  uiElements.stars.innerHTML = "";
  for(var i=0; i<constants.STAR_TOTAL; i++) {
    const starSize = 1 + Math.random()*3;
    const div = document.createElement("div");
    div.setAttribute('class', 'star');
    div.setAttribute('id', 'star_' + i);
    div.style.width = starSize + 'px';
    div.style.height = starSize + 'px';
    div.style.borderRadius = starSize/2 + 'px';
    uiElements.stars.appendChild(div);
    uiElements.starElms=[
      ...uiElements.starElms,
      document.querySelector('#star_'+i)
    ];
  }
  const gameBG = constants.GAME_BGS[Math.floor(Math.random()*constants.GAME_BGS.length)];
  uiElements.gameBGImage.onload = function() {
    const posX = -1*(this.width-constants.STAGE_WIDTH)/2;
    const posY = -1*(this.height-constants.STAGE_HEIGHT)/2;
    this.style.left = posX +'px';
    this.style.top = posY +'px';
  };
  uiElements.gameBGImage.src = gameBG;
  // heroShip
  uiElements.heroShip.style.top = constants.HEROSHIP_INIT_Y + 'px';
};
//++++++++++++++++++++++++++++++++++++++++++++++++
// resetAllUI
//++++++++++++++++++++++++++++++++++++++++++++++++
const resetAllUI = () => {
  // heroShots
  uiElements.heroShots.innerHTML = '';
  uiElements.heroShotElms=[];
  // enemies
  uiElements.enemies.innerHTML = '';
  uiElements.enemyElms = [];
  uiElements.enemyShots.innerHTML = '';
  uiElements.enemyShotElms = {};
};
//++++++++++++++++++++++++++++++++++++++++++++++++



export default {
  initAllUI,
  resetAllUI,
  
  getRandomInt,
  isCollision
};



