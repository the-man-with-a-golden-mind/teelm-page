import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../../shared";

type Model = {};
type Msg = never;

const sections = [
  { label: "Overview", href: "#overview" },
  { label: "Update tests", href: "#update-tests" },
  { label: "Model", href: "#model" },
  { label: "Effects", href: "#effects" },
  { label: "Dispatch spy", href: "#dispatch-spy" },
  { label: "Run Cmd", href: "#run-cmd" },
  { label: "Page tests", href: "#page-tests" },
  { label: "Rules", href: "#rules" },
] as const;

const testingParts = [
  ["Update", "Call update directly with a model and a message."],
  ["Model", "Use getModel to extract the next state."],
  ["Cmd", "Use getEffects or hasEffects to inspect returned commands."],
  ["Effect", "Use runEffect when you want to execute one effect."],
  ["Dispatch spy", "Capture messages produced by effects."],
  ["Run Cmd", "Execute a full command with runCmd."],
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
          <span class="grid h-10 w-10 place-items-center rounded-full bg-[#CCFF00] text-2xl font-black leading-none text-black">
            t
          </span>
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
            href="/docs/testing"
          >
            Testing
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
              Test the loop directly.
            </h1>

            <p class="mt-6 max-w-3xl text-xl leading-relaxed text-[#A7A29A] max-sm:text-base">
              Teelm apps are easy to test because update functions are explicit:
              pass in state and a message, then inspect the next state and command.
            </p>
          </section>

          <div class="mt-8 grid gap-8">
            <DocSection id="overview" num="01" title="Overview">
              <p>
                Most Teelm tests start with <code>update</code>. You call it directly,
                then inspect the returned model and command.
              </p>

              <CodeBlock code={`const result = update(model, msg);

const nextModel = getModel(result);
const cmd = getEffects(result);`} />

              <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                {testingParts.map(([title, body]) => (
                  <FlatNote title={title} body={body} />
                ))}
              </div>
            </DocSection>

            <DocSection id="update-tests" num="02" title="Update tests">
              <p>
                Test state transitions by calling <code>update</code> with a known model
                and message.
              </p>

              <CodeBlock
                code={`import { getModel } from "teelm/testing";

type Model = {
  count: number;
};

type Msg =
  | { tag: "Inc" }
  | { tag: "Dec" };

test("increments count", () => {
  const result = update({ count: 0 }, { tag: "Inc" });
  const model = getModel(result);

  expect(model.count).toBe(1);
});

test("decrements count", () => {
  const result = update({ count: 1 }, { tag: "Dec" });
  const model = getModel(result);

  expect(model.count).toBe(0);
});`}
              />

              <p>
                The key idea is simple: message in, next model out.
              </p>
            </DocSection>

            <DocSection id="model" num="03" title="Inspect the model">
              <p>
                <code>getModel</code> extracts the state from an update result.
                This keeps tests focused on behavior instead of tuple indexing.
              </p>

              <CodeBlock
                code={`import { getModel } from "teelm/testing";

const next = getModel(update(model, { tag: "SaveStarted" }));

expect(next.saving).toBe(true);
expect(next.error).toBe(null);`}
              />

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Good"
                  body="Assert on visible state changes."
                  code="expect(next.loading).toBe(true)"
                />
                <FlatNote
                  title="Avoid"
                  body="Testing internal implementation details instead of model behavior."
                  code="expect(privateThing)"
                />
              </div>
            </DocSection>

            <DocSection id="effects" num="04" title="Inspect effects">
              <p>
                When an update returns work, use <code>hasEffects</code> or
                <code>getEffects</code> to inspect the command.
              </p>

              <CodeBlock
                code={`import { getEffects, hasEffects } from "teelm/testing";

test("save returns an effect", () => {
  const result = update(model, { tag: "Save" });

  expect(hasEffects(result)).toBe(true);

  const cmd = getEffects(result);
  expect(cmd.length).toBe(1);
});`}
              />

              <p>
                You do not need to run every effect in every test. Often it is enough
                to verify that the transition produced work.
              </p>
            </DocSection>

            <DocSection id="dispatch-spy" num="05" title="Dispatch spy">
              <p>
                Use <code>createDispatchSpy</code> when you want to capture messages
                produced by effects.
              </p>

              <CodeBlock
                code={`import { createDispatchSpy } from "teelm/testing";

test("captures dispatched messages", () => {
  const spy = createDispatchSpy<Msg>();

  spy.dispatch({ tag: "Saved" });

  expect(spy.messages).toEqual([{ tag: "Saved" }]);
  expect(spy.last()).toEqual({ tag: "Saved" });

  spy.clear();
  expect(spy.messages).toEqual([]);
});`}
              />

              <p>
                A dispatch spy is useful when testing effects that produce follow-up messages.
              </p>
            </DocSection>

            <DocSection id="run-cmd" num="06" title="Run commands">
              <p>
                Use <code>runCmd</code> to execute all effects inside a command with a
                dispatch spy.
              </p>

              <CodeBlock
                code={`import { createDispatchSpy, runCmd } from "teelm/testing";

test("command dispatches Saved", () => {
  const [nextModel, cmd] = update(model, { tag: "Save" });

  expect(nextModel.saving).toBe(true);

  const spy = createDispatchSpy<Msg>();
  runCmd(cmd, spy.dispatch);

  expect(spy.last()).toEqual({ tag: "Saved" });
});`}
              />

              <p>
                For a single effect, use <code>runEffect</code>. For a command returned
                by update, use <code>runCmd</code>.
              </p>

              <CodeBlock
                code={`import { runEffect } from "teelm/testing";

runEffect(effect, spy.dispatch);`}
                compact
              />
            </DocSection>

            <DocSection id="page-tests" num="07" title="Page tests">
              <p>
                A page is just a config object. You can test its <code>init</code> and
                <code>update</code> the same way you test any TEA module.
              </p>

              <CodeBlock
                code={`import { getModel, hasEffects } from "teelm/testing";
import { page } from "./Home";

test("page initializes", () => {
  const result = page.init({}, shared);
  const model = getModel(result);

  expect(model.count).toBe(0);
  expect(hasEffects(result)).toBe(false);
});

test("page updates", () => {
  const result = page.update({ count: 0 }, { tag: "Inc" }, shared);
  const model = getModel(result);

  expect(model.count).toBe(1);
});`}
              />

              <p>
                Pages with params can be tested by passing a params object into
                <code>init</code>.
              </p>

              <CodeBlock
                code={`const result = userPage.init({ id: 42 }, shared);
const model = getModel(result);

expect(model.id).toBe(42);`}
                compact
              />
            </DocSection>

            <DocSection id="rules" num="08" title="Testing rules">
              <p>
                Good Teelm tests follow the same shape as the framework: message,
                transition, result.
              </p>

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Test update first"
                  body="Most behavior lives in update. Start there."
                />
                <FlatNote
                  title="Assert on model state"
                  body="Test the state your view will render."
                />
                <FlatNote
                  title="Run effects deliberately"
                  body="Only execute commands when the produced messages matter."
                />
                <FlatNote
                  title="Keep fixtures small"
                  body="Use minimal models that make the behavior obvious."
                />
              </div>

              <CodeBlock
                code={`// Good shape:
const result = update(model, msg);
const next = getModel(result);

expect(next.status).toBe("saved");`}
              />
            </DocSection>

            <div class="flex items-center justify-between gap-4 rounded-[2rem] border border-white/15 bg-[#0D0D0F]/95 p-6 shadow-2xl shadow-black/40 max-sm:flex-col max-sm:items-start">
              <div>
                <p class="text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00]">
                  Next
                </p>
                <h2 class="mt-2 text-3xl font-black tracking-[-0.055em]">
                  Continue to Debugging
                </h2>
              </div>

              <a
                href="/docs/debugging"
                class="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CCFF00] bg-[#CCFF00] px-5 text-sm font-black !text-black"
              >
                Debugging →
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
