import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
const Title = styled.h1``;

const SubTitle = styled.p``;

const MainWrapper = styled.div``;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  return (
    <MainWrapper>
      <SectionWrapper>
        <Title>mog</Title>
        <SubTitle>Minimalistic Online Games</SubTitle>
      </SectionWrapper>
      <SectionWrapper>
        <Link to="/login">Login</Link>
      </SectionWrapper>
    </MainWrapper>
  );
}
