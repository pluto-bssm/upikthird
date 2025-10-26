'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';

type AccountInfoBoxProps = {
  name: string;
  studentId: string;
  qualification: string;
  email: string;
};

const AccountInfoBox = ({
  name,
  studentId,
  qualification,
  email,
}: AccountInfoBoxProps) => {
  return (
    <AccountInfoBoxWrapper>
      <InfoGroup>
        <InfoLabel>이름</InfoLabel>
        <InfoValue>{name}</InfoValue>
      </InfoGroup>

      <InfoGroup>
        <InfoLabel>학번</InfoLabel>
        <InfoValue>{studentId}</InfoValue>
      </InfoGroup>

      <InfoGroup>
        <InfoLabel>자격</InfoLabel>
        <InfoValue>{qualification}</InfoValue>
      </InfoGroup>

      <InfoGroup>
        <InfoLabel>이메일</InfoLabel>
        <InfoValue>{email}</InfoValue>
      </InfoGroup>
    </AccountInfoBoxWrapper>
  );
};

export default AccountInfoBox;

const AccountInfoBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 36px;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoLabel = styled.p`
  font-size: 10px;
  font-weight: 600;
  color: ${color.gray500};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;

const InfoValue = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;
