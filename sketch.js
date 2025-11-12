const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Composites = Matter.Composites;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

let engine, canvas, mouse;
let stack;
let col = 40;
let row = 10;
let w = 10;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  engine = Engine.create();
  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 1,
    },
  });
  Composite.add(engine.world, mouseConstraint);
  createWall(40);

  stack = Composites.stack(width / 2, height / 2, col, row, 0, 0, (x, y) => {
    return Bodies.rectangle(x, y, w, w);
  });
  Composites.mesh(stack, col, row, false, {
    stiffness: 1,
    damping: 0.01,
  });

  Composite.add(engine.world, stack);
}

function draw() {
  Engine.update(engine);
  background(255);
  // walls
  drawWall(20);

  // noFill();
  // stroke(0);
  fill(50);
  noStroke();
  for (let b of stack.bodies) {
    //rect(b.position.x, b.position.y, w);
  }

  // 선 그리기
  stroke(0);
  noFill();
  let all = stack.constraints; //배열
  for (let i = 0; i < all.length; i++) {
    let c = all[i];
    let bA = c.bodyA;
    let bB = c.bodyB;
    line(bA.position.x, bA.position.y, bB.position.x, bB.position.y);
  }
}

function createWall(t) {
  Composite.add(engine.world, [
    Bodies.rectangle(0, height / 2, t, height, { isStatic: true }),
    Bodies.rectangle(width - t / 2, height / 2, t, height, { isStatic: true }),
    Bodies.rectangle(width / 2, t / 2, width, t, { isStatic: true }),
    Bodies.rectangle(width / 2, height - t / 2, width, t, { isStatic: true }),
  ]);
}
function drawWall(t) {
  fill(50);
  noStroke();
  rect(t / 2, height / 2, t, height);
  rect(width - t / 2, height / 2, t, height);
  rect(width / 2, t / 2, width, t);
  rect(width / 2, height - t / 2, width, t);
}
