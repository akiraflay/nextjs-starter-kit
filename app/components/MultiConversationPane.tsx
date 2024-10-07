import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Settings, X, Wand2 } from "lucide-react"
import { Conversation } from '../types'

interface MultiConversationPaneProps {
  conversation: Conversation;
  onClose: () => void;
  onParameterChange: (id: number, parameter: string, value: number) => void;
  onSwitchToMain: (id: number) => void;
  isMain: boolean;
  onTransform: () => void;
}

const MultiConversationPane: React.FC<MultiConversationPaneProps> = ({
  conversation,
  onClose,
  onParameterChange,
  onSwitchToMain,
  isMain,
  onTransform
}) => {
  const [showParameters, setShowParameters] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [conversation.messages])

  return (
    <Card className={`bg-[#1e2235] p-4 rounded-lg mb-4 flex-1 min-w-[280px] max-w-[400px] mr-4 ${isMain ? 'border-2 border-orange-500' : ''}`}>
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{conversation.model}</h3>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setShowParameters(!showParameters)} className="text-gray-300 hover:text-white transition-colors">
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Parameters</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {!isMain && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
                      <X className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Close</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {isMain && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={onTransform} className="text-gray-300 hover:text-white transition-colors">
                      <Wand2 className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Transform to Playground</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <ScrollArea className="h-[300px] mb-4" ref={scrollAreaRef}>
          {conversation.messages.length > 0 ? (
            conversation.messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded mb-3 ${message.role === 'user' ? 'bg-[#282d45]' : 'bg-[#343a56]'}`}
              >
                <span className="text-xs font-medium text-white">{message.role === 'user' ? 'You' : 'AI'}</span>
                <p className="text-sm mt-1 text-white">{message.content}</p>
              </motion.div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-gray-400">No conversation started</p>
            </div>
          )}
        </ScrollArea>
        <AnimatePresence>
          {showParameters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <h4 className="text-sm font-medium text-white mb-2">Temperature</h4>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[conversation.parameters.temperature]}
                onValueChange={(value) => onParameterChange(conversation.id, 'temperature', value[0])}
                className="w-full"
              />
              <span className="text-sm text-white">{conversation.parameters.temperature.toFixed(1)}</span>
            </motion.div>
          )}
        </AnimatePresence>
        {!isMain && (
          <div className="mt-4 flex justify-end">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onSwitchToMain(conversation.id)}
              className="text-orange-400 hover:text-orange-300 text-xs transition-colors"
            >
              Switch to Main
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MultiConversationPane