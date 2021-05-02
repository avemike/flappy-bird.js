import React, { useLayoutEffect, useRef } from "react";
import PlayerBird from "./PlayerBird";
import { socket } from "../utils/socketSetup";
import Game_tmp from "../Game_tmp";
import BaseFactory from "../factories/BaseFactory";
import PipesFactory from "../factories/PipesFactory";
import EnemyBirdsFactory from "../factories/EnemyBirdsFactory";
import Backgorund from "./Background";

const Canvas = (props: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      const background = new Backgorund();
      const bird = new PlayerBird(socket);
      const bases = new BaseFactory(socket);
      const enemyBirds = new EnemyBirdsFactory(socket);
      const pipes = new PipesFactory(socket);
      const game = new Game_tmp(
        ctx,
        background,
        bird,
        enemyBirds,
        bases,
        pipes,
        socket
      );

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
  });

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default Canvas;
