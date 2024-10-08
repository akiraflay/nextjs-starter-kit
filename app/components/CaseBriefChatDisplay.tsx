import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { X, Copy } from "lucide-react"
import { motion } from 'framer-motion'
import { CaseBrief } from '../types'

interface CaseBriefChatDisplayProps {
  caseBrief: CaseBrief;
  onClose: () => void;
}

const CaseBriefChatDisplay: React.FC<CaseBriefChatDisplayProps> = ({ caseBrief, onClose }) => {
  const [sortOption, setSortOption] = useState("Brief")
  const [isEli5, setIsEli5] = useState(false)

  const getSortedContent = (): Record<string, string | string[]> => {
    const content = caseBrief.content ?? {}
    switch (sortOption) {
      case "Brief":
        return content
      case "Key Notes":
        return { "Key Quotes": content["Key Quotes"] ?? [] }
      case "Significance":
        return { "Legal Significance": content["Legal Significance"] ?? "N/A" }
      default:
        return content
    }
  }

  const getEli5Content = (content: Record<string, string | string[]>): Record<string, string | string[]> => {
    return Object.fromEntries(
      Object.entries(content).map(([key, value]) => [
        key,
        Array.isArray(value)
          ? value.map((item) => `ELI5: ${item}`)
          : `ELI5: ${value}`,
      ])
    )
  }

  const sortedContent = getSortedContent()
  const displayContent = isEli5 ? getEli5Content(sortedContent) : sortedContent

  return (
    <Card className="bg-[#0a0b14] rounded-lg mb-4 flex-1 min-w-[280px] max-w-[50%] mr-4 border-2 border-orange-600 overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-[#14151f] p-4 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-orange-400">{caseBrief.name}</h3>
              <p className="text-sm text-gray-400">{caseBrief.court}</p>
              <p className="text-sm text-gray-400">{caseBrief.citation}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="eli5-mode" className="text-sm font-medium text-gray-300">
                  ELI5:
                </Label>
                <Switch
                  id="eli5-mode"
                  checked={isEli5}
                  onCheckedChange={setIsEli5}
                />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Close</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <Tabs defaultValue="Brief" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#0a0b14] p-1">
            <TabsTrigger
              value="Brief"
              onClick={() => setSortOption("Brief")}
              className="data-[state=active]:bg-[#14151f] data-[state=active]:text-orange-400"
            >
              Brief
            </TabsTrigger>
            <TabsTrigger
              value="Key Notes"
              onClick={() => setSortOption("Key Notes")}
              className="data-[state=active]:bg-[#14151f] data-[state=active]:text-orange-400"
            >
              Key Notes
            </TabsTrigger>
            <TabsTrigger
              value="Significance"
              onClick={() => setSortOption("Significance")}
              className="data-[state=active]:bg-[#14151f] data-[state=active]:text-orange-400"
            >
              Significance
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <ScrollArea className="h-[calc(100vh-250px)] p-4">
          {Object.entries(displayContent).map(([key, value], index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mb-4"
            >
              <div className="flex justify-between items-center bg-[#14151f] p-2 rounded-t-md">
                <span className="text-sm font-medium text-orange-400">{key}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            Array.isArray(value) ? value.join('\n') : value as string
                          )
                        }
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy to clipboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="bg-[#1c1e2d] p-3 rounded-b-md">
                {Array.isArray(value) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {value.map((item, i) => (
                      <li key={i} className="text-sm text-gray-300">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-300 whitespace-pre-wrap">{value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default CaseBriefChatDisplay