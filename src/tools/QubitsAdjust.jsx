import React, { useState } from 'react';

const QubitsAdjust = ({ qCount, nCount, addQubit, removeQubit, addNode, removeNode }) => {

    return (
        <>
            <div className="flex items-center justify-between border-b-4 border-black/10 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-black">Edit Canvas</span>
                <span className="font-mono font-black text-xs px-2 py-0.5 bg-white border-2 border-black rounded shadow-sm">
                    {qCount}×{nCount}
                </span>
            </div>

            <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-black uppercase text-zinc-400">▲ Wires (Y-Axis)</span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => removeQubit()}
                        disabled={qCount <= 1}
                        className="w-11 h-11 bg-[#FF5757] text-white font-black text-xl rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:grayscale disabled:shadow-none disabled:cursor-not-allowed"
                    >
                        -
                    </button>

                    <div className="flex-1 py-2 bg-black text-[#00E599] font-mono font-black text-center text-base rounded-xl border-2 border-black">
                        {qCount}
                    </div>

                    <button
                        onClick={() => addQubit()}
                        disabled={qCount >= 5}
                        className="w-11 h-11 bg-[#00E599] text-black font-black text-xl rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:grayscale disabled:shadow-none disabled:cursor-not-allowed"
                    >
                        +
                    </button>
                </div>
            </div>


            <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-black uppercase text-zinc-400">► Nodes (X-Axis)</span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => removeNode()}
                        disabled={nCount <= 4}
                        className="w-11 h-11 bg-[#FF5757] text-white font-black text-xl rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:grayscale disabled:shadow-none disabled:cursor-not-allowed"
                    >
                        -
                    </button>

                    <div className="flex-1 py-2 bg-black text-[#38B6FF] font-mono font-black text-center text-base rounded-xl border-2 border-black">
                        {nCount}
                    </div>

                    <button
                        onClick={() => addNode()}
                        disabled={nCount >= 6}
                        className="w-11 h-11 bg-[#38B6FF] text-black font-black text-xl rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:grayscale disabled:shadow-none disabled:cursor-not-allowed"
                    >
                        +
                    </button>
                </div>
            </div>
        </>
    );
};

export default QubitsAdjust;