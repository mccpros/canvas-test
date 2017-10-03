import Circle from './Circle';

(function app() {

  const stage = new createjs.Stage('demoCanvas');
  stage.enableMouseOver(20);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', stage);

  for(let i = 0; i < 10; i++) {
    let iteration = i * 100;
    let circle = new Circle({
      r: 50,
      x: 100,
      y: 100 + iteration,
      start: 100,
      end: 400
    });
    stage.addChild(circle.shape);
  }

})();
