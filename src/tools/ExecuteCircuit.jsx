import React, { useState } from 'react'
import runSimulator from '../variables/gateMatrics'

const ExecuteCircuit = ({ circuit, qiskitCode, results }) => {

    const circuitInstructions = []
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [pythonCode, setCode] = useState("#nothing in console")

    const [states, setStates] = useState([])

    const executeButtonClicked = async () => {

        const maxQubit = Object.keys(circuit).length

        await Object.keys(circuit).forEach((qubitId) => {
            circuit[qubitId].forEach((gateId, stepId) => {
                if (gateId) {
                    circuitInstructions.push({
                        gate: gateId,
                        target: parseInt(qubitId),
                        step: stepId
                    })
                }
            })
        })

        const code = `from qiskit import QuantumCircuit
                    from qiskit.primitives import StatevectorSampler

                    # 1. Create a Quantum Circuit with ${maxQubit} qubit
                    qc = QuantumCircuit(${maxQubit})

                    ${circuitInstructions.map(item => `qc.${item.gate}(${item.target})`).join('\n')}

                    # 3. Measure the qubit and store the result
                    qc.measure_all()

                    # 4. Simulate the circuit
                    sampler = StatevectorSampler()
                    job = sampler.run([qc], shots=1024)
                    result = job.result()
                    pub_result = result[0]

                    print("Measurement Counts:", pub_result.data.meas.get_counts())
                    `

        const statevector = runSimulator(maxQubit, circuitInstructions)

        const tempState = []

        statevector.forEach((amplitude, index) => {
            const probability = Math.pow(amplitude[0], 2) + Math.pow(amplitude[1], 2);

            tempState.push([
                index.toString(2).padStart(maxQubit, '0'),
                probability.toFixed(2)
            ])

        })

        setStates(tempState)

        setCode(code)

        setIsModalOpen(!isModalOpen)

    }


    return (
        <div className="absolute bottom-8 right-10">
            <ExecuteButton whenClicked={executeButtonClicked} />
            {isModalOpen && <ExecuteModal sortedStates={states} isOpen={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} qiskitCode={pythonCode} />}

        </div>
    )
}

const ExecuteButton = ({ whenClicked }) => {

    const isExecuting = false

    return (

        <button
            onClick={whenClicked}
            className="cursor-pointer disabled:cursor-not-allowed select-none border-none bg-transparent p-0"
        >
            <div className="w-20 h-20 bg-blue-50 rounded-full relative shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.3),2px_3px_5px_rgba(0,0,0,0.1)] flex items-center justify-center">
                <div className="absolute w-18 h-18 z-10 bg-black rounded-full left-1/2 -translate-x-1/2 top-2 blur-[1px]"></div>

                <div className={`
          group absolute w-18h-18 rounded-full left-1/2 -translate-x-1/2 top- z-20 flex items-center justify-center transition-all duration-150
          shadow-[inset_0px_4px_2px_#60a5fa,inset_0px_-4px_0px_#1e3a8a,0px_0px_2px_rgba(0,0,0,1)]
                    'bg-gradient-to-b from-blue-600 to-blue-400 active:shadow-[inset_0px_4px_2px_rgba(96,165,250,0.5),inset_0px_-4px_2px_rgba(37,99,235,0.5),0px_0px_2px_rgba(0,0,0,1)] active:translate-y-1.6
                    
        `}>
                    <div className="w-8 group-active:w-8 fill-blue-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)] flex items-center justify-center">
                        {isExecuting ? (
                            <svg className="animate-spin w-8 h-8 text-blue-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-8 h-8 ml-1" xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24">
                                <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"></path>
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </button>
    )
}

const ExecuteModal = ({ isOpen, onClose, qiskitCode, sortedStates }) => {

    const [copied, setCopied] = useState(false)

    const copyCode = () => {
        navigator.clipboard.writeText(qiskitCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div style={{ top: isOpen ? "-100" : "0" }} className="fixed inset-0 z-99999 bg-black/60 flex backdrop-blur-sm items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-150 h-full">

            <div className='bg-[#FFF8F0] border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_#000] w-full h-full flex flex-col overflow-hidden'>
                <div className="flex items-center justify-between border-b-4 border-black px-6 py-4 bg-[#51a1c4]">

                    <div className="flex items-center gap-2.5">
                        <h2 className="font-black text-xl tracking-tight text-black">Circuit Run Results</h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-white border-3 border-black rounded-xl font-black text-lg hover:bg-yellow-500 active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all flex items-center justify-center cursor-pointer"
                    >
                        ✕
                    </button>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black overflow-y-auto flex-1">

                    {/* Code Half */}
                    <div className="p-6 flex flex-col gap-3 bg-[#18181B] text-white">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs font-bold text-gray-400 uppercase">Qiskit Program</span>
                            <button
                                onClick={copyCode}
                                className="px-3 py-1 bg-[#27272A] hover:bg-[#3F3F46] border border-gray-600 rounded text-xs font-mono font-bold transition-colors cursor-pointer text-white"
                            >
                                {copied ? 'COPIED!' : 'COPY SCRIPT'}
                            </button>
                        </div>

                        <div className="flex-1 bg-black p-4 rounded-xl border border-gray-800 font-mono text-sm text-[#00E599] overflow-x-auto overflow-y-auto whitespace-pre leading-relaxed select-text max-h-120">
                            {qiskitCode || "# No instructions mapped"}
                        </div>
                    </div>

                    {/* Graph Part */}
                    <div className="p-6 flex flex-col gap-4 bg-white">
                        <div className="flex justify-between items-end border-b-2 border-black/10 pb-2">
                            <span className="font-black text-sm uppercase text-black">What actually happened</span>
                            <span className="font-mono text-xs font-bold text-gray-500"> Active States</span>
                        </div>

                        <div className="flex flex-col gap-3.5 overflow-y-auto max-h-106 pr-1">
                            {sortedStates.length === 0 ? (
                                <div className="text-gray-400 font-mono text-sm py-12 text-center">Zero states measured.</div>
                            ) : (
                                sortedStates.map(([state, prob]) => {
                                    const pct = (prob * 100).toFixed(1);
                                    return (
                                        <div key={state} className="flex flex-col gap-1 font-mono">
                                            <div className="flex justify-between text-xs font-black text-black">
                                                <span className="bg-black text-white px-2 py-0.5 rounded tracking-widest">|{state}⟩</span>
                                                <span>{pct}% <span className="text-gray-400 font-normal">({prob})</span></span>
                                            </div>

                                            <div className="w-full bg-gray-100 h-6 rounded-lg border-2 border-black p-0.5 overflow-hidden flex items-center">
                                                <div
                                                    className="bg-[#FF90E8] h-full rounded border border-black transition-all duration-500 ease-out"
                                                    style={{ width: `${Math.max(pct, 1.5)}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                </div>

                <div className="py-3 px-6 bg-[#ddb551] border-t-4 border-black flex justify-between items-center">

                    <a
                        href="https://quantum.ibm.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-black underline hover:text-blue-600 cursor-pointer"
                    >
                        Export to IBM Quantum Lab ↗
                    </a>
                </div>
            </div>

        </div>
    )
}

export default ExecuteCircuit