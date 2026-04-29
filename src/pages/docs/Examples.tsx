import { noFx } from "teelm";
import { type PageConfig } from "teelm/router";
import type { Shared } from "../../shared";

export const page: PageConfig<{}, never, Shared, {}> = {
  init: () => noFx({}),
  update: (model) => noFx(model),
  view: (model, shared) => (
    <div class="prose max-w-none">
      <h1>/docs/examples</h1>
    </div>
  ),
};
