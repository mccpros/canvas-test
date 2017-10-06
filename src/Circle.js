import { asyncLoop, getCanvas, getMouseCoordinates, getContext } from './common';

export default class Node {
  constructor(dict) {
    // Remeber Your Origins
    // Don't forget where you started
    // Home is where the coords are
    this.x = dict.x;
    this.y = dict.y;
    this.ox = dict.x;
    this.oy = dict.y;
    this.vx = dict.vx;
    this.vy = dict.vy;
    // this.r  = dict.r;

    // Probably not needed anymore
    // this.end = dict.end;
    //
    // // Animation flag, Don't start something else
    // this.animating = false;
    //
    // // This will hold the mouse location
    // // For initial hitbox
    // this.mouseCoords = { x: 0, y: 0 };

    // Bind it
    // this.move = this.move.bind(this);
    // this.reverb = this.reverb.bind(this);
    // this.createNode = this.createNode.bind(this);

    // this.createNode('shape', 'DeepSkyBlue', dict, dict.r); // Create Node
  }

  // Make a Circle
  // createNode(name, color, dict) {
  //   this[name] = new createjs.Shape();
  //   this[name].graphics.beginFill(color).drawCircle(0, 0, dict.r);
  //   this[name].x = dict.x;
  //   this[name].y = dict.y;
  // }

  move(e) {
    // Don't stack animations!
    // But maybe we will later!
    if(this.animating) return;
    this.disableAnimate();

    this.hitCoords = this.mouseCoords;

    // Get direction of hit
    // Technically knockback but y'know...
    this.hitDirectionX = Math.sign(this.shape.x - this.hitCoords.x);
    this.hitDirectionY = Math.sign(this.shape.y - this.hitCoords.y);

    // Where we're gonna go
    // In relation to direction
    let moveToXLand = this.shape.x + (this.hitDirectionX * (this.r * 5));
    let moveToYLand = this.shape.y + (this.hitDirectionY * (this.r * 5));

    createjs.Tween.get(this.shape)
      .to({ x: moveToXLand, y: moveToYLand }, 800, createjs.Ease.getPowOut(2)).call(this.reverb);
  }

  reverb() {
    // How much bounce
    let reverbLevel = 3;

    let currentX = parseInt(this.shape.x);
    let currentY = parseInt(this.shape.y);

    let intensityX = this.hitDirectionX * 0.4;
    let intensityY = this.hitDirectionY * 0.4;

    // Async to wait for each animation to end
    // asyncLoop defined in "common.js"
    asyncLoop(reverbLevel, function(loop) {
      // 1. Get on left/right location
      //    in relation to the loop iteration
      let left  = currentX + (reverbLevel - loop.iteration()) * intensityX;
      let right = currentX - (reverbLevel - loop.iteration()) * intensityX;
      let up    = currentY + (reverbLevel - loop.iteration()) * intensityY;
      let down  = currentY - (reverbLevel - loop.iteration()) * intensityY;

      // 2. Start Animation
      createjs.Tween.get(this.shape)
        .to({ x: left,  y: up }, 100, createjs.Ease.getPowInOut(2))
        .to({ x: right, y: down }, 100, createjs.Ease.getPowInOut(2)).call(loop.next); // 3. Animation ends, loop again
    }.bind(this), () => {

      // Animation loop ends
      console.log('END');
    })
  }


}
