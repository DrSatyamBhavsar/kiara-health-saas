"use client";
import React from 'react';
import { Thermometer, Heart, Droplets, Clock } from 'lucide-react';

export default function HMSFeatures() {
  const triageList = [
    { id: "P-102", name: "Anil K.", status: "Emergency", time: "2m ago", color: "bg-red-100 text-red-700" },
    { id: "P-105", name: "Suman V.", status: "Urgent", time: "15m ago", color: "bg-orange-100 text-orange-700" },
    { id: "P-109", name: "Rajesh M.", status: "Routine", time: "1h ago", color: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
      
      {/* --- TRIAGE QUEUE (HMS Standard) --- */}
      <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Clock size={18} /> Triage Queue
          </h3>
          <span className="text-xs bg-slate-100 px-2 py-1 rounded-full font-bold">3 Pending</span>
        </div>
        <div className="space-y-3">
          {triageList.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-bold text-sm text-slate-800">{patient.name}</p>
                <p className="text-xs text-slate-500">ID: {patient.id}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${patient.color}`}>
                {patient.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- VITAL SIGNS MONITOR --- */}
      <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6">Patient Vital Trends (Live)</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
            <Heart className="text-red-500 mb-2" size={20} />
            <p className="text-xs text-red-600 font-bold uppercase">Heart Rate</p>
            <p className="text-2xl font-black text-red-700">72 <span className="text-sm font-normal">bpm</span></p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <Droplets className="text-blue-500 mb-2" size={20} />
            <p className="text-xs text-blue-600 font-bold uppercase">SpO2</p>
            <p className="text-2xl font-black text-blue-700">98 <span className="text-sm font-normal">%</span></p>
          </div>
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <Thermometer className="text-orange-500 mb-2" size={20} />
            <p className="text-xs text-orange-600 font-bold uppercase">Temp</p>
            <p className="text-2xl font-black text-orange-700">98.6 <span className="text-sm font-normal">°F</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}