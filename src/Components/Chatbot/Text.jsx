import React from 'react';

const Text = ({ children, className }) => {
  return (
    <p
      className={className}
      style={{
        whiteSpace: 'pre-line',
        fontSize: '14px',
        lineHeight: '1.5'
      }}
      dangerouslySetInnerHTML={{
        __html: children.trim()
      }}
    />
  );
};

export default Text;
