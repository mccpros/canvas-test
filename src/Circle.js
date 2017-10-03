import { asyncLoop, getCanvas, getMouseCoordinates } from './common';

export default class Circle {
  constructor(dict) {
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, dict.r);
    this.shape.x = dict.x;
    this.shape.y = dict.y;

    this.start     = dict.start;
    this.end       = dict.end;
    this.animating = false;
    this.return    = null;

    this.move = this.move.bind(this);
    this.reverb = this.reverb.bind(this);
    this.enableAnimate = this.enableAnimate.bind(this);
    this.disableAnimate = this.disableAnimate.bind(this);

    this.shape.addEventListener('mouseover', this.move);
  }

  move() {
    if(this.animating) return;
    this.disableAnimate();

    let moveToXLand = this.shape.x === this.start ? this.end : this.start;

    createjs.Tween.get(this.shape)
      .to({ x: moveToXLand }, 500).call(this.reverb);
  }

  reverb() {
    let currentX = parseInt(this.shape.x);
    let reverbLevel = 8;

    asyncLoop(reverbLevel, function(loop) {
      let left  = currentX - (reverbLevel - loop.iteration());
      let right = currentX + (reverbLevel - loop.iteration());

      createjs.Tween.get(this.shape)
        .to({ x: right }, 100, createjs.Ease.getPowInOut(2))
        .to({ x: left }, 100, createjs.Ease.getPowInOut(2)).call(loop.next);
    }.bind(this), () => {
      this.attemptToReturn();
    })
  }

  attemptToReturn() {
    let canvas = getCanvas();
    canvas.addEventListener('mousemove', function(e) {
      let mouse = getMouseCoordinates(canvas, e);
      console.log(mouse);
    })
  }

  disableAnimate() {
    this.animating = true;
  }

  enableAnimate() {
    this.animating = false;
  }
}
