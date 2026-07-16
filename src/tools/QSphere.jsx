import { Html, Line, OrbitControls, Sphere } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const QSphereRadii = 2

const generateEquatorPoints = (radius, segments = 100) => {
    const points = [];

    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        // x = r * cos(θ), y = 0 (flat equator plane), z = r * sin(θ)
        // For repo readers - remember in books Z is like Axis of Sphere, but In Code it considers outside the screen (Spherical Coordinates); 
        points.push([radius * Math.cos(theta), 0, radius * Math.sin(theta)]);
    }
    return points;
};

const QuantumLabel = ({ stateName, phaseAngle }) => {
    return (
        <div className='flex'>
            <p className="bg-gray-800/80 backdrop-blur-md text-white text-[10px]
     px-2 py-0.5 rounded-l-sm shadow-sm tracking-wider">
                |{stateName}⟩
            </p>
            <p className="bg-yellow-700/70 backdrop-blur-md text-white text-[10px]
     px-2 py-0.5 rounded-r-sm shadow-sm tracking-wider">
                {phaseAngle}
            </p>
        </div>
    )
}

const StateNode = ({ position, color, probabilitySize, stateName, phase }) => {

    const finalCoordinates = position.map((point) => point * QSphereRadii)
    const diminishedNodeRadius = probabilitySize == 1 ? probabilitySize * 0.1 : probabilitySize * 0.5

    return (
        <group>
            <Line points={[[0, 0, 0], finalCoordinates]} color="#64748b" lineWidth={2} />

            <Sphere args={[diminishedNodeRadius, 16, 16]} position={finalCoordinates}>
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />

                <Html distanceFactor={6} position={[0, diminishedNodeRadius + 0.2, 0]} center>
                    <QuantumLabel stateName={stateName} probability={probabilitySize} phaseAngle={phase}/>
                </Html>



            </Sphere>

        </group>
    );
};


const QSphere = ({ nodesData }) => {

    const equatorPoints = generateEquatorPoints(QSphereRadii);

    return (
        <div className='bg-[#1e1e1e] relative flex-1 flex flex-col h-full m-2 rounded-4xl
         shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),0_8px_8px_-4px_rgba(0,0,0,0.7),0_2px_4px_rgba(255,255,255,0.03)] backdrop-blur-md'>

            <Canvas camera={{ position: [0, 1, 4] }}>

                <OrbitControls enableZoom={true} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 100, 10]} intensity={1} />

                <group>
                    <Sphere args={[QSphereRadii, 33, 33]}>
                        <meshBasicMaterial
                            color="#fff"
                            transparent
                            opacity={0.02}
                            wireframe
                        />
                    </Sphere>

                    <Line
                        points={equatorPoints}
                        color="#4f46e5"
                        lineWidth={2}
                        transparent
                        opacity={0.6}
                    />

                    <Sphere args={[0.02, 16, 16]} position={[0, 0, 0]}>
                        <meshBasicMaterial color={"#fff"} />
                    </Sphere>

                    {nodesData.map((node) => (
                        <StateNode
                            key={node.index}
                            position={node.coordinates}
                            probabilitySize={node.probability}
                            color={"#ef4444"}
                            stateName={node.stateName}
                            phase={node.phase}
                        />
                    )
                    )}
                </group>

            </Canvas>

        </div>
    )
}

export default QSphere