import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import CharacterList from './pages/CharacterList';
import QuoteList from './pages/QuoteList';
import MovieDetail from './pages/MovieDetail';
import MemoryGame from './pages/MemoryGame';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import ChapterList from './pages/ChapterList';
import JourneyForge from './pages/JourneyForge';
import LoreQuiz from './pages/LoreQuiz';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#020617] font-body text-slate-100 antialiased selection:bg-amber-500 selection:text-black">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent z-[101]" />

      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/quotes" element={<QuoteList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/chapters" element={<ChapterList />} />
          <Route path="/game" element={<MemoryGame />} />
          <Route path="/journey" element={<JourneyForge />} />
          <Route path="/quiz" element={<LoreQuiz />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
