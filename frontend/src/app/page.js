'use client';
import { useState, useRef, useEffect } from 'react';
import { Award, BarChart3, FileCheck, Users, CheckCircle2, Sparkles, TrendingUp, Shield } from 'lucide-react';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  const features = [
    { 
      title: 'Track Your Journey', 
      desc: 'Monitor achievements, build portfolios, and showcase your academic excellence with automated tracking.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
      tag: 'Students'
    },
    { 
      title: 'Streamline Management', 
      desc: 'Approve activities, generate reports, and gain insights into student engagement and performance.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      tag: 'Faculty'
    },
    { 
      title: 'Build Your Portfolio', 
      desc: 'Auto-generate professional resumes and portfolios from your verified academic achievements.',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop',
      tag: 'All Users'
    },
    { 
      title: 'Real-time Analytics', 
      desc: 'Access comprehensive dashboards with participation rates, trends, and performance metrics.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      tag: 'Faculty'
    },
    { 
      title: 'Activity Hub', 
      desc: 'Discover, register, and participate in workshops, competitions, and campus events seamlessly.',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop',
      tag: 'Students'
    },
    { 
      title: 'Approval Workflow', 
      desc: 'Efficient approval system for student activities, achievements, and certification requests.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop',
      tag: 'Faculty'
    },
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
    const mid = Math.floor(features.length / 2);
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
    <div className="min-h-screen bg-white flex flex-col" style={{'--galaxy': '#1a1f36', '--planetary': '#4f46e5', '--sapphire': '#6366f1', '--venus': '#fbbf24', '--sky': '#e0e7ff'}}>
      
      {/* Header */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 py-4 pt-5">
        <div className="flex items-center gap-0">
          <img src="/favicon.png" alt="Xplore Logo" className="h-14 w-14 rounded-full object-cover" />
          <span className="font-extrabold tracking-wide text-[var(--galaxy)] text-base -ml-3">PLORE</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpenModal(true)}
            className="text-xs border border-[var(--planetary)] text-[var(--planetary)] cursor-pointer hover:bg-[var(--planetary)] hover:text-white px-2 py-2 min-w-20 transition-colors duration-300 bg-transparent rounded-md"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-24 pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="max-w-3xl text-4xl md:text-5xl font-semibold text-[var(--galaxy)]">
              Complete Campus Management Solution
            </h1>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-[var(--planetary)]">
              Empowering students to track achievements and enabling faculty to manage, approve, and analyze campus activities effortlessly.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] hover:from-[var(--sapphire)] hover:to-[var(--planetary)] text-white px-8 py-3 text-sm cursor-pointer rounded-md transition-all"
              >
                Get Started
              </button>
            <div className="mt-6 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-2 text-[var(--galaxy)]">
                <Award size={18} />
                <span className="text-sm font-medium">Achievements</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--galaxy)]">
                <BarChart3 size={18} />
                <span className="text-sm font-medium">Analytics</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--galaxy)]">
                <FileCheck size={18} />
                <span className="text-sm font-medium">Portfolios</span>
              </div>
            </div>
            </div>
          </div>

          {/* Right Content - Dashboard Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative max-w-md w-full">
              {/* Background Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[var(--venus)] to-[var(--sky)] rounded-3xl blur-2xl opacity-40"></div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-[var(--planetary)] to-[var(--sapphire)] rounded-3xl blur-2xl opacity-20"></div>
              
              {/* Dashboard Image Container */}
              <div className="relative z-10 rounded-3xl p-6">
                <img 
                  src="/dashboard.png" 
                  alt="Xplore Dashboard Preview" 
                  className="w-full h-full scale-180 rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dual Dashboard Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 mb-12" id="features">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--galaxy)]">Two Powerful Dashboards</h2>
          <p className="mt-2 text-[var(--planetary)] text-sm">Complete solutions for students and faculty members</p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Student Dashboard Card */}
          <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[var(--planetary)]/30 transition-all duration-500 hover:shadow-xl">
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--sky)] to-transparent opacity-30 rounded-full -translate-y-32 translate-x-32 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--planetary)] to-[var(--sapphire)] flex items-center justify-center text-white shadow-lg shadow-[var(--planetary)]/30">
                  <Users size={28} />
                </div>
                <div className="px-3 py-1 rounded-full bg-[var(--sky)] text-[var(--planetary)] text-xs font-semibold">
                  For Students
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-[var(--galaxy)] mb-3">Student Dashboard</h3>
              <p className="text-[var(--planetary)] text-sm mb-8">Track your academic journey and build your professional profile</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[var(--sky)] flex items-center justify-center shrink-0 group-hover/item:bg-[var(--planetary)] transition-colors">
                    <CheckCircle2 size={14} className="text-[var(--planetary)] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--galaxy)] text-sm">Stats & Achievement Tracker</p>
                    <p className="text-xs text-gray-600 mt-1">Monitor your GPA, credits, and accomplishments in real-time</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[var(--sky)] flex items-center justify-center shrink-0 group-hover/item:bg-[var(--planetary)] transition-colors">
                    <CheckCircle2 size={14} className="text-[var(--planetary)] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--galaxy)] text-sm">Activity Hub</p>
                    <p className="text-xs text-gray-600 mt-1">Discover and participate in workshops, competitions, and events</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[var(--sky)] flex items-center justify-center shrink-0 group-hover/item:bg-[var(--planetary)] transition-colors">
                    <CheckCircle2 size={14} className="text-[var(--planetary)] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--galaxy)] text-sm">Portfolio Resume Builder</p>
                    <p className="text-xs text-gray-600 mt-1">Auto-generate professional portfolios from verified achievements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Faculty/Admin Dashboard Card */}
          <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[var(--planetary)]/30 transition-all duration-500 hover:shadow-xl">
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--venus)]/20 to-transparent opacity-50 rounded-full -translate-y-32 translate-x-32 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--galaxy)] to-[var(--planetary)] flex items-center justify-center text-white shadow-lg shadow-[var(--galaxy)]/30">
                  <Shield size={28} />
                </div>
                <div className="px-3 py-1 rounded-full bg-[var(--venus)]/20 text-[var(--galaxy)] text-xs font-semibold">
                  For Faculty
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-[var(--galaxy)] mb-3">Faculty/Admin Dashboard</h3>
              <p className="text-[var(--planetary)] text-sm mb-8">Comprehensive tools for managing and analyzing student activities</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[var(--venus)]/20 flex items-center justify-center shrink-0 group-hover/item:bg-[var(--galaxy)] transition-colors">
                    <CheckCircle2 size={14} className="text-[var(--galaxy)] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--galaxy)] text-sm">Stats & Achievement Tracker</p>
                    <p className="text-xs text-gray-600 mt-1">Overview dashboard with key metrics and insights</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[var(--venus)]/20 flex items-center justify-center shrink-0 group-hover/item:bg-[var(--galaxy)] transition-colors">
                    <CheckCircle2 size={14} className="text-[var(--galaxy)] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--galaxy)] text-sm">Student Achievement Tracker</p>
                    <p className="text-xs text-gray-600 mt-1">View and manage accomplishments across departments</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[var(--venus)]/20 flex items-center justify-center shrink-0 group-hover/item:bg-[var(--galaxy)] transition-colors">
                    <CheckCircle2 size={14} className="text-[var(--galaxy)] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--galaxy)] text-sm">Approval Panel</p>
                    <p className="text-xs text-gray-600 mt-1">Efficient workflow for reviewing and approving submissions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[var(--venus)]/20 flex items-center justify-center shrink-0 group-hover/item:bg-[var(--galaxy)] transition-colors">
                    <CheckCircle2 size={14} className="text-[var(--galaxy)] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--galaxy)] text-sm">Reports & Analytics</p>
                    <p className="text-xs text-gray-600 mt-1">Generate insights on participation rates and trends</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[var(--venus)]/20 flex items-center justify-center shrink-0 group-hover/item:bg-[var(--galaxy)] transition-colors">
                    <CheckCircle2 size={14} className="text-[var(--galaxy)] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--galaxy)] text-sm">Activities Management</p>
                    <p className="text-xs text-gray-600 mt-1">Create, manage, and track all campus activities and events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Carousel */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 mb-24">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-[var(--galaxy)]">Platform Features</h3>
          <p className="mt-2 text-[var(--planetary)] text-sm">Everything you need for campus activity management</p>
        </div>
        
        <div ref={storiesRef} className="stories-carousel w-full max-w-full overflow-x-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <div className="flex gap-4 md:gap-6 pr-4">
            {features.map((f, idx) => (
              <article key={idx} className="group relative h-64 md:h-80 rounded-3xl overflow-hidden bg-white snap-start w-[80vw] sm:w-[60vw] md:w-[380px] shrink-0 shadow-sm hover:shadow-xl transition-shadow duration-300">
                <img src={f.image} alt={f.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--galaxy)]/95 via-[var(--galaxy)]/60 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-medium">
                      <Sparkles size={12} />
                      {f.tag}
                    </span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold leading-tight mb-2">{f.title}</h4>
                  <p className="text-xs md:text-sm text-white/90 leading-relaxed">{f.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {features.map((_, i) => (
            <button 
              key={i} 
              aria-label={`Go to feature ${i + 1}`} 
              onClick={() => goTo(i)} 
              className={`h-2 rounded-full transition-all duration-300 ${activeStory === i ? 'bg-[var(--planetary)] w-8' : 'bg-gray-300 w-2'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[var(--galaxy)] text-white">
        <div className="mx-auto max-w-6xl px-8 sm:px-10 lg:px-12 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-4">
                <img src="/favicon.png" alt="Xplore Logo" className="h-9 w-9 bg-white rounded-full object-cover" />
                <span className="font-extrabold tracking-wide text-white text-base">PLORE</span>
              </div>
              <p className="text-white/70 text-sm max-w-xs mb-6">
                Complete campus management solution for students and faculty.
              </p>
              <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">MENU</h4>
                  <ul className="space-y-1.5 text-white/70 text-sm">
                    <li className="hover:text-white cursor-pointer transition-colors">Home</li>
                    <li className="hover:text-white cursor-pointer transition-colors">About</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">SUPPORT</h4>
                  <ul className="space-y-1.5 text-white/70 text-sm">
                    <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl p-6 max-w-sm w-full shadow-lg">
              <h4 className="font-bold text-white text-base">Download Our App</h4>
              <p className="mt-2 text-white/90 text-xs leading-relaxed">
                Get the Xplore mobile app for easy access to all campus management features on the go.
              </p>
              <div className="mt-5 flex gap-3">
                <button className="flex-1 bg-white hover:bg-white/90 text-[var(--planetary)] text-xs px-4 py-2.5 rounded-lg font-semibold transition-all hover:scale-105">
                  App Store
                </button>
                <button className="flex-1 bg-white hover:bg-white/90 text-[var(--planetary)] text-xs px-4 py-2.5 rounded-lg font-semibold transition-all hover:scale-105">
                  Play Store
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/60">© 2025 Xplore. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-[var(--galaxy)] mb-4">Login to Xplore</h3>
            <p className="text-sm text-[var(--planetary)] mb-6">Access your dashboard to manage your campus activities</p>
            <button 
              onClick={() => setOpenModal(false)}
              className="w-full bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white py-3 rounded-md text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}