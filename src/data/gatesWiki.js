// Demo info by AI (Needs to update in next version)

const gates = [
  {
    id: 'h',
    name: 'H',
    bg: 'bg-[#FF6B6B]',
    text: 'text-white',
    easyName: 'Superposition',
    work: 'Puts a qubit into a 50/50 coin-flip state of |0⟩ and |1⟩.',
    undo: 'Applying it twice collapses the qubit back to its original state.',
  },
  {
    id: 'x',
    name: 'X',
    bg: 'bg-[#4ECDC4]',
    text: 'text-black',
    easyName: 'Bit Flipper',
    work: 'Flips |0⟩ to |1⟩, or |1⟩ to |0⟩. The classic NOT gate.',
    undo: 'Applying it twice brings you back to the start.'
  },
  {
    id: 'y',
    name: 'Y',
    bg: 'bg-[#5F27CD]',
    text: 'text-white',
    easyName: 'Axis Twister',
    work: 'Acts like a combination of X and Z with a phase change.',
    undo: 'Applying it twice returns the qubit to its original state up to phase.'
  },
  {
    id: 'z',
    name: 'Z',
    bg: 'bg-[#FFE66D]',
    text: 'text-black',
    easyName: 'Phase Flipper',
    work: 'Flips the phase sign from plus to minus (invisible to probes).',
    undo: 'Applying it twice resets the phase angle.'
  },
  {
    id: 's',
    name: 'S',
    bg: 'bg-[#1DD1A1]',
    text: 'text-black',
    easyName: 'Phase Quarter-Turn',
    work: 'Adds a 90-degree phase shift to the |1⟩ state.',
    undo: 'Applying it four times returns to the original state.'
  },
  {
    id: 't',
    name: 'T',
    bg: 'bg-[#F368E0]',
    text: 'text-white',
    easyName: 'Phase Eighth-Turn',
    work: 'Adds a 45-degree phase shift to the |1⟩ state.',
    undo: 'Applying it eight times returns to the original state.'
  }
];

export default gates;