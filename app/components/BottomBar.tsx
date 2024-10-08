import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
import { cn } from "@/lib/utils"
import ActionButton from './ui/ActionButton'
import ProviderIcon from './ui/ProviderIcon'
import CategoryButton from './ui/CategoryButton'

interface BottomBarProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  provider: string;
  setProvider: (provider: string) => void;
  model: string;
  setModel: (model: string) => void;
  onAddMultiConversation: (provider: string, model: string) => void;
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
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

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
      models: ["GPT-4o", "o1-preview", "o1-mini"],
    },
    {
      name: "Anthropic",
      models: ["Sonnet 3.5", "Opus 3"],
    },
  ]

  return (
    <div className="bg-[#0a0b14] border-t border-gray-800">
      <div className="max-w-7xl mx-auto p-4">
        {isExpanded && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <CategoryButton
              icon={<FileText className="w-6 h-6" />}
              title="Review"
              description="Analyze and evaluate legal documents"
              color="bg-purple-600"
            />
            <CategoryButton
              icon={<PenTool className="w-6 h-6" />}
              title="Draft"
              description="Create and edit legal documents"
              color="bg-green-600"
            />
            <CategoryButton
              icon={<MessageSquare className="w-6 h-6" />}
              title="Summarize"
              description="Condense complex legal information"
              color="bg-yellow-600"
            />
            <CategoryButton
              icon={<Search className="w-6 h-6" />}
              title="Research"
              description="Explore legal precedents and statutes"
              color="bg-blue-600"
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
                  className="text-gray-400 hover:text-orange-500 transition-colors h-8 w-8 p-0 flex-shrink-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">
                <p>{isExpanded ? 'Hide Options' : 'Show Options'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex-grow relative">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Message Prompt Composer +"
              className="resize-none focus-visible:ring-1 focus-visible:ring-orange-500 min-h-[50px] bg-[#14151f] text-white border-gray-700"
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
                    variant="outline"
                    size="icon"
                    onClick={() => setProvider(providerOption.name)}
                    className={cn(
                      "p-0 h-10 w-10 flex items-center justify-center transition-colors bg-[#14151f] border-gray-700 text-white hover:bg-gray-700",
                      provider === providerOption.name && "ring-2 ring-orange-500"
                    )}
                  >
                    <ProviderIcon provider={providerOption.name} className="w-6 h-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-0 bg-[#14151f] border-gray-700">
                  {providerOption.models.map((modelOption) => (
                    <Button
                      key={modelOption}
                      variant="ghost"
                      onClick={() => {
                        setModel(modelOption)
                        onAddMultiConversation(providerOption.name, modelOption)
                      }}
                      className="w-full justify-start text-white hover:bg-gray-700 hover:text-orange-500"
                    >
                      {modelOption}
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>
            ))}
            <Button
              onClick={handleSend}
              disabled={isInputEmpty}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomBar