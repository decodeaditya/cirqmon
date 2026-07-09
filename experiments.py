import json

circuit = '[{"gate":"h","target":0,"step":0},{"gate":"h","target":1,"step":0},{"gate":"h","target":1,"step":1}]'
new_circuit = json.loads(circuit)

noOfQubits = max([gate['target'] for gate in new_circuit]) + 1
