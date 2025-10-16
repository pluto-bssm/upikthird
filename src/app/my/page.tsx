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
    <StyledMyPage>
      <Header types={"close"} />
      <MyPageContent>
        <ProfileBox />

        <StatsSection>
          <StatItem>
            저장한 가이드 <span style={{ color: color.primary }}>0</span>
          </StatItem>
          <StatDivider />
          <StatItem>
            좋아요한 질문 <span style={{ color: color.primary }}>0</span>
          </StatItem>
        </StatsSection>

        <SectionDivider />

        <SectionHeader>기록</SectionHeader>

        <MenuListItem>
          <MenuItemText>내가 만든 투표</MenuItemText>
          <Nexts width={16} height={16} />
        </MenuListItem>
        <MenuItemDivider />

        <MenuListItem>
          <MenuItemText>투표 응답 내역</MenuItemText>
          <Nexts width={16} height={16} />
        </MenuListItem>
        <MenuItemDivider />

        <MenuListItem>
          <MenuItemText>질문 게시판 글 작성 내역</MenuItemText>
          <Nexts width={16} height={16} />
        </MenuListItem>
        <MenuItemDivider />

        <SectionHeader>설정</SectionHeader>

        <MenuListItem>
          <MenuItemText>계정 정보</MenuItemText>
          <Nexts width={16} height={16} />
        </MenuListItem>
        <MenuItemDivider />

        <SectionHeader>도움말 & 지원</SectionHeader>

        <MenuListItem>
          <MenuItemText>서비스 소개</MenuItemText>
          <Nexts width={16} height={16} />
        </MenuListItem>
        <MenuItemDivider />

        <MenuListItem>
          <MenuItemText>문의하기</MenuItemText>
          <Nexts width={16} height={16} />
        </MenuListItem>
        <MenuItemDivider />
      </MyPageContent>
    </StyledMyPage>
  );
};

export default My;

const StyledMyPage = styled.div`
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

const MyPageContent = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
  padding-bottom: 40px;
`;

const StatsSection = styled.div`
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

const StatDivider = styled.div`
  width: 1px;
  height: 38px;
  background-color: ${color.gray100};
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${color.gray50};
`;

const SectionHeader = styled.p`
  ${font.caption};
  color: ${color.gray400};
  margin: 0;
  padding: 0 0;
`;

const MenuListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const MenuItemText = styled.p`
  ${font.H2};
  color: ${color.black};
  margin: 0;
  flex: 1;
`;

const MenuItemDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.gray50};
`;
