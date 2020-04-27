import React from 'react';
import styled from 'styled-components';

const getColorType = (type, colors) => {
  switch (type) {
    case 'warn':
      return colors.red;
    case 'send':
      return colors.green;
    case 'submit':
      return colors.green;
    default:
      return colors.blue;
  }
};

const StyledButton = styled.button`
  border: solid 2px;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  width: fit-content;
  background: transparent;
  font-size: 16px;
  &:hover {
    color: ${(props) => getColorType(props.type, props.theme.colors)};
    border-color: ${(props) => getColorType(props.type, props.theme.colors)};
  }
`;

export function Button({ className, children, onClick, type }) {
  const handleClick = (evt) => {
    onClick && onClick(evt.target.value);
  };

  return (
    <StyledButton type={type} onClick={handleClick} className={className}>
      {children}
    </StyledButton>
  );
}
