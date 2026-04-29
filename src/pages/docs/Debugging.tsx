import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../../shared";

type Model = {};
type Msg = never;

const sections = [
  { label: "Overview", href: "#overview" },
  { label: "Debug config", href: "#debug-config" },
  { label: "History", href: "#history" },
  { label: "Debugger overlay", href: "#debugger-overlay" },
  { label: "Frozen state", href: "#frozen-state" },
  { label: "Lifecycle", href: "#lifecycle" },
  { label: "Router debugging", href: "#router-debugging" },
  { label: "Rules", href: "#rules" },
] as const;

const debuggingParts = [
  ["debug", "Enable console traces and state history."],
  ["history", "Keep previous states for inspection and time travel."],
  ["attachDebugger", "Mount the floating debugger overlay."],
  ["freezeState", "Catch mutation bugs by freezing state transitions."],
  ["getHistory", "Read the recorded state history from an app instance."],
  ["jumpTo", "Move through history when debugging behavior."],
] as const;

export const page: PageConfig<Model, Msg, Shared, {}> = {
  init: () => noFx({}),

  update: (model) => noFx(model),

  view: () => (
    <div class="min-h-screen overflow-hidden bg-[#050505] text-[#F6F3EB] selection:bg-[#CCFF00] selection:text-black">
      <div class="pointer-events-none fixed inset-0 opacity-70" />

      <header class="sticky top-4 z-40 mx-auto mt-4 flex w-[min(1180px,calc(100%-24px))] items-center justify-between gap-4 rounded-full border border-white/15 bg-black/75 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl max-sm:w-[min(100%-20px,1180px)] max-sm:rounded-[1.75rem]">
        <a
          href="/"
          aria-label="Teelm home"
          class="flex items-center gap-3 rounded-full py-1 pl-1 pr-3 font-black tracking-[-0.04em]"
        >
          <img src="/logo_vector.svg" class="h-12" alt="Teelm logo" />
          <span class="text-2xl max-sm:hidden">teelm</span>
        </a>

        <nav
          aria-label="Docs navigation"
          class="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1 max-md:hidden"
        >
          <a
            class="rounded-full px-4 py-2 text-sm font-bold text-[#A7A29A] hover:bg-white/10 hover:text-[#F6F3EB]"
            href="/docs"
          >
            Docs
          </a>
          <a
            class="rounded-full bg-[#CCFF00] px-4 py-2 text-sm font-black text-black!"
            href="/docs/debugging"
          >
            Debugging
          </a>
          <a
            class="rounded-full px-4 py-2 text-sm font-bold text-[#A7A29A] hover:bg-white/10 hover:text-[#F6F3EB]"
            href="/docs/examples"
          >
            Examples
          </a>
        </nav>

        <a
          class="rounded-full border border-white/15 px-4 py-3 text-sm font-black text-[#A7A29A] hover:bg-white/10 hover:text-[#F6F3EB] max-sm:px-3 max-sm:py-2 max-sm:text-xs"
          href="/docs"
        >
          Back
        </a>
      </header>

      <main class="relative z-10 mx-auto grid w-[min(1180px,calc(100%-24px))] grid-cols-[250px_minmax(0,1fr)] gap-8 py-16 max-lg:grid-cols-1 max-sm:w-[min(100%-20px,1180px)] max-sm:py-10">
        <aside class="lg:sticky lg:top-28 lg:self-start">
          <nav class="rounded-[2rem] border border-white/15 bg-[#0D0D0F]/80 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl max-lg:flex max-lg:gap-2 max-lg:overflow-x-auto max-lg:rounded-[1.5rem] max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                class="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-black text-[#A7A29A] transition hover:bg-white/10 hover:text-[#F6F3EB] max-lg:flex-none"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article class="min-w-0">
          <section class="rounded-[2.5rem] border border-white/15 bg-[#0D0D0F]/95 p-[clamp(24px,5vw,56px)] shadow-2xl shadow-black/50 max-sm:rounded-[2rem]">
            <h1 class="max-w-5xl text-[clamp(3rem,9vw,6rem)] font-black leading-[0.9] tracking-[-0.07em] lg:text-8xl">
              Make every transition visible.
            </h1>

            <p class="mt-6 max-w-3xl text-xl leading-relaxed text-[#A7A29A] max-sm:text-base">
              Teelm debugging is built around the same contract as the framework:
              state changes are explicit, history can be inspected, and mutation bugs fail loudly.
            </p>
          </section>

          <div class="mt-8 grid gap-8">
            <DocSection id="overview" num="01" title="Overview">
              <p>
                Debugging in Teelm starts with visibility. You can enable console traces,
                record state history, inspect app instances and attach a time-travel overlay.
              </p>

              <CodeBlock code={`Msg -> Update -> State history -> Render`} />

              <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                {debuggingParts.map(([title, body]) => (
                  <FlatNote title={title} body={body} />
                ))}
              </div>
            </DocSection>

            <DocSection id="debug-config" num="02" title="Debug config">
              <p>
                Pass <code>debug</code> to <code>app</code> or <code>routerApp</code>.
                Use <code>true</code> for the default debug behavior, or pass a config object.
              </p>

              <CodeBlock
                code={`routerApp({
  router,
  layout,
  node: document.getElementById("app")!,
  debug: {
    console: true,
    history: true,
    maxHistory: 200,
  },
});`}
              />

              <p>
                <code>console</code> enables logging. <code>history</code> records state
                transitions. <code>maxHistory</code> controls how many states are kept.
              </p>

              <div class="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="console"
                  body="Log transitions while developing."
                  code="console: true"
                />
                <FlatNote
                  title="history"
                  body="Record state snapshots for time travel."
                  code="history: true"
                />
                <FlatNote
                  title="maxHistory"
                  body="Limit how much state history is retained."
                  code="maxHistory: 200"
                />
              </div>
            </DocSection>

            <DocSection id="history" num="03" title="History">
              <p>
                When history is enabled, the app instance exposes methods for reading and
                navigating state history.
              </p>

              <CodeBlock
                code={`const instance = routerApp({
  router,
  layout,
  node: document.getElementById("app")!,
  debug: { history: true, maxHistory: 200 },
});

const history = instance.getHistory();
const index = instance.getHistoryIndex();

instance.goBack();
instance.goForward();
instance.jumpTo(0);`}
              />

              <p>
                History is useful when a bug appears after a sequence of messages. Instead
                of guessing which interaction broke the state, inspect the sequence.
              </p>
            </DocSection>

            <DocSection id="debugger-overlay" num="04" title="Debugger overlay">
              <p>
                Use <code>attachDebugger</code> from <code>teelm/debugger</code> to mount
                the floating time-travel overlay.
              </p>

              <CodeBlock
                code={`import { attachDebugger } from "teelm/debugger";

const instance = routerApp({
  router,
  layout,
  node: document.getElementById("app")!,
  debug: true,
});

const debuggerHandle = attachDebugger(instance, {
  position: "bottom-right",
  collapsed: false,
  width: "420px",
});`}
              />

              <p>
                The debugger requires debug history on the app instance. Use
                <code>debug: true</code> or <code>debug: {`{ history: true }`}</code>.
              </p>

              <CodeBlock
                code={`debuggerHandle.destroy();`}
                compact
              />
            </DocSection>

            <DocSection id="frozen-state" num="05" title="Frozen state">
              <p>
                Teelm deep-freezes state on every transition by default. This catches direct
                mutation early.
              </p>

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Correct"
                  body="Return a new object from update."
                  code="return noFx({ ...model, count: model.count + 1 })"
                />
                <FlatNote
                  title="Wrong"
                  body="Do not mutate the existing model."
                  code="model.count += 1"
                />
              </div>

              <CodeBlock
                code={`case "Inc":
  return noFx({
    ...model,
    count: model.count + 1,
  });`}
              />

              <p>
                You can opt out with <code>freezeState: false</code>, but reserve that for
                known hot paths where you understand the tradeoff.
              </p>

              <CodeBlock
                code={`app({
  init,
  update,
  view,
  node: document.getElementById("app")!,
  freezeState: false,
});`}
                compact
              />
            </DocSection>

            <DocSection id="lifecycle" num="06" title="Lifecycle hooks">
              <p>
                App and page lifecycle hooks help debug integration boundaries:
                mount, render, unmount and page update phases.
              </p>

              <CodeBlock
                code={`app({
  init,
  update,
  view,
  node: document.getElementById("app")!,

  onMount: ({ state, node }) => {
    console.log("mounted", state, node);
  },

  afterRender: ({ state, prevState }) => {
    console.log("rendered", { state, prevState });
  },

  onUnmount: ({ state }) => {
    console.log("unmounted", state);
  },
});`}
              />

              <p>
                Keep hooks for integration work and diagnostics. State transitions still
                belong in <code>update</code>.
              </p>
            </DocSection>

            <DocSection id="router-debugging" num="07" title="Router debugging">
              <p>
                Router apps can use the same debug config. Because router state is stored
                under the app model, history can show route transitions and shared state changes.
              </p>

              <CodeBlock
                code={`routerApp({
  router,
  layout,
  node: document.getElementById("app")!,
  debug: {
    console: true,
    history: true,
    maxHistory: 200,
  },
});`}
              />

              <p>
                Pages can also expose error handling hooks such as <code>onError</code> and
                <code>errorView</code> to make page failures visible.
              </p>

              <CodeBlock
                code={`export const page: PageConfig<Model, Msg, Shared, Params> = {
  init: (params) => noFx({ id: params.id }),

  update: (model, msg) => noFx(model),

  view: (model) => {
    if (model.id < 0) throw new Error("Invalid id");
    return <main>User #{model.id}</main>;
  },

  onError: ({ phase, error }) => {
    console.error("Page error", phase, error);
  },

  errorView: () => (
    <main>
      Something went wrong.
    </main>
  ),
};`}
              />
            </DocSection>

            <DocSection id="rules" num="08" title="Debugging rules">
              <p>
                Debugging stays simple when state flow stays simple.
              </p>

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Keep updates pure"
                  body="Side effects in update are harder to trace."
                />
                <FlatNote
                  title="Represent failures in state"
                  body="Make errors visible in the model and render them."
                />
                <FlatNote
                  title="Use history for sequences"
                  body="Bugs often appear after a chain of messages."
                />
                <FlatNote
                  title="Do not silence mutation errors"
                  body="Frozen state is a signal that update logic is wrong."
                />
              </div>

              <CodeBlock
                code={`// Good debugging loop:
const before = instance.getState();

instance.dispatch({ tag: "Save" });

const after = instance.getState();
const history = instance.getHistory();`}
              />
            </DocSection>

            <div class="flex items-center justify-between gap-4 rounded-[2rem] border border-white/15 bg-[#0D0D0F]/95 p-6 shadow-2xl shadow-black/40 max-sm:flex-col max-sm:items-start">
              <div>
                <p class="text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00]">
                  Next
                </p>
                <h2 class="mt-2 text-3xl font-black tracking-[-0.055em]">
                  Continue to Reference
                </h2>
              </div>

              <a
                href="/docs/reference"
                class="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CCFF00] bg-[#CCFF00] px-5 text-sm font-black !text-black"
              >
                Reference →
              </a>
            </div>
          </div>
        </article>
      </main>
    </div>
  ),
};

function DocSection(props: {
  id: string;
  num: string;
  title: string;
  children: unknown;
}) {
  return (
    <section
      id={props.id}
      class="scroll-mt-28 rounded-[2rem] border border-white/15 bg-[#0D0D0F]/95 p-7 shadow-2xl shadow-black/30 max-sm:rounded-[1.5rem] max-sm:p-5"
    >
      <div class="mb-6 flex items-center gap-4">
        <NumberMark value={props.num} />

        <h2 class="text-4xl font-black leading-none tracking-[-0.06em] max-sm:text-3xl">
          {props.title}
        </h2>
      </div>

      <div class="grid gap-5 text-[#A7A29A] [&_code]:bg-transparent [&_code]:px-0.5 [&_code]:font-mono [&_code]:text-[#F6F3EB] [&_p]:leading-relaxed">
        {props.children}
      </div>
    </section>
  );
}

function NumberMark(props: { value: string }) {
  return (
    <span class="grid h-12 w-12 flex-none place-items-center rounded-full bg-[#CCFF00] text-sm font-black tracking-[-0.04em] text-black max-sm:h-10 max-sm:w-10 max-sm:text-xs">
      {props.value}
    </span>
  );
}

function CodeBlock(props: { file?: string; code: string; compact?: boolean }) {
  return (
    <div class="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#070708] shadow-2xl shadow-black/30">
      {props.file ? (
        <div class="border-b border-white/10 px-4 py-3 font-mono text-xs text-[#A7A29A]">
          {props.file}
        </div>
      ) : null}

      <pre class={`${props.compact ? "p-4" : "overflow-auto p-5"}`}>
        <code class="whitespace-pre border-0! bg-transparent! p-0! font-mono text-[13px] leading-7 text-[#F6F3EB] max-sm:text-[11px] max-sm:leading-6">
          {props.code}
        </code>
      </pre>
    </div>
  );
}

function FlatNote(props: { title: string; body: string; code?: string }) {
  return (
    <div class="rounded-[1.5rem] border border-white/15 bg-white/[0.035] p-5">
      <h3 class="mb-2 text-lg font-black tracking-[-0.04em] text-[#F6F3EB]">
        {props.title}
      </h3>
      <p class="text-sm leading-relaxed text-[#A7A29A]">{props.body}</p>
      {props.code ? (
        <code class="mt-3 inline-block font-mono text-xs text-[#CCFF00]">
          {props.code}
        </code>
      ) : null}
    </div>
  );
}
