import styled from 'styled-components';

export const Title = styled.h1`
  font-size: ${(props) => (props.main ? '100px' : '30px')};
  padding: ${(props) => (props.main ? '20vh 0 10px 0' : '20px')};
  margin: 0;
  text-decoration: underline;
  text-align: center;
  text-decoration-style: ${(props) => (props.main ? 'dotted' : 'solid')};
`;
