'use client';

import { useState, useEffect } from 'react';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';

export default function TestGlobePage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  
  const submitPrompt = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/test-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          metadata: {
            source: 'test-globe-page',
            timestamp: new Date().toISOString()
          }
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setResponse(data.data.choices[0]?.message?.content || 'No response received');
        // Refresh logs
        fetchLogs();
      } else {
        setError(data.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/deepseek-logs?limit=10');
      const data = await res.json();
      
      if (data.success) {
        setLogs(data.data.logs);
      }
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  };
  
  const clearLogs = async () => {
    try {
      await fetch('/api/deepseek-logs', { method: 'DELETE' });
      setLogs([]);
      setResponse('');
    } catch (err) {
      console.error('Failed to clear logs:', err);
    }
  };
  
  useEffect(() => {
    fetchLogs();
  }, []);
  
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="container-wrap py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-spectral font-bold text-brandGold mb-4">
              Test Globe Integration
            </h1>
            <p className="text-xl text-muted">
              Test the logging system and see real-time activity on the globe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prompt Input */}
            <div className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-text mb-2">
                  Enter your test prompt:
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type a test message..."
                  className="w-full h-32 px-4 py-3 bg-panel border border-edge rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brandGold focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={submitPrompt}
                  disabled={loading || !prompt.trim()}
                  className="btn btn-gold px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Test Request'}
                </button>
                
                <button
                  onClick={clearLogs}
                  className="btn btn-ghost px-6 py-3"
                >
                  Clear Logs
                </button>
              </div>
              
              {error && (
                <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
                  <div className="text-danger font-medium">Error:</div>
                  <div className="text-danger text-sm">{error}</div>
                </div>
              )}
              
              {response && (
                <div className="p-4 bg-panel border border-edge rounded-lg">
                  <div className="text-brandGold font-medium mb-2">Test Response:</div>
                  <div className="text-text whitespace-pre-wrap">{response}</div>
                </div>
              )}
            </div>
            
            {/* Recent Logs */}
            <div>
              <h3 className="text-xl font-semibold text-text mb-4">Recent Activity</h3>
              
              {logs.length === 0 ? (
                <div className="text-muted text-center py-8">
                  No activity yet. Send a test request to see logs here!
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-3 rounded-lg border ${
                        log.success 
                          ? 'bg-green-500/10 border-green-500/20' 
                          : 'bg-red-500/10 border-red-500/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-text">
                          {log.metadata.geoLocation.city}, {log.metadata.geoLocation.country}
                        </div>
                        <div className="text-xs text-muted">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted mb-1">
                        "{log.prompt}"
                      </div>
                      
                      <div className="flex justify-between text-xs text-muted">
                        <span>Response: {log.responseTime}ms</span>
                        <span className={log.success ? 'text-green-400' : 'text-red-400'}>
                          {log.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      
                      {log.error && (
                        <div className="text-xs text-red-400 mt-1">
                          Error: {log.error}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 text-center space-x-4">
                <a
                  href="/globe"
                  className="btn btn-ghost px-6 py-2"
                >
                  View on Globe →
                </a>
                <button
                  onClick={fetchLogs}
                  className="btn btn-ghost px-6 py-2"
                >
                  Refresh Logs
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-panel border border-edge rounded-lg">
            <h3 className="text-xl font-semibold text-brandGold mb-4">How to Test</h3>
            <div className="space-y-2 text-muted">
              <div>1. Enter a test message in the text area above</div>
              <div>2. Click "Send Test Request" to submit it</div>
              <div>3. Watch the log appear in the "Recent Activity" section</div>
              <div>4. Click "View on Globe" to see the 3D visualization</div>
              <div>5. The globe will show animated points for each request</div>
            </div>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
