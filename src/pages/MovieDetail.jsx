import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSingleMovie } from '../services/api';
import useFetch from '../hooks/useFetch';
import PageFeedback from '../components/PageFeedback';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchMovie = useCallback(() => fetchSingleMovie(id), [id]);
  const { data, loading, error, refetch } = useFetch(fetchMovie, {
    cacheKey: `movie-${id}`,
  });

  const movie = data?.[0];

  // Tiny lookup table so each movie gets a clean trailer link without extra API work.
  const trailerLinks = {
    "The Fellowship of the Ring": "https://www.youtube.com/watch?v=_nZdmwHrcnw",
    "The Two Towers": "https://www.youtube.com/watch?v=nuTU5XcZTLA",
    "The Return of the King": "https://www.youtube.com/watch?v=zckJCxYxn1g",
    "The Unexpected Journey": "https://www.youtube.com/watch?v=9PSXjr1gbjc",
    "The Desolation of Smaug": "https://www.youtube.com/watch?v=fnaojlfdUbs",
    "The Battle of the Five Armies": "https://www.youtube.com/watch?v=iVAgTiBrrDA"
  };

  const finalTrailerUrl = movie 
    // If we ever miss one, a YouTube search is a nice safety net.
    ? (trailerLinks[movie.name] || `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.name + " official trailer")}`)
    : "#";

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-950 px-6">
      <PageFeedback
        type="loading"
        message="Loading the film dossier..."
        className="w-full max-w-2xl py-0"
      />
    </div>
  );

  if (error || !movie) return (
    <div className="flex h-screen items-center justify-center bg-slate-950 px-6">
      <PageFeedback
        type="error"
        title="The Archive Gate Is Sealed"
        message="This film record could not be opened from the API just now."
        actionLabel={error ? 'Retry Request' : 'Return To Archive'}
        onAction={error ? refetch : () => navigate(-1)}
        className="w-full max-w-2xl"
      />
    </div>
  );

  return (
    <div className="relative min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto mb-12">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 font-lotr text-xs tracking-[0.3em] text-amber-500/60 hover:text-amber-400 transition-all"
        >
          <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span>
          RETURN TO ARCHIVE
        </button>
      </div>

      <main className="max-w-5xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
          <section className="space-y-10">
            <header className="space-y-4">
              <div className="h-1 w-20 bg-amber-600 shadow-[0_0_15px_#d97706]" />
              <h1 className="font-lotr text-5xl leading-tight text-white [text-shadow:0_0_10px_rgba(251,191,36,0.18),0_0_24px_rgba(251,191,36,0.12)] md:text-7xl">
                {movie.name}
              </h1>
              <p className="text-amber-500/80 font-lotr tracking-[0.4em] uppercase text-xs">
                Cinematic Masterpiece
              </p>
            </header>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.02))] p-8 backdrop-blur-[14px]">
               <div className="absolute -right-20 -bottom-20 w-64 h-64 border-[20px] border-amber-500/5 rounded-full pointer-events-none" />
               <h3 className="font-lotr text-xl text-amber-100 mb-4 tracking-widest uppercase">Summary of the Age</h3>
               <p className="text-slate-300 leading-relaxed text-lg italic">
                  "Step back into an age where the shadow rises, the fellowship is tested, and the fate of Middle-earth turns on impossible choices."
               </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {/* Keeping the stats in an array makes this block feel less repetitive and easier to tweak later. */}
               {[
                 { label: 'Runtime', val: `${movie.runtimeInMinutes} min`, icon: '⏳' },
                 { label: 'Budget', val: `$${movie.budgetInMillions}M`, icon: '💰' },
                 { label: 'Wins', val: movie.academyAwardWins, icon: '🏆' },
                 { label: 'Nominations', val: movie.academyAwardNominations, icon: '📜' }
               ].map(item => (
                 <div key={item.label} className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center hover:bg-white/10 transition-colors">
                    <span className="block text-2xl mb-2">{item.icon}</span>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">{item.label}</p>
                    <p className="font-lotr text-amber-400">{item.val}</p>
                 </div>
               ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2.5rem] border border-amber-500/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(251,191,36,0.12),rgba(120,53,15,0.12))] p-8 shadow-2xl backdrop-blur-[14px]">
              <h4 className="font-lotr text-amber-500 text-sm tracking-[0.2em] mb-6 uppercase">Archive Details</h4>
              
              <ul className="space-y-6">
                <li className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Box Office</span>
                  <span className="font-mono text-amber-100">${movie.boxOfficeRevenueInMillions}M</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Rotten Score</span>
                  <span className="font-mono text-amber-100">92%</span>
                </li>
                <li className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Age of Origin</span>
                  <span className="font-mono text-amber-100">Third Age</span>
                </li>
              </ul>

              <div className="mt-10">
                <a 
                  href={finalTrailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-2xl bg-amber-600 text-black text-center font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-amber-400 transition-all hover:scale-[1.02] shadow-[0_10px_20px_-5px_rgba(217,119,6,0.4)]"
                >
                  Watch Official Trailer
                </a>
              </div>
            </div>

            <div className="p-6 rounded-[2rem] border border-white/5 bg-white/5 italic text-center">
              <p className="text-slate-500 text-xs">
                "Not all those who wander are lost, but all those who watch are changed."
              </p>
            </div>
          </aside>

        </div>
      </main>

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-amber-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default MovieDetail;
