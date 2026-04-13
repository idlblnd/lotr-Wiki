import LoadingSpinner from './LoadingSpinner';

const toneStyles = {
  error: 'border-red-400/20 bg-red-950/20 text-red-200',
  empty: 'border-white/10 bg-white/[0.03] text-slate-300',
};

const PageFeedback = ({
  type = 'loading',
  title,
  message,
  actionLabel,
  onAction,
  className = '',
}) => {
  if (type === 'loading') {
    return (
      <div className={`flex justify-center py-24 ${className}`.trim()}>
        <LoadingSpinner label={message || 'Loading records from the archive...'} className="py-0" />
      </div>
    );
  }

  const toneClass = toneStyles[type] || toneStyles.empty;

  return (
    <div className={`rounded-[2rem] border px-6 py-12 text-center ${toneClass} ${className}`.trim()}>
      <p className="font-lotr text-2xl uppercase tracking-[0.18em]">
        {title}
      </p>
      {message ? (
        <p className="mx-auto mt-3 max-w-2xl font-serif text-base leading-7 text-slate-300">
          {message}
        </p>
      ) : null}
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 transition hover:bg-amber-400/20"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default PageFeedback;
