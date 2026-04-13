import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Characters', path: '/characters' },
    { name: 'Quotes', path: '/quotes' },
    { name: 'Books', path: '/books' },
    { name: 'Chapters', path: '/chapters' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Journey', path: '/journey' },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        
        <Link 
          to="/" 
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-3"
        >
          <span className="font-lotr text-2xl tracking-[0.2em] text-amber-500 [text-shadow:0_0_10px_rgba(251,191,36,0.18),0_0_24px_rgba(251,191,36,0.12)] group-hover:text-amber-400 transition-all duration-500">
            LOTR <span className="text-white group-hover:text-amber-200 transition-colors">WIKI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 lg:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || 
                           (link.path !== '/' && location.pathname.startsWith(link.path));
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 transition-all duration-500 hover:text-amber-300 ${
                  isActive ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]' : ''
                }`}
              >
                {link.name}
                
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-amber-500 shadow-[0_0_12px_#d97706] transition-all duration-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link 
            to="/game" 
            onClick={() => setMobileOpen(false)}
            className="group relative overflow-hidden rounded-full border border-amber-500/30 bg-amber-500/5 px-6 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-amber-500 transition-all duration-500 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]"
          >
            <span className="relative z-10">Play Game</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex rounded-lg p-2 text-amber-500 transition-colors hover:bg-white/5 md:hidden"
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
           </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/5 bg-slate-950/95 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path ||
                (link.path !== '/' && location.pathname.startsWith(link.path));

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'text-slate-300 hover:bg-white/5 hover:text-amber-200'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
