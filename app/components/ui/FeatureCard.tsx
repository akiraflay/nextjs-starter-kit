import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="bg-[#282d45] border-gray-600 hover:border-orange-500 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          {icon}
          <div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="text-xs text-gray-300">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FeatureCard