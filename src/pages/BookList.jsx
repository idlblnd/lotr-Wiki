import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchBooks } from '../services/api';
import PageFeedback from '../components/PageFeedback';

const shelfThemes = [
  {
    accent: 'text-amber-300',
    dot: 'bg-amber-300',
    border: 'border-amber-400/25',
    glow: 'from-amber-500/18 via-transparent to-transparent',
    badge: 'Red Book Copy',
    offset: 'md:-translate-y-4',
  },
  {
    accent: 'text-sky-300',
    dot: 'bg-sky-300',
    border: 'border-sky-400/25',
    glow: 'from-sky-500/18 via-transparent to-transparent',
    badge: 'Rivendell Shelf',
    offset: 'md:translate-y-5',
  },
  {
    accent: 'text-emerald-300',
    dot: 'bg-emerald-300',
    border: 'border-emerald-400/25',
    glow: 'from-emerald-500/18 via-transparent to-transparent',
    badge: 'Westmarch Copy',
    offset: 'md:-translate-y-1',
  },
];

const BookList = () => {
  const { data, loading, error, refetch } = useFetch(fetchBooks, { cacheKey: 'books' });
  const books = Array.isArray(data) ? data : data?.docs || [];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-24 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(56,189,248,0.08),transparent_24%),radial-gradient(circle_at_15%_80%,rgba(16,185,129,0.07),transparent_20%)]" />
        <div className="absolute left-[8%] top-24 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute right-[10%] top-56 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-52 w-52 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <header className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="mb-5 inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200">
              Third Age Library
            </span>
            <h1 className="font-lotr max-w-4xl text-5xl uppercase leading-none text-white sm:text-6xl md:text-7xl">
              The
              <span className="block text-amber-300">Collected Volumes</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              This page now reads more like a curated shelf than a flat list, so each volume
              gets its own presence and a slightly more collectible feel on hover.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Curator Notes</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Volumes</p>
                <p className="mt-3 font-mono text-3xl text-amber-300">
                  {String(books.length).padStart(2, '0')}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Shelf Mood</p>
                <p className="mt-3 text-sm uppercase tracking-[0.22em] text-sky-300">
                  Story Deck
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              It keeps some of the card-game energy while still feeling like a wiki archive
              instead of a separate mini-game screen.
            </p>
          </div>
        </header>

        {loading ? (
          <PageFeedback
            type="loading"
            message="Opening the library shelves..."
            className="py-40"
          />
        ) : error ? (
          <PageFeedback
            type="error"
            title="The Archives Are Sealed"
            message="The books could not be loaded from the API just now. Try opening the shelf again."
            actionLabel="Try Again"
            onAction={refetch}
            className="mt-16"
          />
        ) : books.length > 0 ? (
          <section className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {books.map((book, index) => {
              const theme = shelfThemes[index % shelfThemes.length];

              return (
                <Link
                  key={book._id}
                  to={`/books/${book._id}`}
                  className={`group relative block ${theme.offset} transition-transform duration-500 md:hover:-translate-y-3`}
                >
                  {/* The staggered stack helps this page read more like a bookshelf than a product catalog. */}
                  <article
                    className={`relative h-full overflow-hidden rounded-[2rem] border ${theme.border} bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl transition duration-500 group-hover:border-white/20 group-hover:bg-white/[0.06]`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${theme.glow} opacity-80`} />
                    <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0" />

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${theme.accent}`}>
                            {theme.badge}
                          </p>
                          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                            Volume {String(index + 1).padStart(2, '0')}
                          </p>
                        </div>
                        <span className="font-mono text-4xl text-white/10 transition duration-500 group-hover:text-white/20">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="mt-14 flex-1">
                        {/* I kept this title area quiet so the book name still does the heavy lifting. */}
                        <h2 className="font-lotr text-3xl uppercase leading-tight text-white transition duration-500 group-hover:translate-x-2 group-hover:text-amber-100 md:text-4xl">
                          {book.name}
                        </h2>
                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                          Open this volume to move from the archive shelf into the chapters,
                          structure, and details tied to the book.
                        </p>
                      </div>

                      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                        <div className="flex items-center gap-3">
                          <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
                          <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                            Curated entry
                          </span>
                        </div>
                        <span className={`text-sm uppercase tracking-[0.2em] ${theme.accent} transition duration-500 group-hover:translate-x-1`}>
                          Open volume
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </section>
        ) : (
          <PageFeedback
            type="empty"
            title="The Library Shelves Are Empty"
            message="The API returned no books for this section of the archive."
            className="mt-20"
          />
        )}

        <footer className="mt-24 border-t border-white/10 pt-8 text-center">
          <p className="font-lotr text-[10px] uppercase tracking-[0.6em] text-amber-700/80">
            Minas Tirith Archive Wing
          </p>
        </footer>
      </div>
    </div>
  );
};

export default BookList;
