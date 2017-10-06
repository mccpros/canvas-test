let canvas = null;
let changeDirection = false;

setInterval(() => {
  changeDirection = true;
}, 10000);

exports.asyncLoop = (iterations, func, callback) => {
  let index = 0;
  let done = false;
  let loop = {
    next: function() {
      if (done) {
        return;
      }

      if (index < iterations) {
        index++;
        func(loop);

      } else {
        done = true;
        callback();
      }
    },

    iteration: function() {
      return index;
    },

    break: function() {
      done = true;
      callback();
    }
  };

  loop.next();
  return loop;
}

let getCanvas = () => {
  if(!canvas) {
    canvas = document.querySelector('canvas');
  }

  return canvas;
}

let getContext = () => {
  if(!canvas) canvas = getCanvas();
  return canvas.getContext( '2d' );
}

let getMouseCoordinates = (canvas, e) => {
  let rect = canvas.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

let random = (lowest, highest) => {
  let adjustedHigh = (highest - lowest) + 1;
  return Math.floor(Math.random() * adjustedHigh) + parseFloat(lowest);
}



exports.renderNodes = (list) => {
  let canvas = getCanvas();
  let ctx = getContext();

  let w = canvas.width;
  let h = canvas.height;
  let b = ( a = ctx.createImageData( w, h ) ).data;

  for ( i = 0; i < list.length; i++ ) {
    let c = list[i];
    if(!c.size) c.size = 0;//random(-2, 3);

    createNode(c, w, b);
  }

  ctx.putImageData( a, 0, 0 );
}



let createNode = (circle, width, pixel) => {
  let size = circle.size;

  for (let i = 0; i <= size; i++) { // X - Loop
    for (let ii = 0; ii <= size; ii++) { // Y - Loop
      let center = ((~~circle.x + i) + ( (~~circle.y + ii ) * width ) ) *  4;
      pixel[center] = 255, pixel[center+1] = pixel[center+2] = 117, pixel[center+3] = 220;
    }
  }

};

exports.getCanvas = getCanvas;
exports.getCanvas = random;
exports.getContext = getContext;
exports.getMouseCoordinates = getMouseCoordinates;
