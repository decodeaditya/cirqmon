const exportToCode = (maxQubits, circuitInstructions) => {

    // qiskit code (may be later i will add import openqasm instead)

    const code = `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# 1. Create a Quantum Circuit with ${maxQubits} qubit
qc = QuantumCircuit(${maxQubits})
${circuitInstructions.map(item => `qc.${item.gate}(${item.target})`).join('\n')}

# 3. Measure the qubit and store the result
qc.measure_all()

 # 4. Simulate the circuit
sampler = StatevectorSampler()
job = sampler.run([qc], shots=1024)
result = job.result()
pub_result = result[0]

print("Measurement Counts:", pub_result.data.meas.get_counts())`

    return code

}

const canvasToJSON = (circuit) => {

    const circuitInstructions = []

    const maxQubits = Object.keys(circuit).length

    Object.keys(circuit).forEach((qubitId) => {
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

    return { circuitInstructions, maxQubits }

}

export { exportToCode, canvasToJSON }


