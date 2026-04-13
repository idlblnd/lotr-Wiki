import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white font-body">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_30%_80%,rgba(250,204,21,0.05),transparent_25%)]" />
        <div className="absolute left-[10%] top-[12%] h-72 w-72 rounded-full bg-amber-200/10 blur-3xl" />
        <div className="absolute right-[8%] top-[22%] h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-[10%] left-[28%] h-72 w-72 rounded-full bg-yellow-100/5 blur-3xl" />
      </div>
      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative">
              <div className="mb-6 inline-flex items-center rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
                A Chronicle of Middle-earth
              </div>

              <h1 className="font-lotr text-5xl leading-tight text-amber-100 [text-shadow:0_0_10px_rgba(251,191,36,0.18),0_0_24px_rgba(251,191,36,0.12)] sm:text-6xl md:text-7xl lg:text-8xl">
                The Lord
                <span className="block text-amber-300">of the Rings</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Beyond the mountains, beneath the stars, and through the fading ages of the world,
                this archive gathers the stories, faces, and words that shaped Middle-earth.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
                Wander through the great journeys of the Fellowship, the rise of kings, the grief
                of elves, the courage of hobbits, and the whispers of shadow that followed the One
                Ring across the lands of legend.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/movies"
                  className="rounded-2xl border border-amber-300/30 bg-amber-300/15 px-6 py-3 font-display text-sm uppercase tracking-[0.16em] text-amber-100 shadow-glow transition hover:-translate-y-0.5 hover:bg-amber-300/25"
                >
                  Explore the films
                </Link>

                <Link
                  to="/characters"
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/10"
                >
                  Meet the characters
                </Link>

                <Link
                  to="/journey"
                  className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-6 py-3 text-sm uppercase tracking-[0.16em] text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-300/20"
                >
                  Forge a journey
                </Link>
              </div>

              <div className="mt-12 grid max-w-2xl gap-5 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
                  <div className="font-display text-xs uppercase tracking-[0.18em] text-amber-300">
                    Fellowship
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    The journey from the Shire to Mordor, bound by loyalty, loss, and fate.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
                  <div className="font-display text-xs uppercase tracking-[0.18em] text-amber-300">
                    Kingdoms
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Realms of men, elves, dwarves, and ancient strongholds marked by war and hope.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
                  <div className="font-display text-xs uppercase tracking-[0.18em] text-amber-300">
                    Legends
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Words, prophecies, and unforgettable figures carried through the ages.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[580px] w-full">
              {/* I kept the stacked-card stage because it gives the landing page a stronger collector feel. */}
              <Link
                to="/movies"
                className="group absolute left-2 top-4 w-[250px] sm:w-[290px]"
              >
                <article className="relative z-10 rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.02))] p-6 shadow-panel backdrop-blur-[14px] transition duration-300 hover:z-50 hover:scale-105 hover:-translate-y-2 hover:rotate-0 hover:border-amber-300/40 md:rotate-[-7deg]">
                  <div className="absolute inset-0 rounded-[2rem] bg-black/40 opacity-0 transition group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-3xl">🎬</span>
                      <span className="font-display text-xs uppercase tracking-[0.22em] text-amber-200">
                        The Journey
                      </span>
                    </div>

                    <h2 className="font-lotr text-3xl text-amber-100">Films</h2>

                    <p className="mt-3 leading-7 text-slate-300">
                      Follow the path of the Ring through the great battles, fragile friendships, and vast landscapes.
                    </p>

                    <span className="mt-6 inline-block text-sm uppercase tracking-[0.16em] text-amber-300 transition group-hover:translate-x-1">
                      Enter the story →
                    </span>
                  </div>
                </article>
              </Link>

              <Link
                to="/characters"
                className="group absolute right-0 top-32 w-[260px] sm:w-[305px]"
              >
                <article className="relative z-20 scale-105 rounded-[2rem] border border-violet-300/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(167,139,250,0.1),rgba(255,255,255,0.02))] p-6 shadow-panel backdrop-blur-[14px] transition duration-300 hover:z-50 hover:scale-110 hover:-translate-y-2 hover:rotate-0 hover:border-violet-300/40 md:rotate-[8deg]">
                  <div className="absolute inset-0 rounded-[2rem] bg-black/40 opacity-0 transition group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-3xl">🧙</span>
                      <span className="font-display text-xs uppercase tracking-[0.22em] text-violet-200">
                        The People
                      </span>
                    </div>

                    <h2 className="font-lotr text-3xl text-violet-100">Characters</h2>

                    <p className="mt-3 leading-7 text-slate-300">
                      From Aragorn and Arwen to Gandalf, Frodo, and Gollum, discover the figures who shaped Middle-earth.
                    </p>

                    <span className="mt-6 inline-block text-sm uppercase tracking-[0.16em] text-violet-300 transition group-hover:translate-x-1">
                      Walk among legends →
                    </span>
                  </div>
                </article>
              </Link>

              <Link
                to="/quotes"
                className="group absolute bottom-10 left-10 w-[255px] sm:w-[295px]"
              >
                <article className="relative z-10 rounded-[2rem] border border-sky-300/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(56,189,248,0.09),rgba(255,255,255,0.02))] p-6 shadow-panel backdrop-blur-[14px] transition duration-300 hover:z-50 hover:scale-105 hover:-translate-y-2 hover:rotate-0 hover:border-sky-300/40 md:rotate-[-4deg]">
                  <div className="absolute inset-0 rounded-[2rem] bg-black/40 opacity-0 transition group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-3xl">📜</span>
                      <span className="font-display text-xs uppercase tracking-[0.22em] text-sky-200">
                        The Words
                      </span>
                    </div>

                    <h2 className="font-lotr text-3xl text-sky-100">Quotes</h2>

                    <p className="mt-3 leading-7 text-slate-300">
                      Return to the lines of courage, grief, wisdom, and defiance that echo across Middle-earth.
                    </p>

                    <span className="mt-6 inline-block text-sm uppercase tracking-[0.16em] text-sky-300 transition group-hover:translate-x-1">
                      Read the echoes →
                    </span>
                  </div>
                </article>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-panel backdrop-blur-xl md:p-10">
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.22em] text-amber-300">
                  The Shire to Mordor
                </p>
                <h3 className="mt-3 font-lotr text-2xl text-amber-100">
                  A road that changed the age
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  What begins in quiet fields becomes a burden carried through forests, ruins,
                  kingdoms, and fire.
                </p>
              </div>

              <div>
                <p className="font-display text-xs uppercase tracking-[0.22em] text-amber-300">
                  Hope in dark places
                </p>
                <h3 className="mt-3 font-lotr text-2xl text-amber-100">
                  Courage beyond power
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  This world remembers not only warriors and crowns, but small acts of mercy,
                  friendship, and endurance.
                </p>
              </div>

              <div>
                <p className="font-display text-xs uppercase tracking-[0.22em] text-amber-300">
                  Memory of the West
                </p>
                <h3 className="mt-3 font-lotr text-2xl text-amber-100">
                  An archive of legend
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Built to feel less like a modern content grid and more like a preserved chamber of
                  stories from an elder time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
