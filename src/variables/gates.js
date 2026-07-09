const gates = [
  {
    id: 'h',
    name: 'H',
    bg: 'bg-[#FF6B6B]',
    text: 'text-white',
    easyName: 'Superposition',
    lore: 'Stepping into the gray area between true and false.',
    work: 'Puts a qubit into a 50/50 coin-flip state of |0⟩ and |1⟩.',
    ascii: '──[H]──',
    undo: 'Applying it twice collapses the qubit back to its original state.',
    task: 'Add an H gate to a |0⟩ qubit to make it a quantum coin-flip.'
  },
  {
    id: 'x',
    name: 'X',
    bg: 'bg-[#4ECDC4]',
    text: 'text-black',
    easyName: 'Bit Flipper',
    lore: 'The classic rebel of the quantum world.',
    work: 'Flips |0⟩ to |1⟩, or |1⟩ to |0⟩. The classic NOT gate.',
    ascii: '──[X]──',
    undo: 'Applying it twice brings you back to the start.',
    task: 'Try putting an X gate on a |0⟩ qubit to turn it into a |1⟩.'
  },
  {
    id: 'y',
    name: 'Y',
    bg: 'bg-[#5F27CD]',
    text: 'text-white',
    easyName: 'Axis Twister',
    lore: 'A flip with an extra phase twist.',
    work: 'Acts like a combination of X and Z with a phase change.',
    ascii: '──[Y]──',
    undo: 'Applying it twice returns the qubit to its original state up to phase.',
    task: 'Apply Y to a qubit and observe how it changes both state and phase.'
  },
  {
    id: 'z',
    name: 'Z',
    bg: 'bg-[#FFE66D]',
    text: 'text-black',
    easyName: 'Phase Flipper',
    lore: 'Altering the hidden rhythm.',
    work: 'Flips the phase sign from plus to minus (invisible to probes).',
    ascii: '──[Z]──',
    undo: 'Applying it twice resets the phase angle.',
    task: 'Apply an H gate first, then drop a Z to flip the phase arrow.'
  },
  {
    id: 's',
    name: 'S',
    bg: 'bg-[#1DD1A1]',
    text: 'text-black',
    easyName: 'Phase Quarter-Turn',
    lore: 'A neat quarter-turn in the phase space.',
    work: 'Adds a 90-degree phase shift to the |1⟩ state.',
    ascii: '──[S]──',
    undo: 'Applying it four times returns to the original state.',
    task: 'Use S on a superposition to shift the phase of the |1⟩ component.'
  },
  {
    id: 't',
    name: 'T',
    bg: 'bg-[#F368E0]',
    text: 'text-white',
    easyName: 'Phase Eighth-Turn',
    lore: 'A smaller phase twist with big algorithmic value.',
    work: 'Adds a 45-degree phase shift to the |1⟩ state.',
    ascii: '──[T]──',
    undo: 'Applying it eight times returns to the original state.',
    task: 'Use T after H to introduce a small phase rotation.'
  }
];

export default gates;