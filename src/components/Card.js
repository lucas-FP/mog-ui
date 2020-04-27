import React from 'react';
import styled from 'styled-components';

const CardContent = styled.ul`
  padding: 0 10%;
  display: flex;
  flex-direction: column;
`;
const CardWrapper = styled.div`
  padding: 10px;
`;

const CardTitle = styled.h2`
  margin: 5px 20%;
  border-bottom: solid 2px;
  text-align: center;
`;

export function Card({ className, children, title }) {
  return (
    <CardWrapper className={className}>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardWrapper>
  );
}
