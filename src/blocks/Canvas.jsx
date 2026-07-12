import React from 'react'
import CircuitBox from '../tools/CircuitBox'
import ExecuteCircuit from '../tools/ExecuteCircuit'

const Canvas = ({ circuit, setCircuit, removeGate }) => {
    return (
        <>
            <div className={`h-[90%] min-w-[60%] overflow-y-auto relative scrollbar-none bg-white/20 backdrop-blur-3xl border-3 z-100 border-black rounded-4xl transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                <CircuitBox height={"full"} width={"full"} circuit={circuit} setCircuit={setCircuit} removeGate={removeGate} />
            </div>
            
            <ExecuteCircuit circuit={circuit} />
        </>
    )
}

export default Canvas