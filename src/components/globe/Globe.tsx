'use client';

import { useEffect, useState, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Define the log data type
interface LogData {
  id: string;
  timestamp: string;
  userIP: string;
  endpoint: string;
  responseTime: number;
  prompt: string;
  metadata: {
    geoLocation: {
      lat: number;
      lng: number;
      city: string;
      country: string;
    };
    model?: string;
    usage?: any;
  };
  success: boolean;
  error?: string;
}

// Convert lat/lng to 3D coordinates on unit sphere
function latLngToVector3(lat: number, lng: number, radius: number = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Earth component with texture
function Earth({ earthMapPath }: { earthMapPath?: string }) {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Always call useTexture unconditionally - no try/catch around hooks
  const mapPath = earthMapPath ?? "/imagery/earth/earth_globe_realistic.png";
  const textures = useTexture([mapPath, mapPath]); // Using same as normal for now

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Slow rotation
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={textures[0]}
        normalMap={textures[1]}
        normalScale={new THREE.Vector2(0.1, 0.1)}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

// Fallback Earth component for Suspense
function EarthFallback() {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Slow rotation
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#1b2a4a"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

// Atmosphere glow effect
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.02, 32, 32]} />
      <meshBasicMaterial
        color="#39d7c9"
        transparent
        opacity={0.1}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Individual log point component
function LogPoint({ log, index }: { log: LogData; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Convert lat/lng to 3D position
  const position = latLngToVector3(log.metadata.geoLocation.lat, log.metadata.geoLocation.lng, 1.01);
  
  // Animate the point
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const age = time - (log.timestamp ? new Date(log.timestamp).getTime() / 1000 : time);
      
      // Fade out over time
      const opacity = Math.max(0, 1 - age / 10);
      
      if (opacity <= 0) {
        meshRef.current.visible = false;
        return;
      }
      
      // Subtle animation
      meshRef.current.position.copy(position);
      meshRef.current.position.y += Math.sin(time + index) * 0.01;
      
      // Update material opacity
      if (meshRef.current.material) {
        (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      }
      
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1);
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.01, 8, 8]} />
      <meshBasicMaterial 
        color={log.success ? '#39d7c9' : '#ff6b6b'} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}

// Pulse trail effect
function PulseTrail({ log, index }: { log: LogData; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Convert lat/lng to 3D position
  const position = latLngToVector3(log.metadata.geoLocation.lat, log.metadata.geoLocation.lng, 1.01);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const age = time - (log.timestamp ? new Date(log.timestamp).getTime() / 1000 : time);
      
      // Trail effect - expand and fade
      const trailScale = 1 + Math.sin(age * 10) * 0.5;
      const opacity = Math.max(0, 1 - age / 3); // Fade over 3 seconds
      
      if (opacity <= 0) {
        meshRef.current.visible = false;
        return;
      }
      
      meshRef.current.position.copy(position);
      meshRef.current.scale.setScalar(trailScale);
      
      if (meshRef.current.material) {
        (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.3;
      }
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial 
        color={log.success ? '#39d7c9' : '#ff6b6b'} 
        transparent 
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Data routing arc effect
function RoutingArc({ isProcessing }: { isProcessing: boolean }) {
  const arcRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (arcRef.current && isProcessing) {
      const time = state.clock.getElapsedTime();
      
      // Create a subtle pulsing effect
      const pulse = 0.5 + 0.5 * Math.sin(time * 3);
      arcRef.current.scale.setScalar(pulse);
      
      // Rotate the arc
      arcRef.current.rotation.z += 0.01;
    }
  });
  
  if (!isProcessing) return null;
  
  return (
    <mesh ref={arcRef}>
      <torusGeometry args={[1.1, 0.02, 8, 100]} />
      <meshBasicMaterial 
        color="#D9A441" 
        transparent 
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Processing pulse effect
function ProcessingPulse({ isProcessing }: { isProcessing: boolean }) {
  const pulseRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (pulseRef.current && isProcessing) {
      const time = state.clock.getElapsedTime();
      
      // Create expanding pulse effect
      const scale = 1 + Math.sin(time * 4) * 0.1;
      const opacity = 0.3 + 0.2 * Math.sin(time * 2);
      
      pulseRef.current.scale.setScalar(scale);
      
      if (pulseRef.current.material) {
        (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      }
    }
  });
  
  if (!isProcessing) return null;
  
  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[1.05, 32, 32]} />
      <meshBasicMaterial 
        color="#D9A441" 
        transparent 
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Main globe component
function GlobeScene({ logs, isProcessing }: { logs: LogData[]; isProcessing: boolean }) {
  // Limit to last 500 logs for performance
  const recentLogs = useMemo(() => logs.slice(-500), [logs]);
  
  return (
    <>
      {/* Background stars */}
      <Stars 
        radius={300} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
      />
      
      {/* Earth with Suspense for texture loading */}
      <Suspense fallback={<EarthFallback />}>
        <Earth earthMapPath="/imagery/earth/earth-globe-realistic.png" />
      </Suspense>
      
      {/* Atmosphere */}
      <Atmosphere />
      
      {/* Processing effects */}
      <ProcessingPulse isProcessing={isProcessing} />
      <RoutingArc isProcessing={isProcessing} />
      
      {/* Log points */}
      {recentLogs.map((log, index) => (
        <LogPoint key={log.id} log={log} index={index} />
      ))}
      
      {/* Pulse trails */}
      {recentLogs.map((log, index) => (
        <PulseTrail key={`trail-${log.id}`} log={log} index={index} />
      ))}
    </>
  );
}

// Stats overlay component
function StatsOverlay({ logs }: { logs: LogData[] }) {
  const totalRequests = logs.length;
  const successfulRequests = logs.filter(log => log.success).length;
  const averageResponseTime = logs.length > 0 
    ? Math.round(logs.reduce((sum, log) => sum + log.responseTime, 0) / logs.length)
    : 0;
  
  const uniqueLocations = new Set(
    logs.map(log => `${log.metadata.geoLocation.city}, ${log.metadata.geoLocation.country}`)
  ).size;
  
  return (
    <div className="absolute top-4 right-4 bg-panel/90 backdrop-blur-sm border border-edge rounded-lg p-4 text-sm z-10">
      <h3 className="font-semibold text-brandGold mb-2">DeepSeek Activity</h3>
      <div className="space-y-1 text-muted">
        <div>Total Requests: <span className="text-text">{totalRequests}</span></div>
        <div>Success Rate: <span className="text-text">{totalRequests > 0 ? Math.round((successfulRequests / totalRequests) * 100) : 0}%</span></div>
        <div>Avg Response: <span className="text-text">{averageResponseTime}ms</span></div>
        <div>Locations: <span className="text-text">{uniqueLocations}</span></div>
      </div>
    </div>
  );
}

// Instructions overlay
function InstructionsOverlay() {
  return (
    <div className="absolute bottom-4 left-4 bg-panel/90 backdrop-blur-sm border border-edge rounded-lg p-4 text-sm max-w-md z-10">
      <h3 className="font-semibold text-brandGold mb-2">Interactive Globe</h3>
      <div className="text-muted space-y-1">
        <div>• Green dots: Successful DeepSeek requests</div>
        <div>• Red dots: Failed requests</div>
        <div>• Hover over dots for details</div>
        <div>• Globe updates every 5 seconds</div>
        <div>• Drag to rotate, scroll to zoom</div>
      </div>
    </div>
  );
}

// Main Globe component
export default function Globe({ isProcessing = false }: { isProcessing?: boolean }) {
  const [logs, setLogs] = useState<LogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch logs
  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/deepseek-logs?limit=500');
      const data = await response.json();
      
      if (data.success) {
        setLogs(data.data.logs || []);
      } else {
        setError(data.error || 'Failed to fetch logs');
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLogs();
    
    // Poll for new logs every 5 seconds
    const interval = setInterval(fetchLogs, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative h-[70vh] w-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[1, 1, 1]} 
          intensity={0.8}
          castShadow
        />
        
        {/* Controls */}
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.5}
          maxDistance={5}
          autoRotate={false}
        />
        
        {/* Scene */}
        {loading ? (
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#1e3a8a" />
          </mesh>
        ) : error ? (
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#dc2626" />
          </mesh>
        ) : (
          <GlobeScene logs={logs} isProcessing={isProcessing} />
        )}
      </Canvas>
      
      {/* Overlays */}
      {!loading && !error && <StatsOverlay logs={logs} />}
      <InstructionsOverlay />
    </div>
  );
}