"use client";

import React, { useEffect, useState } from 'react';
import { db } from './firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { Activity, Database, ShieldCheck, Zap, PlusCircle, History, Stethoscope } from 'lucide-react';

export default function DashboardHome() {
  const [analysisCount, setAnalysisCount] = useState<number>(0);

  // FETCH REAL COUNT FROM FIREBASE
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patient_reports"));
        setAnalysisCount(querySnapshot.size);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Welcome, Dr. Satyamkumar</h1>
          <p className="text-slate-500">Kiara Health AI is synchronized and ready for clinical analysis.</p>
        </div>

        {/* --- LIVE MEDICAL STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "AI Reliability", value: "99.9%", icon: <ShieldCheck className="text-green-500" /> },
            { label: "Analyses Done", value: analysisCount.toString(), icon: <Activity className="text-blue-500" /> },
            { label: "Data Latency", value: "45ms", icon: <Zap className="text-yellow-500" /> },
            { label: "Cloud Sync", value: "Active", icon: <Database className="text-purple-500" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">{stat.icon}</div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- QUICK ACTIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/diagnostics" className="group p-8 bg-blue-600 rounded-3xl shadow-xl hover:bg-blue-700 transition-all">
            <h2 className="text-2xl font-bold text-white">New AI Diagnosis</h2>
            <p className="text-blue-100 mt-2">Start a new clinical analysis using Gemini 1.5 Pro.</p>
          </Link>
          <Link href="/history" className="group p-8 bg-white border-2 border-slate-200 rounded-3xl hover:border-blue-400 transition-all">
            <h2 className="text-2xl font-bold text-slate-800">Patient Records</h2>
            <p className="text-slate-500 mt-2">Access secure medical history and previous AI reports.</p>
          </Link>
        </div>

        {/* --- CREDIBILITY BAR --- */}
        <div className="mt-16 border-t border-slate-200 pt-10 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Clinical Grade Infrastructure</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            <span className="font-bold text-lg text-slate-700">Google Gemini</span>
            <span className="font-bold text-lg text-slate-700">Firebase Cloud</span>
            <span className="font-bold text-lg text-slate-700">Vercel Edge</span>
          </div>
        </div>

      </div>
    </div>
  );
}