import React from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProviderButtonProps {
  providerName: string;
  modelOptions: string[];
  onModelSelect: (provider: string, model: string) => void;
}

const ProviderButton: React.FC<ProviderButtonProps> = ({ providerName, modelOptions, onModelSelect }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 p-2 bg-[#1e2235] border-gray-700 hover:bg-[#282d45] transition-colors"
            >
              {providerName === "OpenAI" ? (
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                  <path d="M74.7 50.4c-51.6 51.6-51.6 135.2 0 186.8l186.8 186.8c51.6 51.6 135.2 51.6 186.8 0 51.6-51.6 51.6-135.2 0-186.8L261.5 50.4c-51.6-51.6-135.2-51.6-186.8 0z" fill="currentColor"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 176"  className="w-full h-full text-white">
                  <path fill="currentColor" d="m147.487 0l70.081 175.78H256L185.919 0zM66.183 106.221l23.98-61.774l23.98 61.774zM70.07 0L0 175.78h39.18l14.33-36.914h73.308l14.328 36.914h39.179L110.255 0z"/>
                </svg>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-[#1e2235] border-gray-700">
            {modelOptions.map((m) => (
              <Button
                key={m}
                className="w-full justify-start font-normal text-white hover:bg-[#282d45] text-xs h-8 transition-colors"
                variant="ghost"
                onClick={() => onModelSelect(providerName, m)}
              >
                {m}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add {providerName} Multi Chat</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export default ProviderButton