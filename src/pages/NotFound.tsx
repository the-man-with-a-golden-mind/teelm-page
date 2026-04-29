import { noFx } from "teelm";
import { routerLink, type PageConfig } from "teelm/router";
import type { Shared } from "../shared";

export const page: PageConfig<{ path: string }, never, Shared, { path: string }> = {
  init: (params) => noFx({ path: params.path }),
  update: (model) => noFx(model),
  view: (model) => (
    <div class="text-center py-16">
      <div class="text-6xl font-bold text-gray-200 mb-4">404</div>
      <h1 class="text-2xl font-bold mb-2">Page Not Found</h1>
      <p class="text-gray-500 mb-6">The path "{model.path}" doesn't exist.</p>
      <a {...routerLink("/")} class="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 no-underline">
        Go Home
      </a>
    </div>
  ),
};
