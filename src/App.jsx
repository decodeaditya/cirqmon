import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [bgm, setBgm] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [doorPeek, setDoorPeek] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Overwrite this later with a standard Formspree / Web3Forms POST endpoint
    console.log("Pocketed email:", email);
    setSubmitted(true);
  };

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

        <p className="text-base sm:text-lg text-gray-600 font-sans max-w-xl mx-auto leading-relaxed">
         If you've ever felt that quantum computing is too complex, too expensive, or too intimidating, you're not alone. Cirqmon is here to change that. You will build Circuits while feeling warmth of Japanese Manga. Wait for it, Contribute to the project and be part of a community.
        </p>


        {/* EMAIL CAPTURE */}
        <div className="pt-4 max-w-md mx-auto space-y-2">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input 
              type="email" 
              required
              disabled={submitted}
              placeholder="nobita@hackclub.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-white border-4 border-black px-4 py-3 rounded-2xl font-mono text-xs font-bold shadow-[4px_4px_0px_#000] focus:outline-none focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-[2px_2px_0px_#000] transition-all disabled:bg-gray-100"
            />
            <button 
              type="submit"
              disabled={submitted}
              className={`border-4 border-black px-6 py-3 rounded-2xl font-black text-xs tracking-wider transition-all cursor-pointer ${
                submitted 
                  ? 'bg-[#00C853] text-white shadow-none translate-x-1 translate-y-1' 
                  : 'bg-[#FF334B] hover:bg-[#e0263c] text-white shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none'
              }`}
            >
              {submitted ? "✓ POCKETED" : "NOTIFY ME"}
            </button>
          </form>
         
        </div>

      </main>

      {/* FOOTER */}
      <footer className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 border-t-2 border-black/10 pt-6 gap-4 font-sans font-medium">
        <div>Assembling in a 22nd-Century desk drawer.</div>
        <div className="flex gap-6 font-mono font-black text-black">
          <a href="https://github.com/decodeaditya/cirqmon/" target="_blank" rel="noreferrer" className="hover:text-[#0081FF] transition-colors">GITHUB</a>
          <a href="https://x.com/your-username" target="_blank" rel="noreferrer" className="hover:text-[#FF334B] transition-colors">X (TWITTER)</a>
        </div>
      </footer>

    </div>
  );
}