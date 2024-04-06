import React from 'react';

const Text = ({ children, className }) => {
  return (
    <p
      className={`inline whitespace-pre-line text-sm ${className}`}
      dangerouslySetInnerHTML={{
        __html: children.trim()
      }}
    />
  );
};

export default Text;
