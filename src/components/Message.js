import React from 'react';

import styled from 'styled-components';

const MessageWrapper = styled.div``;
const MessageText = styled.p`
  margin: 5px;
`;
const MessageHeader = styled.h6`
  margin: 5px;
`;

export function Message({ className, message, ...props }) {
  const header =
    message &&
    message.userData &&
    (message.userData.nick || message.userData.userName);
  return (
    <MessageWrapper className={className} {...props}>
      <MessageHeader>{header}</MessageHeader>
      <MessageText>{message.message}</MessageText>
    </MessageWrapper>
  );
}
