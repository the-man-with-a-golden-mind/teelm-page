import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../../shared";

type Model = {};
type Msg = never;

const sections = [
  { label: "Overview", href: "#overview" },
  { label: "Exports", href: "#exports" },
  { label: "Core types", href: "#core-types" },
  { label: "Core functions", href: "#core-functions" },
  { label: "Effects", href: "#effects" },
  { label: "Subscriptions", href: "#subscriptions" },
  { label: "Router", href: "#router" },
  { label: "Invariants", href: "#invariants" },
] as const;

const exportsList = [
  ["teelm", "Core app, VNode helpers, noFx, withFx, Cmd/Sub helpers and types."],
  ["teelm/fx", "HTTP, delay, navigation, storage, logging and dispatch effects."],
  ["teelm/subs", "Intervals, keyboard, mouse, resize, URL, animation frame and websocket subscriptions."],
  ["teelm/router", "Route definitions, typed parsers, PageConfig, routerApp, routerLink and route data APIs."],
  ["teelm/functional", "Result, Maybe, Decode, HttpError, branded URL/path primitives and pipe."],
  ["teelm/task", "Composable lazy async work with Task.attempt and Task.perform."],
  ["teelm/events", "Typed DOM event helpers through makeEvents."],
  ["teelm/testing", "Helpers for update results, effects, commands and dispatch spies."],
  ["teelm/debugger", "Floating time-travel debugger overlay."],
  ["teelm/jsx-runtime", "Automatic JSX runtime for Teelm VNodes."],
] as const;

const coreTypes = [
  ["VNode", "Virtual DOM node rendered by Teelm."],
  ["Dispatch<Msg>", "Function that sends one message or an array of messages into the app."],
  ["Effect<Msg>", "One effect tuple. Effects are wrapped into commands through helpers."],
  ["Cmd<Msg>", "Branded command value containing effects to run after update."],
  ["Sub<Msg>", "Branded subscription value for long-lived event sources."],
  ["Subs<Msg>", "Subscription list that allows falsy entries for conditional subscriptions."],
  ["Init<S, Msg>", "Initial tuple: readonly [State, Cmd<Msg>]."],
  ["Update<S, Msg>", "Transition function from state and message to update result."],
  ["AppInstance", "Running app handle: dispatch, getState, destroy and history controls."],
] as const;

const coreFunctions = [
  ["app", "Mount an application and start the TEA cycle."],
  ["h", "Create a VNode manually."],
  ["text", "Create a text VNode."],
  ["memo", "Memoize a component by shallow props."],
  ["lazy", "Lazy view evaluation."],
  ["noFx", "Return state with no effects."],
  ["withFx", "Return state plus one or more effects."],
  ["batch", "Merge commands into one Cmd."],
  ["mapCmd", "Lift child commands into a parent message space."],
  ["mapSub", "Lift child subscriptions into a parent message space."],
  ["mapDispatch", "Wrap parent dispatch for child messages."],
  ["batchSubs", "Flatten multiple subscription lists."],
] as const;

const fxList = [
  ["http", "Fetch and decode JSON or text, returning Result<T, HttpError>."],
  ["delay", "Dispatch a message after a timeout."],
  ["navigate", "Push or replace browser history and notify router listeners."],
  ["storageSet", "Write to localStorage with optional Result message."],
  ["storageGet", "Read and decode localStorage with missing-key support."],
  ["log", "console.log as an effect."],
  ["dispatchMsg", "Dispatch a message as an effect."],
  ["compactEffects", "Filter falsy effects before passing them to withFx."],
] as const;

const subList = [
  ["interval", "Dispatch a message repeatedly on a timer."],
  ["onKeyDown", "Subscribe to keydown events."],
  ["onKeyUp", "Subscribe to keyup events."],
  ["onMouseMove", "Subscribe to mouse movement."],
  ["onResize", "Subscribe to window size changes."],
  ["onUrlChange", "Subscribe to URL changes in manual router setups."],
  ["onAnimationFrame", "Subscribe to animation frames."],
  ["onEvent", "Subscribe to a custom DOM event."],
  ["websocket", "Subscribe to websocket open, message, close and error events."],
] as const;

const invariants = [
  ["Tuple-only init/update", "init and update always return readonly [State, Cmd<Msg>]."],
  ["No bare state", "Use noFx(state) when there are no effects."],
  ["Branded Cmd/Sub", "Construct commands and subscriptions through public helpers."],
  ["Frozen state", "State is deep-frozen on every transition by default."],
  ["Explicit destroy", "Call instance.destroy() to tear down an app."],
  ["Decoder boundaries", "http and storageGet decode external data before update sees it."],
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
            href="/docs/reference"
          >
            Reference
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
              Reference without mystery.
            </h1>

            <p class="mt-6 max-w-3xl text-xl leading-relaxed text-[#A7A29A] max-sm:text-base">
              A compact map of Teelm exports, core types, helpers, effects,
              subscriptions, router APIs and framework invariants.
            </p>
          </section>

          <div class="mt-8 grid gap-8">
            <DocSection id="overview" num="01" title="Overview">
              <p>
                Teelm is split into small entrypoints. Import only the surface you need:
                core app functions from <code>teelm</code>, effects from <code>teelm/fx</code>,
                subscriptions from <code>teelm/subs</code>, and routing from
                <code> teelm/router</code>.
              </p>

              <CodeBlock
                code={`import { noFx, withFx } from "teelm";
import { http, delay } from "teelm/fx";
import { interval } from "teelm/subs";
import { routerApp } from "teelm/router";`}
              />

              <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                <FlatNote
                  title="Small surface"
                  body="Core APIs are split by purpose instead of one giant import path."
                />
                <FlatNote
                  title="Typed contracts"
                  body="State, messages, commands, subscriptions and router params stay typed."
                />
                <FlatNote
                  title="Explicit work"
                  body="Effects are described by commands and run after update."
                />
              </div>
            </DocSection>

            <DocSection id="exports" num="02" title="Package exports">
              <p>
                Teelm exposes focused subpaths. Use them to keep imports obvious and local
                to the concept you are using.
              </p>

              <ReferenceTable
                headers={["Export", "Contains"]}
                rows={exportsList}
              />
            </DocSection>

            <DocSection id="core-types" num="03" title="Core types">
              <p>
                Core types define the TEA contract: model, message, view, update,
                commands, subscriptions and the running app instance.
              </p>

              <ReferenceTable
                headers={["Type", "Purpose"]}
                rows={coreTypes}
              />

              <CodeBlock
                code={`type UpdateResult<S, Msg> = readonly [S, Cmd<Msg>];

type Update<S, Msg> =
  (state: Readonly<S>, msg: Msg) => UpdateResult<S, Msg>;

type Dispatch<Msg> =
  (msg: Msg | readonly Msg[]) => void;`}
              />
            </DocSection>

            <DocSection id="core-functions" num="04" title="Core functions">
              <p>
                Core helpers mount apps, create VNodes and keep tuple-only update results
                ergonomic.
              </p>

              <ReferenceTable
                headers={["Function", "Purpose"]}
                rows={coreFunctions}
              />

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="No effects"
                  body="Return state without work."
                  code="return noFx(model)"
                />
                <FlatNote
                  title="With effects"
                  body="Return state plus one or more effects."
                  code="return withFx(model, effect)"
                />
              </div>
            </DocSection>

            <DocSection id="effects" num="05" title="Effects">
              <p>
                Effects live under <code>teelm/fx</code>. They describe work that should
                happen after update returns.
              </p>

              <ReferenceTable
                headers={["Effect", "Purpose"]}
                rows={fxList}
              />

              <CodeBlock
                code={`import { withFx } from "teelm";
import { delay } from "teelm/fx";

case "DelayedInc":
  return withFx(
    model,
    delay(500, { tag: "Inc" }),
  );`}
              />
            </DocSection>

            <DocSection id="subscriptions" num="06" title="Subscriptions">
              <p>
                Subscriptions live under <code>teelm/subs</code>. They create long-lived
                event sources and return messages back into the app.
              </p>

              <ReferenceTable
                headers={["Subscription", "Purpose"]}
                rows={subList}
              />

              <CodeBlock
                code={`import type { Subs } from "teelm";
import { interval, onKeyDown } from "teelm/subs";

function subscriptions(model: Model): Subs<Msg> {
  return [
    onKeyDown((key) => ({ tag: "Key", key })),
    model.auto && interval(1000, { tag: "Tick" }),
  ];
}`}
              />

              <p>
                <code>Subs&lt;Msg&gt;</code> allows falsy entries, so conditional
                subscriptions can stay in stable array positions.
              </p>
            </DocSection>

            <DocSection id="router" num="07" title="Router">
              <p>
                Router APIs live under <code>teelm/router</code>. You can use the generated
                router from <code>teelm gen</code>, or define routes manually with
                <code> route</code> and <code>page</code>. In 0.2.0, the router also owns
                route-level reads, writes and cache invalidation.
              </p>

              <CodeBlock
                code={`import { routerApp } from "teelm/router";
import { router } from "./generated/router";

routerApp({
  router,
  layout: (content) => content,
  node: document.getElementById("app")!,
});`}
              />

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="PageConfig"
                  body="Protocol implemented by each page file."
                  code="PageConfig<Model, Msg, Shared, Params>"
                />
                <FlatNote
                  title="routerApp"
                  body="Mount a generated or manual router as an app."
                  code="routerApp({ router, layout, node })"
                />
                <FlatNote
                  title="routerLink"
                  body="SPA navigation helper for anchors."
                  code='<a {...routerLink("/docs")}>'
                />
                <FlatNote
                  title="Loaders and actions"
                  body="Pages can own reads and writes through loader(), action() and router.submit()."
                  code="loader / action / submit"
                />
                <FlatNote
                  title="Guards"
                  body="Allow with true or redirect with a URL string."
                  code='isAdmin ? true : "/login"'
                />
                <FlatNote
                  title="Revalidation"
                  body="Refresh the active page or invalidate tagged cache entries after a mutation."
                  code="router.revalidate()"
                />
              </div>
            </DocSection>

            <DocSection id="invariants" num="08" title="Invariants">
              <p>
                These are the rules that make Teelm predictable. They are part of the
                framework contract, not optional style.
              </p>

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                {invariants.map(([title, body]) => (
                  <FlatNote title={title} body={body} />
                ))}
              </div>

              <CodeBlock
                code={`// Always tuple-shaped:
init: () => noFx(initialModel)

update: (model, msg) => {
  switch (msg.tag) {
    case "Changed":
      return noFx({ ...model, changed: true });
  }
}`}
              />
            </DocSection>


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

function ReferenceTable(props: {
  headers: readonly [string, string];
  rows: readonly (readonly [string, string])[];
}) {
  return (
    <div class="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0D0D0F]/90">
      <div class="grid grid-cols-[220px_minmax(0,1fr)] gap-4 border-b border-white/10 bg-[#CCFF00]/10 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#CCFF00] max-md:hidden">
        <span>{props.headers[0]}</span>
        <span>{props.headers[1]}</span>
      </div>

      {props.rows.map(([left, right]) => (
        <div
          key={left}
          class="grid grid-cols-[220px_minmax(0,1fr)] gap-4 border-b border-white/10 px-4 py-4 last:border-b-0 max-md:grid-cols-1 max-md:gap-1"
        >
          <code class="font-mono text-sm text-[#CCFF00]">{left}</code>
          <p class="text-sm leading-relaxed text-[#A7A29A]">{right}</p>
        </div>
      ))}
    </div>
  );
}
