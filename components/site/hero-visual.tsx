"use client"

import { motion } from "framer-motion"

const nodes = [
  { x: 90, y: 70 },
  { x: 300, y: 70 },
  { x: 90, y: 200 },
  { x: 300, y: 200 },
  { x: 195, y: 330 },
]

const links = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 4],
  [0, 3],
]

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <svg viewBox="0 0 390 400" className="h-auto w-full" role="img" aria-label="Abstract server and database network illustration">
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1D6FEB" />
            <stop offset="100%" stopColor="#00C4CC" />
          </linearGradient>
        </defs>

        {/* background grid */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 48} x2="390" y2={i * 48} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}

        {/* connection lines */}
        {links.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#line-grad)"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: "easeInOut" }}
          />
        ))}

        {/* data packets */}
        {links.slice(0, 4).map(([a, b], i) => (
          <motion.rect
            key={`p${i}`}
            width="6"
            height="6"
            rx="1.5"
            fill="#00C4CC"
            initial={{ x: nodes[a].x - 3, y: nodes[a].y - 3 }}
            animate={{ x: [nodes[a].x - 3, nodes[b].x - 3], y: [nodes[a].y - 3, nodes[b].y - 3] }}
            transition={{ duration: 2.4, delay: 1 + i * 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5, ease: "easeInOut" }}
          />
        ))}

        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="22"
              fill="rgba(29,111,235,0.08)"
              stroke="rgba(29,111,235,0.4)"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="7"
              fill="#1D6FEB"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px`, animation: `node-pulse 3s ${i * 0.4}s ease-in-out infinite` }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
