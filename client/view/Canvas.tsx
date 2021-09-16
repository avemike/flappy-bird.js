import React, { useEffect, useRef } from "react";

import { EVENTS } from "../../configs/events";
import BaseFactory from "../controllers/BaseController";
import EnemyBirdsFactory from "../controllers/EnemyBirdsController";
import PipesFactory from "../controllers/PipesController";
import { CanvasProps } from "../types";
import { socket } from "../utils/socketSetup";
import Backgorund from "./Background";
import PlayerBird from "./birds/PlayerBird";
import Game from "./Game";

const Canvas = (props: CanvasProps): JSX.Element => {
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
