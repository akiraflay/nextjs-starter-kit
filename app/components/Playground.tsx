import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RotateCcw, X, Loader2 } from "lucide-react"
import { Conversation } from '../types'

interface PlaygroundProps {
  conversation: Conversation;
  onClose: () => void;
  onRevert: () => void;
}

const Playground: React.FC<PlaygroundProps> = ({ conversation, onClose, onRevert }) => {
  const [code, setCode] = useState(conversation.messages.map(m => m.content).join('\n\n'))
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState('vs-dark')
  const [fontSize, setFontSize] = useState('14px')
  const [loading, setLoading] = useState(false)

  const handleRunCode = () => {
    setLoading(true)
    // Simulate code execution
    setTimeout(() => {
      setLoading(false)
      // Add result to conversation
      conversation.messages.push({ role: 'system', content: 'Code executed successfully.' })
    }, 2000)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-[#1e2235] border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-white">Playground: {conversation.model}</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onRevert} className="text-gray-400 hover:text-white transition-colors">
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px] bg-[#282d45] border-gray-600 text-white">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="bg-[#282d45] border-gray-600">
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[180px] bg-[#282d45] border-gray-600 text-white">
                  <SelectValue placeholder="Select Theme" />
                </SelectTrigger>
                <SelectContent className="bg-[#282d45] border-gray-600">
                  <SelectItem value="vs-dark">VS Dark</SelectItem>
                  <SelectItem value="github-light">GitHub Light</SelectItem>
                </SelectContent>
              </Select>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger className="w-[180px] bg-[#282d45] border-gray-600 text-white">
                  <SelectValue placeholder="Select Font Size" />
                </SelectTrigger>
                <SelectContent className="bg-[#282d45] border-gray-600">
                  <SelectItem value="12px">12px</SelectItem>
                  <SelectItem value="14px">14px</SelectItem>
                  <SelectItem value="16px">16px</SelectItem>
                  <SelectItem value="18px">18px</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleRunCode} disabled={loading} className="bg-orange-600 hover:bg-orange-700 text-white transition-colors">
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {loading ? "Running..." : "Run Code"}
            </Button>
          </div>
          <div className="p-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[400px] bg-[#282d45] text-white font-mono border-gray-600 focus:ring-2 focus:ring-orange-500"
              style={{ fontSize: fontSize }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Playground