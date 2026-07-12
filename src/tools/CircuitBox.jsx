import React from 'react';
import gates from '../data/gatesWiki';
import { useDroppable } from '@dnd-kit/react';

const DroppableSocket = ({ id, children }) => {
    const { ref, isOver } = useDroppable({ id });

    return (
        <div ref={ref} className={`relative transition-all duration-150 ${isOver ? 'scale-110' : ''}`}>
            {children}
        </div>
    );
};

const CircuitBox = ({ circuit, setCircuit, removeGate }) => {

    return (
        <div className="flex flex-col gap-12 p-6 sm:p-12 select-none">

            {Object.keys(circuit).map((qubitId) => (
                <div key={qubitId} className="relative flex items-center gap-4 sm:gap-6">

                    {/* It's Qubit Box*/}
                    <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white border-3 border-black/40 rounded-3xl flex flex-col items-center mr-4 justify-center shadow-[4px_4px_0px_0px_#000]">
                        <span className="absolute -top-2.5 px-2 py-0.5 font-mono text-[9px] font-black bg-black text-white rounded-full">
                            Q_{qubitId}
                        </span>
                        <span className="font-black text-2xl sm:text-3xl text-black">|0&rang;</span>
                    </div>

                    {/* Wire */}
                    <div className="relative flex-1 flex items-center justify-between gap-2 sm:gap-20 h-20">
                        <div className="absolute left-0 right-0 border-b-4 border-dashed border-black/40 -z-10" />

                        {Object.keys(circuit[qubitId]).map((stepID) => {

                            const placedGateId = circuit[qubitId][stepID];
                            const gateData = gates.find((g) => g.id === placedGateId);

                            return (
                                <DroppableSocket key={`${qubitId}-${stepID}`} id={`socket-${qubitId}-${stepID}`}>

                                    <div onClick={() => placedGateId && removeGate(qubitId, stepID)} className={`
                                        w-16 h-16 rounded-2xl cursor-pointer flex items-center justify-center border-3 border-black/20
                                      
                                        ${placedGateId
                                            ? `${gateData?.bg} ${gateData?.text} shadow-md/100 rounded-xs`
                                            : 'backdrop-blur-4xl border-dashed'
                                        }

                                    `}>
                                        {placedGateId && (
                                            <span className="font-black text-2xl sm:text-3xl">{gateData?.name}</span>
                                        )}
                                    </div>

                                </DroppableSocket>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CircuitBox;