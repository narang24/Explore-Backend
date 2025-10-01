
'use client';
import { useState, useRef, useEffect } from 'react';
import { Award, BarChart3, FileCheck, Users, CheckCircle2, Sparkles, TrendingUp, Shield, ArrowRight, Zap, Globe, Lock, Clock, FileText, BadgeCheck } from 'lucide-react';
import AuthForm from '@/components/AuthForm';
import Button from '@/components/Button';

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

  const stats = [
    { number: '5000+', label: 'Active Students' },
    { number: '200+', label: 'Faculty Members' },
    { number: '1000+', label: 'Activities Tracked' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  const benefits = [
    {
      icon: <Zap size={24} />,
      title: 'Instant Verification',
      desc: 'Real-time approval system ensures your achievements are verified quickly'
    },
    {
      icon: <Globe size={24} />,
      title: 'Centralized Platform',
      desc: 'All your academic records in one accessible, organized location'
    },
    {
      icon: <Lock size={24} />,
      title: 'Secure & Reliable',
      desc: 'Your data is protected with enterprise-grade security measures'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Career Ready',
      desc: 'Build professional portfolios that stand out to employers'
    }
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
    <div className="min-h-screen bg-white text-[#081F5C] flex flex-col">
      
      {/* Header */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 py-4 pt-5">
        <div className="flex items-center gap-0">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#334EAC] to-[#426bc2] flex items-center justify-center text-white font-bold text-xl">X</div>
          <span className="font-extrabold tracking-wide text-[#081F5C] text-[17px] ml-2">PLORE</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setOpenModal(true)}
            className="text-xs border border-[#334EAC] text-[#334EAC] cursor-pointer hover:bg-[#334EAC] hover:text-white px-4 py-2 min-w-24 transition-colors duration-300 bg-transparent"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D0E3FF] text-[#334EAC] text-xs font-semibold mb-6">
              <Sparkles size={14} />
              Smart Campus Management
            </div>
            <h1 className="max-w-3xl text-4xl md:text-5xl font-bold text-[#081F5C] leading-tight">
              Transform Your Campus Experience
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-[#334EAC] leading-relaxed">
              A centralized platform empowering students to track achievements and enabling faculty to manage, approve, and analyze campus activities effortlessly.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                onClick={() => setOpenModal(true)}
                className="bg-gradient-to-r from-[#334EAC] to-[#426bc2] hover:from-[#426bc2] hover:to-[#334EAC] text-white px-8 py-3 text-sm cursor-pointer shadow-lg shadow-[#334EAC]/30 hover:shadow-xl hover:scale-105 transition-all"
              >
                Get Started <ArrowRight size={16} className="inline ml-2" />
              </Button>
              <Button
                className="border-2 border-[#334EAC] text-[#334EAC] hover:bg-[#334EAC] hover:text-white px-8 py-3 text-sm cursor-pointer transition-all"
              >
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-[#081F5C]">
                <Award size={18} className="text-[#334EAC]" />
                <span className="text-xs font-medium">Achievements</span>
              </div>
              <div className="flex items-center gap-2 text-[#081F5C]">
                <BarChart3 size={18} className="text-[#334EAC]" />
                <span className="text-xs font-medium">Analytics</span>
              </div>
              <div className="flex items-center gap-2 text-[#081F5C]">
                <FileCheck size={18} className="text-[#334EAC]" />
                <span className="text-xs font-medium">Portfolios</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview with Floating Cards */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative max-w-2xl w-full">
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-br from-[#BAD6EB] to-[#D0E3FF] rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-[#334EAC]/20 to-[#426bc2]/20 rounded-full blur-3xl opacity-60"></div>
              
              {/* Main Dashboard Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <div className="bg-gradient-to-br from-[#081F5C] via-[#334EAC] to-[#426bc2] p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
                    alt="Dashboard Preview" 
                    className="w-full rounded-xl"
                  />
                </div>
              </div>
              
              {/* Floating Feature Cards */}
              {/* Active Users Card - Bottom Left */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 z-20 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#334EAC] to-[#426bc2] flex items-center justify-center">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Active Users</p>
                    <p className="text-xl font-bold text-[#081F5C]">5,000+</p>
                  </div>
                </div>
              </div>

              {/* Real-time Approvals Card - Top Right */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100 z-20 animate-float-delayed">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <BadgeCheck size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Quick Approvals</p>
                    <p className="text-sm font-bold text-[#081F5C]">24 hrs</p>
                  </div>
                </div>
              </div>

              {/* Portfolio Generation Card - Middle Right */}
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white rounded-xl shadow-lg p-3 border border-gray-100 z-20 animate-float-slow">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Auto Portfolio</p>
                    <p className="text-sm font-bold text-[#081F5C]">1-Click</p>
                  </div>
                </div>
              </div>

              {/* Activities Tracked Card - Bottom Right */}
              <div className="absolute -bottom-2 right-12 bg-white rounded-xl shadow-lg p-3 border border-gray-100 z-20 animate-float-delayed">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Activities</p>
                    <p className="text-sm font-bold text-[#081F5C]">1000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-[#081F5C] to-[#334EAC] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-[#BAD6EB]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#081F5C]">Why Choose Xplore?</h2>
          <p className="mt-3 text-[#334EAC] text-sm max-w-2xl mx-auto">
            Built for modern educational institutions with cutting-edge features
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#334EAC]/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D0E3FF] to-[#BAD6EB] flex items-center justify-center text-[#334EAC] mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-[#081F5C] mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dual Dashboard Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20" id="features">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#081F5C]">Two Powerful Dashboards</h2>
          <p className="mt-3 text-[#334EAC] text-sm">Complete solutions for students and faculty members</p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Student Dashboard Card */}
          <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#334EAC]/30 transition-all duration-500 hover:shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D0E3FF] to-transparent opacity-30 rounded-full -translate-y-32 translate-x-32 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#334EAC] to-[#426bc2] flex items-center justify-center text-white shadow-lg shadow-[#334EAC]/30">
                  <Users size={28} />
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#D0E3FF] text-[#334EAC] text-xs font-semibold">
                  For Students
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-[#081F5C] mb-3">Student Dashboard</h3>
              <p className="text-[#334EAC] text-sm mb-6">Track your academic journey and build your professional profile</p>
              
              {/* Student Dashboard Screenshot */}
              <div className="mb-6 rounded-xl overflow-hidden border-2 border-[#D0E3FF] shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" 
                  alt="Student Dashboard"
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[#D0E3FF] flex items-center justify-center shrink-0 group-hover/item:bg-[#334EAC] transition-colors">
                    <CheckCircle2 size={14} className="text-[#334EAC] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#081F5C] text-sm">Achievement Tracker</p>
                    <p className="text-xs text-gray-600 mt-0.5">Monitor GPA, credits, and accomplishments</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[#D0E3FF] flex items-center justify-center shrink-0 group-hover/item:bg-[#334EAC] transition-colors">
                    <CheckCircle2 size={14} className="text-[#334EAC] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#081F5C] text-sm">Activity Hub</p>
                    <p className="text-xs text-gray-600 mt-0.5">Participate in workshops and events</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[#D0E3FF] flex items-center justify-center shrink-0 group-hover/item:bg-[#334EAC] transition-colors">
                    <CheckCircle2 size={14} className="text-[#334EAC] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#081F5C] text-sm">Portfolio Builder</p>
                    <p className="text-xs text-gray-600 mt-0.5">Auto-generate professional portfolios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Faculty/Admin Dashboard Card */}
          <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#334EAC]/30 transition-all duration-500 hover:shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#BAD6EB]/20 to-transparent opacity-50 rounded-full -translate-y-32 translate-x-32 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#081F5C] to-[#334EAC] flex items-center justify-center text-white shadow-lg shadow-[#081F5C]/30">
                  <Shield size={28} />
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#BAD6EB]/30 text-[#081F5C] text-xs font-semibold">
                  For Faculty
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-[#081F5C] mb-3">Faculty/Admin Dashboard</h3>
              <p className="text-[#334EAC] text-sm mb-6">Comprehensive tools for managing student activities</p>
              
              {/* Faculty Dashboard Screenshot */}
              <div className="mb-6 rounded-xl overflow-hidden border-2 border-[#BAD6EB]/30 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" 
                  alt="Faculty Dashboard"
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[#BAD6EB]/30 flex items-center justify-center shrink-0 group-hover/item:bg-[#081F5C] transition-colors">
                    <CheckCircle2 size={14} className="text-[#081F5C] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#081F5C] text-sm">Analytics Dashboard</p>
                    <p className="text-xs text-gray-600 mt-0.5">Real-time metrics and insights</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[#BAD6EB]/30 flex items-center justify-center shrink-0 group-hover/item:bg-[#081F5C] transition-colors">
                    <CheckCircle2 size={14} className="text-[#081F5C] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#081F5C] text-sm">Achievement Tracker</p>
                    <p className="text-xs text-gray-600 mt-0.5">Monitor student accomplishments</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[#BAD6EB]/30 flex items-center justify-center shrink-0 group-hover/item:bg-[#081F5C] transition-colors">
                    <CheckCircle2 size={14} className="text-[#081F5C] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#081F5C] text-sm">Approval Panel</p>
                    <p className="text-xs text-gray-600 mt-0.5">Streamlined review workflow</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group/item">
                  <div className="mt-0.5 w-5 h-5 rounded-lg bg-[#BAD6EB]/30 flex items-center justify-center shrink-0 group-hover/item:bg-[#081F5C] transition-colors">
                    <CheckCircle2 size={14} className="text-[#081F5C] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#081F5C] text-sm">Reports Generation</p>
                    <p className="text-xs text-gray-600 mt-0.5">NAAC and accreditation reports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Carousel */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-[#081F5C]">Platform Features</h3>
          <p className="mt-3 text-[#334EAC] text-sm">Everything you need for campus activity management</p>
        </div>
        
        <div ref={storiesRef} className="stories-carousel w-full max-w-full overflow-x-auto" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <div className="flex gap-6 pr-4">
            {features.map((f, idx) => (
              <article key={idx} className="group relative h-72 rounded-3xl overflow-hidden bg-white snap-start w-[85vw] sm:w-[65vw] md:w-[400px] shrink-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={f.image} alt={f.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081F5C]/95 via-[#081F5C]/60 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-medium">
                      <Sparkles size={12} />
                      {f.tag}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold leading-tight mb-2">{f.title}</h4>
                  <p className="text-sm text-white/90 leading-relaxed">{f.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {features.map((_, i) => (
            <button 
              key={i} 
              aria-label={`Go to feature ${i + 1}`} 
              onClick={() => goTo(i)} 
              className={`h-2 rounded-full transition-all duration-300 ${activeStory === i ? 'bg-[#334EAC] w-8' : 'bg-gray-300 w-2'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#081F5C] via-[#334EAC] to-[#426bc2] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Campus?</h2>
          <p className="text-[#BAD6EB] text-sm md:text-base mb-8 max-w-2xl mx-auto">
            Join thousands of institutions already using Xplore to streamline campus management and empower students.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-white text-[#334EAC] hover:bg-gray-100 px-8 py-3 text-sm cursor-pointer font-semibold shadow-lg hover:scale-105 transition-all"
            >
              Get Started Now
            </Button>
            <Button
              className="border-2 border-white text-white hover:bg-white hover:text-[#334EAC] px-8 py-3 text-sm cursor-pointer font-semibold transition-all"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#081F5C] text-white">
        <div className="mx-auto max-w-6xl px-8 sm:px-10 lg:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#334EAC] to-[#426bc2] flex items-center justify-center text-white font-bold">X</div>
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

            <div className="bg-gradient-to-br from-[#334EAC] to-[#426bc2] rounded-2xl p-6 max-w-sm w-full shadow-lg">
              <h4 className="font-bold text-white text-base">Download Our App</h4>
              <p className="mt-2 text-white/90 text-xs leading-relaxed">
                Get the Xplore mobile app for easy access to all campus management features on the go.
              </p>
              <div className="mt-5 flex gap-3">
                <button className="flex-1 bg-white hover:bg-white/90 text-[#334EAC] text-xs px-4 py-2.5 rounded-lg font-semibold transition-all hover:scale-105">
                  App Store
                </button>
                <button className="flex-1 bg-white hover:bg-white/90 text-[#334EAC] text-xs px-4 py-2.5 rounded-lg font-semibold transition-all hover:scale-105">
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
        <AuthForm onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
}