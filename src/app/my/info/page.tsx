'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';
import Header from '@/components/common/header';
import AccountInfoBox from '@/components/my/info/AccountInfoBox';

const AccountInfoPage = () => {
  return (
    <StyledAccountInfoPage>
      <Header types="close" text="" />
      <AccountInfoPageContent>
        <AccountInfoBox
          name="박가은"
          studentId="2108"
          qualification="재학생"
          email="fake_bsm_email@bssm.hs.kr"
        />
        <LogoutSection>
          <LogoutText>로그아웃 | 탈퇴하기</LogoutText>
        </LogoutSection>
      </AccountInfoPageContent>
    </StyledAccountInfoPage>
  );
};

export default AccountInfoPage;

const StyledAccountInfoPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 80px;
`;

const AccountInfoPageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoutSection = styled.div`
  padding: 20px;
  border-top: 1px solid ${color.gray100};
`;

const LogoutText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${color.gray500};
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 1.2;
`;
