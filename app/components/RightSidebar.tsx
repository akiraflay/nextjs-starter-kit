import React from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Wand2 } from "lucide-react"
import { PromptTemplate, Mutation } from '../types'
import { mockPromptTemplates, mockMutations } from '../utils/mockData'

interface RightSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ activeTab, setActiveTab }) => {
  const promptTemplates: PromptTemplate[] = mockPromptTemplates
  const mutations: Mutation[] = mockMutations

  return (
    <div className="w-64 bg-[#111528] border-l border-gray-700 p-4">
      <div className="flex justify-between mb-4">
        <Button variant="ghost" onClick={() => setActiveTab('prompts')} className={activeTab === 'prompts' ? 'text-orange-500' : 'text-gray-400 hover:text-white transition-colors'}>
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" onClick={() => setActiveTab('mutations')} className={activeTab === 'mutations' ? 'text-orange-500' : 'text-gray-400 hover:text-white transition-colors'}>
          <Wand2 className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {activeTab === 'prompts' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Prompt Library</h3>
            <div className="space-y-2">
              {promptTemplates.map((template) => (
                <Button key={template.id} variant="outline" className="w-full justify-start text-left text-sm text-gray-300 hover:text-white transition-colors">
                  {template.name}
                </Button>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'mutations' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Mutations</h3>
            <div className="space-y-2">
              {mutations.map((mutation) => (
                <Button key={mutation.id} variant="outline" className="w-full justify-start text-left text-sm text-gray-300 hover:text-white transition-colors">
                  {mutation.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default RightSidebar