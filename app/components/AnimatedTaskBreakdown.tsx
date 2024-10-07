import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Task {
  title: string;
  description: string;
}

interface AnimatedTaskBreakdownProps {
  isVisible: boolean;
}

const AnimatedTaskBreakdown: React.FC<AnimatedTaskBreakdownProps> = ({ isVisible }) => {
  const tasks: Task[] = [
    { title: "Analyzing Input", description: "Processing user query and context" },
    { title: "Retrieving Information",  description: "Searching relevant legal databases" },
    { title: "Formulating Response", description: "Synthesizing data into coherent answer" }
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-[#1e2235] p-4 rounded-lg shadow-lg z-50"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Task Breakdown</h3>
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-2 mb-2"
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <div>
                <p className="text-sm font-medium text-white">{task.title}</p>
                <p className="text-xs text-gray-400">{task.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AnimatedTaskBreakdown