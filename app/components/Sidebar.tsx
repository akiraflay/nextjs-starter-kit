import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { History, FolderKanban, MessageCircle, PanelLeft, ChevronRight, MessageSquare } from "lucide-react"
import { mockProjects, mockRecentChats } from '../utils/mockData'
import { Project, RecentChat } from '../types'

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
  onNewChat: () => void;
  onChatHistoryClick: () => void;
  onProjectsClick: () => void;
  onOurMissionClick: () => void;
  onViewAllProjects: () => void;
  onViewAllChats: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  toggleSidebar,
  onNewChat,
  onChatHistoryClick,
  onProjectsClick,
  onOurMissionClick,
  onViewAllProjects,
  onViewAllChats
}) => {
  const [isGlitchy, setIsGlitchy] = useState(false)

  const projects: Project[] = mockProjects
  const recentChats: RecentChat[] = mockRecentChats

  return (
    <nav className={`bg-[#0c0c0c] text-white transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-8'} flex flex-col`}>
      <div className="p-2 flex items-center justify-between">
        {isExpanded ? (
          <div className="w-12 h-12 relative">
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0xBuG4SqUJ0W1YUvzhmGBhD2GzEc5d.png" 
              alt="Osgood Zero Logo" 
              width={48}
              height={48}
              objectFit="contain"
            />
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 p-0"
            onClick={onNewChat}
            onMouseEnter={() => setIsGlitchy(true)}
            onMouseLeave={() => setIsGlitchy(false)}
          >
            <span className={`text-lg font-bold text-orange-500 ${isGlitchy ? 'animate-glitch' : ''}`}>0</span>
          </Button>
        )}
        {isExpanded && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white hover:bg-[#1e2235]">
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 mt-2">
          <SidebarItem icon={<History className={`${isExpanded ? 'h-5 w-5' : 'h-4 w-4'}`} />} text="Chat History" onClick={onChatHistoryClick} isExpanded={isExpanded} />
          <SidebarItem icon={<FolderKanban className={`${isExpanded ? 'h-5 w-5' : 'h-4 w-4'}`} />} text="Projects" onClick={onProjectsClick} isExpanded={isExpanded} />
          <SidebarItem icon={<MessageCircle className={`${isExpanded ? 'h-5 w-5' : 'h-4 w-4'}`} />} text="Our Mission" onClick={onOurMissionClick} isExpanded={isExpanded} />
        </div>

        {isExpanded && (
          <>
            <div className="mt-6 px-4">
              <h3 className="text-sm font-semibold mb-2">Projects</h3>
              {projects.map(project => (
                <div key={project.id} className="flex items-center space-x-2 mb-2 text-gray-300 hover:text-white transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm truncate">{project.name}</span>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="text-orange-400 text-xs p-0 h-auto hover:text-orange-300 transition-colors" onClick={onViewAllProjects}>
                View All <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>

            <div className="mt-6 px-4">
              <h3 className="text-sm font-semibold mb-2">Recent Chats</h3>
              <ScrollArea className="h-40">
                {recentChats.map(chat => (
                  <div key={chat.id} className="flex items-center space-x-2 mb-2 text-gray-300 hover:text-white transition-colors">
                    <MessageSquare className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm truncate">{chat.title}</span>
                  </div>
                ))}
              </ScrollArea>
              <Button variant="ghost" size="sm" className="text-orange-400 text-xs p-0 h-auto hover:text-orange-300 transition-colors" onClick={onViewAllChats}>
                View All <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-1 hover:bg-[#1e2235] transition-colors">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YGSqZ96q1zHgN69y3PYbkxEi1WuVyC.png"
                  alt="User"
                  width={32}
                  height={32}
                  className={`rounded-full ${isExpanded ? 'w-8 h-8 mr-2' : 'w-4 h-4'}`}
                />
                {isExpanded && <span className="text-sm truncate">m.khalifa@lawfirm.com</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>User Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  )
}

export default Sidebar

const SidebarItem: React.FC<{ icon: React.ReactNode; text: string; onClick: () => void; isExpanded: boolean }> = ({ icon, text, onClick, isExpanded }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" className={`w-full justify-${isExpanded ? 'start' : 'center'} p-1 hover:bg-[#1e2235] transition-colors`} onClick={onClick}>
          {icon}
          {isExpanded && <span className="ml-2 text-sm">{text}</span>}
        </Button>
      </TooltipTrigger>
      {!isExpanded && <TooltipContent side="right">{text}</TooltipContent>}
    </Tooltip>
  </TooltipProvider>
)