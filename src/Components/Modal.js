import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Zoom from 'react-reveal/Zoom';

let Modal = ({ children, contentStyle, onClose, ...props }) => {
  function handleStopMouseEvent(e) {
    e.stopPropagation();
  }

  return (
    <div className="modal" onClick={onClose} {...props}>
      <Zoom duration={200}>
        <div
          className="modal-content"
          onClick={handleStopMouseEvent}
          style={contentStyle}
        >
          {children}
        </div>
      </Zoom>
    </div>
  );
};

const withAppendBody = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    return ReactDOM.createPortal(
      <WrappedComponent {...props} />,
      document.body
    );
  };

  return EnhancedComponent;
};

Modal = withAppendBody(Modal);

export default Modal;
