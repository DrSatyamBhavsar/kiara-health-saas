"use client";

import React, { useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { jsPDF } from "jspdf"; // <--- NEW: Import PDF tool

const API_KEY = "AIzaSyCm3EYpgraak6tHjbA1XMqzmHIhTPaXTRY"; 

export default function AIDiagnosticsPage() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!symptoms) return;
    setLoading(true);
    setResult(null);
    setError(null);
    setSaveStatus(null);

    try {
      const prompt = `Act as a Senior Chief Medical Officer. Analyze: "${symptoms}". 
      Format: Clean text with headers for Diagnosis, Tests, and Red Flags. No HTML tags for PDF compatibility.`;
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      const data = await response.json();
      setResult(data.candidates[0].content.parts[0].text);
    } catch (err: any) {
      setError("Analysis Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: PDF DOWNLOAD FUNCTION ---
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Kiara Health - Clinical Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Patient Symptoms: ${symptoms}`, 20, 40);
    doc.line(20, 45, 190, 45); // Draw a line
    
    // Split text so it doesn't run off the page
    const splitText = doc.splitTextToSize(result || "", 170);
    doc.text(splitText, 20, 55);
    
    doc.save("Clinical_Report.pdf");
  };

  const handleSave = async () => {
    if (!result || !symptoms) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "patient_reports"), {
        symptoms,
        diagnosisHtml: result,
        createdAt: serverTimestamp(),
        doctor: "Dr. Satyamkumar",
        status: "Completed"
      });
      setSaveStatus("✅ Saved!");
    } catch (err) {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold">AI Diagnostic Assistant</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <textarea
            className="w-full p-4 border rounded-xl h-32"
            placeholder="Describe symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            className="mt-4 w-full py-4 bg-blue-600 text-white rounded-xl font-bold"
          >
            {loading ? 'Analyzing...' : 'Analyze Symptoms'}
          </button>
        </div>

        {result && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500">
            <div className="flex gap-2 mb-6">
              <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold">
                {saveStatus || 'Save to History'}
              </button>
              {/* PDF BUTTON */}
              <button onClick={handleDownloadPDF} className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold">
                📥 Download PDF
              </button>
            </div>
            <div className="whitespace-pre-wrap text-slate-700">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}