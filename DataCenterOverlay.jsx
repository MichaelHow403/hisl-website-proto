import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DataCenter = ({ position, color, label, jurisdiction, status = "active" }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing animation
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
  });
  
  const statusColor = status === "active" ? color : "#666666";
  
  return (
    <group position={position}>
      {/* Data center marker */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshPhongMaterial 
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Glowing ring around marker */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.12, 16]} />
        <meshBasicMaterial 
          color={statusColor}
          transparent={true}
          opacity={0.6}
        />
      </mesh>
      
      {/* Point light for glow effect */}
      <pointLight
        color={statusColor}
        intensity={0.5}
        distance={1}
      />
    </group>
  );
};

const DataCenterOverlay = () => {
  // Data centers with GDPR/sovereignty focus
  const dataCenters = useMemo(() => [
    {
      id: 'dublin',
      label: 'Dublin',
      jurisdiction: 'GDPR-EU',
      position: [1.2, 0.8, 1.2],
      color: '#22c55e', // Green for primary GDPR
      status: 'active'
    },
    {
      id: 'frankfurt',
      label: 'Frankfurt', 
      jurisdiction: 'GDPR-EU',
      position: [1.3, 0.9, 0.8],
      color: '#22c55e',
      status: 'active'
    },
    {
      id: 'virginia',
      label: 'Virginia',
      jurisdiction: 'FISA-US',
      position: [-1.8, 0.6, 0.5],
      color: '#f59e0b', // Orange for US jurisdiction
      status: 'active'
    },
    {
      id: 'singapore',
      label: 'Singapore',
      jurisdiction: 'PDPA-SG',
      position: [0.5, -0.2, 1.9],
      color: '#8b5cf6', // Purple for APAC
      status: 'active'
    },
    {
      id: 'sydney',
      label: 'Sydney',
      jurisdiction: 'Privacy Act-AU',
      position: [0.8, -1.5, 1.2],
      color: '#06b6d4', // Cyan for AU/NZ
      status: 'standby'
    },
    {
      id: 'tokyo',
      label: 'Tokyo',
      jurisdiction: 'APPI-JP',
      position: [1.8, 0.3, 1.0],
      color: '#8b5cf6',
      status: 'active'
    },
    {
      id: 'london',
      label: 'London',
      jurisdiction: 'UK-GDPR',
      position: [1.1, 1.0, 0.5],
      color: '#22c55e',
      status: 'active'
    },
    {
      id: 'toronto',
      label: 'Toronto',
      jurisdiction: 'PIPEDA-CA',
      position: [-1.6, 0.9, 0.8],
      color: '#dc2626', // Red for Canada
      status: 'standby'
    }
  ], []);
  
  return (
    <group>
      {dataCenters.map((center) => (
        <DataCenter
          key={center.id}
          position={center.position}
          color={center.color}
          label={center.label}
          jurisdiction={center.jurisdiction}
          status={center.status}
        />
      ))}
    </group>
  );
};

export default DataCenterOverlay;
