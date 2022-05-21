import sprites from "url:../../assets/birds/**/*.svg";

import { BIRD_COLORS } from "../../configs/game";

const birdColor = {
  color: BIRD_COLORS.YELLOW,
};

function setBirdColor(color: BIRD_COLORS) {
  birdColor.color = color;
}

function getBirdAssets(color: BIRD_COLORS): HTMLImageElement[] {
  const wingsBot = new Image();
  const wingsMid = new Image();
  const wingsUp = new Image();

  wingsBot.src = sprites[color].bottom;
  wingsMid.src = sprites[color].mid;
  wingsUp.src = sprites[color].top;

  const bird_spr: HTMLImageElement[] = [wingsBot, wingsMid, wingsUp];

  return bird_spr;
}

export { getBirdAssets, setBirdColor };
