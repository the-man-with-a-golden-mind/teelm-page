import { noFx } from "teelm";
import type { PageConfig } from "teelm/router";
import type { Shared } from "../../shared";

type Model = {};
type Msg = never;

const docsSections = [
  {
    title: "Introduction",
    href: "/docs/introduction",
    description: "What teelm is, why it exists, and the shape of a basic app.",
    tag: "Start here",
  },
  {
    title: "Architecture",
    href: "/docs/architecture",
    description: "State, View, Msg, Update, Cmd and Sub explained as one loop.",
    tag: "Core",
  },
  {
    title: "Effects",
    href: "/docs/effects",
    description: "HTTP, delay, storage and Task as explicit typed work.",
    tag: "IO",
  },
  {
    title: "Routing",
    href: "/docs/routing",
    description: "File-based pages, typed params, guards and generated routes.",
    tag: "Pages",
  },
  {
    title: "Testing",
    href: "/docs/testing",
    description: "Test update functions, inspect commands and run effects.",
    tag: "Quality",
  },
  {
    title: "Debugging",
    href: "/docs/debugging",
    description: "Deep-frozen state, history and time-travel debugging.",
    tag: "Tools",
  },
  {
    title: "Reference",
    href: "/docs/reference",
    description: "Package exports, core types, invariants and API surface.",
    tag: "API",
  },
  {
    title: "Examples",
    href: "/docs/examples",
    description: "Copy-paste patterns for counters, forms, routing and effects.",
    tag: "Code",
  },
] as const;

export const page: PageConfig<Model, Msg, Shared, {}> = {
  init: () => noFx({}),

  update: (model) => noFx(model),

  view: () => (
    <div class="min-h-screen overflow-hidden bg-[#050505] text-[#F6F3EB] selection:bg-[#CCFF00] selection:text-black">
      <div class="pointer-events-none fixed inset-0 opacity-70">

      </div>

      <header class="sticky top-4 z-30 mx-auto mt-4 flex w-[min(1180px,calc(100%-24px))] items-center justify-between gap-4 rounded-full border border-white/15 bg-black/75 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl max-sm:w-[min(100%-20px,1180px)] max-sm:rounded-[1.75rem]">
        <a
          href="/"
          aria-label="Teelm home"
          class="flex items-center gap-3 rounded-full py-1 pl-1 pr-3 font-black tracking-[-0.04em]"
        >
          <img src="public/logo_vector.svg" class="h-12" alt="Teelm logo" />
          <span class="text-2xl max-sm:hidden">teelm</span>
        </a>



        <a
          class="rounded-full border border-white/15 px-3 py-3 text-sm font-black bg-[#F6F3EB] max-sm:px-3 max-sm:py-2 max-sm:text-xs"
          href="https://github.com/the-man-with-a-golden-mind/teelm"
        >
          <img src="public/github-logo.png" class="w-6 bg-white h-6"> </img>
        </a>
      </header>

      <main class="relative z-10 mx-auto w-[min(1180px,calc(100%-24px))] py-16 max-sm:w-[min(100%-20px,1180px)] max-sm:py-10">
        <section class="grid gap-6">
          <div class="rounded-[2.5rem] border border-white/15 bg-[#0D0D0F]/95 p-[clamp(24px,5vw,56px)] shadow-2xl shadow-black/50 max-sm:rounded-[2rem]">
            <p class="mb-5 w-fit rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00] max-sm:text-[10px]">
              Documentation
            </p>

            <h1 class="max-w-4xl text-[clamp(3rem,9vw,6.5rem)] font-black leading-[0.9] tracking-[-0.085em]">
              Build predictable apps with teelm.
            </h1>

            <p class="mt-6 max-w-3xl text-xl leading-relaxed text-[#A7A29A] max-sm:text-base">
              Learn the strict TypeScript framework built around one honest loop:
              update state, describe effects, render again.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <a
                href="/docs/introduction"
                class="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CCFF00] bg-[#CCFF00] px-5 text-sm font-black text-black!"
              >
                Start reading
              </a>
              <a
                href="/docs/examples"
                class="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-black text-[#F6F3EB] hover:bg-white/10"
              >
                See examples
              </a>
            </div>
          </div>

          <aside class="rounded-[2.5rem] border border-white/15 bg-[#0D0D0F]/80 p-5 shadow-2xl shadow-black/40 max-sm:rounded-[2rem]">
            <div class="mb-5 flex items-end justify-between gap-4 max-sm:items-start">
              <div>
                <p class="text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00]">
                  Core rules
                </p>
                <h2 class="mt-2 text-3xl font-black tracking-[-0.055em] max-sm:text-2xl">
                  No hidden paths.
                </h2>
              </div>

              <span class="grid h-11 w-11 flex-none place-items-center rounded-full bg-[#CCFF00] text-lg font-black text-black">
                5
              </span>
            </div>

            <div class="grid grid-cols-5 gap-3 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
              <RuleCard
                index="01"
                title="Updates return a pair"
                body="Every transition returns the next state and the command to run."
                code="[State, Cmd]"
              />

              <RuleCard
                index="02"
                title="No effects? Say it."
                body="Use noFx(state) so effect-free updates stay explicit."
                code="noFx(model)"
              />

              <RuleCard
                index="03"
                title="Commands are real types"
                body="Cmd and Sub are branded, so raw tuples cannot sneak in."
                code="Cmd / Sub"
              />

              <RuleCard
                index="04"
                title="Mutation fails loudly"
                body="State is deep-frozen by default, pushing you toward safe updates."
                code="{ ...state }"
              />

              <RuleCard
                index="05"
                title="IO crosses a decoder"
                body="HTTP and storage validate data before it reaches update."
                code="Decode"
              />
            </div>
          </aside>
        </section>

        <section class="mt-6 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {docsSections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              class="group min-h-56 rounded-[2rem] border border-white/15 bg-[#0D0D0F]/90 p-5 shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:border-[#CCFF00]/60 max-sm:min-h-0 max-sm:rounded-[1.5rem]"
            >
              <div class="mb-10 flex items-center justify-between gap-3 max-sm:mb-6">
                <span class="rounded-full border border-[#CCFF00]/35 bg-[#CCFF00]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#CCFF00]">
                  {section.tag}
                </span>
                <span class="text-xl font-black text-[#CCFF00] transition group-hover:translate-x-1">
                  →
                </span>
              </div>

              <h2 class="mb-3 text-2xl font-black leading-none tracking-[-0.055em]">
                {section.title}
              </h2>

              <p class="text-sm leading-relaxed text-[#A7A29A]">
                {section.description}
              </p>
            </a>
          ))}
        </section>

        <section class="mt-6 rounded-[2.5rem] border border-white/15 bg-[#0D0D0F]/95 p-7 shadow-2xl shadow-black/40 max-sm:rounded-[2rem] max-sm:p-5">
          <div class="grid grid-cols-[minmax(0,0.8fr)_minmax(280px,0.6fr)] gap-6 max-lg:grid-cols-1">
            <div>
              <p class="mb-4 text-xs font-black uppercase tracking-[0.14em] text-[#CCFF00]">
                Quick start
              </p>
              <h2 class="text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[0.9] tracking-[-0.075em]">
                Create pages. Generate routes. Keep moving.
              </h2>
              <p class="mt-5 max-w-2xl text-lg leading-relaxed text-[#A7A29A] max-sm:text-base">
                teelm’s CLI keeps routing disposable: edit page files, run generation,
                and let the framework wire the route table.
              </p>
            </div>

            <div class="overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#070708] font-mono text-sm shadow-2xl shadow-black/50">
              <p class="border-b border-white/10 px-5 py-4">
                <span class="text-[#CCFF00]">$</span> teelm new my-app --jsx
              </p>
              <p class="border-b border-white/10 px-5 py-4">
                <span class="text-[#CCFF00]">$</span> teelm add docs/Index --jsx
              </p>
              <p class="border-b border-white/10 px-5 py-4">
                <span class="text-[#CCFF00]">$</span> teelm gen
              </p>
              <p class="px-5 py-4">
                <span class="text-[#CCFF00]">$</span> teelm dev
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer class="relative z-10 mx-auto flex w-[min(1180px,calc(100%-24px))] items-center justify-between gap-4 border-t border-white/15 py-10 text-sm text-[#A7A29A] max-sm:w-[min(100%-20px,1180px)] max-sm:flex-col max-sm:items-start max-sm:py-8">
        <p>teelm docs - one loop, typed all the way down.</p>
        <a class="font-black text-[#CCFF00]" href="/">
          Back home
        </a>
      </footer>
    </div>
  ),
};

function RuleCard(props: {
  index: string;
  title: string;
  body: string;
  code: string;
}) {
  return (
    <div class="flex min-h-52 flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#CCFF00]/45 hover:bg-[#CCFF00]/[0.06] max-sm:min-h-0">
      <div class="mb-4 flex items-center justify-between gap-3">
        <span class="grid h-7 w-7 flex-none place-items-center rounded-full bg-[#CCFF00] text-[10px] font-black text-black">
          {props.index}
        </span>

        <span class="max-w-[120px] truncate rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-[#CCFF00]">
          {props.code}
        </span>
      </div>

      <h3 class="mb-2 text-base font-black leading-tight tracking-[-0.035em] text-[#F6F3EB]">
        {props.title}
      </h3>

      <p class="text-sm leading-relaxed text-[#A7A29A]">
        {props.body}
      </p>
    </div>
  );
}
