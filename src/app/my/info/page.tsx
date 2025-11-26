"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import color from "@/packages/design-system/src/color";
import Header from "@/components/common/header";
import AccountInfoBox from "@/components/my/info/AccountInfoBox";
import { useMyUser } from "@/hooks/useAccount";

const AccountInfoPage = () => {
  const router = useRouter();
  const { user, loading, error } = useMyUser();
  void error;

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return (
      <StyledAccountInfoPage>
        <Header types="close" text="내정보" onClose={handleClose} />
        <LoadingText>로딩 중...</LoadingText>
      </StyledAccountInfoPage>
    );
  }

  if (error || !user) {
    return (
      <StyledAccountInfoPage>
        <Header types="close" text="내정보" onClose={handleClose} />
        <ErrorText>계정 정보를 불러올 수 없습니다.</ErrorText>
      </StyledAccountInfoPage>
    );
  }

  const getQualification = (role: string) => {
    switch (role) {
      case "ROLE_BSM":
        return "재학생";
      default:
        return "외부인";
    }
  };

  const getStudentId = (email: string) => {
    const match = email.match(/^(\d+)\./);
    return match ? match[1] : "N/A";
  };

  return (
    <StyledAccountInfoPage>
      <Header types="close" text="내정보" onClose={handleClose} />
      <AccountInfoPageContent>
        <AccountInfoBox
          name={user.name}
          studentId={getStudentId(user.email)}
          qualification={getQualification(user.role)}
          email={user.email}
        />
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
void LogoutSection;

const LogoutText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${color.gray500};
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 1.2;
`;
void LogoutText;

const LoadingText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;
