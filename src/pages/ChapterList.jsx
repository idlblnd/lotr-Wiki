import { useCallback, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchAllChapters } from '../services/api';
import PageFeedback from '../components/PageFeedback';

const ChapterList = () => {
  const [search, setSearch] = useState("");
  
  const fetchFn = useCallback(() => fetchAllChapters(), []);
  const { data, loading, error, refetch } = useFetch(fetchFn, {
    cacheKey: 'all-chapters',
  });

  const allChapters = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data.docs || []);
  }, [data]);

  const filteredChapters = allChapters.filter(chapter =>
    chapter.chapterName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen py-20 px-6 max-w-5xl mx-auto z-10">
      
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/5 blur-[150px] rounded-full" />
      </div>

      <header className="text-center mb-16 space-y-4">
        <h1 className="font-lotr text-5xl uppercase tracking-widest text-white [text-shadow:0_0_10px_rgba(251,191,36,0.18),0_0_24px_rgba(251,191,36,0.12)] md:text-6xl">
          Index of <span className="text-amber-500">Chapters</span>
        </h1>
        <p className="text-slate-500 font-serif italic tracking-[0.2em] text-sm uppercase">
          The complete record of the journey through Middle-earth
        </p>
        <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-6" />
      </header>

      <div className="relative max-w-xl mx-auto mb-16 group">
        <input 
          type="text"
          placeholder="Search for a specific scroll..."
          className="w-full bg-white/5 border border-white/10 text-amber-100 p-5 pl-14 rounded-2xl outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all shadow-2xl font-serif italic"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl opacity-30 group-focus-within:opacity-100 transition-opacity">📜</span>
      </div>

      {loading ? (
        <PageFeedback
          type="loading"
          message="Gathering every chapter in the archive..."
        />
      ) : error ? (
        <PageFeedback
          type="error"
          title="The Scrolls Are Unreadable"
          message="The chapter index could not be loaded from the public API right now."
          actionLabel="Retry Request"
          onAction={refetch}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredChapters.length > 0 ? (
            filteredChapters.map((chapter, index) => (
              <div 
                key={chapter._id || index}
                className="group relative flex items-center gap-5 rounded-xl border border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.02))] p-5 backdrop-blur-[14px] transition-all duration-300 hover:border-amber-500/30"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-mono text-[10px] text-amber-500 font-bold group-hover:bg-amber-500 group-hover:text-black transition-all">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className="text-slate-200 font-serif italic text-lg truncate group-hover:text-amber-100 transition-colors">
                    {chapter.chapterName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-[1px] w-4 bg-amber-500/30 group-hover:w-8 transition-all" />
                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                      Ancient Record
                    </p>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2 text-amber-500">
                  🖋️
                </div>
              </div>
            ))
          ) : (
            <PageFeedback
              type="empty"
              title={allChapters.length === 0 ? 'The Library Archives Are Empty' : 'No Matches Found'}
              message={allChapters.length === 0
                ? 'The API returned no chapter records for this archive.'
                : 'Try a broader chapter search to surface more results.'}
              className="col-span-full"
            />
          )}
        </div>
      )}

      <div className="mt-20 text-center">
        <p className="text-amber-600/20 font-lotr text-[9px] tracking-[0.5em] uppercase">
          Final Records of the Third Age
        </p>
      </div>
    </div>
  );
};

export default ChapterList;
