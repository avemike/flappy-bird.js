import React, { useEffect, useRef } from "react";

import { EVENTS } from "../../server/handlers";
import BaseFactory from "../factories/BaseFactory";
import EnemyBirdsFactory from "../factories/EnemyBirdsFactory";
import PipesFactory from "../factories/PipesFactory";
import Game from "../Game";
import { socket } from "../utils/socketSetup";
import Backgorund from "./Background";
import PlayerBird from "./birds/PlayerBird";

const Canvas = (props: CanvasProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      const background = new Backgorund();
      const bird = new PlayerBird(socket);
      // bird.loadSprites("blue");
      const bases = new BaseFactory(socket);
      const enemyBirds = new EnemyBirdsFactory(socket);
      const pipes = new PipesFactory(socket);
      const game = new Game(ctx, background, bird, enemyBirds, bases, pipes, socket);

      let animationFrameID: number;

      const render = () => {
        socket.emit(EVENTS.FRAME);
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
