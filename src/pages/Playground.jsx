import React, { useState } from 'react'
import Canvas from '../components/Canvas'
import Button from '../components/Button'
import QuantumGatesTray from '../components/QuantumGatesTray'
import QubitsAdjust from '../tools/QubitsAdjust'
import useSound from 'use-sound'
import background1 from '../assets/canvas_backgrounds/background_1.jpg'
import background2 from '../assets/canvas_backgrounds/background_2.jpg'
import background3 from '../assets/canvas_backgrounds/background_3.jpg'
import { DragDropProvider } from '@dnd-kit/react'
import audio_url from "../assets/audio/background_audio.mp3"


const Playground = () => {

    const backgrounds = [
        background1,
        background2,
        background3
    ]

    const [background, setBackground] = useState(backgrounds[0]);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [qubitsAdjustOpen, setQubitsAdjustOpen] = useState(false);

    const [play, { stop }] = useSound(audio_url, { volume: 0.5, loop: true, });

    const changeBackground = () => {
        setBackground(backgrounds[(backgrounds.indexOf(background) + 1) % backgrounds.length]);
    };

    const manageMusic = async() => {
        await setMusicPlaying(!musicPlaying);

        if (!musicPlaying) {
            play();
        } else {
            stop();
        }
    }

    const toggleQubitsAdjust = () => {
        setQubitsAdjustOpen(!qubitsAdjustOpen);
    }


    const buttons = [
        { id: 1, text: 'Music', icon: '🎶', color: 'bg-[#FF5757]', onclick: manageMusic },
        { id: 2, text: 'Snapshot', icon: '🎾', color: 'bg-[#FFDE59]', onclick: () => { } },
        { id: 3, text: 'Scenery', icon: '🏡', color: 'bg-[#38B6FF]', onclick: changeBackground },
        { id: 4, text: 'Qubits', icon: '🔬', color: 'bg-[#ECA18A]', onclick: toggleQubitsAdjust },
    ]

    const [circuit, setCircuit] = useState({
        0: [null, null, null, null],
        1: [null, null, null, null],
        2: [null, null, null, null],
    });


    const addNewQubit = () => {

        const newQubitID = Object.keys(circuit).length;

        if (newQubitID >= 5) return; // Maximum 5 qubits for Now
        setCircuit((oldCircuit) => ({ ...oldCircuit, [newQubitID]: Array(circuit[0].length).fill(null) }));

    };

    const removeQubit = () => {

        const keys = Object.keys(circuit);

        if (keys.length <= 1) return; // Must have at least 1 Qubit

        const qubitToRemove = Number(keys[keys.length - 1]);

        setCircuit((oldCircuit) => {
            const copy = { ...oldCircuit };
            delete copy[qubitToRemove];
            return copy;
        });

    };

    const addCircuitNode = () => {
        const oldCircuit = { ...circuit };

        if (oldCircuit[0].length >= 6) return; // Maximum 6 steps for Now

        for (const key in oldCircuit) {
            oldCircuit[key].push(null);
        }

        setCircuit(oldCircuit);
    }

    const removeCircuitNode = () => {

        const oldCircuit = { ...circuit };

        if (oldCircuit[0].length <= 4) return;

        for (const key in oldCircuit) {
            oldCircuit[key].pop();
        }
        setCircuit(oldCircuit);
    }

    const handleDragEnd = (event) => {
        const { source, target } = event.operation;

        if (!source || !target) return;

        const gateId = String(source.id);
        const targetId = String(target.id);

        if (!targetId.startsWith('socket-')) return;

        const [_, qubitId, stepIdx] = targetId.split('-');

        setCircuit((prevCircuit) => {
            const nextCircuit = { ...prevCircuit };
            nextCircuit[qubitId] = [...prevCircuit[qubitId]];

            nextCircuit[qubitId][stepIdx] = gateId;

            return nextCircuit;
        });
    };

    const removeGate = (qubitId, stepId) => {
        setCircuit((prevCircuit) => {
            const nextCircuit = { ...prevCircuit };
            nextCircuit[qubitId] = [...prevCircuit[qubitId]];
            nextCircuit[qubitId][stepId] = null;
            return nextCircuit;
        });
    };

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>

            <div style={{ backgroundImage: `url(${background})` }} className={`bg-cover bg-center bg-no-repeat w-screen h-screen flex items-center justify-center p-6 relative transition-all duration-500`}>

                <QuantumGatesTray />

                <Canvas height="80%" width="3/4" circuit={circuit} setCircuit={setCircuit} removeGate={removeGate}/>

                <Sidebar buttons={buttons} />

                <QubitsAdjustSection
                    qCount={Object.keys(circuit).length}
                    nCount={circuit[0].length}
                    isOpen={qubitsAdjustOpen}
                    onClose={toggleQubitsAdjust}
                    addQubit={addNewQubit}
                    removeQubit={removeQubit}
                    addNode={addCircuitNode}
                    removeNode={removeCircuitNode}
                />


            </div>

        </DragDropProvider>
    )
}


const Sidebar = ({ buttons }) => {
    return (
        <div className="flex flex-col gap-4 justify-center w-[1/8] bg-white/40 backdrop-blur-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
            {buttons.map((btn) => (
                <Button key={btn.id} btn={btn} onClick={btn.onclick} />
            ))}
        </div>
    )
}

const QubitsAdjustSection = ({ qCount, nCount, isOpen, onClose, addQubit, removeQubit, addNode, removeNode }) => {
    return (
        <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end select-none pointer-events-none">

            {isOpen && (
                <div
                    className="fixed inset-0 z-[-1] pointer-events-auto"
                    onClick={onClose}
                />
            )}

            <div
                className={`
          pointer-events-auto mb-4 w-64 bg-[#FFF8F0] border-4 border-black rounded-3xl p-4 shadow-[8px_8px_0px_0px_#000] flex flex-col gap-4 transition-all duration-150 origin-bottom
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-8 pointer-events-none'}
        `}
            >
                <QubitsAdjust qCount={qCount} nCount={nCount} addQubit={addQubit} removeQubit={removeQubit} addNode={addNode} removeNode={removeNode} />
            </div>
        </div>
    )
}

export default Playground