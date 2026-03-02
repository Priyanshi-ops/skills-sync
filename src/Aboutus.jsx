import React from "react";
import { useTheme } from "./App";

const Aboutus = () => {
    const { dark } = useTheme();

    // Color constants matching App.jsx
    const lightGrad = 'linear-gradient(135deg,#6366f1,#818cf8,#a78bfa,#6366f1)';
    const darkGrad = 'linear-gradient(135deg,#0f0c29,#302b63,#1a1a2e,#0f0c29)';

    const glassStyle = {
        background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.85)',
        border: '1px solid rgba(255,255,255,0.35)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-gray-950 text-gray-100' : 'bg-slate-100 text-gray-900'}`}>

            {/* Hero Section: Why This Exists & Our Mission */}
            <section
                className="relative overflow-hidden py-24 px-4 text-center grad-bg"
                style={{ background: dark ? darkGrad : lightGrad }}
            >
                <div className="relative z-10 fade-up max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
                        style={{ background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.22)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}
                    >
                        🌟 Purpose & Vision
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
                        Why <span style={{ background: 'linear-gradient(90deg,#fde68a,#fbcfe8,#a5f3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SkillSync</span> Exists
                    </h1>
                    <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Our mission is to bridge the gap between human potential and career opportunities.
                        We believe everyone has a unique set of skills that deserves the perfect professional home.
                    </p>
                </div>

                {/* Decorative accents */}
                <div className={`absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none ${dark ? 'bg-purple-700' : 'bg-white'}`} />
                <div className={`absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none ${dark ? 'bg-indigo-500' : 'bg-white'}`} />
            </section>

            <main className="max-w-6xl mx-auto px-4 py-16 flex flex-col gap-20">

                {/* The Problem We Solved */}
                <section className="fade-up">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className={`text-3xl font-bold mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>The Problem We Solved</h2>
                            <div className="space-y-4">
                                <p className={`${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Traditional job boards are broken. They rely on outdated keyword matching that often misses the nuance of a developer's true expertise.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Frustrating "No Results Found" when skills are slightly off.',
                                        'Manual sorting through hundreds of irrelevant roles.',
                                        'No clear path on how to improve for a specific dream job.'
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-red-500 font-bold">✕</span>
                                            <span className="text-sm">{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="p-8 rounded-3xl" style={glassStyle}>
                            <div className="text-5xl mb-4">💡</div>
                            <h3 className="text-xl font-bold mb-3">Our Solution</h3>
                            <p className="text-sm opacity-80 leading-relaxed">
                                SkillSync uses AI-driven semantic matching to find roles that align with your <span className="font-bold underline decoration-indigo-500">actual</span> capabilities, not just your resume text. We provide a roadmap for every gap, turning "Not Qualified" into "Coming Soon."
                            </p>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="fade-up text-center">
                    <h2 className={`text-3xl font-bold mb-12 ${dark ? 'text-white' : 'text-gray-900'}`}>How It Works</h2>
                    <div className="grid sm:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Input Skills', desc: 'Type in your tech stack, from Python to Docker.' },
                            { step: '02', title: 'AI Analysis', desc: 'Our engine parses semantic matches across 100+ roles.' },
                            { step: '03', title: 'Get Roadmaps', desc: 'Receive instant gap analysis and learning paths.' }
                        ].map((item, i) => (
                            <div key={i} className="relative p-8 rounded-3xl group hover:-translate-y-2 transition-transform h-full" style={glassStyle}>
                                <div className="text-4xl font-black opacity-10 absolute top-4 right-6 group-hover:opacity-20 transition-opacity">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="fade-up">
                    <div className={`rounded-3xl p-10 text-center ${dark ? 'bg-indigo-900/10' : 'bg-indigo-50 border border-indigo-100'}`}>
                        <h2 className="text-2xl font-bold mb-8">Built With Modern Tech</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            {[
                                { name: 'React 19', icon: '⚛️' },
                                { name: 'Vite', icon: '⚡' },
                                { name: 'Tailwind CSS', icon: '🎨' },
                                { name: 'Framer Motion', icon: '✨' },
                                { name: 'Lucide Icons', icon: '🔧' }
                            ].map((tech) => (
                                <div key={tech.name} className={`px-5 py-3 rounded-2xl flex items-center gap-3 font-semibold text-sm ${dark ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm'}`}>
                                    <span>{tech.icon}</span>
                                    {tech.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Developer */}
                <section className="fade-up flex justify-center pb-12">
                    <div className="max-w-2xl w-full p-10 rounded-3xl text-center relative overflow-hidden" style={glassStyle}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-500" />
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl shadow-lg">
                            👨‍💻
                        </div>
                        <h2 className="text-2xl font-bold mb-2">About the Developer</h2>
                        <p className="text-indigo-500 font-medium mb-4 text-sm uppercase tracking-widest">Full Stack Engineer</p>
                        <p className={`text-sm leading-relaxed mb-8 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Passionate about building tools that simplify the complex. SkillSync was born out of a personal frustration with the job hunting process, aiming to provide clarity and direction to fellow developers.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg">
                                Portfolio
                            </button>
                            <button className={`px-6 py-2 font-bold rounded-xl transition-colors ${dark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                Connect
                            </button>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer link back */}
            <footer className="py-12 border-t border-white/5 text-center">
                <p className="text-xs opacity-40 mb-4">© 2026 SkillSync • Bridging Gaps, Building Futures</p>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-indigo-500 hover:underline text-xs font-bold">
                    Scroll to Top
                </button>
            </footer>
        </div>
    );
};

export default Aboutus;
