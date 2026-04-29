import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../../shared";

type Model = {};
type Msg = never;

const sections = [
  { label: "Overview", href: "#overview" },
  { label: "withFx", href: "#with-fx" },
  { label: "HTTP", href: "#http" },
  { label: "Delay", href: "#delay" },
  { label: "Storage", href: "#storage" },
  { label: "Task", href: "#task" },
  { label: "Errors", href: "#errors" },
  { label: "Rules", href: "#rules" },
] as const;

const effectParts = [
  ["Cmd", "A branded value describing work to run after update."],
  ["Effect", "A single unit of work, usually created by teelm/fx helpers."],
  ["withFx", "Return state plus one or more effects."],
  ["noFx", "Return state when there is no work to run."],
  ["Result", "The success/error shape used by HTTP, storage and tasks."],
  ["Decoder", "A boundary that validates external data before update sees it."],
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
            href="/docs/effects"
          >
            Effects
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
              Effects are explicit work.
            </h1>

            <p class="mt-6 max-w-3xl text-xl leading-relaxed text-[#A7A29A] max-sm:text-base">
              Teelm keeps update pure. Network calls, timers, storage writes and async
              workflows are returned as commands, then run by the framework after state changes.
            </p>
          </section>

          <div class="mt-8 grid gap-8">
            <DocSection id="overview" num="01" title="Overview">
              <p>
                Effects are how Teelm talks to the outside world. The important rule is:
                <code>update</code> describes work, but does not perform it directly.
              </p>

              <CodeBlock code={`Msg -> Update -> [State, Cmd<Msg>] -> Effects -> Msg`} />

              <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                {effectParts.map(([title, body]) => (
                  <FlatNote title={title} body={body} />
                ))}
              </div>
            </DocSection>

            <DocSection id="with-fx" num="02" title="Return effects with withFx">
              <p>
                Use <code>withFx</code> when an update needs to return the next model and
                one or more effects.
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
                Use <code>noFx</code> when there is no work to run.
              </p>

              <CodeBlock
                code={`case "Inc":
  return noFx({ ...model, count: model.count + 1 });`}
                compact
              />
            </DocSection>

            <DocSection id="http" num="03" title="HTTP">
              <p>
                <code>http</code> fetches data and validates the response with a decoder.
                It sends a <code>Result</code> back into your update function through
                <code>toMsg</code>.
              </p>

              <CodeBlock
                code={`import { withFx, noFx } from "teelm";
import { http } from "teelm/fx";
import { Decode, HttpError } from "teelm/functional";

type User = {
  id: number;
  name: string;
};

type Model = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type Msg =
  | { tag: "FetchUser" }
  | { tag: "GotUser"; user: User }
  | { tag: "FetchFailed"; error: string };

const userDecoder = Decode.object({
  id: Decode.number,
  name: Decode.string,
});

function update(model: Model, msg: Msg) {
  switch (msg.tag) {
    case "FetchUser":
      return withFx(
        { ...model, loading: true, error: null },
        http({
          url: "/api/me",
          decoder: userDecoder,
          toMsg: (result) =>
            result.tag === "Ok"
              ? { tag: "GotUser", user: result.value }
              : { tag: "FetchFailed", error: HttpError.toString(result.error) },
        }),
      );

    case "GotUser":
      return noFx({ ...model, user: msg.user, loading: false });

    case "FetchFailed":
      return noFx({ ...model, error: msg.error, loading: false });
  }
}`}
              />

              <p>
                HTTP failures and decoder failures are not thrown into your view. They become
                typed messages that update can handle.
              </p>
            </DocSection>

            <DocSection id="delay" num="04" title="Delay">
              <p>
                <code>delay</code> dispatches a message after a timeout. It is useful for
                debounced UI state, demos, retry flows and small timers.
              </p>

              <CodeBlock
                code={`import { withFx } from "teelm";
import { delay } from "teelm/fx";

type Msg =
  | { tag: "Save" }
  | { tag: "Saved" }
  | { tag: "ClearSaved" };

case "Saved":
  return withFx(
    { ...model, status: "saved" },
    delay(1200, { tag: "ClearSaved" }),
  );

case "ClearSaved":
  return noFx({ ...model, status: "idle" });`}
              />
            </DocSection>

            <DocSection id="storage" num="05" title="Storage">
              <p>
                Storage effects use the same explicit message flow. Writes can be fire-and-forget,
                but production code should usually map the result back into a message.
              </p>

              <CodeBlock
                code={`import { withFx, noFx } from "teelm";
import { storageGet, storageSet } from "teelm/fx";
import { Decode } from "teelm/functional";

type Model = {
  theme: "dark" | "light";
};

type Msg =
  | { tag: "SaveTheme" }
  | { tag: "ThemeSaved" }
  | { tag: "ThemeSaveFailed"; error: unknown }
  | { tag: "LoadTheme" }
  | { tag: "ThemeLoaded"; theme: "dark" | "light" | undefined }
  | { tag: "ThemeLoadFailed"; error: unknown };

const themeDecoder = Decode.oneOf(
  Decode.map(Decode.string, (value) =>
    value === "light" ? "light" : "dark",
  ),
);

function update(model: Model, msg: Msg) {
  switch (msg.tag) {
    case "SaveTheme":
      return withFx(
        model,
        storageSet("theme", JSON.stringify(model.theme), (result) =>
          result.tag === "Ok"
            ? { tag: "ThemeSaved" }
            : { tag: "ThemeSaveFailed", error: result.error },
        ),
      );

    case "LoadTheme":
      return withFx(
        model,
        storageGet({
          key: "theme",
          decoder: themeDecoder,
          toMsg: (result) =>
            result.tag === "Ok"
              ? { tag: "ThemeLoaded", theme: result.value }
              : { tag: "ThemeLoadFailed", error: result.error },
        }),
      );

    case "ThemeLoaded":
      return noFx({
        ...model,
        theme: msg.theme ?? model.theme,
      });
  }
}`}
              />

              <p>
                <code>storageGet</code> returns <code>undefined</code> for missing keys,
                so your update function should handle the empty case deliberately.
              </p>
            </DocSection>

            <DocSection id="task" num="06" title="Task">
              <p>
                Use <code>Task</code> when async work needs to be composed before producing
                one final message. This avoids adding intermediate messages for every async step.
              </p>

              <CodeBlock
                code={`import { withFx } from "teelm";
import { Task } from "teelm/task";

type Auth = { token: string };
type Profile = { name: string };

type AppError =
  | { kind: "auth"; message: string }
  | { kind: "profile"; message: string };

type Msg =
  | { tag: "Boot" }
  | { tag: "ProfileLoaded"; result: Result<Profile, AppError> };

const fetchAuth = Task.fromPromise<AppError, Auth>(
  () => fetch("/api/auth").then((r) => r.json()),
  (error) => ({ kind: "auth", message: String(error) }),
);

const fetchProfile = (token: string) =>
  Task.fromPromise<AppError, Profile>(
    () => fetch("/api/me?token=" + token).then((r) => r.json()),
    (error) => ({ kind: "profile", message: String(error) }),
  );

const loadProfile = Task.andThen(fetchAuth, ({ token }) => fetchProfile(token));

case "Boot":
  return withFx(
    model,
    Task.attempt(loadProfile, (result) => ({ tag: "ProfileLoaded", result })),
  );`}
              />

              <p>
                A <code>Task</code> is lazy. It runs only when converted into an effect with
                <code>Task.attempt</code> or <code>Task.perform</code>.
              </p>
            </DocSection>

            <DocSection id="errors" num="07" title="Errors are messages">
              <p>
                Effects should not hide failures. Map failures into messages and handle them
                in <code>update</code> like every other state transition.
              </p>

              <CodeBlock
                code={`import { HttpError } from "teelm/functional";

case "FetchFailed": {
  switch (msg.error.tag) {
    case "BadUrl":
      return noFx({ ...model, error: "Bad URL: " + msg.error.url });

    case "Timeout":
      return noFx({ ...model, error: "Request timed out." });

    case "NetworkError":
      return noFx({ ...model, error: msg.error.message });

    case "BadStatus":
      return noFx({ ...model, error: "HTTP " + msg.error.status });

    case "BadBody":
      return noFx({ ...model, error: "Decode failed: " + msg.error.reason });
  }
}`}
              />

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Good"
                  body="Turn external failures into typed messages."
                  code='{ tag: "FetchFailed", error }'
                />
                <FlatNote
                  title="Avoid"
                  body="Do not hide side effects inside view or update."
                  code="fetch(...).then(...)"
                />
              </div>
            </DocSection>

            <DocSection id="rules" num="08" title="Rules">
              <p>
                Effects stay predictable when the contract stays small.
              </p>

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Update describes work"
                  body="Return commands. Do not run side effects directly inside update."
                />
                <FlatNote
                  title="External data crosses decoders"
                  body="Use decoders for HTTP and storage boundaries."
                />
                <FlatNote
                  title="Errors become state"
                  body="Represent failure in your model and render it in view."
                />
                <FlatNote
                  title="Commands are branded"
                  body="Use helpers like withFx, batch, mapCmd and Task.attempt."
                />
              </div>
            </DocSection>

            <div class="flex items-center justify-between gap-4 rounded-[2rem] border border-white/15 bg-[#0D0D0F]/95 p-6 shadow-2xl shadow-black/40 max-sm:flex-col max-sm:items-start">
              <div>
                <p class="text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00]">
                  Next
                </p>
                <h2 class="mt-2 text-3xl font-black tracking-[-0.055em]">
                  Continue to Routing
                </h2>
              </div>

              <a
                href="/docs/routing"
                class="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CCFF00] bg-[#CCFF00] px-5 text-sm font-black !text-black"
              >
                Routing →
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
