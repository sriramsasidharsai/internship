import React, { useState } from 'react';
import { analyzeInternPerformance } from '../lib/gemini';
import { BrainCircuit, Sparkles, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReviewAI() {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!feedback.trim()) return;
    setLoading(true);
    const data = await analyzeInternPerformance(feedback);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="dark-card p-8 bg-slate-900/80">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded flex items-center justify-center border border-indigo-500/20">
            <BrainCircuit size={28} />
          </div>
          <div>
            <h3 className="text-xl text-white">QUALITATIVE ANALYSIS ENGINE</h3>
            <p className="mono-label !text-indigo-400">Powered by Gemini 3.0 Flash</p>
          </div>
        </div>

        <div className="space-y-6">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Input mentor observations or intern self-reflection..."
            className="w-full h-44 p-6 rounded bg-black/40 border border-white/5 focus:border-indigo-500/50 outline-none transition-all text-slate-300 font-mono text-sm leading-relaxed"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !feedback.trim()}
            className="w-full py-4 bg-white hover:bg-indigo-400 disabled:bg-slate-800 text-black font-black uppercase tracking-widest rounded transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
            {loading ? "PROCESSING NEURAL DATA..." : "INITIATE ANALYSIS"}
          </button>
        </div>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dark-card p-8 border-indigo-500/20 shadow-2xl shadow-indigo-500/5 space-y-8"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h4 className="text-lg text-white">Generated Report</h4>
            <div className={`px-4 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${
              result.Sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
              result.Sentiment === 'Negative' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
            }`}>
              {result.Sentiment || 'Neutral'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest">
                <CheckCircle2 size={14} />
                <span>Core Strengths</span>
              </div>
              <ul className="space-y-3">
                {(Array.isArray(result.KeyStrengths) ? result.KeyStrengths : [result.KeyStrengths]).map((s: string, i: number) => (
                  <li key={i} className="text-slate-400 text-xs flex gap-3 font-medium leading-relaxed">
                    <span className="text-emerald-500/50">#</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest">
                <AlertCircle size={14} />
                <span>Development Gaps</span>
              </div>
              <ul className="space-y-3">
                {(Array.isArray(result.AreasOfImprovement) ? result.AreasOfImprovement : [result.AreasOfImprovement]).map((s: string, i: number) => (
                  <li key={i} className="text-slate-400 text-xs flex gap-3 font-medium leading-relaxed">
                    <span className="text-amber-500/50">!</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 bg-black/40 border border-white/5 rounded relative">
            <span className="absolute -top-3 left-4 bg-[#0F1115] px-2 mono-label !text-[8px]">Strategic Recommendation</span>
            <p className="text-slate-300 text-xs font-mono italic leading-relaxed opacity-80">
              "{result.RecommendationsForNextTask || result.Recommendations}"
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
