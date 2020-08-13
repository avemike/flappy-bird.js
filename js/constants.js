const canvas = document.querySelector('#app');
const ctx = canvas.getContext('2d');
const base = document.querySelector('.base');
const pipe = document.querySelector('.pipe');
const bird = document.querySelector('.bird');

const pipeProps = {
  width: 52,
  height: 320,
};

const canvasSize = {
  height: window.innerHeight * 0.6,
  width: window.innerWidth * 0.2, // for testing
};

const distBetwPipes = 300; // 200 previous

export { canvas, ctx, base, pipe, bird, distBetwPipes, pipeProps, canvasSize };
