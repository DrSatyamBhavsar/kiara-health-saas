import React from 'react';
import Link from 'next/link';
import './globals.css';
import { Metadata } from 'next';

// This metadata object defines the title and SEO settings
export const metadata: Metadata = {
  title: 'Kiara Health SaaS',
  description: 'AI-Powered Clinical Support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        {/* --- GLOBAL NAVIGATION BAR --- */}
        <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* CLICKABLE LOGO AREA */}
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                K
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                Kiara<span className="text-blue-600">Health</span>
              </span>
            </Link>

            {/* NAVIGATION LINKS */}
            <div className="flex gap-6">
              <Link 
                href="/diagnostics" 
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                + New Diagnosis
              </Link>
              <Link 
                href="/history" 
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Patient History
              </Link>
            </div>

            {/* PROFILE INDICATOR */}
            <div className="text-sm text-slate-500 font-medium">
              Dr. Satyamkumar
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}