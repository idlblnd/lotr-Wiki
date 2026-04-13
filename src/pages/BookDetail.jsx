import { useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchBookChapters } from '../services/api';
import PageFeedback from '../components/PageFeedback';

const BookDetail = () => {
  const { id } = useParams();

  const fetchFn = useCallback(() => fetchBookChapters(id), [id]);
  const { data, loading, error, refetch } = useFetch(fetchFn, {
    cacheKey: `book-chapters-${id}`,
  });

  const chapters = useMemo(() => {
    // The API can be a tiny bit inconsistent here, so this normalizes it into one shape.
    if (!data) return [];
    return Array.isArray(data) ? data : (data.docs || []);
  }, [data]);

  return (
    <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto relative">
      <Link 
        to="/books" 
        className="fixed top-32 left-10 hidden xl:flex items-center gap-2 text-amber-600 font-lotr text-xs tracking-widest hover:text-amber-400 transition-all group"
      >
        <span className="group-hover:-translate-x-2 transition-transform">←</span> BACK TO LIBRARY
      </Link>

      <header className="text-center mb-16">
        <h2 className="font-lotr text-amber-500 text-[10px] tracking-[0.5em] uppercase mb-4 opacity-70">Inside the Volume</h2>
        <h1 className="font-lotr text-4xl uppercase tracking-tight text-white [text-shadow:0_0_10px_rgba(251,191,36,0.18),0_0_24px_rgba(251,191,36,0.12)] md:text-5xl">
          Chapters of the <span className="text-amber-500">Journey</span>
        </h1>
        <div className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto" />
      </header>

      {loading ? (
        <PageFeedback
          type="loading"
          message="Unrolling the chapter records..."
        />
      ) : error ? (
        <PageFeedback
          type="error"
          title="The Scrolls Are Missing"
          message="The chapter list could not be loaded from the API. Please try again."
          actionLabel="Retry Request"
          onAction={refetch}
        />
      ) : (
        <div className="grid gap-3">
          {chapters.length > 0 ? (
            chapters.map((chapter, index) => (
              <div 
                key={chapter._id || index}
                className="group p-6 rounded-2xl border border-white/5 bg-slate-900/30 hover:bg-amber-500/[0.03] hover:border-amber-500/20 transition-all duration-300 flex items-center gap-6"
              >
                <div className="h-10 w-10 shrink-0 rounded-lg border border-amber-600/20 flex items-center justify-center font-mono text-amber-600 text-xs group-hover:bg-amber-600 group-hover:text-black transition-all">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl text-slate-200 font-serif italic group-hover:text-white transition-colors">
                    {chapter.chapterName}
                  </h3>
                  <p className="text-[9px] text-slate-600 uppercase tracking-widest mt-1 group-hover:text-amber-500/50 transition-colors">
                    Ancient Scroll Record
                  </p>
                </div>
              </div>
            ))
          ) : (
            <PageFeedback
              type="empty"
              title="No Chapters Were Found"
              message="This volume returned an empty chapter list, so there is nothing to display yet."
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BookDetail;
