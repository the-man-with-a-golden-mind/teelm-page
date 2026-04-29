import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../shared";

type ExampleKey = "counter" | "effects" | "router";

type Model = {
  activeExample: ExampleKey;
};

type Msg = { tag: "SelectExample"; example: ExampleKey };

const examples: Record<
  ExampleKey,
  { eyebrow: string; title: string; file: string; code: string }
> = {
  counter: {
    eyebrow: "Core TEA",
    title: "Tuple-only update. Zero magic.",
    file: "src/main.tsx",
    code: `import { app, noFx, type Init, type UpdateResult } from "teelm";

type State = { count: number };
type Msg = { tag: "Inc" } | { tag: "Dec" };

const init: Init<State, Msg> = noFx({ count: 0 });

function update(state: State, msg: Msg): UpdateResult<State, Msg> {
  switch (msg.tag) {
    case "Inc": return noFx({ ...state, count: state.count + 1 });
    case "Dec": return noFx({ ...state, count: state.count - 1 });
  }
}`,
  },
  effects: {
    eyebrow: "Effects",
    title: "IO as typed data.",
    file: "src/user.ts",
    code: `import { withFx, noFx } from "teelm";
import { http } from "teelm/fx";
import { Decode, HttpError } from "teelm/functional";

const userDecoder = Decode.object({
  id: Decode.number,
  name: Decode.string,
});

function update(state: State, msg: Msg) {
  switch (msg.tag) {
    case "FetchUser":
      return withFx(
        { ...state, loading: true },
        http({
          url: "/api/me",
          decoder: userDecoder,
          toMsg: (r) => r.tag === "Ok"
            ? { tag: "GotUser", user: r.value }
            : { tag: "FetchFailed", error: HttpError.toString(r.error) },
        }),
      );

    case "GotUser":
      return noFx({ ...state, user: msg.user, loading: false });
  }
}`,
  },
  router: {
    eyebrow: "Router",
    title: "File pages with typed params.",
    file: "src/pages/users/[id:int].tsx",
    code: `import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../shared";

type Model = { id: number };
type Msg = never;
type Params = { id: number };

export const page: PageConfig<Model, Msg, Shared, Params> = {
  init: (params) => noFx({ id: params.id }),
  update: (model) => noFx(model),
  view: (model) => (
    <section>
      <p>User #{model.id}</p>
    </section>
  ),
};`,
  },
};

const features = [
  ["01", "TEA, not vibes", "State → View → Msg → Update. One loop, no hidden side channels."],
  ["02", "Zero runtime deps", "Tiny framework gravity. Bun runtime, Vite bundler, TypeScript strict mode."],
  ["03", "Branded Cmd/Sub", "Effects and subscriptions are constructed through public helpers, not loose tuples."],
  ["04", "Decoder boundaries", "HTTP and storage decode on entry and return Result, so failure states stay explicit."],
  ["05", "Typed routing", "File pages, typed params, cached models, guards and lifecycle hooks."],
  ["06", "Debuggable state", "Deep-freeze by default, history support and a time-travel debugger overlay."],
] as const;

export const page: PageConfig<Model, Msg, Shared, {}> = {
  init: () => noFx({ activeExample: "counter" }),

  update: (model, msg) => {
    switch (msg.tag) {
      case "SelectExample":
        return noFx({ ...model, activeExample: msg.example });
    }
  },

  view: (model, _shared, dispatch) => {
    const selected = examples[model.activeExample];

    return (
      <div class="min-h-screen overflow-hidden bg-[#050505] text-[#F6F3EB] selection:bg-[#CCFF00] selection:text-black">
        <div class="pointer-events-none fixed inset-0 opacity-70">

        </div>

        <header class="sticky top-4 z-30 mx-auto mt-4 flex w-[min(1180px,calc(100%-24px))] items-center justify-between gap-4 rounded-full border border-white/15 bg-black/75 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl max-sm:w-[min(100%-20px,1180px)] max-sm:rounded-[1.75rem]">
          <a
            href="/"
            aria-label="Teelm home"
            class="flex items-center gap-3 rounded-full py-1 pl-1 pr-3 font-black tracking-[-0.04em]"
          >
            <img src="/logo_vector.svg" class="h-12" alt="Teelm logo" />
            <span class="text-2xl max-sm:hidden">teelm</span>
          </a>

          <nav
            aria-label="Primary"
            class="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1 max-md:hidden"
          >
            <a class="rounded-full px-4 py-2 text-sm font-bold text-[#A7A29A] hover:bg-white/10 hover:text-[#F6F3EB]" href="#features">
              Features
            </a>
            <a class="rounded-full px-4 py-2 text-sm font-bold text-[#A7A29A] hover:bg-white/10 hover:text-[#F6F3EB]" href="#examples">
              Examples
            </a>
            <a class="rounded-full px-4 py-2 text-sm font-bold text-[#A7A29A] hover:bg-white/10 hover:text-[#F6F3EB]" href="/docs">
              Docs
            </a>
          </nav>

          <a
            class="rounded-full border border-white/15 px-3 py-3 text-sm font-black bg-[#F6F3EB] max-sm:px-3 max-sm:py-2 max-sm:text-xs"
            href="https://github.com/the-man-with-a-golden-mind/teelm"
          >
            <img src="/github-logo.png" class="w-6 bg-white h-6"> </img>
          </a>
        </header>

        <main class="relative z-10">
          <section class="mx-auto grid min-h-[calc(100vh-96px)] w-[min(1180px,calc(100%-24px))] grid-cols-[minmax(0,1.03fr)_minmax(320px,.74fr)] items-center gap-9 py-20 max-lg:grid-cols-1 max-lg:py-14 max-sm:w-[min(100%-20px,1180px)] max-sm:py-10">
            <div>
              <p class="mb-5 w-fit rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00] max-sm:mb-4 max-sm:text-[10px]">
                TypeScript · TEA · zero runtime dependencies
              </p>

              <h1 class="max-w-4xl text-[clamp(3.3rem,14vw,6rem)] font-black leading-[0.86] tracking-[-0.07em] sm:text-8xl">
                TS framework for interfaces that stay <span class="text-[#CCFF00]">predictable</span>.
              </h1>

              <div class="mt-7 max-w-2xl">
                <p class="text-[clamp(18px,2vw,23px)] leading-relaxed text-[#A7A29A] max-sm:text-base">
                  Teelm brings The Elm Architecture to strict TypeScript:
                </p>

                <ul class="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-[14px] font-bold text-[#A7A29A] max-sm:grid-cols-1">
                  {[
                    "branded effects",
                    "typed routing",
                    "decoder-safe IO",
                    "deep-frozen state",
                    "time-travel debugger",
                    "visible transitions",
                  ].map((item) => (
                    <li
                      key={item}
                      class="flex min-w-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2"
                    >
                      <span class="h-2 w-2 flex-none rounded-full bg-[#CCFF00]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div class="mt-9 flex flex-wrap gap-3 max-sm:mt-7">
                <a
                  class="inline-flex min-h-14 items-center justify-center rounded-full border border-[#CCFF00] bg-[#CCFF00] px-6 text-sm font-black !text-black shadow-[0_18px_44px_rgba(204,255,0,.16)] transition hover:-translate-y-0.5 max-sm:min-h-12 max-sm:flex-1 max-sm:px-4"
                  href="/docs"
                >
                  Read docs
                </a>
                <a
                  class="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-black transition hover:-translate-y-0.5 hover:bg-white/10 max-sm:min-h-12 max-sm:flex-1 max-sm:px-4"
                  href="#examples"
                >
                  See examples
                </a>
              </div>

              <dl class="mt-9 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                <Stat value="0" label="runtime deps" />
                <Stat value="1" label="state loop" />
                <Stat value="TS" label="strict-first" />
              </dl>
            </div>

            <BrandOrb />
          </section>

          <section id="features" class="mx-auto w-[min(1180px,calc(100%-24px))] py-20 max-sm:w-[min(100%-20px,1180px)] max-sm:py-14">
            <SectionHeading
              kicker="Why Teelm"
              title="Framework constraints that make big apps calmer."
              body="Teelm gives every interaction the same shape: update state, describe effects, render again. The result is UI code that is easier to trace, test and refactor."
            />

            <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
              {features.map(([index, title, body]) => (
                <article
                  key={title}
                  class="min-h-72 rounded-[2rem] border border-white/15 bg-[#0D0D0F]/90 p-6 transition hover:-translate-y-1 hover:border-[#CCFF00]/60 max-sm:min-h-0 max-sm:rounded-[1.5rem] max-sm:p-5"
                >
                  <span class="mb-14 grid h-12 w-12 place-items-center rounded-2xl border border-white/15 text-xs font-black text-[#CCFF00] max-lg:mb-8 max-sm:mb-6">
                    {index}
                  </span>
                  <h3 class="mb-3 text-2xl font-black leading-none tracking-[-0.045em] max-sm:text-xl">
                    {title}
                  </h3>
                  <p class="leading-relaxed text-[#A7A29A] max-sm:text-sm">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="examples" class="mx-auto w-[min(1180px,calc(100%-24px))] py-20 max-sm:w-[min(100%-20px,1180px)] max-sm:py-14">
            <div class="mb-8 max-sm:mb-6">
              <p class="mb-5 w-fit rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00] max-sm:mb-4 max-sm:text-[10px]">
                Examples
              </p>
              <h2 class="text-[clamp(2.4rem,11vw,5.125rem)] font-black leading-[0.9] tracking-[-0.075em]">
                Code that shows the contract.
              </h2>
            </div>

            <div class="grid grid-cols-[220px_minmax(0,1fr)] items-start gap-4 max-lg:grid-cols-1">
              <div
                class="grid h-[620px] content-start gap-3 rounded-[1.75rem] border border-white/15 bg-[#0D0D0F]/70 p-3 max-lg:h-auto max-lg:grid-cols-3 max-sm:grid-cols-3 max-sm:gap-2 max-sm:rounded-[1.25rem] max-sm:p-2"
                role="tablist"
                aria-label="Code examples"
              >
                <ExampleButton label="Counter" example="counter" activeExample={model.activeExample} dispatch={dispatch} />
                <ExampleButton label="Effects" example="effects" activeExample={model.activeExample} dispatch={dispatch} />
                <ExampleButton label="Router" example="router" activeExample={model.activeExample} dispatch={dispatch} />
              </div>

              <article class="grid h-[620px] min-w-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[2rem] border border-white/15 bg-[#0D0D0F]/95 shadow-2xl shadow-black/60 max-lg:h-[560px] max-sm:h-[460px] max-sm:rounded-[1.5rem]">
                <div class="flex items-center justify-between gap-5 border-b border-white/15 p-5 max-sm:gap-3 max-sm:p-4">
                  <div class="min-w-0">
                    <p class="mb-1 text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00] max-sm:text-[10px]">
                      {selected.eyebrow}
                    </p>
                    <h3 class="truncate text-2xl font-black tracking-[-0.05em] max-sm:text-lg">
                      {selected.title}
                    </h3>
                  </div>

                  <span class="max-w-[42vw] truncate rounded-full border border-white/15 px-3 py-2 font-mono text-xs text-[#A7A29A] max-sm:max-w-[38vw] max-sm:px-2 max-sm:text-[10px]">
                    {selected.file}
                  </span>
                </div>

                <pre class="min-h-0 overflow-auto bg-[#070708] bg-[linear-gradient(90deg,rgba(204,255,0,.06),transparent_34%)] p-6 max-sm:p-4">
                  <code class="font-mono text-[13px] leading-7 max-sm:text-[11px] max-sm:leading-6">
                    {highlightCode(selected.code)}
                  </code>
                </pre>
              </article>
            </div>
          </section>
        </main>

        <footer class="relative z-10 mx-auto flex w-[min(1180px,calc(100%-24px))] items-center justify-between gap-4 border-t border-white/15 py-10 text-sm text-[#A7A29A] max-sm:w-[min(100%-20px,1180px)] max-sm:flex-col max-sm:items-start max-sm:py-8">
          <p>teelm - TypeScript UI with a single honest loop.</p>
          <a class="font-black text-[#CCFF00]" href="#">
            Back to top
          </a>
        </footer>
      </div>
    );
  },
};

function Stat(props: { value: string; label: string }) {
  return (
    <div class="min-w-0 rounded-[1.15rem] border border-white/15 bg-white/[0.04] p-3 sm:min-w-36 sm:rounded-[1.4rem] sm:p-4">
      <dt class="text-2xl font-black tracking-[-0.05em] sm:text-3xl">
        {props.value}
      </dt>
      <dd class="m-0 text-[10px] font-black uppercase leading-tight text-[#A7A29A] sm:text-xs">
        {props.label}
      </dd>
    </div>
  );
}

function BrandOrb() {
  return (
    <aside
      aria-label="Teelm architecture preview"
      class="relative min-h-[580px] overflow-hidden rounded-[2.75rem] border border-white/15 bg-[#0D0D0F] shadow-2xl shadow-black/60 max-lg:min-h-[420px] max-sm:min-h-[300px] max-sm:rounded-[2rem]"
    >
      <div class="absolute inset-[12%] rounded-full border border-white/15" />
      <div class="absolute inset-[24%] rounded-full border border-[#CCFF00]/35" />

      <div class="absolute left-1/2 top-1/2 grid h-56 w-56 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#CCFF00]/45 bg-black p-6 text-center max-sm:h-36 max-sm:w-36 max-sm:p-4">
        <div>
          <span class="block text-6xl font-black tracking-[-0.09em] text-[#CCFF00] max-sm:text-4xl">
            TEA
          </span>
          <strong class="mx-auto mt-3 block max-w-36 text-sm leading-tight max-sm:text-xs">
            One loop.
            <br />
            No hidden side channels.
          </strong>
        </div>
      </div>

      <Orbit className="left-[14%] top-[12%] text-[#CCFF00]" label="State" />
      <Orbit className="right-[12%] top-[16%] text-[#00E5FF]" label="View" />
      <Orbit className="bottom-[14%] left-[10%] text-[#FF3D81]" label="Msg" />
      <Orbit className="bottom-[12%] right-[14%]" label="Cmd/Sub" />
    </aside>
  );
}

function Orbit(props: { label: string; className?: string }) {
  return (
    <div class={`absolute z-10 grid min-h-28 min-w-28 place-items-center rounded-[1.9rem] border border-white/15 bg-black/85 px-3 text-center text-sm font-black shadow-2xl shadow-black/50 max-sm:min-h-16 max-sm:min-w-16 max-sm:rounded-2xl max-sm:text-[11px] ${props.className ?? ""}`}>
      {props.label}
    </div>
  );
}

function SectionHeading(props: { kicker: string; title: string; body: string }) {
  return (
    <div class="mb-8 grid grid-cols-[minmax(0,.72fr)_minmax(260px,.45fr)] items-end gap-6 max-lg:grid-cols-1 max-sm:mb-6">
      <div>
        <p class="mb-5 w-fit rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00] max-sm:mb-4 max-sm:text-[10px]">
          {props.kicker}
        </p>
        <h2 class="text-[clamp(2.4rem,11vw,5.125rem)] font-black leading-[0.9] tracking-[-0.075em]">
          {props.title}
        </h2>
      </div>
      <p class="text-lg leading-relaxed text-[#A7A29A] max-sm:text-base">
        {props.body}
      </p>
    </div>
  );
}

function ExampleButton(props: {
  label: string;
  example: ExampleKey;
  activeExample: ExampleKey;
  dispatch: (msg: Msg) => void;
}) {
  const active = props.example === props.activeExample;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active ? "true" : "false"}
      class={`w-full rounded-full border px-4 py-4 text-left text-sm font-black transition max-sm:px-3 max-sm:py-3 max-sm:text-center max-sm:text-xs ${active
        ? "border-[#CCFF00] bg-[#CCFF00] text-black"
        : "border-white/15 bg-white/[0.04] text-[#A7A29A] hover:bg-white/10 hover:text-[#F6F3EB]"
        }`}
      onClick={() => props.dispatch({ tag: "SelectExample", example: props.example })}
    >
      {props.label}
    </button>
  );
}

function highlightCode(code: string) {
  const keywordPattern =
    /\b(import|from|type|interface|const|let|function|return|switch|case|default|if|else|as|readonly|export)\b/g;

  const typePattern =
    /\b(State|Model|Msg|Dispatch|Init|UpdateResult|PageConfig|Shared|Params|Result|HttpError|Decoder)\b/g;

  const teelmPattern =
    /\b(app|noFx|withFx|http|Decode|HttpError|dispatch|update|view|init)\b/g;

  return code.split("\n").map((line, lineIndex) => {
    const parts = tokenizeLine(line, [
      {
        pattern: /("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`]*`)/g,
        className: "text-[#CCFF00]",
      },
      {
        pattern: /\/\/.*/g,
        className: "text-[#6F6A62]",
      },
      {
        pattern: keywordPattern,
        className: "text-[#FF3D81] font-bold",
      },
      {
        pattern: typePattern,
        className: "text-[#00E5FF]",
      },
      {
        pattern: teelmPattern,
        className: "text-[#F6F3EB] font-bold",
      },
      {
        pattern: /\b\d+\b/g,
        className: "text-[#CCFF00]",
      },
    ]);

    return (
      <span key={lineIndex} class="block">
        <span class="mr-5 inline-block w-7 select-none text-right text-[#4E4A44] max-sm:mr-3 max-sm:w-5">
          {String(lineIndex + 1).padStart(2, "0")}
        </span>
        {parts}
      </span>
    );
  });
}

function tokenizeLine(
  line: string,
  rules: { pattern: RegExp; className: string }[],
) {
  type Token = {
    start: number;
    end: number;
    value: string;
    className: string;
  };

  const tokens: Token[] = [];

  for (const rule of rules) {
    const pattern = new RegExp(rule.pattern.source, "g");
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(line)) !== null) {
      const start = match.index;
      const value = match[0];
      const end = start + value.length;

      const overlaps = tokens.some((token) =>
        start < token.end && end > token.start
      );

      if (!overlaps) {
        tokens.push({ start, end, value, className: rule.className });
      }
    }
  }

  tokens.sort((a, b) => a.start - b.start);

  const result = [];
  let cursor = 0;

  tokens.forEach((token, index) => {
    if (token.start > cursor) {
      result.push(
        <span key={`plain-${index}-${cursor}`} class="text-[#A7A29A]">
          {line.slice(cursor, token.start)}
        </span>,
      );
    }

    result.push(
      <span key={`token-${index}-${token.start}`} class={token.className}>
        {token.value}
      </span>,
    );

    cursor = token.end;
  });

  if (cursor < line.length) {
    result.push(
      <span key={`plain-end-${cursor}`} class="text-[#A7A29A]">
        {line.slice(cursor)}
      </span>,
    );
  }

  return result;
}
