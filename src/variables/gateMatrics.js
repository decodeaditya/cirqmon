// [a,b] here a is real and b is imaginary number, imaginary is needed because its for phase and interferences

// IDEA is simple, you merge the gates with actually are matrics using tensors and then you just step by step multiplies by state vector and tensor of each step; Will write blog on this
// will optimise for multi Qubits

const zero = [1, 0];
const one = [0, 0];

const gateMatrics = {

    // its for single Qubits for now.

    H: [
        [[1 / Math.sqrt(2), 0], [1 / Math.sqrt(2), 0]],
        [[1 / Math.sqrt(2), 0], [-1 / Math.sqrt(2), 0]]
    ],

    X: [
        [[0, 0], [1, 0]],
        [[1, 0], [0, 0]]
    ],

    Y: [
        [[0, 0], [0, -1]],
        [[0, 1], [0, 0]]
    ],

    Z: [
        [[1, 0], [0, 0]],
        [[0, 0], [-1, 0]]
    ],

    S: [
        [[1, 0], [0, 0]],
        [[0, 0], [0, 1]]
    ],

    T: [
        [[1, 0], [0, 0]],
        [[0, 0], [1 / Math.sqrt(2), 1 / Math.sqrt(2)]]
    ]
    ,
    I: [
        [[1, 0], [0, 0]],
        [[0, 0], [1, 0]]
    ]
};


function initializeStateVector(numQubits) {

    const size = Math.pow(2, numQubits);
    const stateVector = new Array(size).fill(null).map(() => [0, 0]);

    stateVector[0] = [1, 0];

    return stateVector;
}

// needed because JS cant handle complex multiplication. but math is simple as we do for normal (a+b)(a-b) type

const calcCompNum = (complex1, complex2) => {

    const [a, b] = complex1;
    const [c, d] = complex2;

    return [a * c - b * d, a * d + b * c];
}

// this is responsible for merging the gates in each step, and in real its only responsible as we increase no of qubits it slows calculation as it iterates again and again 

const tensorProduct = (matrixA, matrixB) => {
    const rA = matrixA.length;
    const cA = matrixA[0].length;
    const rB = matrixB.length;
    const cB = matrixB[0].length;

    const resultRow = rA * rB;
    const resultCol = cA * cB;

    const result = new Array(resultRow).fill(null).map(() => new Array(resultCol));

    for (let i = 0; i < rA; i++) {
        for (let j = 0; j < cA; j++) {
            for (let k = 0; k < rB; k++) {
                for (let l = 0; l < cB; l++) {
                    const row = i * rB + k;
                    const col = j * cB + l;
                    result[row][col] = calcCompNum(matrixA[i][j], matrixB[k][l]);
                }
            }
        }
    }
    return result;
}

// this one implements the tensor function step by step if no gate it assumes Identity gate

const buildStepMatrix = (noOfQubits, allGatesInStep) => {
    const initialGate = allGatesInStep[0] || 'I';
    let runningStepMatrix = gateMatrics[initialGate.toUpperCase()];

    for (let i = 1; i < noOfQubits; i++) {
        const gateType = allGatesInStep[i] || 'I';
        const currentGateMatrix = gateMatrics[gateType.toUpperCase()];
        runningStepMatrix = tensorProduct(runningStepMatrix, currentGateMatrix);
    }
    return runningStepMatrix;
}

// for Columns(stateVector and tensor product)

const multiplyMatrixVector = (matrix, vector) => {

    const size = vector.length;
    const newVector = new Array(size).fill(null).map(() => [0, 0]);

    for (let i = 0; i < size; i++) {

        let sum = [0, 0];

        for (let j = 0; j < size; j++) {
            const product = calcCompNum(matrix[i][j], vector[j]);
            sum = [sum[0] + product[0], sum[1] + product[1]];
        }
        
        newVector[i] = sum;
    }
    return newVector;
}

// final function

const runSimulator = (numQubits, rawCircuit) => {
    let stateVector = initializeStateVector(numQubits);

    if (rawCircuit.length === 0) return stateVector;

    const maxStep = Math.max(...rawCircuit.map(c => c.step));

    for (let step = 0; step <= maxStep; step++) {
        const gatesInThisStep = {};
        rawCircuit.filter(c => c.step === step).forEach(c => { gatesInThisStep[c.target] = c.gate; });

        const stepMatrix = buildStepMatrix(numQubits, gatesInThisStep);
        stateVector = multiplyMatrixVector(stepMatrix, stateVector);
    }

    return stateVector;
}

export default runSimulator;

