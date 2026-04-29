import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../../shared";

type Model = {};
type Msg = never;

const sections = [
  { label: "Install", href: "#install" },
  { label: "Create project", href: "#create-project" },
  { label: "Project structure", href: "#project-structure" },
  { label: "Run dev server", href: "#run-dev" },
  { label: "Add pages", href: "#add-pages" },
  { label: "First page", href: "#first-page" },
  { label: "The loop", href: "#loop" },
] as const;

const generatedFiles = [
  ["index.html", "HTML entrypoint with the #app mount node."],
  ["package.json", "Project scripts and package metadata."],
  ["tsconfig.json", "Strict TypeScript config with JSX support."],
  ["vite.config.ts", "Vite bundler config."],
  ["src/main.tsx", "Application entrypoint."],
  ["src/shared.ts", "Shared app state for router pages."],
  ["src/app.css", "Global CSS / Tailwind entry."],
  ["src/pages/Home.tsx", "Home page mapped to /."],
  ["src/pages/About.tsx", "About page mapped to /about."],
  ["src/pages/NotFound.tsx", "404 page."],
  ["src/generated/router.ts", "Generated route table. Do not edit by hand."],
] as const;

const pageExamples = [
  ["teelm add About --jsx", "src/pages/About.tsx", "/about"],
  ["teelm add users/[id] --jsx", "src/pages/users/[id].tsx", "/users/:id"],
  ["teelm add users/[id:int] --jsx", "src/pages/users/[id:int].tsx", "/users/:id as number"],
  ["teelm add users/[id]/Edit --jsx", "src/pages/users/[id]/Edit.tsx", "/users/:id/edit"],
  ["teelm add Blog/Index --jsx", "src/pages/Blog/Index.tsx", "/blog"],
] as const;

export const page: PageConfig<Model, Msg, Shared, {}> = {
  init: () => noFx({}),

  update: (model) => noFx(model),

  view: () => (
    <div class="min-h-screen overflow-hidden bg-[#050505] text-[#F6F3EB] selection:bg-[#CCFF00] selection:text-black">
      <div class="pointer-events-none fixed inset-0 opacity-70">

      </div>

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
            href="/docs/introduction"
          >
            Introduction
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
              Install teelm and ship your first page.
            </h1>

            <p class="mt-6 max-w-3xl text-xl leading-relaxed text-[#A7A29A] max-sm:text-base">
              Install the CLI, generate a project, see what gets created, run the dev server,
              add pages, then learn the one-loop architecture behind teelm.
            </p>
          </section>

          <div class="mt-8 grid gap-8">
            <DocSection id="install" num="01" title="Install Teelm">
              <p>
                Install the <code>teelm</code> CLI globally, then use it to scaffold,
                generate and run projects.
              </p>

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <CommandLine label="npm" command="npm install -g teelm" />
                <CommandLine label="bun" command="bun add -g teelm" />
              </div>

              <p>
                After install, the <code>teelm</code> command should be available in your terminal.
              </p>
            </DocSection>

            <DocSection id="create-project" num="02" title="Create a new project">
              <p>
                Use <code>teelm new</code> to scaffold a fresh app. Add <code>--jsx</code>
                when you want page files to use Teelm’s JSX runtime.
              </p>

              <CodeBlock
                code={`teelm new my-app --jsx
cd my-app`}
              />

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Without JSX"
                  body="Use h(...) manually in your views."
                  code="teelm new my-app"
                />
                <FlatNote
                  title="With JSX"
                  body="Use .tsx pages and JSX syntax."
                  code="teelm new my-app --jsx"
                />
              </div>
            </DocSection>

            <DocSection id="project-structure" num="03" title="What gets generated">
              <p>
                A new Teelm project gives you a Vite app, strict TypeScript config,
                shared router state, initial pages and a generated route table.
              </p>

              <div class="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0D0D0F]/90">
                {generatedFiles.map(([file, description]) => (
                  <div
                    key={file}
                    class="grid grid-cols-[220px_minmax(0,1fr)] gap-4 border-b border-white/10 px-4 py-4 last:border-b-0 max-md:grid-cols-1 max-md:gap-1"
                  >
                    <code class="font-mono text-sm text-[#CCFF00]">{file}</code>
                    <p class="text-sm leading-relaxed text-[#A7A29A]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>

              <p>
                <code>src/generated/router.ts</code> is generated. Do not edit it by hand.
                Edit page files under <code>src/pages</code>, then run <code>teelm gen</code>.
              </p>
            </DocSection>

            <DocSection id="run-dev" num="04" title="Run the dev server">
              <p>
                <code>teelm dev</code> regenerates routes first, then starts Vite.
              </p>

              <CodeBlock code={`teelm dev`} />

              <p>
                For production builds, use:
              </p>

              <CodeBlock code={`teelm build`} compact />
            </DocSection>

            <DocSection id="add-pages" num="05" title="Add more pages">
              <p>
                Use <code>teelm add</code> to create a page under <code>src/pages</code>.
                Then run <code>teelm gen</code> to refresh the generated router.
              </p>

              <CodeBlock
                code={`teelm add docs/Introduction --jsx
teelm gen`}
              />

              <div class="overflow-hidden  ">
                <div class="grid grid-cols-[260px_1fr_0.7fr] gap-4 border-b px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#CCFF00] max-lg:hidden">
                  <span>Command</span>
                  <span>File</span>
                  <span>Route</span>
                </div>

                {pageExamples.map(([command, file, route]) => (
                  <div
                    key={command}
                    class="grid grid-cols-[260px_1fr_0.7fr] gap-4 border-b border-white/10 px-4 py-4 last:border-b-0 max-lg:grid-cols-1 max-lg:gap-1"
                  >
                    <code class="font-mono text-sm text-[#CCFF00]">{command}</code>
                    <code class="font-mono text-sm text-[#F6F3EB]">{file}</code>
                    <code class="font-mono text-sm text-[#A7A29A]">{route}</code>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="first-page" num="06" title="Your first page">
              <div class="flex flex-col">
                <span>Each page exports a named <code>page</code> object. Its <code>init</code>
                  and <code>update</code> functions return tuple-shaped results.</span>
                <span>Use <code>noFx</code> when there are no effects.</span>
              </div>

              <CodeBlock
                file="src/pages/Home.tsx"
                code={`import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../shared";

type Model = { count: number };
type Msg = { tag: "Inc" } | { tag: "Dec" };

export const page: PageConfig<Model, Msg, Shared, {}> = {
  init: () => noFx({ count: 0 }),

  update: (model, msg) => {
    switch (msg.tag) {
      case "Inc":
        return noFx({ ...model, count: model.count + 1 });

      case "Dec":
        return noFx({ ...model, count: model.count - 1 });
    }
  },

  view: (model, _shared, dispatch) => (
    <main class="p-8">
      <button onClick={() => dispatch({ tag: "Dec" })}>−</button>
      <strong>{model.count}</strong>
      <button onClick={() => dispatch({ tag: "Inc" })}>+</button>
    </main>
  ),
};`}
              />
            </DocSection>

            <DocSection id="loop" num="07" title="The loop">
              <p>
                Teelm implements The Elm Architecture. The app has one direction:
                state renders view, view dispatches messages, update handles messages,
                and returns the next state plus commands.
              </p>

              <CodeBlock code={`State -> View -> Msg -> Update -> [State, Cmd<Msg>]`} />

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="State changes are visible"
                  body="Every interaction moves through a message and update function."
                />
                <FlatNote
                  title="Effects are described"
                  body="Update returns commands instead of secretly running side effects."
                />
                <FlatNote
                  title="Routes come from files"
                  body="Add page files, regenerate, and keep routing disposable."
                />
                <FlatNote
                  title="Data enters through decoders"
                  body="HTTP and storage validate data before it reaches the model."
                />
              </div>
            </DocSection>

            <div class="flex items-center justify-between gap-4 rounded-[2rem] border border-white/15 bg-[#0D0D0F]/95 p-6 shadow-2xl shadow-black/40 max-sm:flex-col max-sm:items-start">
              <div>
                <p class="text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00]">
                  Next
                </p>
                <h2 class="mt-2 text-3xl font-black tracking-[-0.055em]">
                  Continue to Architecture
                </h2>
              </div>

              <a
                href="/docs/architecture"
                class="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CCFF00] bg-[#CCFF00] px-5 text-sm font-black !text-black"
              >
                Architecture →
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

      <div class="grid gap-5 text-[#A7A29A]  [&_code]:bg-transparent [&_code]:px-0.5 [&_code]:font-mono [&_code]:text-[#F6F3EB] [&_p]:leading-relaxed">
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

function CommandLine(props: { label: string; command: string }) {
  return (
    <div class="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#070708] shadow-2xl shadow-black/30">
      <div class="border-b border-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00]">
        {props.label}
      </div>
      <div class="px-4 py-4 font-mono text-sm text-[#F6F3EB]">
        <span class="text-[#CCFF00]">$</span> {props.command}
      </div>
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
        <code class="mt-3 inline-block border-b border-[#CCFF00]/45 font-mono text-xs text-[#CCFF00]">
          {props.code}
        </code>
      ) : null}
    </div>
  );
}
