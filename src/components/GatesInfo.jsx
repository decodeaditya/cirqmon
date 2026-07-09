import React from 'react'
import logo from "../assets/logo.png"

const GatesInfo = ({ inspectedGate, onCloseLore }) => {
    return (
        <div className="fixed sm:absolute z-9999 bottom-6 left-6 right-6 sm:bottom-auto sm:left-auto sm:top-6 sm:right-6">

            {!inspectedGate ? (
                <div className=" select-none pointer-events-none hidden sm:block">
                    <img src={logo} alt="sticker" className="w-25" />
                </div>
            ) : (

                <div className="pointer-events-auto bg-[#25A7E2] max-w-md border-4 border-black rounded-xl p-5 transition-all duration-200 animate-in fade-in zoom-in-90">

                    <div className="flex items-center justify-between pb-3 mb-3 border-b-4 border-black/15">
                        <span className="font-black text-black text-xs uppercase tracking-widest px-2 py-0.5  border-2 border-black rounded bg-[#FFD900]">
                            {inspectedGate.easyName || "Quantum Gate"}
                        </span>
                        <button
                            onClick={onCloseLore}
                            className="w-7 h-7 bg-[#E53229] hover:bg-red-600 active:translate-x-0.5 active:translate-y-0.5 text-white font-black rounded-full border-2 border-black flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_#000] active:shadow-none"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-14 h-14 ${inspectedGate.bg} border-3 border-black rounded-2xl flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_0px_#000] -rotate-6`}>
                            {inspectedGate.name}
                        </div>
                        <div>
                            <h4 className="font-black text-2xl leading-none text-black tracking-tight">{inspectedGate.id.toUpperCase()}-Gate</h4>
                        </div>
                    </div>

                    <div className="bg-white border-3 border-black rounded-2xl p-3 shadow-inner">
                        <p className="text-xs font-bold text-zinc-800 leading-relaxed">
                            {inspectedGate.work || "Put this gate on a qubit to make it question its entire reality and exist in two places at once."}
                        </p>
                    </div>

                    <div className="mt-3 items-center gap-1.5 font-black tracking-tight text-black bg-[#FFD900] border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_0px_#000]">
                        <p>Representation:</p>
                        <p className="font-bold p-2 bg-white border-2 border-black rounded-2xl mt-1 ">
                            {inspectedGate.ascii || "No ASCII representation available."}
                        </p>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1 border-t-4  mt-3 pt-3 font-black tracking-tight text-black bg-[#FFD900] border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_0px_#000]">
                      <iframe className="w-full h-48 rounded-xl border-2 border-black"
                        src={inspectedGate.video || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                        title="Gate Video"/>
                    </div>

                </div>
            )}

        </div>

    )
}

export default GatesInfo