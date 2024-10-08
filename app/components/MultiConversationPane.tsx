import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, X, Wand2, MessageSquare, Zap, Clock } from "lucide-react"
import { Conversation } from '../types'
import ProviderIcon from './ui/ProviderIcon'  // Updated import path

interface MultiConversationPaneProps {
  conversation: Conversation;
  onClose: () => void;
  onParameterChange: (id: number, parameter: string, value: number) => void;
  onSwitchToMain: (id: number) => void;
  isMain: boolean;
  onTransform: () => void;
}

const modelInfo: Record<string, { pros: string[], cons: string[], specs: string[] }> = {
  "ChatGPT 4o": {
    pros: ["Advanced language understanding", "Broad knowledge base", "Excellent at complex tasks"],
    cons: ["Higher latency", "More expensive"],
    specs: ["Token limit: 8,192", "Newest GPT-4 model", "Optimized for dialogue"]
  },
  "ChatGPT o1-preview": {
    pros: ["Fast response time", "Good balance of capability and efficiency"],
    cons: ["Less capable than GPT-4", "May struggle with very complex tasks"],
    specs: ["Token limit: 4,096", "Based on GPT-3.5 architecture", "Optimized for chat"]
  },
  "ChatGPT o1-mini": {
    pros: ["Very fast", "Low resource usage", "Suitable for simple tasks"],
    cons: ["Limited capabilities", "May produce less coherent responses for complex queries"],
    specs: ["Token limit: 2,048", "Lightweight model", "Best for short, straightforward interactions"]
  },
  "Claude Opus 3": {
    pros: ["Specialized for ornate and detailed writing", "Excellent for creative tasks", "High accuracy in complex topics"],
    cons: ["Slower processing time", "May produce verbose outputs"],
    specs: ["Token limit: 100,000", "Specialized knowledge base", "Advanced language understanding"]
  },
  "Claude Sonnet 3.5": {
    pros: ["Fast and efficient", "Terse prose style", "Versatile for general tasks"],
    cons: ["Less detailed outputs", "May miss nuances in complex topics"],
    specs: ["Token limit: 50,000", "Broad knowledge base", "Optimized for quick responses"]
  }
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
  const [activeTab, setActiveTab] = useState('chat')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [conversation.messages])

  const modelDetails = modelInfo[conversation.model] || {
    pros: ["Versatile AI model"],
    cons: ["Specific details not available"],
    specs: ["General-purpose AI"]
  }

  return (
    <Card className={`bg-[#0a0b14] rounded-lg mb-4 flex-1 min-w-[280px] max-w-[400px] mr-4 ${isMain ? 'border-2 border-orange-500' : 'border border-gray-700'} overflow-hidden`}>
      <CardHeader className="bg-[#14151f] p-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ProviderIcon provider={conversation.provider} className="w-6 h-6 text-white" />
            <CardTitle className="text-lg font-semibold text-orange-400">{conversation.model}</CardTitle>
          </div>
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
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#0a0b14] p-1">
            <TabsTrigger
              value="chat"
              onClick={() => setActiveTab("chat")}
              className="data-[state=active]:bg-[#14151f] data-[state=active]:text-orange-400"
            >
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="info"
              onClick={() => setActiveTab("info")}
              className="data-[state=active]:bg-[#14151f] data-[state=active]:text-orange-400"
            >
              Model Info
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <ScrollArea className="h-[calc(100vh-250px)] p-4" ref={scrollAreaRef}>
          {activeTab === 'chat' ? (
            conversation.messages.length > 0 ? (
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
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-400 mb-2">No conversation started</p>
                <p className="text-xs text-gray-500">Start typing to begin your conversation with {conversation.model}</p>
              </div>
            )
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-orange-400 mb-2">Pros</h4>
                <ul className="list-disc list-inside text-sm text-gray-300">
                  {modelDetails.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-orange-400 mb-2">Cons</h4>
                <ul className="list-disc list-inside text-sm text-gray-300">
                  {modelDetails.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-orange-400 mb-2">Technical Specifications</h4>
                <ul className="list-disc list-inside text-sm text-gray-300">
                  {modelDetails.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
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
              className="p-4 bg-[#14151f] border-t border-gray-700"
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
        <div className="p-4 bg-[#14151f] border-t border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Zap className="h-4 w-4" />
            <span>Tokens: {conversation.messages.reduce((acc, msg) => acc + msg.content.length, 0)}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Response time: 1.2s</span>
          </div>
        </div>
        {!isMain ? (
          <div className="p-2 bg-[#0a0b14] border-t border-gray-700">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSwitchToMain(conversation.id)}
              className="w-full text-orange-400 hover:text-orange-300 text-xs transition-colors"
            >
              Switch to Main
            </Button>
          </div>
        ) : (
          <div className="p-2 bg-[#0a0b14] border-t border-gray-700">
            <Button
              size="sm"
              variant="outline"
              onClick={onClose}
              className="w-full text-red-400 hover:text-red-300 text-xs transition-colors"
            >
              Close Main Chat
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MultiConversationPane