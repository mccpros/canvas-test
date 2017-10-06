import Stats from './stats';
import { renderNodes } from './common';

const SPACING = 5,
      ROWS = Math.max(window.innerHeight / SPACING),
      COLS = Math.max(window.innerWidth / SPACING),
      CIRCLE_PARTICLES = ROWS * COLS ,
      THICKNESS = Math.pow(60, 2 ),
      MARGIN = 0,
      COLOR = 117,
      DRAG = 0.95,
      EASE = 0.25;

let bounds,
    mouse,
    stats,
    ctx,
    list = [],
    tog = true,
    dx, dy,
    mouseX, mouseY,
    d, t, f,
    a, b,
    i, n,
    w, h,
    s, r;

let circle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0
};

stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
function init() {

  let container = document.getElementById( 'container' );
  let canvas = document.createElement( 'canvas' );

  ctx = canvas.getContext( '2d' );

  w = canvas.width = COLS * SPACING + MARGIN * 2;
  h = canvas.height = ROWS * SPACING + MARGIN * 2;

  // container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
  // container.style.marginTop = Math.round( h * -0.5 ) + 'px';

  for ( i = 0; i < CIRCLE_PARTICLES; i++ ) {
    let c = Object.create( circle );
    c.x = c.ox = MARGIN + SPACING * ( i % COLS );
    c.y = c.oy = MARGIN + SPACING * Math.floor( i / COLS );

    list[i] = c;
  }

  container.addEventListener( 'mousemove', function(e) {
    bounds = container.getBoundingClientRect();
    mouseX = e.clientX - bounds.left;
    mouseY = e.clientY - bounds.top;
  });

  container.appendChild( canvas );
}

function step() {
  stats.begin();
  if ( tog = !tog ) {

    for ( i = 0; i < CIRCLE_PARTICLES; i++ ) {
      let c = list[i];

      d = ( dx = mouseX - c.x ) * dx + ( dy = mouseY - c.y ) * dy;
      f = -THICKNESS / d;

      if ( d < THICKNESS ) {
        t = Math.atan2( dy, dx );
        c.vx += f * Math.cos(t);
        c.vy += f * Math.sin(t);
      }

      c.x += ( c.vx *= DRAG ) + (c.ox - c.x) * EASE;
      c.y += ( c.vy *= DRAG ) + (c.oy - c.y) * EASE;

    }

  } else {

    renderNodes(list);
  }

  stats.end();
  requestAnimationFrame( step );
}

init();
step();
