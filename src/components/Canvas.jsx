import React from 'react'
import useSound from 'use-sound'
import CircuitBox from '../tools/CircuitBox'
import eggMan from '../assets/eggman.png'

const Canvas = ({  circuit, setCircuit,removeGate }) => {
    return (
        <>
            <div className={`min-w-3/4 min-h-[80%] relative bg-white/20 backdrop-blur-md border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6`}>
                <div className="absolute bottom-0 left-0 rotate-6 select-none -translate-x-1/2 -translate-y-1/2 hover:rotate-0 hover:scale-125 transition-transform duration-300">
                    <img src={eggMan} alt="sticker" className="w-16" />
                </div>

                <CircuitBox height={"full"} width={"full"} circuit={circuit} setCircuit={setCircuit} removeGate={removeGate}/>

            </div>
        </>
    )
}

export default Canvas