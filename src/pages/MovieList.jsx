import { useCallback, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import PageFeedback from '../components/PageFeedback';

const MovieList = () => {
  const [query, setQuery] = useState("");
  const [seriesFilter, setSeriesFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Oldest");

  const fetchMoviesList = useCallback(() => fetchMovies("limit=100"), []);
  const { data: movies, loading, error, refetch } = useFetch(fetchMoviesList, {
    cacheKey: 'movies-list',
  });

  const getYear = (movieName) => {
    const years = {
      "The Fellowship of the Ring": 2001,
      "The Two Towers": 2002,
      "The Return of the King": 2003,
      "An Unexpected Journey": 2012,
      "The Desolation of Smaug": 2013,
      "The Battle of the Five Armies": 2014,
      "The Lord of the Rings Series": 1978,
    };
    return years[movieName] || 2000;
  };

  const filteredAndSortedMovies = movies
    ?.filter((movie) => {
      if (query && !movie.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (seriesFilter === "All") return true;
      if (seriesFilter === "LOTR") return movie.name.includes("Lord of the Rings") || movie.name.includes("Ring");
      if (seriesFilter === "Hobbit") return movie.name.includes("Hobbit");
      return true;
    })
    .sort((a, b) => {
      const yearA = getYear(a.name);
      const yearB = getYear(b.name);
      
      return sortOrder === "Newest" ? yearB - yearA : yearA - yearB;
    });

  return (
    <div className="relative min-h-screen py-20 px-6 max-w-7xl mx-auto z-10">
      <div className="text-center mb-12">
        <h1 className="font-lotr mb-6 text-5xl tracking-widest text-amber-100 [text-shadow:0_0_10px_rgba(251,191,36,0.18),0_0_24px_rgba(251,191,36,0.12)] md:text-7xl">
          Cinematic <span className="text-amber-400">Timeline</span>
        </h1>
      </div>

      <div className="mb-16 -mt-2 rounded-[2rem] border border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.02))] p-5 backdrop-blur-[14px]">
        {/* I kept this close to the earlier layout and only gave the controls a little more room. */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_auto_auto] lg:items-end">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Search the archive
            </label>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search movie titles..."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-3.5 text-base text-slate-100 outline-none transition focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>

          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Series
            </span>
            <div className="flex rounded-2xl border border-white/5 bg-black/20 p-1.5">
              {["All", "LOTR", "Hobbit"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSeriesFilter(tab)}
                  className={`rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                    seriesFilter === tab 
                    ? "bg-amber-600 text-black font-bold" 
                    : "text-slate-500 hover:text-amber-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Release year
            </label>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="min-w-[220px] cursor-pointer rounded-2xl border border-amber-500/20 bg-slate-900 px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300 outline-none transition hover:border-amber-500/50"
            >
              <option value="Oldest">Oldest First</option>
              <option value="Newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <PageFeedback
          type="loading"
          message="Loading the cinematic archive..."
        />
      )}

      {!loading && error && (
        <PageFeedback
          type="error"
          title="Failed To Load Films"
          message="The archive could not retrieve the current film records from the API."
          actionLabel="Retry Request"
          onAction={refetch}
        />
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedMovies?.map((movie) => (
            <div key={movie._id} className="group relative transform transition-all duration-500 hover:-translate-y-2">
              <div className="absolute -top-3 -right-3 z-20 bg-amber-600 text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                {getYear(movie.name)}
              </div>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredAndSortedMovies?.length === 0 && (
        <PageFeedback
          type="empty"
          title="No Films Matched This Search"
          message="Try a broader title search or switch the series filter back to All."
        />
      )}
    </div>
  );
};

export default MovieList;
