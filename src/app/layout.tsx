import React from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata = {
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
            
            {/* Logo Area */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                K
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                Kiara<span className="text-blue-600">Health</span>
              </span>
            </div>

            {/* Navigation Links */}
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

            {/* Profile / Logout Placeholder */}
            <div className="text-sm text-slate-500">
              Dr. Satyamkumar
            </div>
          </div>
        </nav>

        {/* --- PAGE CONTENT GOES HERE --- */}
        <main className="pt-4">
          {children}
        </main>
      </body>
    </html>
  );
}