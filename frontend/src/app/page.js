'use client';
import { useState, useRef, useEffect } from 'react';
import { Calendar, Users, Sparkles, CalendarDays, ClipboardList } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import Button from '../components/Button';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  const events = [
    { title: 'Tech Fest 2025', date: 'Aug 28, 2025', location: 'Auditorium', image: 'https://images.unsplash.com/photo-1515165562835-c4c6b2c60554?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Startup Workshop', date: 'Aug 20, 2025', location: 'Innovation Lab', image: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Inter-College Sports', date: 'Sep 02, 2025', location: 'Main Stadium', image: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Hackathon Night', date: 'Aug 16, 2025', location: 'CS Block', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Guest Lecture Series', date: 'Aug 10, 2025', location: 'Seminar Hall', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Cultural Evening', date: 'Aug 05, 2025', location: 'Open Air Theatre', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop' },
  ];

  const storiesRef = useRef(null);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const el = storiesRef.current;
    if (!el) return;
    const updateActive = () => {
      const cards = Array.from(el.querySelectorAll('article'));
      const wrap = el.getBoundingClientRect();
      const wrapCenter = wrap.left + wrap.width / 2;
      let idx = 0;
      let min = Number.POSITIVE_INFINITY;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const d = Math.abs(cardCenter - wrapCenter);
        if (d < min) { min = d; idx = i; }
      });
      setActiveStory(idx);
    };
    updateActive();
    el.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      el.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  useEffect(() => {
    const el = storiesRef.current;
    if (!el) return;
    const mid = Math.floor(events.length / 2);
    const cards = el.querySelectorAll('article');
    const target = cards[mid];
    if (target) {
      el.scrollLeft = target.offsetLeft;
      setActiveStory(mid);
    }
  }, []);

  const goTo = (i) => {
    const el = storiesRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('article');
    const card = cards[i];
    if (card) {
      el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[var(--galaxy)] flex flex-col">
      
      {/* Header (original content) */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 py-4 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--planetary)] text-white font-extrabold grid place-items-center">X</div>
          <span className="font-extrabold tracking-wide text-[var(--galaxy)]">PLORE</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            radius="md"
            onClick={() => setOpenModal(true)}
            className="text-xs border border-[var(--planetary)] text-[var(--planetary)] cursor-pointer hover:bg-[var(--planetary)] hover:text-white px-2 py-2 min-w-20 transition-colors duration-300 bg-transparent"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Hero (original content) */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-24 pb-24 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl md:text-5xl font-semibold text-[var(--galaxy)]">
          Your Campus, Unlocked.
        </h1>
        <p className="mt-3 mx-auto max-w-2xl text-sm md:text-base text-[var(--planetary)]">
          Discover, Connect, and Thrive with Xplore – Your Gateway to Campus Clubs, Events, and Opportunities.
        </p>
        <div className="mt-8">
          <Button
            variant="primary"
            size="small"
            radius="md"
            onClick={() => setOpenModal(true)}
            className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] hover:from-[var(--sapphire)] hover:to-[var(--planetary)] text-white px-8 py-3 text-sm cursor-pointer"
          >
            Get Started
          </Button>
        <div className="mt-6 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-[var(--galaxy)]">
            <Calendar size={18} />
            <span className="text-sm font-medium">Events</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--galaxy)]">
            <Users size={18} />
            <span className="text-sm font-medium">Clubs</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--galaxy)]">
            <Sparkles size={18} />
            <span className="text-sm font-medium">Opportunities</span>
          </div>
        </div>
        </div>
      </main>

      {/* Why Xplore? (original 3 features) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 mb-12" id="features">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-[var(--galaxy)]">Why Xplore?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-[var(--sky)] flex items-center justify-center mb-4 text-[var(--planetary)]"><CalendarDays size={22} /></div>
            <h3 className="text-base font-semibold text-[var(--galaxy)]">Discover Events</h3>
            <p className="mt-2 text-[var(--planetary)] text-sm">Find and join exciting campus events, workshops, and activities that match your interests.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-[var(--sky)] flex items-center justify-center mb-4 text-[var(--planetary)]"><Users size={22} /></div>
            <h3 className="text-base font-semibold text-[var(--galaxy)]">Connect with Clubs</h3>
            <p className="mt-2 text-[var(--planetary)] text-sm">Join clubs and societies that align with your passions and build lasting connections.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-[var(--sky)] flex items-center justify-center mb-4 text-[var(--planetary)]"><ClipboardList size={22} /></div>
            <h3 className="text-base font-semibold text-[var(--galaxy)]">Stay Organized</h3>
            <p className="mt-2 text-[var(--planetary)] text-sm">Track your participation, manage your schedule, and never miss important opportunities.</p>
          </div>
        </div>
      </section>

      {/* Campus Success Stories - responsive cards (not floating) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 mb-24">
        <h3 className="text-center text-2xl font-semibold text-[var(--galaxy)]">Campus Success Stories</h3>
        <div ref={storiesRef} className="stories-carousel mt-8 w-full max-w-full">
          <div className="flex gap-4 md:gap-6 pr-4">
            {events.map((e, idx) => (
              <article key={idx} className="group relative h-60 md:h-72 rounded-3xl overflow-hidden border border-gray-200 bg-white snap-start w-[80vw] sm:w-[60vw] md:w-[360px] shrink-0">
                <img src={e.image} alt={e.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--galaxy)]/40 via-[var(--planetary)]/10 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                    <h4 className="text-base md:text-lg font-semibold leading-tight">{e.title}</h4>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] md:text-xs">
                      <span className="px-2 py-1 rounded-md bg-white/15">{e.date}</span>
                      <span className="px-2 py-1 rounded-md bg-white/15">{e.location}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-5 stories-dots">
          {events.map((_, i) => (
            <button key={i} aria-label={`Go to story ${i + 1}`} onClick={() => goTo(i)} className={`stories-dot ${activeStory === i ? 'is-active' : ''}`}></button>
          ))}
        </div>
      </section>

      {/* Footer (original content) */}
      <footer className="mt-auto bg-gradient-to-r from-[var(--galaxy)] to-[var(--planetary)] text-white">
        <div className="mx-auto max-w-6xl px-8 sm:px-10 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white text-[var(--planetary)] font-extrabold grid place-items-center">X</div>
                <span className="font-extrabold">PLORE</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-2">MENU</h4>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li className="hover:text-white cursor-pointer">HOME</li>
                    <li className="hover:text-white cursor-pointer">ABOUT</li>
                    <li className="hover:text-white cursor-pointer">CONTACT US</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">INPUT AND FAQS</h4>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md w-full">
              <h4 className="font-semibold">DOWNLOAD OUR APPLICATION</h4>
              <p className="mt-1 text-white/80 text-sm">Get the Xplore mobile app for easy access to all campus activities on the go.</p>
              <div className="mt-4 flex gap-3">
                <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-xs px-4 py-2">APP STORE</Button>
                <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-xs px-4 py-2">PLAY STORE</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-6 text-sm text-white/70">All rights reserved</div>
        </div>
      </footer>

      {openModal && (
        <AuthForm
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
