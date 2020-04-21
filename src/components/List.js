import React from 'react';
import styled from 'styled-components';

const StyledList = styled.ul``;
const ListWrapper = styled.div``;
const StyledItem = styled.li``;
const ListTitle = styled.h3``;

export function List({ className, children, onClick, title }) {
  const handleClick = (evt, index) => {
    onClick && onClick(index, evt.target.value);
  };

  const listItems = Array.isArray(children) ? (
    children.map((item, index) => (
      <StyledItem
        onClick={(evt) => handleClick(evt, index)}
        key={item.props && item.props.id ? item.props.id : index}
      >
        {item}
      </StyledItem>
    ))
  ) : (
    <StyledItem key={children.props ? children.props.key : 0}>
      {children}
    </StyledItem>
  );

  return (
    <ListWrapper className={className}>
      {title && <ListTitle>{title}</ListTitle>}
      <StyledList>{listItems}</StyledList>
    </ListWrapper>
  );
}
