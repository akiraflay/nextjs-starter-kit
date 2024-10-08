'use client'

import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import WelcomeScreen from './components/WelcomeScreen'
import MultiConversationPane from './components/MultiConversationPane'
import RightSidebar from './components/RightSidebar'
import AnimatedTaskBreakdown from './components/AnimatedTaskBreakdown'
import CaseBriefChatDisplay from './components/CaseBriefChatDisplay'
import Playground from './components/Playground'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Conversation, CaseBrief } from './types'
import { mockCaseBriefs, mockCaseBriefContent } from './utils/mockData'

function OsgoodZero() {
  const [input, setInput] = useState('')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [provider, setProvider] = useState('OpenAI')
  const [model, setModel] = useState('gpt-4o')
  const [selectedModels, setSelectedModels] = useState<{ [key: string]: number }>({})
  const [mainConversationId, setMainConversationId] = useState<number | null>(null)
  const [showRightSidebar, setShowRightSidebar] = useState(false)
  const [activeTab, setActiveTab] = useState('prompts')
  const [isExpanded, setIsExpanded] = useState(true)
  const [showPlayground, setShowPlayground] = useState(false)
  const [showTaskBreakdown, setShowTaskBreakdown] = useState(false)
  const [selectedCaseBrief, setSelectedCaseBrief] = useState<CaseBrief | null>(null)

  const toggleSidebar = () => setIsExpanded(!isExpanded)
  const toggleRightSidebar = () => setShowRightSidebar(!showRightSidebar)

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { role: 'user', content: input }
      setConversations(prev =>
        prev.map(conv => ({
          ...conv,
          messages: [...conv.messages, newMessage],
        }))
      )
      setInput('')

      setShowTaskBreakdown(true)

      setTimeout(() => {
        setShowTaskBreakdown(false)
        setConversations(prev =>
          prev.map(conv => ({
            ...conv,
            messages: [
              ...conv.messages,
              { role: 'ai', content: `This is a simulated AI response for ${conv.model}.` },
            ],
          }))
        )
      }, 1500)
    }
  }

  const handleAddMultiConversation = (provider: string, model: string) => {
    const newConversation: Conversation = {
      id: Date.now(),
      provider,
      model,
      messages: [],
      parameters: { temperature: 0.5 },
    }
    setConversations(prev => [...prev, newConversation])
    setSelectedModels(prev => ({ ...prev, [model]: (prev[model] || 0) + 1 }))
    if (mainConversationId === null) {
      setMainConversationId(newConversation.id)
    }
  }

  const handleAdjustComplexity = (complexityChange: number) => {
    setConversations(prev => {
      const updatedConversations = [...prev]
      const mainConversation = updatedConversations.find(conv => conv.id === mainConversationId)
      if (mainConversation) {
        const lastAiMessageIndex = mainConversation.messages
          .slice()
          .reverse()
          .findIndex(msg => msg.role === 'ai')
        if (lastAiMessageIndex !== -1) {
          const index = mainConversation.messages.length - 1 - lastAiMessageIndex
          const adjustedMessage = {
            ...mainConversation.messages[index],
            content: `${mainConversation.messages[index].content} (Complexity adjusted by ${complexityChange})`,
          }
          mainConversation.messages[index] = adjustedMessage
        }
      }
      return updatedConversations
    })
  }

  const handleNewChat = () => handleAddMultiConversation(provider, model)
  const handleChatHistoryClick = () => {}
  const handleProjectsClick = () => {}
  const handleOurMissionClick = () => {}
  const handleViewAllProjects = () => {}
  const handleViewAllChats = () => {}
  const handleViewOnMain = (caseBriefId: string) => {
    const caseBrief = mockCaseBriefs.find(brief => brief.id === caseBriefId)
    if (caseBrief) {
      const newConversation: Conversation = {
        id: Date.now(),
        provider: 'Case Brief',
        model: caseBrief.name,
        messages: [
          { role: 'system', content: 'Displaying case brief.' },
          { role: 'user', content: 'Show me the case brief.' },
          { role: 'ai', content: Object.entries(mockCaseBriefContent).map(([key, value]) => `${key}\n${value}`).join('\n\n') },
        ],
        parameters: { temperature: 0.5 },
      }
      setConversations(prev => [...prev, newConversation])
      setMainConversationId(newConversation.id)
    }
  }
  const handleAttachAsFile = (caseBriefId: string) => {}
  const handleSelectCase = (caseBrief: CaseBrief) => {
    setSelectedCaseBrief(caseBrief)
  }
  const handleCloseCaseBrief = () => {
    setSelectedCaseBrief(null)
  }
  const handleCloseMultiConversation = (id: number) => {
    setConversations(prev => prev.filter(conv => conv.id !== id))
    setSelectedModels(prev => {
      const updatedModels = { ...prev }
      const closedConversation = conversations.find(conv => conv.id === id)
      if (closedConversation) {
        updatedModels[closedConversation.model] = (updatedModels[closedConversation.model] || 1) - 1
        if (updatedModels[closedConversation.model] === 0) {
          delete updatedModels[closedConversation.model]
        }
      }
      return updatedModels
    })
    if (id === mainConversationId) {
      setMainConversationId(conversations.length > 1 ? conversations[0].id : null)
    }
  }
  const handleMultiConversationParameterChange = (id: number, parameter: string, value: number) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === id ? { ...conv, parameters: { ...conv.parameters, [parameter]: value } } : conv
      )
    )
  }
  const handleSwitchToMain = (id: number) => setMainConversationId(id)
  const handleTransformToPlayground = () => {
    setShowPlayground(true)
  }
  const handleClosePlayground = () => {
    setShowPlayground(false)
  }
  const handleRevertPlayground = () => {
    // Logic to revert changes made in Playground
  }

  return (
    <div className="flex h-screen bg-[#111528] text-white">
      <Sidebar
        isExpanded={isExpanded}
        toggleSidebar={toggleSidebar}
        onNewChat={handleNewChat}
        onChatHistoryClick={handleChatHistoryClick}
        onProjectsClick={handleProjectsClick}
        onOurMissionClick={handleOurMissionClick}
        onViewAllProjects={handleViewAllProjects}
        onViewAllChats={handleViewAllChats}
      />
      <main className="flex-1 flex flex-col">
        <TopBar
          isExpanded={isExpanded}
          toggleSidebar={toggleSidebar}
          toggleRightSidebar={toggleRightSidebar}
          onViewOnMain={handleViewOnMain}
          onAttachAsFile={handleAttachAsFile}
          onSelectCase={handleSelectCase}
        />
        <div className="flex-1 overflow-hidden p-4">
          <ScrollArea className="h-full">
            {conversations.length === 0 && !selectedCaseBrief ? (
              <WelcomeScreen onStartNewConversation={handleNewChat} />
            ) : showPlayground ? (
              <Playground
                conversation={conversations.find(conv => conv.id === mainConversationId)!}
                onClose={handleClosePlayground}
                onRevert={handleRevertPlayground}
              />
            ) : (
              <div className="flex">
                {selectedCaseBrief && (
                  <CaseBriefChatDisplay
                    caseBrief={selectedCaseBrief}
                    onClose={handleCloseCaseBrief}
                  />
                )}
                <div className={`flex flex-wrap ${selectedCaseBrief ? 'w-1/2' : 'w-full'}`}>
                  {conversations.map(conv => (
                    <MultiConversationPane
                      key={conv.id}
                      conversation={conv}
                      onClose={() => handleCloseMultiConversation(conv.id)}
                      onParameterChange={handleMultiConversationParameterChange}
                      onSwitchToMain={handleSwitchToMain}
                      isMain={conv.id === mainConversationId}
                      onTransform={handleTransformToPlayground}
                    />
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
        <AnimatedTaskBreakdown isVisible={showTaskBreakdown} />
        <BottomBar
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          provider={provider}
          setProvider={setProvider}
          model={model}
          setModel={setModel}
          onAddMultiConversation={handleAddMultiConversation}
          onAdjustComplexity={handleAdjustComplexity}
        />
      </main>
      {showRightSidebar && (
        <RightSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  )
}

export default OsgoodZero