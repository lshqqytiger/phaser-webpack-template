import Express from "express";

import ExpressAgent from "./utils/ExpressAgent";
import Route from "./utils/Route";

const App = Express();

ExpressAgent(App);
Route(App);

App.listen(80);
