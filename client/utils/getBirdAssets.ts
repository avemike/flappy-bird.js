import sprites from "url:../../assets/birds/**/*.svg";

type BirdColors = "yellow" | "pink" | "blue" | "green";

function getBirdAssets(color: BirdColors): HTMLImageElement[] {
  const wingsBot = new Image();
  wingsBot.src = sprites[color].bottom;

  const wingsMid = new Image();
  wingsMid.src = sprites[color].mid;

  const wingsUp = new Image();
  wingsUp.src = sprites[color].top;

  const bird_spr: HTMLImageElement[] = [wingsBot, wingsMid, wingsUp];
  return bird_spr;
}

export { getBirdAssets };
