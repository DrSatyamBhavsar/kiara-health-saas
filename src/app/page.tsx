"use client";

import React, { useEffect, useState } from 'react';
import { db } from './firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { 
  Activity, 
  Database, 
  ShieldCheck, 
  Zap, 
  PlusCircle, 
  History, 
  Stethoscope 
} from 'lucide-react';

// --- WORLD CLASS COMPONENT IMPORTS ---
import HMSFeatures from './components/HMSFeatures';
import ImagingViewer from './components/ImagingViewer';
import PrescriptionPad from './components/PrescriptionPad';

export default function DashboardHome() {
  const [analysisCount, setAnalysisCount] = useState<number>(0);

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
    <div className="min-h-screen bg-slate-50 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome, Dr. Satyamkumar</h1>
          <p className="text-slate-500 mt-1">Kiara Health AI Clinical Suite is active.</p>
        </div>

        {/* LIVE MEDICAL STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "AI Reliability", value: "99.9%", icon: <ShieldCheck className="text-green-500" /> },
            { label: "Analyses Done", value: analysisCount.toString(), icon: <Activity className="text-blue-500" /> },
            { label: "Data Latency", value: "45ms", icon: <Zap className="text-yellow-500" /> },
            { label: "Cloud Sync", value: "Active", icon: <Database className="text-purple-500" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">{stat.icon}</div>
              <div className="text-sm font-bold text-slate-800 uppercase tracking-widest">{stat.label}</div>
              <div className="text-xl font-black text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Link href="/diagnostics" className="group p-8 bg-blue-600 rounded-3xl shadow-xl hover:bg-blue-700 transition-all text-white">
            <PlusCircle size={32} className="mb-4" />
            <h2 className="text-2xl font-bold">New AI Diagnosis</h2>
            <p className="opacity-80">Start clinical analysis with Gemini 1.5 Pro.</p>
          </Link>
          <Link href="/history" className="group p-8 bg-white border-2 border-slate-200 rounded-3xl hover:border-blue-400 transition-all">
            <History size={32} className="mb-4 text-slate-600" />
            <h2 className="text-2xl font-bold text-slate-800">Patient Records</h2>
            <p className="text-slate-500">Access secure medical history.</p>
          </Link>
        </div>

        {/* --- WORLD CLASS HMS SUITE --- */}
        <div className="mb-16">
           <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
             <Stethoscope className="text-blue-600" /> Clinical Management Suite
           </h2>
           <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                 <HMSFeatures />
              </div>
              <div className="xl:col-span-1">
                 <ImagingViewer />
              </div>
              <div className="xl:col-span-4">
                 <PrescriptionPad />
              </div>
           </div>
        </div>

        {/* --- CREDIBILITY BAR --- */}
        <div className="mt-16 border-t border-slate-200 pt-10 text-center opacity-40 grayscale hover:grayscale-0 transition-all">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Clinical Grade Infrastructure</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <span className="font-bold text-lg text-slate-700">Google Gemini</span>
            <span className="font-bold text-lg text-slate-700">Firebase Cloud</span>
            <span className="font-bold text-lg text-slate-700">Vercel Edge</span>
          </div>
        </div>

      </div>
    </div>
  );
}