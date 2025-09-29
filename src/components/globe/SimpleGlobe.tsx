'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
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

// Enhanced Earth component with realistic colors and texture
function Earth({ earthMapPath }: { earthMapPath?: string }) {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Always call useTexture unconditionally - no try/catch around hooks
  const mapPath = earthMapPath ?? "/imagery/earth/earth-globe-realistic.png";
  const earthTexture = useTexture(mapPath);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Slow rotation
    }
  });

  return (
    <group>
      {/* Main Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.05}
          color="#ffffff"
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Ocean enhancement layer */}
      <mesh>
        <sphereGeometry args={[1.001, 64, 64]} />
        <meshBasicMaterial
          color="#0077be"
          transparent
          opacity={0.3}
          blending={THREE.MultiplyBlending}
        />
      </mesh>
      
      {/* Land enhancement layer */}
      <mesh>
        <sphereGeometry args={[1.002, 64, 64]} />
        <meshBasicMaterial
          color="#228b22"
          transparent
          opacity={0.2}
          blending={THREE.MultiplyBlending}
        />
      </mesh>
      
      {/* Enhanced atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Blue rim effect */}
      <mesh>
        <sphereGeometry args={[1.03, 32, 32]} />
        <meshBasicMaterial
          color="#4169e1"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Enhanced fallback Earth component for Suspense
function EarthFallback() {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Slow rotation
    }
  });

  return (
    <group>
      {/* Main Earth fallback */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.7} 
          metalness={0.05}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Ocean enhancement */}
      <mesh>
        <sphereGeometry args={[1.001, 64, 64]} />
        <meshBasicMaterial
          color="#0077be"
          transparent
          opacity={0.4}
          blending={THREE.MultiplyBlending}
        />
      </mesh>
      
      {/* Land enhancement */}
      <mesh>
        <sphereGeometry args={[1.002, 64, 64]} />
        <meshBasicMaterial
          color="#228b22"
          transparent
          opacity={0.3}
          blending={THREE.MultiplyBlending}
        />
      </mesh>
      
      {/* Enhanced atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Blue rim effect */}
      <mesh>
        <sphereGeometry args={[1.03, 32, 32]} />
        <meshBasicMaterial
          color="#4169e1"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Animated log point with pulse trail
function LogPoint({ log, index }: { log: LogData; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Convert lat/lng to 3D position
  const lat = (log.metadata.geoLocation.lat * Math.PI) / 180;
  const lng = (log.metadata.geoLocation.lng * Math.PI) / 180;
  const radius = 1.01;
  
  const x = radius * Math.cos(lat) * Math.cos(lng);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.sin(lng);
  
  const position = [x, y, z] as [number, number, number];
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const age = time - (log.timestamp ? new Date(log.timestamp).getTime() / 1000 : time);
    
    // Fade out over time
    const opacity = Math.max(0, 1 - age / 10);
    
    if (opacity <= 0) {
      if (meshRef.current) meshRef.current.visible = false;
      if (trailRef.current) trailRef.current.visible = false;
      return;
    }
    
    // Animate the point
    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      meshRef.current.position.y += Math.sin(time + index) * 0.01;
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1);
      
      if (meshRef.current.material) {
        (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      }
    }
    
    // Animate the trail
    if (trailRef.current) {
      const trailScale = 1 + Math.sin(age * 10) * 0.5;
      const trailOpacity = Math.max(0, 1 - age / 3) * 0.3;
      
      trailRef.current.position.set(x, y, z);
      trailRef.current.scale.setScalar(trailScale);
      
      if (trailRef.current.material) {
        (trailRef.current.material as THREE.MeshBasicMaterial).opacity = trailOpacity;
      }
    }
  });
  
  return (
    <group>
      {/* Main point */}
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
      
      {/* Pulse trail */}
      <mesh ref={trailRef} position={position}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial 
          color={log.success ? '#39d7c9' : '#ff6b6b'} 
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Main component
export default function SimpleGlobe() {
  const [logs, setLogs] = useState<LogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch logs
  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/deepseek-logs?limit=100');
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
        {/* Enhanced realistic lighting setup */}
        <ambientLight intensity={0.4} color="#ffffff" />
        
        {/* Main sun light */}
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={1.2}
          color="#fff8dc"
        />
        
        {/* Secondary fill light */}
        <directionalLight 
          position={[-2, 1, -3]} 
          intensity={0.3}
          color="#87ceeb"
        />
        
        {/* Rim light for atmosphere effect */}
        <directionalLight 
          position={[-5, -2, -4]} 
          intensity={0.5}
          color="#4169e1"
        />
        
        {/* Background stars */}
        <Stars 
          radius={300} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
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
        
        {/* Earth with Suspense for texture loading */}
        <Suspense fallback={<EarthFallback />}>
          <Earth earthMapPath="/imagery/earth/earth_globe_realistic.png" />
        </Suspense>
        
        {/* Log points */}
        {logs.map((log, index) => (
          <LogPoint key={log.id} log={log} index={index} />
        ))}
      </Canvas>
      
      {/* Stats overlay */}
      <div className="absolute top-4 right-4 bg-panel/90 backdrop-blur-sm border border-edge rounded-lg p-4 text-sm z-10">
        <h3 className="font-semibold text-brandGold mb-2">DeepSeek Activity</h3>
        <div className="space-y-1 text-muted">
          <div>Total Requests: <span className="text-text">{logs.length}</span></div>
          <div>Success Rate: <span className="text-text">
            {logs.length > 0 ? Math.round((logs.filter(log => log.success).length / logs.length) * 100) : 0}%
          </span></div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-panel/90 backdrop-blur-sm border border-edge rounded-lg p-4 text-sm max-w-md z-10">
        <h3 className="font-semibold text-brandGold mb-2">Interactive Globe</h3>
        <div className="text-muted space-y-1">
          <div>• Green dots: Successful requests</div>
          <div>• Red dots: Failed requests</div>
          <div>• Drag to rotate, scroll to zoom</div>
        </div>
      </div>
    </div>
  );
}
