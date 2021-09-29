import sprites from "url:../../assets/birds/**/*.svg";

import { BIRD_COLORS } from "../../configs/game";

const birdColor = {
  color: BIRD_COLORS.YELLOW,
};

type BirdColors = "yellow" | "pink" | "blue" | "green";

function setBirdColor(color: BIRD_COLORS): void {
  birdColor.color = color;
}

// function randomColor(): BIRD_COLORS {
//   let color;
//   const randomNum = Math.random();

//   if (randomNum < 0.25) {
//     color = BIRD_COLORS.BLUE;
//   } else if (randomNum < 0.5) {
//     color = BIRD_COLORS.YELLOW;
//   } else if (randomNum < 0.75) {
//     color = BIRD_COLORS.GREEN;
//   } else if (randomNum <= 1) {
//     color = BIRD_COLORS.PINK;
//   } else {
//     throw new Error("xd");
//   }
//   return color;
// }

// function getBirdAssets(color: BirdColors = "yellow"): HTMLImageElement[] {
function getBirdAssets(color: BIRD_COLORS): HTMLImageElement[] {
  console.log("color is:", color);
  const wingsBot = new Image();
  wingsBot.src = sprites[color].bottom;

  const wingsMid = new Image();
  wingsMid.src = sprites[color].mid;

  const wingsUp = new Image();
  wingsUp.src = sprites[color].top;

  const bird_spr: HTMLImageElement[] = [wingsBot, wingsMid, wingsUp];
  return bird_spr;
}

export { getBirdAssets, setBirdColor };
