import React from 'react';

interface LabelErrorMessageProps {
  content: string,
};

function LabelErrorMessage({ content }: LabelErrorMessageProps) {
  return (
    <span className="text-sm text-red-400">
      {content}
    </span>
  );
}

export default LabelErrorMessage;
