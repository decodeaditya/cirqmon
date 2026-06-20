import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [doorPeek, setDoorPeek] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#111827] font-mono flex flex-col justify-between p-6 md:p-12 selection:bg-[#0081FF] selection:text-white">
      
      {/* TOP NAVIGATION */}
      <header className="max-w-4xl mx-auto w-full flex justify-between items-center border-b-4 border-black pb-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#0081FF] border-2 border-black shadow-[2px_2px_0px_#000]" />
          <span className="font-black text-2xl tracking-tight">Cirqmon <span className="text-xs bg-[#FFD900] px-2 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_#000] -rotate-2 inline-block">Building</span></span>
        </div>

     
      </header>

      {/* CENTER HERO */}
      <main className="max-w-2xl mx-auto my-auto py-12 text-center space-y-8">
    

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08]">
          Quantum computing without the enterprise dread.
        </h1>

        <p className="text-base sm:text-lg text-gray-600 font-sans mx-auto leading-relaxed">
         If you've ever felt that quantum computing is too complex, too expensive, or too intimidating, you're not alone. Cirqmon is here to change that. You will build Circuits while feeling warmth of Japanese Manga. Contribute to the project and be part of a community.
        </p>


        <div className="pt-4 max-w-md mx-auto space-y-2">
          <p className="text-sm text-gray-500">
            If you're interested in the project. Leave a star on GitHub!
          </p>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 border-t-2 border-black/10 pt-6 gap-4 font-sans font-medium">
        <div>Cirqmon - Build Quantum Circuits with Doremon</div>
        <div className="flex gap-6 font-mono font-black text-black">
          <a href="https://github.com/decodeaditya/cirqmon/" target="_blank" rel="noreferrer" className="hover:text-[#0081FF] transition-colors">GITHUB</a>
        </div>
      </footer>

    </div>
  );
}