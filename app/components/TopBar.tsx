import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, PanelRightClose, Sparkles, FileText } from "lucide-react"
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { CaseBrief } from '../types'
import { mockCaseBriefs } from '../utils/mockData'

// Update the CaseBrief type to include title and date
interface CaseBrief {
  id: string;
  title: string;
  date: string;
  // ... other properties
}

const placeholderSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/%3E%3C/svg%3E`;

interface TopBarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
  toggleRightSidebar: () => void;
  onViewOnMain: (caseBriefId: string) => void;
  onAttachAsFile: (caseBriefId: string) => void;
  onSelectCase: (caseBriefId: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ 
  isExpanded, 
  toggleSidebar, 
  toggleRightSidebar, 
  onViewOnMain, 
  onAttachAsFile, 
  onSelectCase 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <header className="bg-[#111528] w-full p-4 border-b border-gray-800 flex items-center">
      {!isExpanded && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white mr-4 hover:bg-[#1e2235] transition-colors">
          <PanelRightClose className="h-5 w-5" />
        </Button>
      )}
      <div className="relative flex-grow max-w-3xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search Case Briefs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            className="pl-10 pr-4 py-2 w-full bg-[#1e2235] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-orange-500 rounded-full text-sm transition-all duration-300 ease-in-out"
          />
        </div>
        <CaseBriefSearch 
          isSearchFocused={isSearchFocused}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onViewOnMain={onViewOnMain}
          onAttachAsFile={onAttachAsFile}
          onSelectCase={onSelectCase}
        />
      </div>
      <Button variant="ghost" size="icon" aria-label="Toggle Right Sidebar" onClick={toggleRightSidebar} className="text-gray-400 hover:text-white ml-4 hover:bg-[#1e2235] transition-colors">
        <Sparkles className="h-5 w-5" />
      </Button>
    </header>
  )
}

interface CaseBriefSearchProps {
  isSearchFocused: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onViewOnMain: (caseBriefId: string) => void;
  onAttachAsFile: (caseBriefId: string) => void;
  onSelectCase: (caseBriefId: string) => void;
}

const CaseBriefSearch: React.FC<CaseBriefSearchProps> = ({
  isSearchFocused,
  searchTerm,
  setSearchTerm,
  onViewOnMain,
  onAttachAsFile,
  onSelectCase
}) => {
  const [items, setItems] = useState<CaseBrief[]>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)

  const loadMoreItems = useCallback((startIndex: number, stopIndex: number) => {
    setIsNextPageLoading(true)
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newItems = mockCaseBriefs.slice(startIndex, stopIndex + 1)
        setItems(prevItems => [...prevItems, ...newItems])
        setIsNextPageLoading(false)
        setHasNextPage(stopIndex < mockCaseBriefs.length)
        resolve()
      }, 1000)
    })
  }, [])

  const isItemLoaded = (index: number) => !hasNextPage || index < items.length

  const itemCount = hasNextPage ? items.length + 1 : items.length

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (!isItemLoaded(index)) {
      return <div style={style}>Loading...</div>
    }

    const caseBrief = items[index]

    return (
      <div style={style} className="p-2 hover:bg-[#282d45] transition-colors">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              width={24}
              height={24}
              className="h-6 w-6 rounded-full mr-2"
              src={placeholderSVG}
              alt={caseBrief.title}
              placeholder="blur"
              blurDataURL={placeholderSVG}
            />
            <div>
              <h3 className="text-sm font-semibold text-white">{caseBrief.title}</h3>
              <p className="text-xs text-gray-400">{caseBrief.date}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onSelectCase(caseBrief.id)}
              className="text-xs bg-transparent border-gray-600 text-orange-400 hover:bg-[#282d45] hover:text-orange-300 transition-colors"
            >
              View Case Brief
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onAttachAsFile(caseBrief.id)}
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              <PaperClipIcon />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`absolute z-10 mt-2 w-full bg-[#1e2235] border border-gray-700 rounded-lg shadow-lg overflow-hidden ${isSearchFocused ? '' : 'hidden'}`}
      style={{ height: '60vh' }}
    >
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            height={400}
            itemCount={itemCount}
            itemSize={60}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width="100%"
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
    </div>
  )
}

const PaperClipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="hand-drawn-icon"
  >
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
)

export default TopBar