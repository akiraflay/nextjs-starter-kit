import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageCircle, Upload, Scale, BookOpen, Briefcase, MessageSquare, HelpCircle, Coffee } from "lucide-react"
import FeatureCard from './ui/FeatureCard'

interface WelcomeScreenProps {
  onStartNewConversation: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartNewConversation }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-b from-gray-900 to-[#111528]">
      <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Osgood Zero</h1>
      <p className="text-xl text-gray-300 mb-8">Your intelligent companion for legal research and analysis</p>
      
      <Tabs defaultValue="start" className="w-full max-w-3xl">
        <TabsList className="grid w-full grid-cols-4 bg-[#1e2235]">
          <TabsTrigger value="start" className="text-sm text-gray-300 hover:text-white data-[state=active]:bg-[#282d45] data-[state=active]:text-orange-400 transition-colors">Quick Start</TabsTrigger>
          <TabsTrigger value="features" className="text-sm text-gray-300 hover:text-white data-[state=active]:bg-[#282d45] data-[state=active]:text-orange-400 transition-colors">Key Features</TabsTrigger>
          <TabsTrigger value="models" className="text-sm text-gray-300 hover:text-white data-[state=active]:bg-[#282d45] data-[state=active]:text-orange-400 transition-colors">AI Models</TabsTrigger>
          <TabsTrigger value="help" className="text-sm text-gray-300 hover:text-white data-[state=active]:bg-[#282d45] data-[state=active]:text-orange-400 transition-colors">Help & Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="start">
          <Card className="bg-[#1e2235] border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-white">Begin Your Legal Journey</CardTitle>
              <CardDescription className="text-gray-300">Choose an option to get started with Osgood Zero</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white transition-colors" onClick={onStartNewConversation}>
                <MessageCircle className="h-5 w-5 mr-2" />
                Start New Conversation
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full text-sm text-gray-300 border-gray-600 hover:bg-[#282d45] hover:text-white transition-colors" onClick={() => console.log("Browse templates")}>
                  <FileText className="h-5 w-5 mr-2" />
                  Browse Templates
                </Button>
                <Button variant="outline" className="w-full text-sm text-gray-300 border-gray-600 hover:bg-[#282d45] hover:text-white transition-colors" onClick={() => console.log("Upload document")}>
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="features">
          <Card className="bg-[#1e2235] border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-white">Key Features</CardTitle>
              <CardDescription className="text-gray-300">Discover what Osgood Zero can do for you</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <FeatureCard
                icon={<Scale className="h-6 w-6 text-orange-500" />}
                title="Legal Research"
                description="Access comprehensive legal databases"
              />
              <FeatureCard
                icon={<BookOpen className="h-6 w-6 text-orange-500" />}
                title="Case Analysis"
                description="Analyze case law and regulations"
              />
              <FeatureCard
                icon={<Briefcase className="h-6 w-6 text-orange-500" />}
                title="Document Drafting"
                description="Generate and review legal documents"
              />
              <FeatureCard
                icon={<MessageSquare className="h-6 w-6 text-orange-500" />}
                title="Legal Consultation"
                description="Get AI-assisted legal answers"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="models">
          <Card className="bg-[#1e2235] border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-white">AI Models</CardTitle>
              <CardDescription className="text-gray-300">Choose from our specialized legal AI models</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button variant="outline" className="justify-between text-sm text-gray-300 border-gray-600 hover:bg-[#282d45] hover:text-white transition-colors">
                GPT-4 <span className="text-xs text-gray-400">Advanced language model</span>
              </Button>
              <Button variant="outline" className="justify-between text-sm text-gray-300 border-gray-600 hover:bg-[#282d45] hover:text-white transition-colors">
                Legal-GPT <span className="text-xs text-gray-400">Specialized in legal language</span>
              </Button>
              <Button variant="outline" className="justify-between text-sm text-gray-300 border-gray-600 hover:bg-[#282d45] hover:text-white transition-colors">
                Case-Analyzer <span className="text-xs text-gray-400">Optimized for case analysis</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="help">
          <Card className="bg-[#1e2235] border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-white">Help & Resources</CardTitle>
              <CardDescription className="text-gray-300">Find guidance on using Osgood Zero</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="link" className="text-sm text-orange-400 hover:text-orange-300 justify-start transition-colors">
                <FileText className="h-5 w-5 mr-2" />
                User Guide
              </Button>
              <Button variant="link" className="text-sm text-orange-400 hover:text-orange-300 justify-start transition-colors">
                <Coffee className="h-5 w-5 mr-2" />
                Video Tutorials
              </Button>
              <Button variant="link" className="text-sm text-orange-400 hover:text-orange-300 justify-start transition-colors">
                <Coffee className="h-5 w-5 mr-2" />
                Video Tutorials
              </Button>
              <Button variant="link" className="text-sm text-orange-400 hover:text-orange-300 justify-start transition-colors">
                <HelpCircle className="h-5 w-5 mr-2" />
                FAQ
              </Button>
              <Button variant="link" className="text-sm text-orange-400 hover:text-orange-300 justify-start transition-colors">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default WelcomeScreen