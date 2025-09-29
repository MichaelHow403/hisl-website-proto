'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Convert lat/lng to 3D coordinates on unit sphere
function latLngToVector3(lat: number, lng: number, radius: number = 1): THREE.Vector3 {
  // Convert degrees to radians
  const phi = (90 - lat) * (Math.PI / 180); // latitude in radians (0 to 180)
  const theta = (lng + 180) * (Math.PI / 180); // longitude in radians (0 to 360)
  
  // Correct spherical to Cartesian conversion
  // x = R * sin(phi) * cos(theta), y = R * cos(phi), z = R * sin(phi) * sin(theta)
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Data center marker component
function DataCenterMarker({ 
  lat, 
  lng, 
  color, 
  label, 
  jurisdiction, 
  status = "active" 
}: {
  lat: number;
  lng: number;
  color: string;
  label: string;
  jurisdiction: string;
  status?: "active" | "standby";
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  // Convert lat/lng to 3D position on sphere surface
  const position = latLngToVector3(lat, lng, 1.01);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing animation (10-20% scale variation)
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.15 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
    
    if (ringRef.current) {
      // Rotating ring animation
      ringRef.current.rotation.z += 0.01;
    }
  });
  
  const statusColor = status === "active" ? color : "#666666";
  
  return (
    <group position={position}>
      {/* Data center marker - smaller relative to earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshPhongMaterial 
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Glowing ring around marker */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.03, 0.05, 16]} />
        <meshBasicMaterial 
          color={statusColor}
          transparent={true}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Point light for glow effect */}
      <pointLight
        color={statusColor}
        intensity={0.2}
        distance={0.3}
      />
    </group>
  );
}

// Main Earth component with realistic texture
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Load the realistic earth texture
  const earthTexture = useTexture('/imagery/earth/earth-globe-realistic.png');

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Slow rotation
    }
  });

  return (
    <group>
      {/* Main Earth with realistic texture */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.2}
          // Enhanced properties for realistic appearance
          color="#ffffff"
          emissive="#001122"
          emissiveIntensity={0.05}
          // Add subtle specular for ocean reflectivity
          specular="#444444"
          shininess={30}
        />
      </mesh>
      
      {/* Enhanced atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.015, 64, 64]} />
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Blue rim effect for atmosphere */}
      <mesh>
        <sphereGeometry args={[1.025, 64, 64]} />
        <meshBasicMaterial
          color="#4169e1"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Fallback Earth component
function EarthFallback() {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.8}
          metalness={0.1}
          emissive="#001122"
          emissiveIntensity={0.05}
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
    </group>
  );
}

// Data centers with accurate geographic coordinates
const dataCenters = [
  {
    id: 'dublin',
    lat: 53.3498,
    lng: -6.2603,
    color: '#22c55e', // Green for GDPR-EU
    label: 'Dublin',
    jurisdiction: 'GDPR-EU',
    status: 'active' as const
  },
  {
    id: 'frankfurt',
    lat: 50.1109,
    lng: 8.6821,
    color: '#22c55e', // Green for GDPR-EU
    label: 'Frankfurt',
    jurisdiction: 'GDPR-EU',
    status: 'active' as const
  },
  {
    id: 'london',
    lat: 51.5074,
    lng: -0.1278,
    color: '#22c55e', // Green for UK-GDPR
    label: 'London',
    jurisdiction: 'UK-GDPR',
    status: 'active' as const
  },
  {
    id: 'virginia',
    lat: 38.9072,
    lng: -77.0369,
    color: '#f59e0b', // Orange for US
    label: 'Virginia',
    jurisdiction: 'FISA-US',
    status: 'active' as const
  },
  {
    id: 'singapore',
    lat: 1.3521,
    lng: 103.8198,
    color: '#8b5cf6', // Purple for APAC
    label: 'Singapore',
    jurisdiction: 'PDPA-SG',
    status: 'active' as const
  },
  {
    id: 'tokyo',
    lat: 35.6762,
    lng: 139.6503,
    color: '#8b5cf6', // Purple for APAC
    label: 'Tokyo',
    jurisdiction: 'APPI-JP',
    status: 'active' as const
  }
];

// Main PhotorealisticEarth component
export default function PhotorealisticEarth() {
  return (
    <div className="relative h-[70vh] w-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        {/* Enhanced realistic lighting setup */}
        <ambientLight intensity={0.6} color="#ffffff" />
        
        {/* Main sun light - much brighter */}
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={2.5}
          color="#fff8dc"
          castShadow
        />
        
        {/* Secondary fill light */}
        <directionalLight 
          position={[-2, 1, -3]} 
          intensity={0.8}
          color="#87ceeb"
        />
        
        {/* Rim light for atmosphere effect */}
        <directionalLight 
          position={[-5, -2, -4]} 
          intensity={0.6}
          color="#4169e1"
        />
        
        {/* Additional point light for better visibility */}
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
        
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
          <Earth />
        </Suspense>
        
        {/* Data center markers */}
        {dataCenters.map((center) => (
          <DataCenterMarker
            key={center.id}
            lat={center.lat}
            lng={center.lng}
            color={center.color}
            label={center.label}
            jurisdiction={center.jurisdiction}
            status={center.status}
          />
        ))}
      </Canvas>
      
      {/* Legend overlay */}
      <div className="absolute top-4 right-4 bg-panel/90 backdrop-blur-sm border border-edge rounded-lg p-4 text-sm z-10 max-w-xs">
        <h3 className="font-semibold text-brandGold mb-3">Data Centers</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-text">GDPR-EU & UK-GDPR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-text">FISA-US</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-text">APAC</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-muted">
          <div>• Dublin, Frankfurt, London (Green)</div>
          <div>• Virginia (Orange)</div>
          <div>• Singapore, Tokyo (Purple)</div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-panel/90 backdrop-blur-sm border border-edge rounded-lg p-4 text-sm max-w-md z-10">
        <h3 className="font-semibold text-brandGold mb-2">Interactive Globe</h3>
        <div className="text-muted space-y-1">
          <div>• Drag to rotate, scroll to zoom</div>
          <div>• Data centers show sovereignty zones</div>
          <div>• Green: GDPR compliant regions</div>
          <div>• Orange: US jurisdiction</div>
          <div>• Purple: APAC regions</div>
        </div>
      </div>
    </div>
  );
}
