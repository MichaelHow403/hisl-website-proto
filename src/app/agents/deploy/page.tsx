"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import { getImage } from '@/app/lib/imagery';

// Sector-specific agent data
const SECTOR_AGENTS = {
  construction: [
    { id: 'ehs-agent', name: 'EHS Agent', description: 'Environmental Health & Safety monitoring and compliance', status: 'available', resources: { cpu: 3, memory: 6, storage: 2 } },
    { id: 'project-pm-agent', name: 'Project PM Agent', description: 'Construction project management and scheduling intelligence', status: 'available', resources: { cpu: 4, memory: 8, storage: 3 } },
    { id: 'bim-design-agent', name: 'BIM/Design Agent', description: 'Building Information Modeling and design automation', status: 'available', resources: { cpu: 5, memory: 12, storage: 5 } }
  ],
  environmental: [
    { id: 'esg-agent', name: 'ESG Agent', description: 'Environmental, Social, and Governance reporting automation', status: 'available', resources: { cpu: 3, memory: 6, storage: 2 } },
    { id: 'sustainability-agent', name: 'Sustainability Metrics Agent', description: 'Carbon footprint and sustainability tracking', status: 'available', resources: { cpu: 2, memory: 4, storage: 1 } }
  ],
  conservation: [
    { id: 'heritage-agent', name: 'Heritage Preservation Agent', description: 'Historical asset scanning and restoration planning', status: 'available', resources: { cpu: 4, memory: 8, storage: 4 } },
    { id: 'planning-agent', name: 'Planning Approvals Agent', description: 'Permit workflows and SPAB guidance integration', status: 'available', resources: { cpu: 3, memory: 6, storage: 2 } }
  ],
  'pharma-crox': [
    { id: 'qa-agent', name: 'QA Agent', description: 'Quality assurance and GMP compliance monitoring', status: 'available', resources: { cpu: 4, memory: 8, storage: 3 } },
    { id: 'clinical-agent', name: 'Clinical R&D Orchestrator', description: 'Clinical trial monitoring and protocol co-pilot', status: 'available', resources: { cpu: 5, memory: 12, storage: 4 } }
  ],
  procurement: [
    { id: 'procurement-agent', name: 'Procurement Agent', description: 'Transparent tender processes and bid evaluation', status: 'available', resources: { cpu: 3, memory: 6, storage: 2 } },
    { id: 'anti-corruption-agent', name: 'Anti-Corruption Oversight Agent', description: 'Compliance guardrails and anomaly detection', status: 'available', resources: { cpu: 4, memory: 8, storage: 3 } }
  ],
  agriculture: [
    { id: 'crop-agent', name: 'Crop Monitoring Agent', description: 'Soil monitoring and yield optimization', status: 'available', resources: { cpu: 3, memory: 6, storage: 2 } },
    { id: 'agri-supply-agent', name: 'Agri-Supply Agent', description: 'Supply chain intelligence and logistics planning', status: 'available', resources: { cpu: 2, memory: 4, storage: 1 } }
  ],
  'trader-economics': [
    { id: 'market-agent', name: 'Market Signals Agent', description: 'Equities/FX/commodities analysis and market aggregation', status: 'available', resources: { cpu: 4, memory: 8, storage: 3 } },
    { id: 'risk-agent', name: 'Risk & Portfolio Agent', description: 'Portfolio optimization and hedging strategies', status: 'available', resources: { cpu: 5, memory: 12, storage: 4 } }
  ],
  healthcare: [
    { id: 'clinical-workflow-agent', name: 'Clinical Workflow Agent', description: 'Notes summarization and triage workflows', status: 'available', resources: { cpu: 4, memory: 8, storage: 3 } },
    { id: 'pet-care-agent', name: 'Pet Care Agent', description: 'Veterinary diagnostics and treatment planning', status: 'available', resources: { cpu: 3, memory: 6, storage: 2 } }
  ],
  insurance: [
    { id: 'ops-agent', name: 'Ops Agent', description: 'Policy administration and claims workflow automation', status: 'available', resources: { cpu: 3, memory: 6, storage: 2 } },
    { id: 'fraud-agent', name: 'Fraud Detection Agent', description: 'Anomaly flagging and fraud detection algorithms', status: 'available', resources: { cpu: 4, memory: 8, storage: 3 } }
  ],
  custom: [
    { id: 'wizard-agent', name: 'Wizard Agent', description: 'Bespoke orchestration and custom workflow creation', status: 'available', resources: { cpu: 5, memory: 12, storage: 4 } },
    { id: 'child-agent', name: 'Child Agents', description: 'Specialized sub-agents with callback learning', status: 'available', resources: { cpu: 3, memory: 6, storage: 2 } }
  ]
};

// Core agents (always available)
const CORE_AGENTS = [
  { id: 'planner', name: 'Planner Agent', description: 'Analyzes queries and determines execution steps', status: 'available', resources: { cpu: 2, memory: 4, storage: 1 } },
  { id: 'retriever', name: 'Retriever Agent', description: 'Dense + graph retrieval from Chroma & Neo4j', status: 'available', resources: { cpu: 3, memory: 8, storage: 2 } },
  { id: 'judge', name: 'Judge Agent', description: 'Validates context sufficiency and trust scores', status: 'available', resources: { cpu: 1, memory: 2, storage: 0.5 } },
  { id: 'executor', name: 'Executor Agent', description: 'Runs LLM inference and generates drafts', status: 'available', resources: { cpu: 4, memory: 16, storage: 4 } },
  { id: 'memory', name: 'Memory Agent', description: 'Persists summaries and embeddings', status: 'available', resources: { cpu: 2, memory: 4, storage: 8 } },
  { id: 'safety', name: 'Safety Agent', description: 'Applies policy profiles and redacts PII', status: 'available', resources: { cpu: 1, memory: 2, storage: 1 } },
  { id: 'tools', name: 'Tools Agent', description: 'Broker for MinIO, Chroma, Neo4j, Vault', status: 'available', resources: { cpu: 2, memory: 4, storage: 2 } },
  { id: 'observer', name: 'Observer Agent', description: 'Emits structured telemetry to Langfuse/Phoenix', status: 'available', resources: { cpu: 1, memory: 2, storage: 1 } },
  { id: 'publisher', name: 'Publisher Agent', description: 'Packages outputs as .integpkg to MinIO', status: 'available', resources: { cpu: 2, memory: 4, storage: 3 } }
];

const DEPLOYED_AGENTS = [
  { id: 'planner', name: 'Planner Agent', status: 'running', environment: 'Local', resources: { cpu: 2, memory: 4, storage: 1 }, uptime: '2h 34m', energy: 45 },
  { id: 'retriever', name: 'Retriever Agent', status: 'running', environment: 'Cloud', resources: { cpu: 3, memory: 8, storage: 2 }, uptime: '1h 12m', energy: 78 },
  { id: 'judge', name: 'Judge Agent', status: 'deploying', environment: 'Edge', resources: { cpu: 1, memory: 2, storage: 0.5 }, uptime: '0m', energy: 12 }
];

const MOCK_LOGS = [
  { timestamp: '14:32:15', level: 'info', message: 'Planner Agent: Query analysis completed for construction safety protocol' },
  { timestamp: '14:31:42', level: 'success', message: 'Retriever Agent: Retrieved 15 relevant contexts from Chroma database' },
  { timestamp: '14:31:18', level: 'info', message: 'Judge Agent: Context validation passed with 0.92 confidence score' },
  { timestamp: '14:30:55', level: 'warning', message: 'Executor Agent: High memory usage detected (85%)' },
  { timestamp: '14:30:33', level: 'info', message: 'Memory Agent: Persisted 3 new embeddings to Neo4j' },
  { timestamp: '14:30:12', level: 'error', message: 'Tools Agent: MinIO connection timeout - retrying...' },
  { timestamp: '14:29:58', level: 'success', message: 'Publisher Agent: Successfully packaged output as .integpkg' },
  { timestamp: '14:29:41', level: 'info', message: 'Observer Agent: Telemetry data sent to Langfuse' }
];

export default function AgentDeployPage() {
  const searchParams = useSearchParams();
  const sector = searchParams.get('sector');
  
  // Get sector-specific agents or fall back to core agents
  const availableAgents = sector && SECTOR_AGENTS[sector] 
    ? [...SECTOR_AGENTS[sector], ...CORE_AGENTS]
    : CORE_AGENTS;
  
  const [selectedAgent, setSelectedAgent] = useState(availableAgents[0]);
  const [deploymentEnv, setDeploymentEnv] = useState('Local');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [deployedAgents, setDeployedAgents] = useState(DEPLOYED_AGENTS);
  const [logs, setLogs] = useState(MOCK_LOGS);

  // Update selected agent when sector changes
  useEffect(() => {
    if (availableAgents.length > 0) {
      setSelectedAgent(availableAgents[0]);
    }
  }, [sector]);

  // Get sector display name
  const getSectorDisplayName = (sectorKey: string) => {
    const sectorNames: { [key: string]: string } = {
      'construction': 'Construction',
      'environmental': 'Environmental',
      'conservation': 'Conservation',
      'pharma-crox': 'Pharma (CROx)',
      'procurement': 'Public Procurement',
      'agriculture': 'Agriculture',
      'trader-economics': 'Trader / Economics',
      'healthcare': 'Healthcare',
      'insurance': 'Insurance',
      'custom': 'Custom'
    };
    return sectorNames[sectorKey] || sectorKey;
  };

  // Mock deployment process
  const handleDeploy = () => {
    setIsDeploying(true);
    setDeploymentProgress(0);
    
    const interval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          // Add to deployed agents
          setDeployedAgents(prev => [...prev, {
            ...selectedAgent,
            status: 'running',
            environment: deploymentEnv,
            uptime: '0m',
            energy: Math.floor(Math.random() * 50) + 20
          }]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleStop = (agentId: string) => {
    setDeployedAgents(prev => 
      prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: 'stopped' }
          : agent
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-aiGreen';
      case 'deploying': return 'text-brandGold';
      case 'stopped': return 'text-muted';
      case 'error': return 'text-red-500';
      default: return 'text-muted';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'running': return 'bg-aiGreen/20 border-aiGreen/50';
      case 'deploying': return 'bg-brandGold/20 border-brandGold/50';
      case 'stopped': return 'bg-muted/20 border-muted/50';
      case 'error': return 'bg-red-500/20 border-red-500/50';
      default: return 'bg-muted/20 border-muted/50';
    }
  };

  return (
    <main className="min-h-screen bg-bg">
      <GlobalHeader />
      
      {/* Hero Section */}
      <section className="relative py-12 border-b border-edge bg-gradient-to-r from-panel/10 via-panel/20 to-panel/10">
        <div className="container-wrap">
          <div className="text-center">
            {/* Breadcrumbs */}
            {sector && (
              <nav className="flex items-center justify-center gap-2 text-sm text-muted mb-6">
                <a href="/" className="hover:text-aiGreen transition-colors">Home</a>
                <span>→</span>
                <span className="text-brandGold">{getSectorDisplayName(sector)}</span>
                <span>→</span>
                <span className="text-text">Deploy</span>
              </nav>
            )}
            
            <div className="inline-block px-4 py-2 rounded-full border border-brandGold/30 bg-brandGold/10 backdrop-blur-sm mb-4">
              <span className="text-sm text-brandGold font-medium">
                {sector ? `Agents for ${getSectorDisplayName(sector)}` : 'Agent Deployment Platform'}
              </span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,48px)] font-semibold mb-4">
              {sector ? `Deploy ${getSectorDisplayName(sector)} Agents` : 'Deploy & Manage AI Agents'}
            </h1>
            <p className="text-[17px] text-muted max-w-2xl mx-auto">
              {sector 
                ? `Specialized agents tailored for ${getSectorDisplayName(sector).toLowerCase()} operations with real-time monitoring and resource management.`
                : 'Orchestrate your 9-core agent architecture with real-time monitoring and resource management.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-8">
        <div className="container-wrap">
          <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            
            {/* Left Sidebar - Available Agents */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-edge bg-panel/60 p-6 h-full">
                <h3 className="text-lg font-semibold text-brandGold mb-4">
                  {sector ? `${getSectorDisplayName(sector)} Agents` : 'Available Agents'}
                </h3>
                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {availableAgents.map((agent) => (
                    <div
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedAgent.id === agent.id
                          ? 'border-brandGold bg-brandGold/10'
                          : 'border-edge hover:border-aiGreen/50 hover:bg-aiGreen/5'
                      }`}
                    >
                      <h4 className="font-semibold text-text mb-1">{agent.name}</h4>
                      <p className="text-sm text-muted mb-2">{agent.description}</p>
                      <div className="flex gap-2 text-xs text-muted">
                        <span>CPU: {agent.resources.cpu}</span>
                        <span>RAM: {agent.resources.memory}GB</span>
                        <span>Storage: {agent.resources.storage}GB</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Area - Deployment Interface */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-edge bg-panel/60 p-6 h-full">
                <h3 className="text-lg font-semibold text-brandGold mb-6">Deployment Configuration</h3>
                
                {/* Selected Agent Info */}
                <div className="mb-6 p-4 rounded-xl border border-edge bg-panel/40">
                  <h4 className="font-semibold text-text mb-2">{selectedAgent.name}</h4>
                  <p className="text-sm text-muted mb-3">{selectedAgent.description}</p>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted">CPU:</span>
                      <span className="text-aiGreen">{selectedAgent.resources.cpu} cores</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted">Memory:</span>
                      <span className="text-aiGreen">{selectedAgent.resources.memory}GB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted">Storage:</span>
                      <span className="text-aiGreen">{selectedAgent.resources.storage}GB</span>
                    </div>
                  </div>
                </div>

                {/* Environment Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-text mb-3">Deployment Environment</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Local', 'Cloud', 'Edge'].map((env) => (
                      <button
                        key={env}
                        onClick={() => setDeploymentEnv(env)}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                          deploymentEnv === env
                            ? 'border-brandGold bg-brandGold/10 text-brandGold'
                            : 'border-edge hover:border-aiGreen/50 hover:bg-aiGreen/5'
                        }`}
                      >
                        {env}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resource Allocation */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-text mb-3">Resource Allocation</label>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted">CPU Cores</span>
                        <span className="text-aiGreen">{selectedAgent.resources.cpu}</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div 
                          className="bg-aiGreen h-2 rounded-full transition-all"
                          style={{ width: `${(selectedAgent.resources.cpu / 8) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted">Memory (GB)</span>
                        <span className="text-aiGreen">{selectedAgent.resources.memory}</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div 
                          className="bg-brandGold h-2 rounded-full transition-all"
                          style={{ width: `${(selectedAgent.resources.memory / 32) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deploy Button */}
                <div className="space-y-4">
                  <button
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    className="w-full btn btn-gold py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeploying ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-bg border-t-brandGold rounded-full animate-spin" />
                        Deploying... {deploymentProgress}%
                      </div>
                    ) : (
                      'Deploy Agent'
                    )}
                  </button>
                  
                  {isDeploying && (
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div 
                        className="bg-brandGold h-2 rounded-full transition-all"
                        style={{ width: `${deploymentProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Live Logs & Metrics */}
            <div className="lg:col-span-3">
              <div className="space-y-6 h-full">
                
                {/* Deployed Agents Status */}
                <div className="rounded-2xl border border-edge bg-panel/60 p-6">
                  <h3 className="text-lg font-semibold text-brandGold mb-4">Deployed Agents</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {deployedAgents.map((agent) => (
                      <div key={agent.id} className="p-3 rounded-xl border border-edge bg-panel/40">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm text-text">{agent.name}</h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBg(agent.status)} ${getStatusColor(agent.status)}`}>
                            {agent.status}
                          </div>
                        </div>
                        <div className="text-xs text-muted space-y-1">
                          <div>Environment: {agent.environment}</div>
                          <div>Uptime: {agent.uptime}</div>
                          <div>Energy: {agent.energy}W</div>
                        </div>
                        {agent.status === 'running' && (
                          <button
                            onClick={() => handleStop(agent.id)}
                            className="mt-2 text-xs text-red-500 hover:text-red-400 transition-colors"
                          >
                            Stop Agent
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Logs */}
                <div className="rounded-2xl border border-edge bg-panel/60 p-6 flex-1">
                  <h3 className="text-lg font-semibold text-brandGold mb-4">Live Logs</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto font-mono text-xs">
                    {logs.map((log, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="text-muted">{log.timestamp}</span>
                        <span className={`${
                          log.level === 'error' ? 'text-red-500' :
                          log.level === 'success' ? 'text-aiGreen' :
                          log.level === 'warning' ? 'text-brandGold' :
                          'text-text'
                        }`}>
                          [{log.level.toUpperCase()}]
                        </span>
                        <span className="text-muted">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </main>
  );
}
