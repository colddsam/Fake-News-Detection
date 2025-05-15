"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export default function TruthScoreChart({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const duration = 2000 
    const interval = 20 
    const steps = duration / interval
    const increment = score / steps

    let currentScore = 0
    const timer = setInterval(() => {
      currentScore += increment
      if (currentScore >= score) {
        setAnimatedScore(score)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(currentScore))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [score])

  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ]

  const getScoreColor = () => {
    if (score >= 70) return "#22c55e" 
    if (score >= 40) return "#eab308" 
    return "#ef4444" 
  }

  const COLORS = [getScoreColor(), "#1e293b"]

  return (
    <div className="relative w-48 h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-4xl font-bold" style={{ color: getScoreColor() }}>
            {animatedScore}%
          </span>
        </motion.div>
      </div>
    </div>
  )
}
