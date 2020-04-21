import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button``;

export function Button({ className, children, onClick }) {
  const handleClick = (evt) => {
    onClick && onClick(evt.target.value);
  };

  return (
    <StyledButton onClick={handleClick} className={className}>
      {children}
    </StyledButton>
  );
}
