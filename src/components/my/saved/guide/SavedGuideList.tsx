'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';
import { GuideItem } from './GuideItem';

interface Guide {
  id: string;
  title: string;
  category: '학교생활' | '기숙사' | '유머';
  categoryEmoji: string;
  likeCount: number;
}

interface SavedGuideListProps {
  guides: Guide[];
  onGuideClick: (guideId: string) => void;
}

export const SavedGuideList = ({
  guides,
  onGuideClick,
}: SavedGuideListProps) => {
  return (
    <GuideListWrapper>
      {guides.map((guide, index) => (
        <GuideItemWrapper key={guide.id}>
          <GuideItem guide={guide} onClick={() => onGuideClick(guide.id)} />
          {index !== guides.length - 1 && <Divider />}
        </GuideItemWrapper>
      ))}
    </GuideListWrapper>
  );
};

const GuideListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
`;

const GuideItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${color.gray100};
  margin-top: 10px;
`;
