import React from 'react';
import styled from 'styled-components';
import { Title, LinkButton } from '../components';

const SubTitle = styled.h3`
  margin: 0;
  text-align: center;
`;

const MainWrapper = styled.div``;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 100px 0;
`;

export default function Home() {
  return (
    <MainWrapper>
      <SectionWrapper>
        <Title main>mog</Title>
        <SubTitle>Minimalistic Online Games</SubTitle>
      </SectionWrapper>
      <SectionWrapper>
        <LinkButton to="/login">Login</LinkButton>
      </SectionWrapper>
    </MainWrapper>
  );
}
