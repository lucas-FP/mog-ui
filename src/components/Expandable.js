import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Title } from './Title';
import { ReactComponent as ArrowDown } from '../Icons/arrow_down.svg';
import { ReactComponent as ArrowUp } from '../Icons/arrow_down.svg';

//TODO work on this component

const CardFrame = styled.div``;

export function Expandable({
  className,
  children,
  title,
  isExpanded,
  onExpand,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = (expandState) => {
    onExpand && onExpand(expandState);
    setExpanded(expandState);
  };

  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  return (
    <CardFrame className={className}>
      {title && <Title>{title}</Title>}
      {expanded ? (
        <>
          {children}
          <ArrowUp onClick={() => handleExpand(false)} />
        </>
      ) : (
        <ArrowDown
          style={{ width: '40px', height: '40px' }}
          onClick={() => handleExpand(true)}
        />
      )}
    </CardFrame>
  );
}
