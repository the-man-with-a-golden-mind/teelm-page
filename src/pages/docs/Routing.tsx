import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../../shared";

type Model = {};
type Msg = never;

const sections = [
  { label: "Overview", href: "#overview" },
  { label: "File routes", href: "#file-routes" },
  { label: "Add pages", href: "#add-pages" },
  { label: "Typed params", href: "#typed-params" },
  { label: "Query params", href: "#query-params" },
  { label: "Links", href: "#links" },
  { label: "Guards", href: "#guards" },
  { label: "Route data", href: "#route-data" },
  { label: "Generated router", href: "#generated-router" },
] as const;

const fileRoutes = [
  ["src/pages/Home.tsx", "/"],
  ["src/pages/About.tsx", "/about"],
  ["src/pages/UserProfile.tsx", "/user-profile"],
  ["src/pages/Blog/Index.tsx", "/blog"],
  ["src/pages/users/Index.tsx", "/users"],
  ["src/pages/users/[id].tsx", "/users/:id"],
  ["src/pages/users/[id:int].tsx", "/users/:id as number"],
  ["src/pages/users/[id:float].tsx", "/users/:id as number"],
  ["src/pages/users/[id]/Edit.tsx", "/users/:id/edit"],
  ["src/pages/[slug].tsx", "/:slug"],
  ["src/pages/NotFound.tsx", "404"],
] as const;

const addExamples = [
  ["bunx teelm add About --jsx", "src/pages/About.tsx", "/about"],
  ["bunx teelm add users/[id] --jsx", "src/pages/users/[id].tsx", "/users/:id"],
  ["bunx teelm add users/[id:int] --jsx", "src/pages/users/[id:int].tsx", "/users/:id as number"],
  ["bunx teelm add users/[id:float] --jsx", "src/pages/users/[id:float].tsx", "/users/:id as number"],
  ["bunx teelm add users/[id]/Edit --jsx", "src/pages/users/[id]/Edit.tsx", "/users/:id/edit"],
  ["bunx teelm add Blog/Index --jsx", "src/pages/Blog/Index.tsx", "/blog"],
] as const;

const routingParts = [
  ["Page file", "A file under src/pages that exports a named page object."],
  ["Route", "The URL pattern generated from the page file name."],
  ["Params", "Typed values parsed from dynamic URL segments."],
  ["Shared", "App-wide state passed into every page."],
  ["Route data", "Page-owned loaders, actions and cache invalidation hooks."],
  ["Generated router", "Route table produced by teelm gen. Do not edit by hand."],
  ["routerLink", "Anchor helper for SPA navigation."],
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
            href="/docs/routing"
          >
            Routing
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
              Pages define routes and own their data.
            </h1>

            <p class="mt-6 max-w-3xl text-xl leading-relaxed text-[#A7A29A] max-sm:text-base">
              Teelm generates a typed router from page files. Keep URLs, params, loaders
              and actions close to the page that owns them.
            </p>
          </section>

          <div class="mt-8 grid gap-8">
            <DocSection id="overview" num="01" title="Overview">
              <p>
                Routing in Teelm is page-first. Each page exports a named <code>page</code>
                object. The generator scans <code>src/pages</code> and writes the route table
                into <code>src/generated/router.ts</code>.
              </p>

              <CodeBlock code={`src/pages/* -> teelm gen -> src/generated/router.ts`} />

              <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                {routingParts.map(([title, body]) => (
                  <FlatNote title={title} body={body} />
                ))}
              </div>
            </DocSection>

            <DocSection id="file-routes" num="02" title="File routes">
              <p>
                File names map to routes. Special files like <code>Home.tsx</code>,
                <code>Index.tsx</code> and <code>NotFound.tsx</code> have dedicated behavior.
              </p>

              <div class="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0D0D0F]/90">
                <div class="grid grid-cols-[minmax(0,1fr)_220px] gap-4 border-b border-white/10 bg-[#CCFF00]/10 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#CCFF00] max-md:hidden">
                  <span>File</span>
                  <span>Route</span>
                </div>

                {fileRoutes.map(([file, route]) => (
                  <div
                    key={file}
                    class="grid grid-cols-[minmax(0,1fr)_220px] gap-4 border-b border-white/10 px-4 py-4 last:border-b-0 max-md:grid-cols-1 max-md:gap-1"
                  >
                    <code class="font-mono text-sm text-[#CCFF00]">{file}</code>
                    <code class="font-mono text-sm text-[#A7A29A]">{route}</code>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="add-pages" num="03" title="Add pages">
              <p>
                Use <code>teelm add</code> to create a page file. The CLI writes the file
                and regenerates the router for you.
              </p>

              <CodeBlock
                code={`bunx teelm add users/[id:int] --jsx`}
              />

              <div class="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0D0D0F]/90">
                <div class="grid grid-cols-[260px_1fr_0.7fr] gap-4 border-b border-white/10 bg-[#CCFF00]/10 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#CCFF00] max-lg:hidden">
                  <span>Command</span>
                  <span>File</span>
                  <span>Route</span>
                </div>

                {addExamples.map(([command, file, route]) => (
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

            <DocSection id="typed-params" num="04" title="Typed params">
              <p>
                Dynamic segments become page params. Use suffixes like <code>:int</code>
                and <code>:float</code> to parse numeric params.
              </p>

              <CodeBlock
                file="src/pages/users/[id:int].tsx"
                code={`import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../../shared";

type Model = {
  id: number;
};

type Msg = never;

type Params = {
  id: number;
};

export const page: PageConfig<Model, Msg, Shared, Params> = {
  init: (params) => noFx({ id: params.id }),

  update: (model) => noFx(model),

  view: (model) => (
    <main>
      <h1>User #{model.id}</h1>
    </main>
  ),
};`}
              />

              <div class="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="String param"
                  body="Use [id] when the value should stay a string."
                  code="users/[id]"
                />
                <FlatNote
                  title="Integer param"
                  body="Use [id:int] when the route should parse an integer."
                  code="users/[id:int]"
                />
                <FlatNote
                  title="Float param"
                  body="Use [id:float] when the route should parse a finite number."
                  code="users/[id:float]"
                />
              </div>
            </DocSection>

            <DocSection id="query-params" num="05" title="Query params">
              <p>
                For manual route definitions, Teelm supports typed query parsers through
                <code>q</code>. This is useful when building custom router definitions.
              </p>

              <CodeBlock
                code={`import { q, route } from "teelm/router";

const searchRoute = route("/search", {
  q: q.str(""),
  page: q.int(1),
});`}
              />

              <p>
                Query parsers support strings, integers, floats, booleans and optional values.
              </p>

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Fallback values"
                  body="Parsers like q.str and q.int return a fallback when the query is missing."
                  code='q.str("")'
                />
                <FlatNote
                  title="Optional values"
                  body="Optional parsers return undefined when the query is missing."
                  code="q.optional.int()"
                />
              </div>
            </DocSection>

            <DocSection id="links" num="06" title="Links">
              <p>
                Use normal anchors for simple navigation. For SPA navigation, spread
                <code>routerLink</code> onto an <code>a</code> element.
              </p>

              <CodeBlock
                code={`import { routerLink } from "teelm/router";

function Nav() {
  return (
    <nav>
      <a {...routerLink("/docs")}>Docs</a>
      <a {...routerLink("/docs/examples")}>Examples</a>
    </nav>
  );
}`}
              />

              <p>
                <code>routerLink</code> respects modifier keys, so users can still open links
                in new tabs with Cmd/Ctrl-click.
              </p>
            </DocSection>

            <DocSection id="guards" num="07" title="Guards">
              <p>
                Guards allow or redirect. Return <code>true</code> to allow navigation,
                or return a redirect URL string.
              </p>

              <CodeBlock
                code={`import { page, route } from "teelm/router";
import { adminPage } from "./pages/Admin";

page(route("/admin"), adminPage, {
  guard: (_params, shared) =>
    shared.user?.isAdmin === true ? true : "/login",
});`}
              />

              <p>
                Do not return a plain boolean. Guards return <code>true</code> or a redirect
                URL string.
              </p>

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Correct"
                  body="Allow or redirect explicitly."
                  code='isAdmin ? true : "/login"'
                />
                <FlatNote
                  title="Wrong"
                  body="A boolean is not enough because false has no redirect target."
                  code="return isAdmin"
                />
              </div>
            </DocSection>

            <DocSection id="route-data" num="08" title="Route data">
              <p>
                In Teelm 0.2.0, a page can own its read and write flow directly.
                Use <code>loader</code> for route-scoped reads, <code>action</code> for
                route-scoped writes, and let the router handle refresh and cache invalidation.
              </p>

              <CodeBlock
                code={`export const page: PageConfig<Model, Msg, Shared, Params> = {
  init: (params) => noFx({
    projectId: params.id,
    project: null,
    saving: false,
  }),

  loader: async (params, shared) => {
    const response = await fetch(\`/api/projects/\\${params.id}?org=\\${shared.orgId}\`);
    return await response.json();
  },

  load: (model, data) => noFx({
    ...model,
    project: data,
  }),

  action: async (input, model, params) => {
    await fetch(\`/api/projects/\\${params.id}\`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });

    return noFx({
      ...model,
      saving: false,
    });
  },
};`}
              />

              <p>
                Trigger writes through the active router, then refresh or invalidate what changed.
              </p>

              <CodeBlock
                code={`router.submit({ name: model.name });
router.revalidate();
router.invalidate("projects");`}
                compact
              />

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="loader"
                  body="Fetch route-owned data after init or load without pushing that orchestration into view code."
                  code="loader(params, shared)"
                />
                <FlatNote
                  title="action"
                  body="Handle route-owned mutations through the page protocol instead of ad hoc effect plumbing."
                  code="action(input, model, params, shared)"
                />
                <FlatNote
                  title="revalidate"
                  body="Ask the active page to rerun its loader after a write or shared-state change."
                  code="router.revalidate()"
                />
                <FlatNote
                  title="invalidate"
                  body="Drop cached pages by tag when a mutation makes older route state stale."
                  code='router.invalidate("projects")'
                />
              </div>
            </DocSection>

            <DocSection id="generated-router" num="09" title="Generated router">
              <p>
                <code>teelm gen</code> scans <code>src/pages</code> and regenerates
                <code>src/generated/router.ts</code>. Do not edit that file manually.
              </p>

              <CodeBlock code={`bunx teelm gen`} />

              <p>
                Generated routing sorts static routes before dynamic routes, then prefers
                more segments before alphabetical tiebreaks.
              </p>

              <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <FlatNote
                  title="Edit pages"
                  body="Change files under src/pages."
                  code="src/pages"
                />
                <FlatNote
                  title="Regenerate routes"
                  body="Let the generator rewrite the route table."
                  code="teelm gen"
                />
              </div>
            </DocSection>

            <div class="flex items-center justify-between gap-4 rounded-[2rem] border border-white/15 bg-[#0D0D0F]/95 p-6 shadow-2xl shadow-black/40 max-sm:flex-col max-sm:items-start">
              <div>
                <p class="text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00]">
                  Next
                </p>
                <h2 class="mt-2 text-3xl font-black tracking-[-0.055em]">
                  Continue to Testing
                </h2>
              </div>

              <a
                href="/docs/testing"
                class="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CCFF00] bg-[#CCFF00] px-5 text-sm font-black !text-black"
              >
                Testing →
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
