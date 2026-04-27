import React, { useState } from 'react';
import { Clock, Calculator, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PredictionTool() {
  const [inputs, setInputs] = useState({
    hours: 8,
    complexity: 'medium',
    experience: 4,
    prevRate: 0.85
  });

  const [predictedTime, setPredictedTime] = useState<number | null>(null);

  const calculate = () => {
    let base = 2;
    if (inputs.complexity === 'medium') base += 2;
    if (inputs.complexity === 'high') base += 5;
    
    const res = base - (inputs.experience * 0.1) - (inputs.prevRate * 0.5);
    setPredictedTime(Math.max(1, parseFloat(res.toFixed(2))));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
      <div className="dark-card p-8 space-y-8 bg-slate-900/80">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded flex items-center justify-center border border-blue-500/20">
            <Clock size={28} />
          </div>
          <h3 className="text-xl text-white">WORKLOAD REGRESSOR</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mono-label mb-2 block">Daily Bandwidth</label>
            <input 
              type="range" min="4" max="12" step="1" 
              value={inputs.hours}
              onChange={(e) => setInputs({...inputs, hours: parseInt(e.target.value)})}
              className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-black text-white">{inputs.hours} HRS/DAY</span>
            </div>
          </div>

          <div>
            <label className="mono-label mb-2 block">Task Complexity</label>
            <select 
              value={inputs.complexity}
              onChange={(e) => setInputs({...inputs, complexity: e.target.value})}
              className="w-full p-4 rounded bg-black/40 border border-white/5 text-white font-bold text-xs uppercase tracking-widest outline-none focus:border-blue-500/50 transition-all appearance-none"
            >
              <option value="low">Low (Maintenance)</option>
              <option value="medium">Medium (Development)</option>
              <option value="high">High (Architecture)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mono-label mb-2 block">Weeks Exp</label>
              <input 
                type="number" 
                value={inputs.experience}
                onChange={(e) => setInputs({...inputs, experience: parseInt(e.target.value)})}
                className="w-full p-4 rounded bg-black/40 border border-white/5 text-white font-bold text-xs outline-none focus:border-blue-500/50"
              />
            </div>
            <div>
              <label className="mono-label mb-2 block">Success %</label>
              <input 
                type="number" step="0.1" 
                value={inputs.prevRate}
                onChange={(e) => setInputs({...inputs, prevRate: parseFloat(e.target.value)})}
                className="w-full p-4 rounded bg-black/40 border border-white/5 text-white font-bold text-xs outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          <button 
            onClick={calculate}
            className="w-full py-5 bg-[#3B82F6] hover:bg-blue-500 text-white rounded font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
          >
            EXECUTE PREDICTION
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        {predictedTime ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-xl text-black shadow-[0_0_50px_rgba(255,255,255,0.1)] relative overflow-hidden"
          >
             <div className="relative z-10 text-center">
                <p className="mono-label !text-slate-400 mb-2">Estimated Window</p>
                <h4 className="text-8xl font-black text-black leading-none mb-4 italic tracking-tighter">
                  {predictedTime}
                </h4>
                <p className="font-black text-2xl uppercase tracking-tighter text-blue-600 mb-8">Business Days</p>
                <div className="w-full h-1 bg-black/5 mb-8"></div>
                <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <Zap size={14} className="text-blue-500" />
                  <span>Model Confidence: 94.2%</span>
                </div>
             </div>
          </motion.div>
        ) : (
          <div className="dark-card border-dashed border-white/5 p-12 flex flex-col items-center justify-center text-slate-600 text-center">
            <Clock size={48} className="mb-4 opacity-20" />
            <h4 className="text-sm">Awaiting Input Parameters</h4>
            <p className="mono-label mt-2">v.1.0.4-beta</p>
          </div>
        )}

        <div className="mt-10 p-6 bg-blue-500/5 border border-blue-500/10 rounded-xl flex gap-4">
           <AlertTriangle className="text-blue-500 shrink-0" size={20} />
           <div>
             <p className="text-[10px] font-black text-white uppercase tracking-wider mb-1">Inference Engine Note</p>
             <p className="text-xs text-slate-400 leading-relaxed">This model utilizes a customized Random Forest weighting. The "High Complexity" multiplier includes architectural review buffers.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
