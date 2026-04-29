import "./app.css";

import type { VNode } from "teelm";
import { routerApp, type RouterMsg } from "teelm/router";

import { router } from "./generated/router";
import type { Shared } from "./shared";

function layout(
  content: VNode,
  _shared: Readonly<Shared>,
  _dispatch: (msg: RouterMsg<Shared>) => void,
): VNode {
  return content;
}

routerApp({
  router,
  layout,
  node: document.getElementById("app")!,
  debug: {
    console: true,
    history: true,
    maxHistory: 200,
  },
});
