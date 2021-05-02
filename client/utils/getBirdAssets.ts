import birdWingsBot from "url:../../assets/birdWingsBottom.svg";
import birdWingsMid from "url:../../assets/birdWingsMid.svg";
import birdWingsUp from "url:../../assets/birdWingsUp.svg";

const wingsBot = new Image();
wingsBot.src = birdWingsBot;

const wingsMid = new Image();
wingsMid.src = birdWingsMid;

const wingsUp = new Image();
wingsUp.src = birdWingsUp;

const bird_spr: HTMLImageElement[] = [wingsBot, wingsMid, wingsUp];

export default bird_spr;

// export const bird_spr = [wingsBot, wingsMid, wingsUp];
