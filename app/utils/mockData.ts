import { CaseBrief, Project, RecentChat, AIModel, PromptTemplate, Mutation } from '../types'

export const mockCaseBriefs: CaseBrief[] = [
  {
    id: '1',
    name: 'Lochner v. New York',
    citation: '198 U.S. 45 (1905)',
    court: 'Supreme Court of United States',
    content: {
      "Rule": "The State cannot unreasonably interfere with individuals' right to contract...",
      "Facts": "Joseph Lochner, a bakery owner, was indicted for allowing an employee...",
      "Issue": "Does New York's law limiting bakers' working hours violate the Fourteenth Amendment...",
      "Key Quotes": [
        "The general right to make a contract in relation to his business is part of the liberty...",
        "The State... has power to prevent the individual from making certain kinds of contracts..."
      ],
      "Legal Significance": "This case established the principle of economic substantive due process..."
    }
  },
  { id: '2', name: 'Marbury v. Madison', citation: '5 U.S. 137 (1803)', court: 'Supreme Court of United States' },
  { id: '3', name: 'Brown v. Board of Education', citation: '347 U.S. 483 (1954)', court: 'Supreme Court of United States' },
  { id: '4', name: 'Roe v. Wade', citation: '410 U.S. 113 (1973)', court: 'Supreme Court of United States' },
  { id: '5', name: 'Miranda v. Arizona', citation: '384 U.S. 436 (1966)', court: 'Supreme Court of United States' },
]

export const mockCaseBriefContent = {
  "Rule": "The State cannot unreasonably interfere with individuals' right to contract unless it's a reasonable exercise of police powers for public health, safety, or welfare. The Fourteenth Amendment protects economic liberties, including the right to contract.",
  "Facts": "Joseph Lochner, a bakery owner, was indicted for allowing an employee to work over 60 hours a week, violating New York's labor law. The law limited bakery employees to 10 hours per day or 60 hours per week. Lochner argued this law interfered with the freedom of contract protected by the Fourteenth Amendment. The case advanced to the U.S. Supreme Court after state courts upheld the law.",
  "Issue": "Does New York's law limiting bakers' working hours violate the Fourteenth Amendment's protection of freedom of contract and substantive due process rights?",
  "Key Quotes": [
    "The general right to make a contract in relation to his business is part of the liberty of the individual protected by the Fourteenth Amendment.",
    "The State... has power to prevent the individual from making certain kinds of contracts, and... the Federal Constitution offers no protection."
  ],
  "Test Applied": "The state's exercise of police powers must be reasonable and substantially related to protecting public health, safety, or welfare to justify interfering with individual liberties like freedom of contract."
}

export const mockProjects: Project[] = [
  { id: '1', name: 'Legal Research Project' },
  { id: '2', name: 'Contract Review' },
  { id: '3', name: 'Intellectual Property Analysis' },
]

export const mockRecentChats: RecentChat[] = [
  { id: '1', title: 'Contract Review: NDA' },
  { id: '2', title: 'Intellectual Property Rights' },
  { id: '3', title: 'Employment Law Inquiry' },
  { id: '4', title: 'Real Estate Lease Agreement' },
  { id: '5', title: 'Corporate Merger Consultation' },
  { id: '6', title: 'Patent Filing Process' },
]

export const mockAIModels: AIModel[] = [
  { name: 'GPT-4', description: 'Advanced language model' },
  { name: 'Legal-GPT', description: 'Specialized in legal language' },
  { name: 'Case-Analyzer', description: 'Optimized for case analysis' },
]

export const mockPromptTemplates: PromptTemplate[] = [
  { id: '1', name: 'Legal Research Template' },
  { id: '2', name: 'Case Analysis Framework' },
  { id: '3', name: 'Document Drafting Guide' },
]

export const mockMutations: Mutation[] = [
  { id: '1', name: 'Simplify Language' },
  { id: '2', name: 'Expand Explanation' },
  { id: '3', name: 'Generate Counter-Arguments' },
]