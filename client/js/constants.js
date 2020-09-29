const canvas = document.querySelector('#app');
const ctx = canvas.getContext('2d');
const base = document.querySelector('.base');
const pipe = document.querySelector('.pipe');
const birdStates = document.querySelectorAll('.bird');

const pipeProps = {
  width: pipe.width, // 52,
  height: pipe.height, // prviously 320,
  onePipeHeight: (pipe.height - 100) / 2,
  gap: 100,
};

const distBetwPipes = 300; // 200 previous

const backgroundSpeed = 3;

const birdProps = {
  width: 25,
  height: (25 * 12) / 17,
  x: 100,
  startingY: 100,
  maxAngle: Math.PI / 2,
  minAngle: -Math.PI / 7,
};

const canvasSize = {
  height: window.innerHeight * 0.6,
  width: window.innerWidth * 0.2, // for testing
};

const scoreProps = {
  font: 'Comic Sans MS',
  fontSize: 30,
  get x() {
    return (canvasSize.width - this.fontSize) / 2;
  },
  y: 70,
};

export {
  canvas,
  ctx,
  base,
  pipe,
  birdStates,
  backgroundSpeed,
  distBetwPipes,
  pipeProps,
  birdProps,
  scoreProps,
  canvasSize,
};
