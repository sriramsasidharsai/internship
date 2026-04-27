import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { performanceData, internStats } from '../data/mockData';
import { TrendingUp, Users, Target, Activity } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function Dashboard() {
  const cards = [
    { title: 'Total Interns', value: '24', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Avg Efficiency', value: '88%', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { title: 'Tasks Completed', value: '142', icon: Target, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { title: 'Growth Rate', value: '+12%', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="dark-card p-6 transition-all hover:border-blue-500/50 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bg} ${card.color} p-2 rounded`}>
                <card.icon size={18} />
              </div>
              <span className="mono-label">Active</span>
            </div>
            <h3 className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tighter">{card.value}</h3>
            <p className="mono-label mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Productivity Chart */}
        <div className="dark-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg">Productivity Metrics</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="mono-label !text-slate-400">Tasks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="mono-label !text-slate-400">Rate</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#475569', fontSize: 10, fontWeight: 700, fontFamily: 'monospace'}} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#475569', fontSize: 10, fontWeight: 700, fontFamily: 'monospace'}} 
                />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{
                    backgroundColor: '#161B22', 
                    borderRadius: '8px', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
                  }}
                  itemStyle={{color: '#fff', fontSize: '12px', fontWeight: 'bold'}}
                />
                <Bar dataKey="tasks" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={24} />
                <Bar dataKey="efficiency" fill="#10b981" radius={[2, 2, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Analysis */}
        <div className="dark-card p-8">
          <h3 className="text-lg mb-8 uppercase">Skill Ecosystem</h3>
          <div className="flex flex-col md:flex-row items-center justify-around h-[300px]">
            <div className="h-full w-full max-w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={internStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {internStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-5 w-full max-w-[200px]">
              {internStats.map((stat) => (
                <div key={stat.name} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="mono-label !text-slate-300">{stat.name}</span>
                    <span className="text-xs font-black text-white">{stat.value}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{backgroundColor: stat.color, width: `${stat.value}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
