const CharacterCard = ({ character }) => {
  const getRaceDetails = (race) => {
    const r = race?.toLowerCase() || "";
    
    if (r.includes("elf")) return { icon: "🧝", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "group-hover:border-emerald-500/40" };
    if (r.includes("human") || r.includes("men")) return { icon: "⚔️", color: "text-blue-400", bg: "bg-blue-500/10", border: "group-hover:border-blue-500/40" };
    if (r.includes("dwarf")) return { icon: "⛏️", color: "text-orange-400", bg: "bg-orange-500/10", border: "group-hover:border-orange-500/40" };
    if (r.includes("hobbit")) return { icon: "👣", color: "text-amber-400", bg: "bg-amber-500/10", border: "group-hover:border-amber-500/40" };
    if (r.includes("maiar") || r.includes("wizard")) return { icon: "🧙", color: "text-purple-400", bg: "bg-purple-500/10", border: "group-hover:border-purple-500/40" };
    if (r.includes("orc") || r.includes("goblin")) return { icon: "👺", color: "text-red-500", bg: "bg-red-500/10", border: "group-hover:border-red-500/40" };
    if (r.includes("ent")) return { icon: "🌳", color: "text-green-600", bg: "bg-green-500/10", border: "group-hover:border-green-500/40" };
    if (r.includes("dragon")) return { icon: "🐉", color: "text-red-400", bg: "bg-red-500/10", border: "group-hover:border-red-500/40" };
    if (r.includes("nazgul")) return { icon: "💀", color: "text-slate-500", bg: "bg-slate-900/40", border: "group-hover:border-white/20" };
    
    return { icon: "👤", color: "text-amber-500", bg: "bg-amber-500/10", border: "group-hover:border-amber-500/40" };
  };

  const raceStyle = getRaceDetails(character.race);

  return (
    <div className="group relative h-full">
      <div className={`relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.02))] p-8 backdrop-blur-[14px] transition-all duration-500 ${raceStyle.border} group-hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]`}>
        <div className="mb-8 flex items-center justify-between">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 shadow-inner transition-all duration-500 group-hover:scale-110 ${raceStyle.bg}`}>
            <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              {raceStyle.icon}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className={`font-lotr text-[9px] uppercase tracking-[0.3em] font-bold ${raceStyle.color} opacity-80`}>
              Origin
            </span>
            <span className="text-[11px] font-bold text-white/90 tracking-widest uppercase text-right">
              {character.race || "Unknown"}
            </span>
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="font-lotr text-2xl font-black leading-tight text-white group-hover:text-amber-400 transition-colors duration-300 mb-6 line-clamp-2">
            {character.name}
          </h3>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Gender</p>
              <p className="text-xs text-slate-300 font-medium italic">{character.gender || "—"}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Realm</p>
              <p className="text-xs text-slate-300 font-medium italic truncate">{character.realm || "—"}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <a 
            href={character.wikiUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/btn relative flex items-center justify-center overflow-hidden rounded-xl bg-white/5 py-4 border border-white/10 transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10"
          >
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 group-hover/btn:text-amber-400">
              Open Scroll
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
          </a>
        </div>

        <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-20 ${raceStyle.bg}`} />
      </div>
    </div>
  );
};

export default CharacterCard;
