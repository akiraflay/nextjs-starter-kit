export interface CaseBrief {
    id: string;
    name: string;
    citation: string;
    court: string;
    [key: string]: string | string[];
  }
  
  export interface Conversation {
    id: number;
    provider: string;
    model: string;
    messages: Message[];
    parameters: {
      temperature: number;
    };
  }
  
  export interface Message {
    role: 'user' | 'ai' | 'system';
    content: string;
  }
  
  export interface Project {
    id: string;
    name: string;
  }
  
  export interface RecentChat {
    id: string;
    title: string;
  }
  
  export interface AIModel {
    name: string;
    description: string;
  }
  
  export interface PromptTemplate {
    id: string;
    name: string;
  }
  
  export interface Mutation {
    id: string;
    name: string;
  }