
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../firebase'; // Updated import path
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SmartPatientRegistration = () => {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [abhaId, setAbhaId] = useState('');

  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      setName('Rajesh Kumar');
      setAge('45');
      setGender('Male');
      setPhone('9876543210');
      setAbhaId('91-2345-6789-00');
      setIsScanning(false);
    }, 2000);
  };

  const handleSaveClick = async () => {
    if (!name || !age || !phone) {
        alert('Please fill all manual entry fields.');
        return;
    }

    try {
        await addDoc(collection(db, 'patients'), {
            name: name,
            age: age,
            gender: gender,
            phone: phone,
            abhaId: abhaId,
            timestamp: serverTimestamp(),
        });
        alert('Patient Saved! Token Generated.');
        router.push('/');
    } catch (error) {
        console.error("Error adding document: ", error);
        alert('Error: Could not save patient data.');
    }
  };


  return (
    <>
      {isScanning && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-2xl text-center">
            <h3 className="text-3xl font-bold mb-4">Scanning ABHA QR...</h3>
            <p className="text-lg text-gray-600">Please wait while we fetch the details.</p>
          </div>
        </div>
      )}

      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">New Patient Entry</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Quick Import</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={handleScanClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300">Scan ABHA QR</button>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300">Enter Mobile No.</button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300">Enter Aadhar</button>
            </div>
          </div>

          <div className="my-8 border-t border-gray-300"></div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-700">Manual Entry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-800 mb-2">Full Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg text-lg" placeholder="e.g., John Doe" />
              </div>
              <div>
                <label htmlFor="age" className="block text-lg font-medium text-gray-800 mb-2">Age</label>
                <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg text-lg" placeholder="e.g., 42" />
              </div>
              <div>
                <label htmlFor="gender" className="block text-lg font-medium text-gray-800 mb-2">Gender</label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg text-lg bg-white">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-gray-800 mb-2">Phone Number</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg text-lg" placeholder="e.g., 9876543210" />
              </div>
               <div>
                <label htmlFor="abhaId" className="block text-lg font-medium text-gray-800 mb-2">ABHA ID</label>
                <input type="text" id="abhaId" value={abhaId} readOnly className="w-full p-4 border border-gray-300 rounded-lg text-lg bg-gray-200" placeholder="Auto-filled from QR" />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button onClick={handleSaveClick} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-5 px-10 rounded-lg text-xl transform hover:scale-105 transition-transform duration-300">
              Save & Generate OPD Token
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default SmartPatientRegistration;
