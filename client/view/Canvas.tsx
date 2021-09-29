import React, { useEffect, useRef } from "react";

import { EVENTS } from "../../configs/events";
import { socket } from "../utils/socketSetup";
import Game from "./Game";

interface Props {
  width: number;
  height: number;
}

const Canvas = (props: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      const game = new Game(ctx);

      let animationFrameID: number;
      let fpsInterval: number, now: number, then: number, elapsed: number;

      function startAnimation(fps: number) {
        fpsInterval = 1000 / fps;
        then = window.performance.now();
        animationFrameID = requestAnimationFrame(animate);
      }

      function animate(timestamp: DOMHighResTimeStamp) {
        requestAnimationFrame(animate);

        now = timestamp;
        elapsed = now - then;

        if (elapsed > fpsInterval) {
          socket.emit(EVENTS.FRAME);
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          game.create_tmp();

          then = now - (elapsed % fpsInterval);
        }
      }

      startAnimation(60);

      return () => {
        window.cancelAnimationFrame(animationFrameID);
      };
    }
  }, []);

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default Canvas;
