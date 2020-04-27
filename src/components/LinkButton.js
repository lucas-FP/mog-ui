import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

export const LinkButton = styled(Link)`
  border: solid 2px;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  width: fit-content;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.blue};
    border-color: ${(props) => props.theme.colors.blue};
  }
`;
