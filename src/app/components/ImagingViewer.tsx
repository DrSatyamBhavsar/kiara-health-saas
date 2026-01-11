"use client";
import React, { useState } from 'react';
import { Maximize2, ZoomIn, ZoomOut, Move, Layers } from 'lucide-react';

export default function ImagingViewer() {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <Layers size={18} className="text-blue-400" /> DICOM Imaging Studio
        </h3>
        <div className="flex gap-2">
          <button onClick={() => setZoom(z => z + 10)} className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700">
            <ZoomIn size={16} />
          </button>
          <button onClick={() => setZoom(z => Math.max(10, z - 10))} className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700">
            <ZoomOut size={16} />
          </button>
          <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* --- SIMULATED MRI/X-RAY VIEWER --- */}
      <div className="relative aspect-square bg-black rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
        <div 
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-80 grayscale transition-transform duration-300"
          style={{ transform: `scale(${zoom / 100})` }}
        ></div>
        {/* VIEWPORT OVERLAY */}
        <div className="absolute bottom-4 left-4 text-[10px] text-green-500 font-mono space-y-1 bg-black/50 p-2 rounded">
          <p>MOD: MRI</p>
          <p>SLICE: 24/150</p>
          <p>ZOOM: {zoom}%</p>
        </div>
      </div>
      <p className="mt-4 text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">
        Secure DICOM Web Pipeline Active
      </p>
    </div>
  );
}