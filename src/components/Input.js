import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

const StyledInput = styled.input`
  font-size: 16px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #000;
  box-shadow: none;
  outline: none;
  padding: 5px;
`;
const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

export function Input({
  className,
  type,
  children,
  value,
  disabled,
  placeholder,
  onChange,
  ...props
}) {
  const [internalValue, setInternalValue] = useState('');

  const handleChange = (evt) => {
    const value = type === 'checkbox' ? evt.target.checked : evt.target.value;
    setInternalValue(value);
    onChange && onChange(value);
  };

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <StyledLabel className={className}>
      {children}
      <StyledInput
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        {...props}
      />
    </StyledLabel>
  );
}
