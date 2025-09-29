import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import PhotorealisticEarth from './RealisticEarth';
import NorseRavens from './NorseRavens';
import DataCenterOverlay from './DataCenterOverlay';
import PulseTrail from './PulseTrail';

const InteractiveGlobe = () => {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [processingState, setProcessingState] = useState('idle');
  const [outputLog, setOutputLog] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const handlePromptSubmit = async () => {
    if (!selectedPrompt.trim()) return;
    
    setProcessingState('processing');
    setOutputLog(prev => [...prev, `🌍 Prompt received: "${selectedPrompt}"`]);
    
    // Simulate processing stages
    setTimeout(() => {
      setOutputLog(prev => [...prev, '🐦 Huginn analyzing query structure...']);
    }, 500);
    
    setTimeout(() => {
      setOutputLog(prev => [...prev, '🐦 Muninn accessing knowledge base...']);
    }, 1000);
    
    setTimeout(() => {
      setOutputLog(prev => [...prev, '🏛️ Routing through GDPR-compliant Dublin center...']);
    }, 1500);
    
    setTimeout(() => {
      setOutputLog(prev => [...prev, '✅ Processing complete - data sovereignty maintained']);
      setProcessingState('complete');
    }, 2500);
    
    setTimeout(() => {
      setProcessingState('idle');
    }, 4000);
  };

  const promptExamples = [
    "How does HISL ensure data sovereignty?",
    "What AI models power the IntegAI fleet?", 
    "Show me GDPR compliance workflow",
    "Explain the Norse mythology integration"
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-teal-400 mb-2 font-mono tracking-wider">
            WHERE YOUR PROMPTS GO
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Watch your queries travel through sovereign data paths, guided by Norse ravens 
            through GDPR-compliant infrastructure.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex h-full pt-32">
        
        {/* Left Panel - Output Log */}
        <div className="w-1/4 p-6 bg-black/40 backdrop-blur-sm border-r border-teal-500/30">
          <h3 className="text-teal-400 font-mono text-xl mb-6 tracking-wide">🖥️ PROCESSING LOG</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {outputLog.map((log, index) => (
              <div key={index} className="text-sm text-gray-300 font-mono p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                {log}
              </div>
            ))}
          </div>
          
          {/* Status Indicator */}
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${
                processingState === 'idle' ? 'bg-green-500 shadow-lg shadow-green-500/50' :
                processingState === 'processing' ? 'bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50' :
                'bg-blue-500 shadow-lg shadow-blue-500/50'
              }`}></div>
              <span className="text-base text-gray-300 font-mono tracking-wide">
                {processingState === 'idle' ? 'READY' :
                 processingState === 'processing' ? 'PROCESSING' : 'COMPLETE'}
              </span>
            </div>
          </div>
        </div>

        {/* Center Panel - Globe */}
        <div className="flex-1 relative">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Suspense fallback={null}>
              {/* Enhanced starfield */}
              <Stars radius={500} depth={80} count={2000} factor={8} />
              
              {/* Professional lighting setup */}
              <ambientLight intensity={0.4} />
              <directionalLight 
                position={[10, 10, 5]} 
                intensity={1.2}
                castShadow={true}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4f46e5" />
              
              {/* The Photorealistic Earth */}
              <PhotorealisticEarth />
              
              {/* Norse Ravens - Make them prominent */}
              <NorseRavens />
              
              {/* Data Centers */}
              <DataCenterOverlay />
              
              {/* Pulse Trails when processing */}
              {processingState === 'processing' && <PulseTrail />}
              
              {/* Enhanced camera controls */}
              <OrbitControls 
                enableZoom={true}
                enablePan={false}
                minDistance={6}
                maxDistance={20}
                autoRotate={processingState === 'idle'}
                autoRotateSpeed={0.3}
                dampingFactor={0.05}
              />
            </Suspense>
          </Canvas>
          
          {/* Norse Mythology Tooltip - Enhanced */}
          <div 
            className="absolute top-6 right-6 bg-black/90 p-5 rounded-xl border border-amber-500/50 cursor-pointer shadow-2xl"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="text-amber-500 text-3xl mb-2">🐦‍⬛</div>
            <div className="text-amber-400 font-mono text-sm">HUGINN & MUNINN</div>
            {showTooltip && (
              <div className="absolute top-full right-0 mt-3 w-72 bg-black/95 p-4 rounded-lg border border-amber-500/30 text-sm text-gray-300 shadow-2xl">
                <div className="text-amber-400 font-bold mb-2">Odin's Data Ravens</div>
                <p className="leading-relaxed">
                  <strong className="text-amber-300">Huginn</strong> (Thought) and <strong className="text-cyan-300">Muninn</strong> (Memory) 
                  guide your prompts through sovereign data paths, ensuring privacy and GDPR compliance 
                  across global infrastructure.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Prompt Interface */}
        <div className="w-1/4 p-6 bg-black/40 backdrop-blur-sm border-l border-teal-500/30">
          <h3 className="text-teal-400 font-mono text-xl mb-6 tracking-wide">🤖 AGENT PROMPT</h3>
          
          {/* Quick Examples */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3 font-medium">Quick examples:</p>
            <div className="space-y-2">
              {promptExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPrompt(example)}
                  className="w-full text-left text-xs text-gray-300 hover:text-teal-400 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/70 transition-all duration-200 border border-slate-700/30 hover:border-teal-500/50"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
          
          {/* Prompt Input */}
          <div className="space-y-4">
            <textarea
              value={selectedPrompt}
              onChange={(e) => setSelectedPrompt(e.target.value)}
              placeholder="Enter your query about HISL, AI sovereignty, or data compliance..."
              className="w-full h-32 bg-slate-800/50 border border-teal-500/30 rounded-lg p-4 text-gray-300 text-sm resize-none focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all"
            />
            
            <button
              onClick={handlePromptSubmit}
              disabled={processingState === 'processing' || !selectedPrompt.trim()}
              className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-mono text-sm transition-all duration-200 shadow-lg hover:shadow-teal-500/25"
            >
              {processingState === 'processing' ? 'PROCESSING...' : 'SUBMIT QUERY'}
            </button>
          </div>
          
          {/* Data Sovereignty Info */}
          <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
              <span className="text-green-400 text-sm font-mono tracking-wide">GDPR COMPLIANT</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              All queries processed through Irish jurisdiction. Your data never leaves EU sovereignty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGlobe;
