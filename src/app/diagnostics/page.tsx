"use client";

import React, { useState } from 'react';
import { db } from '../firebase'; // <--- Import the database
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // <--- Database tools

// --- PASTE YOUR AIZA KEY HERE ---
const API_KEY = "AIzaSyCm3EYpgraak6tHjbA1XMqzmHIhTPaXTRY"; 

export default function AIDiagnosticsPage() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false); // <--- New state for saving
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null); // <--- "Saved Successfully" message

  const handleAnalyze = async () => {
    if (!symptoms) return;
    setLoading(true);
    setResult(null);
    setError(null);
    setSaveStatus(null);

    try {
      const modelToUse = "models/gemini-1.5-flash";

      const runAI = async (modelName: string) => {
        const prompt = `Act as a Senior Chief Medical Officer. Analyze these symptoms: "${symptoms}". 
        Format the response in valid HTML with these 3 sections (use <h3> tags):
        1. Differential Diagnosis
        2. Recommended Tests
        3. Red Flags`;
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
          }
        );

        if (!response.ok) {
          if (response.status === 404) throw new Error("404_MODEL_NOT_FOUND");
          const err = await response.json();
          throw new Error(err.error?.message || "Unknown Error");
        }
        return response.json();
      };

      try {
        const data = await runAI(modelToUse);
        setResult(data.candidates[0].content.parts[0].text);
      } catch (err: any) {
        if (err.message === "404_MODEL_NOT_FOUND") {
          // Auto-detect fallback
          const listResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
          const listData = await listResp.json();
          const validModel = listData.models.find((m: any) => m.name.includes("gemini") && m.supportedGenerationMethods?.includes("generateContent"));
          if (validModel) {
            const data = await runAI(validModel.name);
            setResult(data.candidates[0].content.parts[0].text);
          } else { throw new Error("No compatible AI models found."); }
        } else { throw err; }
      }
    } catch (err: any) {
      console.error(err);
      setError("Analysis Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: FUNCTION TO SAVE TO DATABASE ---
  const handleSave = async () => {
    if (!result || !symptoms) return;
    setSaving(true);
    
    try {
      // Create a collection called "patient_reports"
      await addDoc(collection(db, "patient_reports"), {
        symptoms: symptoms,
        diagnosisHtml: result,
        createdAt: serverTimestamp(), // Saves the exact time
        doctor: "Dr. Satyamkumar", // You can make this dynamic later
        status: "Draft"
      });
      
      setSaveStatus("✅ Report Saved to Patient History!");
    } catch (err: any) {
      console.error("Database Error:", err);
      setError("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">AI Diagnostic Assistant</h1>
            <p className="text-blue-100">Clinical Decision Support</p>
          </div>
          <div className="text-right text-sm opacity-80">
            Connected to Database 🟢
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <label className="block text-slate-700 font-semibold mb-2">Patient Symptoms</label>
          <textarea
            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32 text-lg"
            placeholder="E.g., 45yo male, chest pain..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`mt-4 w-full py-4 rounded-xl text-white font-bold text-lg transition-all
              ${loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}
            `}
          >
            {loading ? 'Analyzing...' : 'Analyze Clinical Data'}
          </button>
          
          {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">{error}</div>}
        </div>

        {result && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-slate-800">Analysis Result</h2>
              
              {/* --- NEW SAVE BUTTON --- */}
              <button 
                onClick={handleSave}
                disabled={saving || saveStatus !== null}
                className={`px-6 py-2 rounded-lg font-bold text-white transition-all 
                  ${saveStatus ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'}
                `}
              >
                {saving ? 'Saving...' : saveStatus ? saveStatus : '💾 Save to History'}
              </button>
            </div>
            
            <div 
              className="prose prose-blue max-w-none text-slate-700"
              dangerouslySetInnerHTML={{ __html: result }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}