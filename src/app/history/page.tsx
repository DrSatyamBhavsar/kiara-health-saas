"use client";

import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // <--- Connects to your centralized DB file
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function HistoryPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // 1. Ask Database for "patient_reports", sorted by newest first
        const q = query(collection(db, "patient_reports"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        // 2. Convert database result into a clean list
        const reportsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Patient Medical History</h1>

        {loading ? (
          <p className="text-slate-500">Loading records...</p>
        ) : reports.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
            <p className="text-slate-500">No medical records found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-600">
                      {/* Extract first few words of diagnosis or show 'Analysis' */}
                      Analysis Report
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {report.createdAt?.seconds ? new Date(report.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                    {report.status || 'Saved'}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Symptoms</p>
                  <p className="text-slate-700">{report.symptoms}</p>
                </div>

                {/* Show a preview of the HTML result (just a snippet) */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Diagnosis Preview</p>
                   <div 
                     className="text-slate-600 text-sm line-clamp-3" // limits to 3 lines
                     dangerouslySetInnerHTML={{ __html: report.diagnosisHtml }} 
                   />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}