import React, { ReactElement, useEffect, useRef } from "react";

import BaseFactory from "../factories/BaseFactory";
import EnemyBirdsFactory from "../factories/EnemyBirdsFactory";
import PipesFactory from "../factories/PipesFactory";
import Game from "../Game";
import { socket } from "../utils/socketSetup";
import Backgorund from "./Background";
import PlayerBird from "./PlayerBird";

const Canvas = (props: CanvasProps): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      const background = new Backgorund();
      const bird = new PlayerBird(socket);
      const bases = new BaseFactory(socket);
      const enemyBirds = new EnemyBirdsFactory(socket);
      const pipes = new PipesFactory(socket);
      const game = new Game(ctx, background, bird, enemyBirds, bases, pipes, socket);

      let animationFrameID: number;

      const render = () => {
        socket.emit("frame");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        game.create_tmp();

        animationFrameID = window.requestAnimationFrame(render);
      };

      render();

      return () => {
        window.cancelAnimationFrame(animationFrameID);
      };
    }
  }, []);

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default Canvas;
