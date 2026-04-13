import { useState } from 'react';

import imgRing from '../assets/images/the-one-ring.jpg';
import imgGandalf from '../assets/images/gandalf.jpg';
import imgGondor from '../assets/images/gondor.jpg';
import imgLegolas from '../assets/images/Legolas.jpg';
import imgDoom from '../assets/images/mountdoom.jpg';
import imgShire from '../assets/images/the-shire.jpg';
import imgSauron from '../assets/images/eye.jpg';
import imgSting from '../assets/images/stingsword.jpg';

const CARD_DATA = [
  { id: 1, label: 'The One Ring', img: imgRing },
  { id: 2, label: 'Gandalf', img: imgGandalf },
  { id: 3, label: 'Gondor', img: imgGondor },
  { id: 4, label: 'Legolas', img: imgLegolas },
  { id: 5, label: 'Mount Doom', img: imgDoom },
  { id: 6, label: 'The Shire', img: imgShire },
  { id: 7, label: 'Eye of Sauron', img: imgSauron },
  { id: 8, label: 'Sting Sword', img: imgSting },
];

const createShuffledCards = () =>
  [...CARD_DATA, ...CARD_DATA]
    .map((card, index) => ({ ...card, uniqueId: index }))
    // Old-school and simple; plenty good for a casual memory game shuffle.
    .sort(() => Math.random() - 0.5);

const MemoryGame = () => {
  const [cards, setCards] = useState(() => createShuffledCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    setCards(createShuffledCards());
    setMatchedIds([]);
    setFlippedCards([]);
    setMoves(0);
  };

  const handleClick = (uid) => {
    if (flippedCards.length === 2 || flippedCards.includes(uid)) return;
    
    const currentCard = cards.find(c => c.uniqueId === uid);
    if (matchedIds.includes(currentCard.id)) return;

    const newFlipped = [...flippedCards, uid];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [id1, id2] = newFlipped;
      const card1 = cards.find(c => c.uniqueId === id1);
      const card2 = cards.find(c => c.uniqueId === id2);
      
      // Little pause for the mismatch makes the game feel fair instead of twitchy.
      if (card1.id === card2.id) {
        setMatchedIds(prev => [...prev, card1.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center py-16 px-4 min-h-screen">
      {/* I kept the scoreboard simple so the flipping cards stay as the star of the page. */}
      <div className="text-center mb-12">
        <h2 className="font-lotr mb-6 text-5xl tracking-[0.2em] text-amber-500 uppercase [text-shadow:0_0_10px_rgba(251,191,36,0.18),0_0_24px_rgba(251,191,36,0.12)] md:text-6xl">
          Memory of the <span className="text-white">Elder Days</span>
        </h2>
        <div className="inline-flex items-center gap-8 px-8 py-3 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
          <div className="text-center">
             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Journeys</p>
             <p className="text-amber-400 font-mono text-2xl font-black">{moves}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Found</p>
             <p className="text-amber-400 font-mono text-2xl font-black">{matchedIds.length} / 8</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl w-full">
        {cards.map((card) => {
          const isFlipped = flippedCards.includes(card.uniqueId) || matchedIds.includes(card.id);
          
          return (
            <div
              key={card.uniqueId}
              onClick={() => handleClick(card.uniqueId)}
              className="group h-40 cursor-pointer [perspective:1000px] md:h-56"
            >
              <div 
                // 3D flip trick refresher: https://www.w3schools.com/howto/howto_css_flip_card.asp
                className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
              >
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl border-2 border-amber-500/20 bg-[#0f172a] shadow-2xl [backface-visibility:hidden]">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30" />
                   <div className="relative z-10 w-16 h-16 border-2 border-amber-500/10 rounded-full flex items-center justify-center group-hover:border-amber-500/40 transition-colors">
                      <span className="font-lotr text-amber-600/30 text-xl tracking-tighter">LOTR</span>
                   </div>
                </div>

                <div className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <img 
                    src={card.img} 
                    alt={card.label} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-2 text-center">
                    <p className="font-lotr text-[10px] text-amber-400 uppercase tracking-widest truncate">
                      {card.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {matchedIds.length === CARD_DATA.length && (
        <div className="mt-16 animate-bounce">
          <button
            onClick={initGame}
            className="group relative px-12 py-5 bg-amber-600 text-black font-lotr font-bold text-xl rounded-full overflow-hidden transition-all hover:bg-amber-500 shadow-[0_0_40px_rgba(217,119,6,0.5)]"
          >
            <span className="relative z-10 uppercase tracking-widest">Reclaim the Light</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
