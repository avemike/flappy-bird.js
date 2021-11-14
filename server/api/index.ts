import { Request, Response } from "express";
import { authenticateKey } from "~server/scripts/authenticate";

export function joinGame(req: Request, res: Response): void {
  const { hostID, key } = req.query || {};
  if (typeof key === "string" && typeof hostID === "string") {
    const keyValid = authenticateKey(key);
    req.app.set("want_to_join", { destination: hostID });
    keyValid ? res.redirect("/") : res.redirect("/corrupted_link");
  }
}
