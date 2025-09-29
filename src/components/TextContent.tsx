import React from 'react';

interface TextContentProps {
  label: string;
  value: string;
  multiline?: boolean;
}

const TextContent: React.FC<TextContentProps> = ({ label, value, multiline = false }) => {
  return (
    <div className="mb-4">
      <span className="font-bold text-gray-700">{label}:</span>
      {multiline ? (
        <div className="mt-1 text-gray-800 whitespace-pre-wrap">{value}</div>
      ) : (
        <span className="ml-2 text-gray-800">{value}</span>
      )}
    </div>
  );
};

export default TextContent;