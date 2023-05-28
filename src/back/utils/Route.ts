import { resolve } from "path";
import Express from "express";

export default function Route(App: Express.Application) {
  App.get("/", (req, res) => {
    return res.sendFile(resolve(__dirname, "index.html"));
  });
}
