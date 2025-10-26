'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';

const LoginHeader = () => {
  return (
    <StyledHeader>
      <TaglineText>재학생이 만드는 학교 가이드</TaglineText>
    </StyledHeader>
  );
};

export { LoginHeader };

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100px;
`;

const TaglineText = styled.p`
  font-family: Sacheon Hanggong OTF, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${color.black};
  margin: 0;
  text-align: center;
`;
