import React, { useState } from 'react';
import GatesButton from './GatesButton';
import gates from '../variables/gates';
import GatesInfo from './GatesInfo';
import imgOpen from '../assets/quantumTray/quantumTrayOpen.png';
import imgClose from '../assets/quantumTray/quantumTrayClose.png';

const QuantumGatesTray = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inspectedGate, setInspectedGate] = useState(null);

    const gateClicked = (e, gateId) => {
        console.log(`Gate clicked: ${gateId}`);
        const gate = gates.find((g) => g.id === gateId);
        setInspectedGate(gate);
    }

    const onCloseLore = () => {
        setInspectedGate(null);
    }


    return (
       <>
        <div className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[9999] flex flex-row items-center gap-2.5 sm:gap-3 select-none pointer-events-none">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto group p-2 bg-[#FFF275] border-4 border-black text-black select-none rounded-[15px_50px_20px_45px/45px_20px_50px_15px] -rotate-1 hover:rotate-0 transition-all duration-300 shadow-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 overflow-hidden cursor-pointer"
            >
                <img
                    src={isOpen ? imgClose : imgOpen}
                    alt="Toggle Tray"
                    className={` w-18 h-18 object-contain transition-transform duration-300 p-2 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                />
            </button>

            <div
                className={`pointer-events-auto flex flex-row items-center gap-2 sm:gap-2.5 p-2 sm:p-3 bg-[#FFF8F0] border-4 border-black rounded-2xl sm:rounded-3xl shadow-[6px_6px_0px_0px_#000] transition-all duration-300 ease-out origin-left max-w-[calc(100vw-5.5rem)] sm:max-w-none overflow-x-auto no-scrollbar ${isOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 -translate-x-6 pointer-events-none'
                    }`}
            >
                <div className="flex flex-col border-r-4 border-black/10 pr-2 py-1 justify-center shrink-0 select-none">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-black leading-none">Quantum</span>
                    <span className="text-[7px] font-bold text-black/90 tracking-tighter mt-0.5 block">Gates</span>
                </div>

                {gates.map((g) => (
                    <GatesButton key={g.id} g={g} gateClicked={gateClicked} />
                ))}
            </div>
        </div>
        <GatesInfo inspectedGate={inspectedGate} onCloseLore={onCloseLore} />
       </>
    );
};

export default QuantumGatesTray;