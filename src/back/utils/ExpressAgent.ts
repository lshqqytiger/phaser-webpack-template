import { resolve } from "path";
import Express from "express";

export default function ExpressAgent(App: Express.Application) {
  App.use(Express.json());
  App.use("/assets", Express.static(resolve(__dirname, "assets")));
  App.use("/pages", Express.static(resolve(__dirname, "pages")));
}
