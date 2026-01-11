
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from './firebase'; // Correct path
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const Sidebar = () => (
  <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
    <div className="text-2xl font-bold mb-10">Kiara</div>
    <nav>
      <ul>
        <li className="mb-4"><a href="#" className="hover:text-gray-300">Dashboard</a></li>
        <li className="mb-4"><a href="#" className="hover:text-gray-300">Patients</a></li>
        <li className="mb-4"><a href="#" className="hover:text-gray-300">Claims</a></li>
        <li className="mb-4"><a href="#" className="hover:text-gray-300">AI Hub</a></li>
        <li className="mb-4"><a href="#" className="hover:text-gray-300">Analytics</a></li>
      </ul>
    </nav>
  </aside>
);

const Header = () => (
  <header className="bg-white shadow-md p-4 flex justify-end items-center">
    <div className="text-lg font-semibold">Dr. Satyam</div>
  </header>
);

const Card = ({ title, subtext, icon, bgColor, textColor }) => (
  <div className={`${bgColor} ${textColor} rounded-lg shadow-lg p-6 flex flex-col justify-between h-48 transform hover:scale-105 transition-transform duration-300 cursor-pointer`}>
    <div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-sm">{subtext}</p>
    </div>
    <div className="self-end">
      {icon}
    </div>
  </div>
);

const UserPlusSyncIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 11a2 2 0 104 0 2 2 0 00-4 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.466 16.534a1 1 0 01-1.414 0l-1.05-1.05a.5.5 0 00-.707 0l-1.05 1.05a1 1 0 01-1.414-1.414l1.05-1.05a.5.5 0 000-.707l-1.05-1.05a1 1 0 111.414-1.414l1.05 1.05a.5.5 0 00.707 0l1.05-1.05a1 1 0 111.414 1.414l-1.05 1.05a.5.5 0 000 .707l1.05 1.05a1 1 0 010 1.414z" />
    </svg>
);

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3c1.952 0 3.5 1.548 3.5 3.5 0 .734-.236 1.406-.638 1.956a4.5 4.5 0 00-2.862 4.044V17M12 3c-1.952 0-3.5 1.548-3.5 3.5 0 .734.236 1.406.638 1.956a4.5 4.5 0 012.862 4.044V17" />
    </svg>
);

const StethoscopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M9 4v16M15 4v16" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4h6M9 20h6" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.955a12.02 12.02 0 009 2.045 12.02 12.02 0 009-2.045c0-2.62-.72-5.096-2.045-7.155A11.955 11.955 0 0118.382 5.984z" />
    </svg>
);


const HomePage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'patients'), orderBy('timestamp', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const patientsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        patientsData.push({
          id: doc.id,
          name: data.name,
          age: data.age,
          gender: data.gender,
          abhaId: data.abhaId || 'N/A',
        });
      });
      setPatients(patientsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-6">Mission Control</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/register">
                <Card title="Register & Sync Patient" subtext="Import Data via ABHA / Aadhar / Mobile / HMS" icon={<UserPlusSyncIcon />} bgColor="bg-emerald-600" textColor="text-white" />
            </Link>
            <Link href="/diagnostics">
              <Card title="AI Diagnostics" subtext="Gold Standard Symptom Check" icon={<BrainIcon />} bgColor="bg-blue-600" textColor="text-white" />
            </Link>
            <Card title="AI Treatment Protocols" subtext="Generate Prescriptions" icon={<StethoscopeIcon />} bgColor="bg-purple-600" textColor="text-white" />
            <Card title="PMJAY Insurance Claims" subtext="One-Click Settlement" icon={<ShieldIcon />} bgColor="bg-yellow-500" textColor="text-black" />
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Recent Synced Patients</h2>
            <div className="bg-white shadow-md rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">ABHA ID</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{patient.name}</td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{patient.age}</td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{patient.gender}</td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{patient.abhaId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
