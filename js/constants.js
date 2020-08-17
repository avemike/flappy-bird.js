const canvas = document.querySelector('#app');
const ctx = canvas.getContext('2d');
const base = document.querySelector('.base');
const pipe = document.querySelector('.pipe');
const bird = document.querySelector('.bird');

const pipeProps = {
  width: pipe.width, // 52,
  height: pipe.height, // prviously 320,
  onePipeHeight: (pipe.height - 100) / 2,
  gap: 100,
};

const distBetwPipes = 300; // 200 previous

const birdProps = {
  width: 25,
  height: (25 * 12) / 17,
  x: 100,
  startingY: 100,
  maxAngle: Math.PI / 2,
  minAngle: -Math.PI / 7
};

const canvasSize = {
  height: window.innerHeight * 0.6,
  width: window.innerWidth * 0.2, // for testing
};

export {
  canvas,
  ctx,
  base,
  pipe,
  bird,
  distBetwPipes,
  pipeProps,
  birdProps,
  canvasSize,
};
