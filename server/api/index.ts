import { Request, Response } from "express";
import { authenticateKey } from "~server/scripts/authenticate";

export function joinGame(req: Request, res: Response) {
  const { hostID, key } = req.query || {};

  if (typeof key === "string" && typeof hostID === "string") {
    const keyValid = authenticateKey(key);
    const redirectLink = keyValid ? "/" : "/corrupted_link";

    req.app.set("want_to_join", { destination: hostID });
    res.redirect(redirectLink);
  }
}
