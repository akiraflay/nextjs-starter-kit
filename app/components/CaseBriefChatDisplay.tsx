import React from 'react';

interface CaseBriefChatDisplayProps {
  caseBrief: any;
  onClose: () => void;
}

const CaseBriefChatDisplay: React.FC<CaseBriefChatDisplayProps> = ({ caseBrief, onClose }) => {
  return (
    <div>
      <h2>{caseBrief.title}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default CaseBriefChatDisplay;