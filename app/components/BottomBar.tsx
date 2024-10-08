import React, { useState } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ChevronDown,
  ChevronUp,
  Send,
  Zap,
  Sparkles,
  Eraser,
  FileText,
  PenTool,
  MessageSquare,
  Search,
} from "lucide-react"
import CategoryButton from './ui/CategoryButton'
import ActionButton from './ui/ActionButton'

// Import SVG icons as React components
import OpenAIIcon from './icons/openai-icon.svg'
import AnthropicIcon from './icons/anthropic-icon.svg'

interface BottomBarProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  provider: string;
  setProvider: (provider: string) => void;
  model: string;
  setModel: (model: string) => void;
  onAddMultiConversation: (provider: string, model: string) => void;
  onAdjustComplexity: (complexityChange: number) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({
  input,
  setInput,
  handleSend,
  provider,
  setProvider,
  model,
  setModel,
  onAddMultiConversation,
  onAdjustComplexity,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y < 0) {
      onAdjustComplexity(Math.abs(info.offset.y))
    } else if (info.offset.y > 0) {
      onAdjustComplexity(-info.offset.y)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleClearInput = () => {
    setInput('')
  }

  const isInputEmpty = !input || input.trim() === ''

  const providerOptions = [
    {
      name: "OpenAI",
      models: ["gpt-4o", "o1-preview", "o1-mini"],
      icon: OpenAIIcon,
    },
    {
      name: "Anthropic",
      models: ["Sonnet 3.5", "Opus 3.0"],
      icon: AnthropicIcon,
    },
  ]

  return (
    <div className="bg-[#111528] border-t border-gray-800 p-4 transition-all duration-300 ease-in-out">
      <div className="max-w-6xl mx-auto">
        {isExpanded && (
          <div className="grid grid-cols-4 gap-4 mb-4">
            <CategoryButton
              icon={<FileText className="w-6 h-6" />}
              title="Review"
              description="Analyze and evaluate legal documents"
              color="bg-purple-500"
            />
            <CategoryButton
              icon={<PenTool className="w-6 h-6" />}
              title="Draft"
              description="Create and edit legal documents"
              color="bg-green-500"
            />
            <CategoryButton
              icon={<MessageSquare className="w-6 h-6" />}
              title="Summarize"
              description="Condense complex legal information"
              color="bg-yellow-500"
            />
            <CategoryButton
              icon={<Search className="w-6 h-6" />}
              title="Research"
              description="Explore legal precedents and statutes"
              color="bg-blue-500"
            />
          </div>
        )}
        <div className="flex items-end space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-400 hover:text-white transition-colors h-8 w-8 p-0 flex-shrink-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isExpanded ? 'Hide Options' : 'Show Options'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex-grow relative">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Message Prompt Composer +"
              className="bg-[#1e2235] border-gray-700 text-white text-sm py-2 pr-10 resize-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[50px]"
              rows={isExpanded ? 3 : 1}
            />
            <div className="absolute right-2 top-2 flex space-x-1">
              <ActionButton
                icon={<Zap className="h-4 w-4" />}
                tooltip="Quick Actions"
                onClick={() => console.log("Quick Actions")}
              />
              <ActionButton
                icon={<Sparkles className="h-4 w-4" />}
                tooltip="AI Suggestions"
                onClick={() => console.log("AI Suggestions")}
              />
              <ActionButton
                icon={<Eraser className="h-4 w-4" />}
                tooltip="Clear Input"
                onClick={handleClearInput}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {providerOptions.map((providerOption) => (
              <Popover key={providerOption.name}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setProvider(providerOption.name)}
                    className="p-0 h-10 w-10 flex items-center justify-center hover:bg-[#1e2235] transition-colors"
                  >
                    <providerOption.icon className="w-6 h-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2 bg-[#1e2235] border-gray-700">
                  {providerOption.models.map((modelOption) => (
                    <Button
                      key={modelOption}
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-[#282d45] text-sm"
                      onClick={() => {
                        setModel(modelOption)
                        onAddMultiConversation(
                          providerOption.name,
                          modelOption
                        )
                      }}
                    >
                      {modelOption}
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>
            ))}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDrag={handleDrag}
              className="cursor-grab active:cursor-grabbing"
            >
              <Button
                onClick={handleSend}
                disabled={isInputEmpty}
                className="w-10 h-10 bg-[#54a9eb] hover:bg-orange-500 text-white transition-colors p-2 rounded-full"
              >
                <Send className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomBar