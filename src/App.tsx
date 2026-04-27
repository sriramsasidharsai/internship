/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LayoutDashboard, Users, BrainCircuit, BarChart3, Clock, Zap, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import ReviewAI from './components/ReviewAI';
import PredictionTool from './components/PredictionTool';
import FeedbackList from './components/FeedbackList';
import { cn } from './lib/utils';

type View = 'dashboard' | 'analysis' | 'prediction' | 'feedback';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'analysis', label: 'AI Analysis', icon: BrainCircuit },
    { id: 'prediction', label: 'Work Predictor', icon: Clock },
    { id: 'feedback', label: 'Feedback Log', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#E2E8F0] font-sans selection:bg-blue-500/30">
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-[#0F1115] border-r border-white/5 z-50 hidden md:flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3B82F6] rounded flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
              AI
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter text-white">INTERNAI</h1>
              <p className="mono-label text-[8px] text-blue-400">Edorient Tech</p>
            </div>
          </div>
        </div>

        <div className="mt-8 px-4 space-y-1 flex-grow">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 uppercase text-xs font-bold tracking-widest",
                activeView === item.id 
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-white/5">
          <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4">
            <p className="mono-label mb-2">Operator</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-black text-white text-xs">CS</div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate text-white uppercase">Lead Developer</p>
                <p className="mono-label text-[8px]">Engineering Hub</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen p-4 md:p-10 flex flex-col">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tight uppercase leading-none">
              {navItems.find(i => i.id === activeView)?.label}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="mono-label text-blue-400">Live Analysis Session</p>
            </div>
          </div>
          <div className="hidden sm:flex gap-6 items-center">
            <div className="text-right">
              <p className="mono-label">Spring Batch 26</p>
              <p className="text-sm font-bold text-white uppercase tracking-tighter">Week 08 Activity</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10"></div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="flex-grow"
          >
            {activeView === 'dashboard' && <Dashboard />}
            {activeView === 'analysis' && <ReviewAI />}
            {activeView === 'prediction' && <PredictionTool />}
            {activeView === 'feedback' && <FeedbackList />}
          </motion.div>
        </AnimatePresence>

        <footer className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="mono-label">System Status</span>
              <span className="text-[10px] font-bold text-green-400 uppercase">Optimal</span>
            </div>
            <div className="flex flex-col">
              <span className="mono-label">Internship Hub</span>
              <span className="text-[10px] font-bold text-white uppercase">Edorient Technologies</span>
            </div>
          </div>
          <div className="text-right">
             <span className="mono-label">Runtime</span>
             <p className="text-[10px] font-bold text-white uppercase tracking-widest">TS Node.V22</p>
          </div>
        </footer>
      </main>

      {/* Mobile Nav Overlay */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F1115] border-t border-white/10 md:hidden flex justify-around p-4 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as View)}
            className={cn(
              "flex flex-col items-center gap-1",
              activeView === item.id ? "text-blue-500" : "text-slate-600"
            )}
          >
            <item.icon size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}

