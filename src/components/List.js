import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

//TODO make this component better (too confusing...)

const StyledList = styled.ul`
  list-style: none;
  overflow: auto;
  padding: ${(props) => (props.type === 'card' ? '0 10%' : '0')};
  ${(props) =>
    props.type === 'card'
      ? null
      : props.concise
      ? 'height: calc(100% - 52px); margin:0;border: solid 3px;border-radius:5px;'
      : 'height: calc(100% - 82px); margin:0;border: solid 3px;border-radius:5px;'}
`;
const ListWrapper = styled.div`
  padding: 10px;
`;

const StyledItem = styled.li`
  margin: ${(props) => (props.type === 'card' ? '10px' : '0px')};
  padding: ${(props) => (props.links ? '0' : '10px')};
  ${(props) =>
    props.type === 'card'
      ? null
      : props.side === 'left'
      ? `border-left: solid ${props.selected ? '20px' : '10px'};`
      : props.side === 'right'
      ? `border-right: solid ${props.selected ? '20px' : '10px'};`
      : null};
  border-color: ${(props) => props.theme.colors[props.color]};
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  padding: 10px;
  width: 100%;
  height: 100%;
`;

const ListTitle = styled.h2`
  text-align: center;
  ${(props) =>
    props.type === 'card' &&
    `margin: 5px 20%;
  border-bottom: solid 2px;`}
  ${(props) => props.concise && 'margin: 5px;'}
`;

export function List({
  className,
  children,
  onClick,
  title,
  type,
  side,
  links,
  concise,
}) {
  const handleClick = (evt, index) => {
    onClick && onClick(index, evt.target.value);
  };

  const listItems = Array.isArray(children) ? (
    children.map((item, index) => (
      <StyledItem
        side={side}
        onClick={(evt) => handleClick(evt, index)}
        key={item.props && item.props.id ? item.props.id : index}
        color={item.props && item.props.color}
        links={links}
        selected={item.props && item.props.selected}
      >
        {links ? (
          <StyledLink to={item.props && item.props.to}>{item}</StyledLink>
        ) : (
          item
        )}
      </StyledItem>
    ))
  ) : (
    <StyledItem key={children.props ? children.props.key : 0}>
      {children}
    </StyledItem>
  );

  return (
    <ListWrapper side={side} type={type} className={className}>
      {title && (
        <ListTitle concise side={side} type={type}>
          {title}
        </ListTitle>
      )}
      <StyledList concise type={type} side={side}>
        {listItems}
      </StyledList>
    </ListWrapper>
  );
}
