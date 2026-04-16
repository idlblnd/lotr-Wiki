import { useCallback, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchCharacters, fetchMovies, fetchQuotes } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const movieYears = {
  'The Fellowship of the Ring': 2001,
  'The Two Towers': 2002,
  'The Return of the King': 2003,
  'An Unexpected Journey': 2012,
  'The Desolation of Smaug': 2013,
  'The Battle of the Five Armies': 2014,
  'The Lord of the Rings Series': 1978,
};

const shuffleList = (items) => [...items].sort(() => Math.random() - 0.5);

const uniqueByName = (items) => {
  const seen = new Set();

  return items.filter((item) => {
    const key = item?.name || item;

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const uniqueValues = (items) => [...new Set(items.filter(Boolean))];

const buildQuoteQuestions = (quotes, characterNames) => {
  return quotes
    .filter((quote) => quote.dialog && quote.character_name && quote.dialog.length < 180)
    .slice(0, 8)
    .map((quote) => {
      const distractors = shuffleList(
        uniqueValues(characterNames.filter((name) => name !== quote.character_name)),
      ).slice(0, 3);

      const options = shuffleList(uniqueValues([quote.character_name, ...distractors]));

      return {
        id: `quote-${quote._id}`,
        type: 'quote',
        prompt: 'Who said this line?',
        detail: `"${quote.dialog}"`,
        options,
        answer: quote.character_name,
        insight: `${quote.character_name} is the recorded speaker for this quote in the archive.`,
      };
    })
    .filter((question) => question.options.length === 4);
};

const buildMovieQuestions = (movies) => {
  const rankedMovies = movies.filter((movie) => movieYears[movie.name]);

  const earliestSet = shuffleList(rankedMovies).slice(0, 4);
  const latestSet = shuffleList(rankedMovies).slice(0, 4);

  const earliestAnswer = [...earliestSet].sort((left, right) => movieYears[left.name] - movieYears[right.name])[0];
  const latestAnswer = [...latestSet].sort((left, right) => movieYears[right.name] - movieYears[left.name])[0];

  return [
    {
      id: 'movie-earliest',
      type: 'movie',
      prompt: 'Which film was released first?',
      detail: 'Choose the earliest release from this set.',
      options: earliestSet.map((movie) => movie.name),
      answer: earliestAnswer?.name,
      insight: `${earliestAnswer?.name} came out in ${movieYears[earliestAnswer?.name]}.`,
    },
    {
      id: 'movie-latest',
      type: 'movie',
      prompt: 'Which film was released most recently?',
      detail: 'Choose the latest release from this set.',
      options: latestSet.map((movie) => movie.name),
      answer: latestAnswer?.name,
      insight: `${latestAnswer?.name} came out in ${movieYears[latestAnswer?.name]}.`,
    },
  ].filter((question) => question.answer && question.options.length === 4);
};

const buildCharacterQuestions = (characters) => {
  const raceCandidates = uniqueByName(
    characters.filter((character) => character.name && character.race),
  ).slice(0, 12);

  return raceCandidates
    .filter((character) => character.race)
    .slice(0, 4)
    .map((character) => {
      const availableRaces = uniqueValues(
        characters.map((item) => item.race).filter((race) => race && race !== character.race),
      );

      const distractors = shuffleList(
        availableRaces,
      ).slice(0, 3);

      const options = shuffleList(uniqueValues([character.race, ...distractors]));

      return {
        id: `character-${character._id}`,
        type: 'character',
        prompt: `What race is ${character.name}?`,
        detail: 'Use the archive details you have picked up so far.',
        options,
        answer: character.race,
        insight: `${character.name} is listed as ${character.race} in the character archive.`,
      };
    })
    .filter((question) => question.options.length === 4);
};

const LoreQuiz = () => {
  const fetchQuizData = useCallback(
    () =>
      Promise.all([
        fetchQuotes('limit=60'),
        fetchCharacters('limit=100'),
        fetchMovies('limit=100'),
      ]).then(([quotesResponse, charactersResponse, moviesResponse]) => ({
        quotes: quotesResponse.docs || [],
        characters: charactersResponse.docs || [],
        movies: moviesResponse.docs || [],
      })),
    [],
  );

  const { data, loading, error } = useFetch(fetchQuizData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = useMemo(() => {
    if (!data?.quotes || !data?.characters || !data?.movies) {
      return [];
    }

    const characterNames = uniqueByName(data.characters)
      .map((character) => character.name)
      .filter(Boolean);

    const builtQuestions = [
      ...buildQuoteQuestions(shuffleList(data.quotes), characterNames),
      ...buildMovieQuestions(data.movies),
      ...buildCharacterQuestions(shuffleList(data.characters)),
    ];

    return shuffleList(builtQuestions).slice(0, 8);
  }, [data]);

  const currentQuestion = questions[currentIndex];
  const isFinished = currentIndex >= questions.length;

  const handleAnswer = (option) => {
    if (!currentQuestion || selectedAnswer) {
      return;
    }

    setSelectedAnswer(option);

    if (option === currentQuestion.answer) {
      setScore((current) => current + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setShowResult(true);
    }

    setCurrentIndex((current) => current + 1);
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <LoadingSpinner />
        <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-amber-500/70">
          Loading the quiz archive...
        </p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-20">
        <div className="w-full rounded-[2rem] border border-red-400/20 bg-red-950/20 px-6 py-12 text-center">
          <p className="font-lotr text-2xl uppercase tracking-[0.18em] text-red-300">
            Failed to load the lore quiz
          </p>
          <p className="mt-3 font-serif text-base text-slate-300">
            The archive could not prepare the quiz cards. Please refresh and try again.
          </p>
        </div>
      </div>
    );
  }

  if (showResult || isFinished) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_28%),radial-gradient(circle_at_85%_25%,rgba(56,189,248,0.08),transparent_24%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">
            Quiz complete
          </p>
          <h1 className="mt-5 font-lotr text-5xl uppercase text-white [text-shadow:0_0_10px_rgba(251,191,36,0.18),0_0_24px_rgba(251,191,36,0.12)]">
            Lore Quiz Cards
          </h1>
          <p className="mt-6 font-serif text-lg leading-8 text-slate-300">
            You answered {score} out of {questions.length} questions correctly.
          </p>
          <button
            onClick={handleRestart}
            className="mt-10 rounded-2xl border border-amber-300/30 bg-amber-300/15 px-6 py-3 text-sm uppercase tracking-[0.16em] text-amber-100 transition hover:-translate-y-0.5 hover:bg-amber-300/25"
          >
            Play again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_20%_90%,rgba(16,185,129,0.08),transparent_22%)]" />
        <div className="absolute left-[8%] top-24 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute right-[10%] top-40 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-12 grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200">
              Interactive archive
            </span>
            <h1 className="mt-6 font-lotr text-5xl uppercase leading-none text-white [text-shadow:0_0_14px_rgba(251,191,36,0.2)] md:text-7xl">
              Lore
              <span className="block text-amber-300">Quiz Cards</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Test your knowledge with quiz cards built from the same archive data used across the wiki.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Question</p>
              <p className="mt-4 font-mono text-3xl text-amber-300">
                {String(currentIndex + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Score</p>
              <p className="mt-4 font-mono text-3xl text-sky-300">
                {String(score).padStart(2, '0')}
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            {/* The question card stays spacious so the reading experience feels calm and deliberate. */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {currentQuestion.type} card
            </p>
            <h2 className="mt-5 font-lotr text-4xl uppercase text-white md:text-5xl">
              {currentQuestion.prompt}
            </h2>
            <p className="mt-6 font-serif text-lg leading-8 text-amber-100/90">
              {currentQuestion.detail}
            </p>

            <div className="mt-10 grid gap-4">
              {currentQuestion.options.map((option) => {
                const isCorrect = selectedAnswer && option === currentQuestion.answer;
                const isIncorrect = selectedAnswer === option && option !== currentQuestion.answer;

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={Boolean(selectedAnswer)}
                    className={`rounded-[1.6rem] border px-5 py-4 text-left text-base transition ${
                      isCorrect
                        ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-100'
                        : isIncorrect
                          ? 'border-red-400/30 bg-red-500/10 text-red-100'
                          : 'border-white/10 bg-slate-950/45 text-slate-200 hover:border-amber-400/30 hover:bg-white/[0.06]'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(251,191,36,0.14),rgba(14,165,233,0.08),rgba(16,185,129,0.1))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Card notes
              </p>

              {selectedAnswer ? (
                <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-slate-950/35 px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Result
                  </p>
                  <p className="mt-3 font-lotr text-2xl text-amber-100">
                    {selectedAnswer === currentQuestion.answer ? 'Correct' : 'Not quite'}
                  </p>
                  <p className="mt-3 font-serif text-base leading-7 text-slate-300">
                    {currentQuestion.insight}
                  </p>
                </div>
              ) : (
                <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-slate-950/35 px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Round flow
                  </p>
                  <p className="mt-3 font-serif text-base leading-7 text-slate-300">
                    Pick the answer you trust most, then the card will open a short explanation before moving on.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="rounded-2xl border border-amber-300/30 bg-amber-300/15 px-6 py-3 text-sm uppercase tracking-[0.16em] text-amber-100 transition hover:-translate-y-0.5 hover:bg-amber-300/25 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next card
              </button>
              <button
                onClick={handleRestart}
                className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm uppercase tracking-[0.16em] text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
              >
                Restart quiz
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoreQuiz;
