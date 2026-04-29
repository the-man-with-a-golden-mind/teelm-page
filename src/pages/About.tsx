import { noFx } from "teelm";
import { routerLink, type PageConfig } from "teelm/router";
import type { Shared } from "../shared";

export const page: PageConfig<{}, never, Shared, {}> = {
  init: () => noFx({}),
  update: (model) => noFx(model),
  view: (_model, shared) => (
    <div>
      <h1 class="text-3xl font-bold mb-4">About</h1>
      <p class="text-gray-600 mb-6 leading-relaxed">
        {shared.appName} is built with Teelm, an Elm-inspired TypeScript framework.
      </p>
      <a {...routerLink("/")} class="inline-block px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 no-underline text-gray-700">
        Back Home
      </a>
    </div>
  ),
};
