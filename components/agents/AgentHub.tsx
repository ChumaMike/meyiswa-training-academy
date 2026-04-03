'use client';

import { motion } from 'framer-motion';
import AgentPanel from './AgentPanel';

interface Agent {
  name: string;
  description: string;
  icon: string;
  trigger: string;
  triggerType: 'event' | 'scheduled' | 'manual';
  logLines: string[];
  accentColor?: string;
}

interface AgentHubProps {
  agents: Agent[];
  title?: string;
}

export default function AgentHub({ agents, title = 'Automation Agents' }: AgentHubProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <h2 className="text-white font-heading font-semibold text-base">{title}</h2>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium border border-yellow-700 bg-yellow-900/40 text-yellow-300">
          DEMO MODE
        </span>
        <p className="text-gray-600 text-xs ml-1 hidden sm:block">
          Click "Run Agent" to see a live simulation of each automation
        </p>
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
          >
            <AgentPanel {...agent} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
