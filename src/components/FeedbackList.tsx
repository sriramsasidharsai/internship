import React from 'react';
import { feedbackLog } from '../data/mockData';
import { Quote, MessageSquare, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

export default function FeedbackList() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {feedbackLog.map((log) => (
        <div key={log.id} className="dark-card p-6 flex gap-8 hover:bg-white/5 transition-all group">
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded flex items-center justify-center border transition-colors ${
              log.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
              log.sentiment === 'Negative' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
            }`}>
              {log.sentiment === 'Positive' ? <ThumbsUp size={28} /> : 
               log.sentiment === 'Negative' ? <ThumbsDown size={28} /> : <Minus size={28} />}
            </div>
            <span className={`text-[8px] font-black uppercase tracking-tighter ${
               log.sentiment === 'Positive' ? 'text-emerald-500' : 
               log.sentiment === 'Negative' ? 'text-rose-500' : 'text-slate-500'
            }`}>
              {log.sentiment || 'Neutral'}
            </span>
          </div>
          
          <div className="flex-grow space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white font-black text-xs uppercase tracking-tight">{log.intern}</span>
                <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                <span className="mono-label !text-blue-400">{log.task}</span>
              </div>
              <span className="text-[10px] text-slate-600 font-mono">ID: 00{log.id}</span>
            </div>
            <div className="relative pt-2">
              <p className="text-slate-400 text-sm italic font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
                "{log.feedback}"
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="p-10 text-center dark-card border-dashed bg-transparent">
        <MessageSquare className="mx-auto text-slate-700 mb-2" size={32} />
        <p className="mono-label !text-slate-600">End of qualitative audit for Spring Batch</p>
      </div>
    </div>
  );
}
