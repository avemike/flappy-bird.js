import React, { useEffect, useRef } from "react";
import PlayerBird from "./PlayerBird";
import { socket } from "../utils/socketSetup";
import Game_tmp from "../Game_tmp";
import BaseFactory from "../factories/BaseFactory";
import PipesFactory from "../factories/PipesFactory";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const bird = new PlayerBird(socket);
    const bases = new BaseFactory(socket);
    const pipes = new PipesFactory(socket);
    const game = new Game_tmp(ctx, bird, bases, pipes, socket);

    let animationFrameID;

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
  });

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export { Canvas };
