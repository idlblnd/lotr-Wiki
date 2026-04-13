import { useCallback, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchQuotes } from '../services/api';
import PageFeedback from '../components/PageFeedback';

const QuoteList = () => {
  const [search, setSearch] = useState("");
  const query = search ? `dialog=/${search}/i` : "limit=30";
  const fetchQuoteResults = useCallback(() => fetchQuotes(query), [query]);
  const { data: quotes, loading, error, refetch } = useFetch(fetchQuoteResults, {
    cacheKey: `quotes-${query}`,
  });

  return (
    <div className="relative min-h-screen py-20 px-6 bg-slate-950">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-amber-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-lotr mb-6 text-5xl tracking-widest text-amber-100 [text-shadow:0_0_10px_rgba(251,191,36,0.18),0_0_24px_rgba(251,191,36,0.12)] md:text-7xl">
            Words of <span className="text-amber-400">The Age</span>
          </h1>
        </div>

        <div className="relative max-w-2xl mx-auto mb-20">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <span className="text-amber-500/50 text-xl">🔍</span>
          </div>
          <input 
            type="text"
            placeholder="Search a line from the archive..."
            className="w-full p-6 pl-16 bg-white/5 border border-white/10 rounded-[2rem] text-amber-100 placeholder:text-slate-600 focus:ring-2 focus:ring-amber-600/50 focus:border-amber-500/50 outline-none transition-all duration-300 shadow-2xl font-serif italic"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <PageFeedback
            type="loading"
            message="Listening for echoes from the archive..."
          />
        ) : error ? (
          <PageFeedback
            type="error"
            title="The Archive Fell Silent"
            message="Quotes could not be loaded from the public API right now."
            actionLabel="Retry Request"
            onAction={refetch}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quotes && quotes.length > 0 ? (
              quotes.map(quote => (
                <div 
                  key={quote._id} 
                  className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),linear-gradient(135deg,rgba(251,191,36,0.08),rgba(255,255,255,0.02))] p-8 shadow-2xl backdrop-blur-[14px] transition-all duration-500 hover:scale-[1.02] hover:border-amber-500/30"
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 border-[10px] border-amber-500/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <span className="font-serif text-5xl text-amber-600/20 block mb-2 group-hover:text-amber-600/40 transition-colors">“</span>
                      <p className="text-xl leading-relaxed text-slate-200 font-medium italic mb-8">
                        {quote.dialog}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                          <span className="text-amber-500 text-xs font-lotr">📜</span>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold leading-none mb-1">Speaker</p>
                          <h3 className="font-lotr text-amber-500 tracking-widest uppercase text-sm">
                            {quote.character_name || "Unknown Legend"}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-amber-600/50 text-xs font-lotr tracking-widest">VIEW LORE</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <PageFeedback
                type="empty"
                title="No Records Matched That Search"
                message="Try searching for another line, name, or memorable phrase."
                className="col-span-full"
              />
            )}
          </div>
        )}

        <div className="mt-24 p-8 rounded-[2rem] border border-white/5 bg-white/5 italic text-center max-w-2xl mx-auto">
          <p className="text-slate-500 text-xs tracking-widest uppercase leading-loose">
            "Faithless is he that says farewell when the road darkens."
          </p>
        </div>
      </main>
    </div>
  );
};

export default QuoteList;
