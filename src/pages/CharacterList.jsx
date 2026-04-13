import { useCallback, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import PageFeedback from '../components/PageFeedback';

const CharacterList = () => {
  const [query, setQuery] = useState("");
  const [race, setRace] = useState("All");
  const [gender, setGender] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 20;

  // The filters stay close to the data query so it is easy to tune the archive behavior later.
  let apiQuery = `limit=${limit}&page=${page}`;
  if (query) apiQuery += `&name=/${query}/i`;
  if (race !== "All") apiQuery += `&race=${race}`;
  if (gender !== "All") apiQuery += `&gender=${gender}`;

  // Memoized fetch keeps the custom hook calm and avoids accidental refetch loops.
  const fetchCharactersPage = useCallback(() => fetchCharacters(apiQuery), [apiQuery]);
  const { data: characters, loading, error, refetch } = useFetch(fetchCharactersPage, {
    cacheKey: `characters-${apiQuery}`,
  });

  const handleSearch = (value) => {
    setQuery(value);
    setPage(1);
  };

  const handleRaceChange = (event) => {
    setRace(event.target.value);
    setPage(1);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setPage(1);
  };

  return (
    <div className="relative min-h-screen py-20 px-6 max-w-7xl mx-auto z-10">
      <div className="text-center mb-12">
        <h1 className="font-lotr mb-4 text-5xl tracking-widest text-amber-100 [text-shadow:0_0_10px_rgba(251,191,36,0.18),0_0_24px_rgba(251,191,36,0.12)] md:text-7xl">
          Fellowship <span className="text-amber-400">Archive</span>
        </h1>
        <p className="text-slate-400 font-medium tracking-wide">Explore the inhabitants of the Nine Realms.</p>
      </div>

      <div className="mb-16 rounded-[2rem] border border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.02))] p-5 backdrop-blur-[14px]">
        {/* Keeping this panel close to the movie filters makes the archive feel more consistent. */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_auto_auto] lg:items-end">
          <div className="md:col-span-1">
            <SearchBar onSearch={handleSearch} placeholder="Search names..." />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Race</label>
            <select 
              value={race}
              onChange={handleRaceChange}
              className="min-w-[220px] cursor-pointer rounded-2xl border border-amber-500/20 bg-slate-900 px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300 outline-none transition hover:border-amber-500/50"
            >
              <option value="All">All Races</option>
              <option value="Elf">Elf</option>
              <option value="Human">Human</option>
              <option value="Dwarf">Dwarf</option>
              <option value="Hobbit">Hobbit</option>
              <option value="Orc">Orc</option>
              <option value="Maiar">Maiar (Wizards)</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Gender</label>
            <select 
              value={gender}
              onChange={handleGenderChange}
              className="min-w-[220px] cursor-pointer rounded-2xl border border-amber-500/20 bg-slate-900 px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300 outline-none transition hover:border-amber-500/50"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <PageFeedback
          type="loading"
          message="Gazing into the Palantír..."
        />
      )}

      {!loading && error && (
        <PageFeedback
          type="error"
          title="The Fellowship Archive Is Unreachable"
          message="Character data could not be loaded from the API with the current filters."
          actionLabel="Try Again"
          onAction={refetch}
          className="mb-10"
        />
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Four-up on desktop felt like the sweet spot: roomy enough, still scrollable. */}
          {characters.map(char => (
            <CharacterCard key={char._id} character={char} />
          ))}
        </div>
      )}

      {!loading && characters.length > 0 && (
        <div className="mt-20 flex items-center justify-center gap-8">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="group flex items-center gap-2 font-lotr text-[10px] tracking-widest text-amber-500 disabled:opacity-20 disabled:cursor-not-allowed hover:text-amber-300 transition-all"
          >
            <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> PREVIOUS
          </button>
          
          <div className="h-10 w-10 rounded-full border border-amber-500/20 flex items-center justify-center bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <span className="font-mono text-amber-400 font-bold">{page}</span>
          </div>

          <button 
            disabled={characters.length < limit}
            onClick={() => setPage(p => p + 1)}
            className="group flex items-center gap-2 font-lotr text-[10px] tracking-widest text-amber-500 disabled:opacity-20 disabled:cursor-not-allowed hover:text-amber-300 transition-all"
          >
            NEXT <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      )}

      {!loading && !error && characters.length === 0 && (
        <PageFeedback
          type="empty"
          title="No Records Found"
          message="No characters matched this combination of search text and filters."
        />
      )}

    </div>
  );
};

export default CharacterList;
