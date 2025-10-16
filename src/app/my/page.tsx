"use client";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Header from "@/components/common/header";
import ProfileBox from "@/components/my/ProfileBox";
import IconProfile from "../../../public/svg/IconProfile";
import Nexts from "../../../public/svg/Nexts";

const My = () => {
  return (
    <LayoutMyPage>
      <Header types={"close"} />
      <MyContent>
        <ProfileBox />
        
        <StatsBox>
          <StatItem>
            저장한 가이드 <span style={{ color: color.primary }}>0</span>
          </StatItem>
          <Divider />
          <StatItem>
            좋아요한 질문 <span style={{ color: color.primary }}>0</span>
          </StatItem>
        </StatsBox>

        <GrayDivider />

        <SectionLabel>기록</SectionLabel>

        <MenuItem>
          <MenuText>내가 만든 투표</MenuText>
          <Nexts width={16} height={16} />
        </MenuItem>
        <MenuDivider />

        <MenuItem>
          <MenuText>투표 응답 내역</MenuText>
          <Nexts width={16} height={16} />
        </MenuItem>
        <MenuDivider />

        <MenuItem>
          <MenuText>질문 게시판 글 작성 내역</MenuText>
          <Nexts width={16} height={16} />
        </MenuItem>
        <MenuDivider />

        <SectionLabel>설정</SectionLabel>

        <MenuItem>
          <MenuText>계정 정보</MenuText>
          <Nexts width={16} height={16} />
        </MenuItem>
        <MenuDivider />

        <SectionLabel>도움말 & 지원</SectionLabel>

        <MenuItem>
          <MenuText>서비스 소개</MenuText>
          <Nexts width={16} height={16} />
        </MenuItem>
        <MenuDivider />

        <MenuItem>
          <MenuText>문의하기</MenuText>
          <Nexts width={16} height={16} />
        </MenuItem>
        <MenuDivider />
      </MyContent>
    </LayoutMyPage>
  );
};

export default My;

const LayoutMyPage = styled.div`
  width: 100%;
  display: flex;
  max-width: 600px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 80px;
`;

const MyContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

const StatsBox = styled.div`
  display: flex;
  align-items: center;
  background-color: ${color.gray50};
  border-radius: 8px;
  overflow: hidden;
`;

const StatItem = styled.div`
  flex: 1;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${font.H2};
  color: ${color.black};
  text-align: center;
`;

const Divider = styled.div`
  width: 1px;
  height: 38px;
  background-color: ${color.gray100};
`;

const GrayDivider = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${color.gray50};
`;

const SectionLabel = styled.p`
  ${font.caption};
  color: ${color.gray400};
  margin: 0;
  padding: 0 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 1px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    opacity: 0.7;
  }
`;

const MenuText = styled.p`
  ${font.H2};
  color: ${color.black};
  margin: 0;
  flex: 1;
`;

const MenuDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.gray50};
`;
