"use client";
import React from 'react';
import { FileText, Plus, Printer, Share2 } from 'lucide-react';

export default function PrescriptionPad() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <FileText size={18} className="text-indigo-600" /> Digital Rx Pad
        </h3>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Printer size={18}/></button>
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Share2 size={18}/></button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-2 text-center">Current Medications</p>
          <div className="space-y-2">
            {["Amoxicillin 500mg - 1x TID", "Paracetamol 650mg - PRN"].map((med, i) => (
              <div key={i} className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                <span className="text-xs font-medium text-slate-700">{med}</span>
                <button className="text-red-400 hover:text-red-600 text-xs">×</button>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100 flex items-center justify-center gap-2">
            <Plus size={14} /> Add Medication
          </button>
        </div>
      </div>
    </div>
  );
}