import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";

type LogoutSectionProps = {
  onLogout?: () => void;
  onWithdraw?: () => void;
};

const LogoutSection = ({ onLogout, onWithdraw }: LogoutSectionProps) => {
  return (
    <StyledLogoutSection>
      <LogoutActionText>
        <LogoutLink onClick={onLogout}>로그아웃</LogoutLink>
        {" | "}
        <WithdrawLink onClick={onWithdraw}>탈퇴하기</WithdrawLink>
      </LogoutActionText>
    </StyledLogoutSection>
  );
};

export default LogoutSection;

const StyledLogoutSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px;
  position: absolute;
  bottom: 0;
`;

const LogoutActionText = styled.p`
  ${font.caption};
  color: ${color.gray400};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0;
`;

const LogoutLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  ${font.caption};
  color: ${color.gray400};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const WithdrawLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  ${font.caption};
  color: ${color.gray400};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;
