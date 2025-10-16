"use client";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import Header from "@/components/common/header";
import AccountInfoBox from "@/components/my/info/AccountInfoBox";
import LogoutSection from "@/components/my/info/LogoutSection";
import { useRouter } from "next/navigation";

const Info = () => {
  const router = useRouter();

  const accountInfo = [
    { label: "이름", value: "박가은" },
    { label: "학번", value: "2108" },
    { label: "자격", value: "재학생" },
    { label: "이메일", value: "fake_bsm_email@bssm.hs.kr" },
  ];

  return (
    <StyledAccountInfoPage>
      <Header types={"title"} text={"계정 정보"} />
      <AccountInfoContent>
        <AccountInfoBox fields={accountInfo} />
      </AccountInfoContent>
    </StyledAccountInfoPage>
  );
};

export default Info;

const StyledAccountInfoPage = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 80px;
  position: relative;
`;

const AccountInfoContent = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  gap: 0;
  position: relative;
  min-height: calc(100vh - 80px);
  padding-bottom: 80px;
`;

