"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";

interface Guide {
  id: string;
  title: string;
  likeCount: number;
}

interface GuideItemProps {
  guide: Guide;
  onClick: () => void;
}

export const GuideItem = ({ guide, onClick }: GuideItemProps) => {
  return (
    <GuideItemButton onClick={onClick}>
      <GuideContentWrapper>
        <GuideTitle>{guide.title}</GuideTitle>
        <GuideMetaWrapper>
          <LikeInfo>
            <LikeIcon>❤️</LikeIcon>
            <LikeCount>{guide.likeCount}</LikeCount>
          </LikeInfo>
        </GuideMetaWrapper>
      </GuideContentWrapper>
    </GuideItemButton>
  );
};

const GuideItemButton = styled.button`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 18px 20px;
  background-color: ${color.white};
  border: 1px solid ${color.gray50};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${color.gray50};
  }

  &:active {
    background-color: ${color.gray100};
  }
`;


const GuideContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  text-align: left;
`;

const GuideTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.2;
  word-break: break-word;
`;

const GuideMetaWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const LikeInfo = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const LikeIcon = styled.span`
  font-size: 10px;
`;

const LikeCount = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  margin: 0;
  padding: 0;
  line-height: 1.2;
  white-space: nowrap;
`;
