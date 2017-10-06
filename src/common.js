let canvas = null;

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
    canvas = document.querySelector('#canvas');
  }

  return canvas;
}

exports.getContext = () => {
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

exports.getCanvas = getCanvas;
exports.getMouseCoordinates = getMouseCoordinates;
