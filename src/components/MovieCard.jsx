import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link 
      to={`/movies/${movie._id}`}
      className="group relative block h-full"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.02))] p-8 backdrop-blur-[14px] transition-all duration-500 group-hover:border-amber-500/40 group-hover:shadow-[0_20px_50px_-20px_rgba(245,158,11,0.3)]">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-500">🎬</span>
          </div>
          <span className="font-lotr text-[10px] uppercase tracking-[0.25em] text-amber-500/60 group-hover:text-amber-400">
            Cinematic Archive
          </span>
        </div>

        <h2 className="font-lotr text-2xl font-bold leading-tight text-amber-100 transition-colors group-hover:text-white mb-4">
          {movie.name}
        </h2>

        <div className="mt-auto grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Runtime</p>
            <p className="text-sm text-slate-300 font-medium">{movie.runtimeInMinutes} Min</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Academy Wins</p>
            <p className="text-sm text-amber-400 font-bold">{movie.academyAwardWins} Oscars 🏆</p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-500 opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
          Explore Lore <span>→</span>
        </div>

        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/5 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
      </div>
    </Link>
  );
};

export default MovieCard;
