import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../../shared";

type Model = {};
type Msg = never;

const sections = [
  { label: "Overview", href: "#overview" },
  { label: "State", href: "#state" },
  { label: "Msg", href: "#msg" },
  { label: "Update", href: "#update" },
  { label: "View", href: "#view" },
  { label: "Cmd", href: "#cmd" },
  { label: "Sub", href: "#sub" },
  { label: "Nested TEA", href: "#nested-tea" },
] as const;

const architectureParts = [
  ["State", "The current model of your page or app."],
  ["View", "A pure function that renders UI from state."],
  ["Msg", "A typed event describing what happened."],
  ["Update", "A transition from current state and message to the next state."],
  ["Cmd", "Explicit work to run after a transition."],
  ["Sub", "Long-lived event sources such as timers, keys and sockets."],
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
            href="/docs/architecture"
          >
            Architecture
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
              The architecture is the product.
            </h1>

            <p class="mt-6 max-w-3xl text-xl leading-relaxed text-[#A7A29A] max-sm:text-base">
              Teelm implements The Elm Architecture in strict TypeScript: state renders UI,
              UI dispatches messages, updates return the next state plus explicit work.
            </p>
          </section>

          <div class="mt-8 grid gap-8">
            <DocSection id="overview" num="01" title="Overview">
              <p>
                A Teelm app moves in one direction. There are no hidden state writes,
                no implicit effects, and no second lifecycle where behavior disappears.
              </p>

              <CodeBlock code={`State -> View -> Msg -> Update -> [State, Cmd<Msg>]`} />

              <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                {architectureParts.map(([title, body]) => (
                  <FlatNote title={title} body={body} />
                ))}
              </div>
            </DocSection>

            <DocSection id="state" num="02" title="State">
              <p>
                State is the model your view renders from. It should describe the current
                page or app state directly: loaded data, loading flags, form values,
                errors and UI selections.
              </p>

              <CodeBlock
                code={`type Model = {
  count: number;
  loading: boolean;
  error: string | null;
};`}
              />

              <p>
                State is deep-frozen by default on every transition. Do not mutate it.
                Return a new object from <code>update</code>.
              </p>

              <CodeBlock
                code={`return noFx({
  ...model,
  count: model.count + 1,
});`}
                compact
              />
            </DocSection>

            <DocSection id="msg" num="03" title="Msg">
              <p>
                Messages describe everything that can happen. User input, HTTP responses,
                timers, storage results and router events should all become typed messages.
              </p>

              <CodeBlock
                code={`type Msg =
  | { tag: "Inc" }
  | { tag: "Dec" }
  | { tag: "FetchUser" }
  | { tag: "GotUser"; user: User }
  | { tag: "FetchFailed"; error: string };`}
              />

              <p>
                Use discriminated unions. They make update functions exhaustive, readable
                and easy to refactor.
              </p>
            </DocSection>

            <DocSection id="update" num="04" title="Update">
              <p>
                <code>update</code> is the transition function. It receives the current
                model and a message, then returns the next model plus a command.
              </p>

              <CodeBlock
                code={`function update(model: Model, msg: Msg) {
  switch (msg.tag) {
    case "Inc":
      return noFx({ ...model, count: model.count + 1 });

    case "Dec":
      return noFx({ ...model, count: model.count - 1 });
  }
}`}
              />

              <p>
                There is no bare-state shorthand. Even when there are no effects,
                return <code>noFx(model)</code>.
              </p>

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Correct"
                  body="Return tuple-shaped results through Teelm helpers."
                  code="return noFx(nextModel)"
                />
                <FlatNote
                  title="Wrong"
                  body="Returning bare state breaks the update contract."
                  code="return nextModel"
                />
              </div>
            </DocSection>

            <DocSection id="view" num="05" title="View">
              <p>
                <code>view</code> renders the model and dispatches messages. In JSX projects,
                it returns Teelm VNodes through the JSX runtime.
              </p>

              <CodeBlock
                code={`view: (model, _shared, dispatch) => (
  <main>
    <button onClick={() => dispatch({ tag: "Dec" })}>−</button>
    <strong>{model.count}</strong>
    <button onClick={() => dispatch({ tag: "Inc" })}>+</button>
  </main>
),`}
              />

              <p>
                Keep views boring. They should render data, attach event handlers and
                dispatch messages. Put state changes in <code>update</code>.
              </p>
            </DocSection>

            <DocSection id="cmd" num="06" title="Cmd">
              <p>
                Commands describe effects that Teelm should run after the state transition.
                <code>Cmd</code> is branded, so raw tuples cannot sneak into the system.
              </p>

              <CodeBlock
                code={`import { withFx } from "teelm";
import { delay } from "teelm/fx";

case "DelayedInc":
  return withFx(
    model,
    delay(500, { tag: "Inc" }),
  );`}
              />

              <p>
                Use <code>withFx</code> when returning effects and <code>noFx</code> when
                there are none.
              </p>
            </DocSection>

            <DocSection id="sub" num="07" title="Sub">
              <p>
                Subscriptions describe long-lived event sources. They are also branded,
                and should be created through helpers from <code>teelm/subs</code>.
              </p>

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
                <code>Subs&lt;Msg&gt;</code> accepts falsy entries, so conditional
                subscriptions can stay in stable positions.
              </p>
            </DocSection>

            <DocSection id="nested-tea" num="08" title="Nested TEA">
              <p>
                Larger apps can split features into child TEA modules. The child owns its
                state and messages. The parent lifts child commands and dispatches.
              </p>

              <CodeBlock
                code={`import { mapCmd, mapDispatch } from "teelm";
import * as Counter from "./Counter";

type Msg =
  | { tag: "Child"; msg: Counter.Msg };

case "Child": {
  const [child, childCmd] = Counter.update(model.child, msg.msg);

  return [
    { ...model, child },
    mapCmd(childCmd, (m): Msg => ({ tag: "Child", msg: m })),
  ];
}`}
              />

              <p>
                Use <code>mapDispatch</code> in views, <code>mapCmd</code> in update,
                and <code>mapSub</code> for subscriptions.
              </p>
            </DocSection>

            <div class="flex items-center justify-between gap-4 rounded-[2rem] border border-white/15 bg-[#0D0D0F]/95 p-6 shadow-2xl shadow-black/40 max-sm:flex-col max-sm:items-start">
              <div>
                <p class="text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00]">
                  Next
                </p>
                <h2 class="mt-2 text-3xl font-black tracking-[-0.055em]">
                  Continue to Effects
                </h2>
              </div>

              <a
                href="/docs/effects"
                class="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CCFF00] bg-[#CCFF00] px-5 text-sm font-black !text-black"
              >
                Effects →
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
