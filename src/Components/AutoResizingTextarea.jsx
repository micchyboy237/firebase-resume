import React, { useState, useRef, useEffect } from 'react';

const AutoResizingTextarea = ({
  initialValue = '',
  onChangeValue,
  onChange,
  ...restProps
}) => {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChangeValue) {
      onChangeValue(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      className={`auto-height-textarea ${restProps.className}`}
      {...restProps}
    />
  );
};

export default AutoResizingTextarea;
