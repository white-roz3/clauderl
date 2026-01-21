'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ResearchPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('methodology');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().slice(11, 19));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const documents = [
    {
      id: 'methodology',
      title: 'METHODOLOGY',
      description: 'How we measure intelligence fairly across different architectures',
      status: 'PUBLISHED',
      content: 'Every model receives identical inputs, time constraints, and environmental conditions. No prompt engineering advantages. No cherry-picked scenarios.',
    },
    {
      id: 'environments',
      title: 'ENVIRONMENT DESIGN',
      description: 'Why these 15 challenges cover the spectrum of cognitive abilities',
      status: 'PUBLISHED',
      content: 'From spatial reasoning to adversarial combat, each environment tests a distinct aspect of general intelligence.',
    },
    {
      id: 'scoring',
      title: 'SCORING SYSTEM',
      description: 'Transparent metrics and how they are calculated',
      status: 'PUBLISHED',
      content: 'Win rates, average scores, head-to-head records, environment-specific performance. All metrics are public and verifiable.',
    },
    {
      id: 'whitepaper',
      title: 'WHITEPAPER',
      description: 'Technical deep-dive into ClaudeArena architecture',
      status: 'IN PROGRESS',
      content: 'Comprehensive documentation of system architecture, model integration, and evaluation protocols.',
    },
    {
      id: 'api',
      title: 'API ACCESS',
      description: 'Run your own benchmarks against our environments',
      status: 'COMING SOON',
      content: 'Programmatic access to run custom evaluations with full reproducibility.',
    },
  ];

  const publications = [
    {
      id: 'pub-001',
      title: 'Adversarial Benchmarking for Frontier Models',
      authors: 'ClaudeArena Research',
      date: 'JAN 2026',
      status: 'PUBLISHED',
      abstract: 'Novel approach to evaluating LLMs in adversarial 3D environments, demonstrating significant performance differences across reasoning tasks.',
    },
    {
      id: 'pub-002',
      title: 'Extended Thinking in Real-Time Decision Making',
      authors: 'ClaudeArena Research',
      date: 'Q2 2026',
      status: 'PENDING',
      abstract: 'Analysis of how chain-of-thought reasoning impacts performance in time-constrained environments.',
    },
  ];

  const selectedDocument = documents.find(d => d.id === selectedDoc);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'var(--green)';
      case 'IN PROGRESS': return 'var(--amber)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <main 
      className="min-h-screen pt-16 font-mono"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Top Status Bar */}
      <div 
        className="border-b px-4 py-2 flex justify-between text-xs"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-4">
          <span style={{ color: 'var(--text-muted)' }}>PATH:</span>
          <code style={{ color: 'var(--accent)' }}>/research/docs</code>
        </div>
        <div className="flex items-center gap-6">
          <span style={{ color: 'var(--text-muted)' }}>
            UTC: <span style={{ color: 'var(--accent)' }}>{currentTime}</span>
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="hud-panel inline-block" style={{ border: '1px solid var(--border)' }}>
            <div className="hud-panel-header">
              <span className="hud-panel-title">RESEARCH DATABASE</span>
              <span className="status-badge">
                <span className="status-dot" style={{ width: 4, height: 4 }} />
                ACCESSIBLE
              </span>
            </div>
            <div className="px-4 py-3">
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent)' }}>{'>'}</span> RESEARCH
              </h1>
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                Technical documentation and publications
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Documents List - Left column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="hud-panel"
              style={{ border: '1px solid var(--border)' }}
            >
              <div className="hud-panel-header">
                <span className="hud-panel-title">DOCUMENTS</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{documents.length}</span>
              </div>
              <div className="hud-panel-content p-0">
                {documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc.id)}
                    className="w-full text-left p-3 border-b transition-colors"
                    style={{ 
                      borderColor: 'var(--border)',
                      background: selectedDoc === doc.id ? 'rgba(194, 117, 81, 0.1)' : 'transparent'
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span 
                        className="text-xs font-bold"
                        style={{ color: selectedDoc === doc.id ? 'var(--accent)' : 'var(--text-primary)' }}
                      >
                        {doc.title}
                      </span>
                      <span 
                        className="text-[10px] px-1.5"
                        style={{ 
                          border: `1px solid ${getStatusColor(doc.status)}`,
                          color: getStatusColor(doc.status)
                        }}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <p className="text-[10px] line-clamp-1" style={{ color: 'var(--text-muted)' }}>
                      {doc.description}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content - Right 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Selected Document Detail */}
            {selectedDocument && (
              <motion.div
                key={selectedDoc}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hud-panel"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="hud-panel-header">
                  <span className="hud-panel-title">{selectedDocument.title}</span>
                  <span 
                    className="text-xs px-2"
                    style={{ 
                      border: `1px solid ${getStatusColor(selectedDocument.status)}`,
                      color: getStatusColor(selectedDocument.status)
                    }}
                  >
                    {selectedDocument.status}
                  </span>
                </div>
                <div className="hud-panel-content">
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {selectedDocument.description}
                  </p>
                  <div 
                    className="p-4 text-xs"
                    style={{ 
                      border: '1px solid var(--border)',
                      background: 'var(--bg-panel)'
                    }}
                  >
                    <pre className="whitespace-pre-wrap" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--accent)' }}>// SUMMARY</span>{'\n\n'}
                      {selectedDocument.content}
                    </pre>
                  </div>
                  {selectedDocument.status === 'PUBLISHED' && (
                    <button 
                      className="hud-button hud-button-primary mt-4 text-xs"
                    >
                      READ FULL DOCUMENT
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Publications Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hud-panel"
              style={{ border: '1px solid var(--border)' }}
            >
              <div className="hud-panel-header">
                <span className="hud-panel-title">PUBLICATIONS</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{publications.length}</span>
              </div>
              <div className="hud-panel-content">
                <div className="overflow-x-auto">
                  <table className="hud-table text-xs w-full">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {publications.map((pub) => (
                        <tr key={pub.id}>
                          <td style={{ color: 'var(--text-muted)' }}>{pub.id}</td>
                          <td>
                            <div>
                              <span style={{ color: 'var(--text-primary)' }}>{pub.title}</span>
                              <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                {pub.authors}
                              </p>
                            </div>
                          </td>
                          <td style={{ color: 'var(--text-secondary)' }}>{pub.date}</td>
                          <td>
                            <span 
                              className="text-[10px] px-1.5"
                              style={{ 
                                border: `1px solid ${getStatusColor(pub.status)}`,
                                color: getStatusColor(pub.status)
                              }}
                            >
                              {pub.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* API Access Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hud-panel"
              style={{ border: '1px solid var(--accent)' }}
            >
              <div className="hud-panel-header">
                <span className="hud-panel-title">API ACCESS</span>
                <span className="text-xs" style={{ color: 'var(--amber)' }}>COMING SOON</span>
              </div>
              <div className="hud-panel-content">
                <pre 
                  className="text-xs mb-4"
                  style={{ 
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
{`// Run your own benchmarks
const arena = new ClaudeArena({
  apiKey: process.env.ARENA_KEY,
  environment: 'spatial-reasoning'
});

const result = await arena.evaluate({
  model: 'your-model-endpoint',
  iterations: 100
});

console.log(result.winRate);`}
                </pre>
                <div className="flex items-center gap-4">
                  <button className="hud-button text-xs">
                    JOIN WAITLIST
                  </button>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    ETA: Q2 2026
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
