import Circle from './Circle';

(function app() {

  const stage = new createjs.Stage('demoCanvas');
  stage.enableMouseOver(20);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', stage);

  let space = 50;
  for(let i = 0; i < 15; i++) {
    for(let ii = 0; ii < 15; ii++) {
      let iterationY = i * space;
      let iterationX = ii * space;
      let circle = new Circle({
        r: 5,
        x: 100 + iterationX,
        y: 100 + iterationY,
        startX: 100 + iterationX,
        startY: 100 + iterationY,
        end: 400
      });
      stage.addChild(circle.wrap);
      stage.addChild(circle.hitbox);
      stage.addChild(circle.shape);
    }
  }

})();
