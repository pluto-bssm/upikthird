"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";

interface TabBarProps {
  savedGuideCount: number;
  likeQuestionCount: number;
  onTabChange?: (tab: "saved" | "like") => void;
}

const TabBar = ({
  savedGuideCount,
  likeQuestionCount,
  onTabChange,
}: TabBarProps) => {
  return (
    <TabBarWrapper>
      <TabButton onClick={() => onTabChange?.("saved")}>
        <TabButtonText>
          저장한 가이드 <TabCountBadge>{savedGuideCount}</TabCountBadge>
        </TabButtonText>
      </TabButton>
      <TabButton onClick={() => onTabChange?.("like")}>
        <TabButtonText>
          좋아요한 질문 <TabCountBadge>{likeQuestionCount}</TabCountBadge>
        </TabButtonText>
      </TabButton>
    </TabBarWrapper>
  );
};

export default TabBar;

const TabBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${color.gray50};
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
    border-bottom: 8px solid ${color.gray50};
`;

const TabButton = styled.button`
  flex: 1;
  border: none;
  border-right: 1px solid ${color.gray100};
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: ${color.white};
  }
`;

const TabButtonText = styled.p`
  ${font.H3}
  color: ${color.black};
  margin: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const TabCountBadge = styled.span`
  color: ${color.primary};
  font-weight: 600;
`;
