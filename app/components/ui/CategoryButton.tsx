import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface CategoryButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ icon, title, description, color }) => (
  <motion.div
    className="relative"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Button 
      className={`h-16 w-full flex flex-col items-center justify-center p-2 ${color} hover:opacity-90 transition-all duration-300 ease-in-out rounded-lg shadow-md overflow-hidden`}
    >
      {icon}
      <span className="text-sm font-semibold mt-1">{title}</span>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-xs text-white"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {description}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </Button>
  </motion.div>
)

export default CategoryButton