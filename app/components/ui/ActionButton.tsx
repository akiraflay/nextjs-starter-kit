import React from 'react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActionButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, tooltip, onClick }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#282d45] transition-colors" onClick={onClick}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export default ActionButton