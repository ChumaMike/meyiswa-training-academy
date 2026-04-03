'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle2, Loader2, AlertCircle, ChevronDown, ChevronUp, Clock } from 'lucide-react';

type Status = 'idle' | 'running' | 'done' | 'error';

interface AgentPanelProps {
  name: string;
  description: string;
  icon: string;
  trigger: string;
  triggerType: 'event' | 'scheduled' | 'manual';
  logLines: string[];
  accentColor?: string;
}

const TRIGGER_STYLES: Record<string, string> = {
  event: 'bg-blue-900/50 text-blue-300 border-blue-700',
  scheduled: 'bg-purple-900/50 text-purple-300 border-purple-700',
  manual: 'bg-gray-800 text-gray-400 border-gray-700',
};

const TRIGGER_ICONS: Record<string, string> = {
  event: '⚡',
  scheduled: '🕐',
  manual: '▶',
};

function LogLine({ line, index }: { line: string; index: number }) {
  const isSuccess = line.startsWith('✓');
  const isProcessing = line.startsWith('⏳');
  const isError = line.startsWith('✗');
  const isSending = line.startsWith('📤');
  const isInfo = line.startsWith('ℹ');

  const colorClass = isSuccess
    ? 'text-green-400'
    : isProcessing
    ? 'text-yellow-400'
    : isError
    ? 'text-red-400'
    : isSending
    ? 'text-blue-400'
    : isInfo
    ? 'text-gray-400'
    : 'text-gray-300';

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className={`text-xs font-mono leading-relaxed ${colorClass}`}
    >
      <span className="text-gray-600 select-none mr-2">{String(index + 1).padStart(2, '0')}</span>
      {line}
    </motion.div>
  );
}

export default function AgentPanel({
  name,
  description,
  icon,
  trigger,
  triggerType,
  logLines,
  accentColor = '#D4A017',
}: AgentPanelProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runAgent = () => {
    if (status === 'running') return;
    // Clear any previous timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setStatus('running');
    setVisibleLogs([]);
    setExpanded(true);

    logLines.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLogs(prev => [...prev, line]);
        if (logRef.current) {
          logRef.current.scrollTop = logRef.current.scrollHeight;
        }
        if (i === logLines.length - 1) {
          setTimeout(() => {
            const hasError = logLines.some(l => l.startsWith('✗'));
            setStatus(hasError ? 'error' : 'done');
            setLastRun(new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }));
          }, 400);
        }
      }, 500 + i * 480);
      timeoutsRef.current.push(t);
    });
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const statusIcon =
    status === 'idle' ? null :
    status === 'running' ? <Loader2 className="w-3.5 h-3.5 animate-spin text-yellow-400" /> :
    status === 'done' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> :
    <AlertCircle className="w-3.5 h-3.5 text-red-400" />;

  const statusLabel =
    status === 'idle' ? 'Ready' :
    status === 'running' ? 'Running...' :
    status === 'done' ? 'Completed' :
    'Error';

  const statusColor =
    status === 'idle' ? 'text-gray-500' :
    status === 'running' ? 'text-yellow-400' :
    status === 'done' ? 'text-green-400' :
    'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-200"
      style={{ borderTopColor: status === 'done' ? '#22c55e' : status === 'running' ? '#eab308' : status === 'error' ? '#ef4444' : accentColor, borderTopWidth: '2px' }}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-0.5 shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-semibold text-sm">{name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${TRIGGER_STYLES[triggerType]}`}>
                {TRIGGER_ICONS[triggerType]} {trigger}
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Status row */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {statusIcon}
            <span className={`text-xs ${statusColor}`}>{statusLabel}</span>
            {lastRun && (
              <span className="text-gray-600 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> Last run {lastRun}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {(status === 'done' || status === 'error') && visibleLogs.length > 0 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
              >
                Logs {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}
            <button
              onClick={runAgent}
              disabled={status === 'running'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                status === 'running'
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : status === 'done'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'text-gray-900 hover:opacity-90 shadow-md'
              }`}
              style={status !== 'running' ? { backgroundColor: accentColor } : {}}
            >
              {status === 'running' ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Running</>
              ) : status === 'done' ? (
                <><Play className="w-3 h-3" /> Re-run</>
              ) : (
                <><Play className="w-3 h-3" /> Run Agent</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Log panel */}
      <AnimatePresence>
        {(status === 'running' || (expanded && visibleLogs.length > 0)) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t border-gray-800 bg-gray-950 px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                </div>
                <span className="text-gray-600 text-xs font-mono">agent.log</span>
                {status === 'running' && (
                  <span className="ml-auto flex items-center gap-1 text-yellow-400 text-xs">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                    live
                  </span>
                )}
              </div>
              <div
                ref={logRef}
                className="space-y-1.5 max-h-36 overflow-y-auto scrollbar-thin"
              >
                {visibleLogs.map((line, i) => (
                  <LogLine key={i} line={line} index={i} />
                ))}
                {status === 'running' && (
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-gray-600 text-xs font-mono"
                  >
                    █
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
