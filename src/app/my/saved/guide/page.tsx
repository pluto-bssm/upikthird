'use client';

import styled from '@emotion/styled';
import Header from '@/components/common/header';
import { SavedGuideList } from '@/components/my/saved/guide/SavedGuideList';
import color from '@/packages/design-system/src/color';

interface Guide {
  id: string;
  title: string;
  category: '학교생활' | '기숙사' | '유머';
  categoryEmoji: string;
  likeCount: number;
}

const mockGuides: Guide[] = [
  {
    id: '1',
    title: '가이드 제목',
    category: '기숙사',
    categoryEmoji: '⛺️',
    likeCount: 16,
  },
  {
    id: '2',
    title: '가이드 제목',
    category: '유머',
    categoryEmoji: '😁',
    likeCount: 16,
  },
  {
    id: '3',
    title: '가이드 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    likeCount: 16,
  },
  {
    id: '4',
    title: '가이드 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    likeCount: 16,
  },
  {
    id: '5',
    title: '가이드 제목',
    category: '기숙사',
    categoryEmoji: '⛺️',
    likeCount: 16,
  },
  {
    id: '6',
    title: '가이드 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    likeCount: 16,
  },
  {
    id: '7',
    title: '가이드 제목',
    category: '유머',
    categoryEmoji: '😁',
    likeCount: 16,
  },
  {
    id: '8',
    title: '가이드 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    likeCount: 16,
  },
  {
    id: '9',
    title: '가이드 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    likeCount: 16,
  },
];

const SavedGuidePage = () => {
  const handleGuideClick = (guideId: string) => {
    console.log('Guide clicked:', guideId);
    // TODO: Implement guide navigation
  };

  return (
    <StyledSavedGuidePage>
      <Header types="close" text="" />
      <SavedGuidePageContent>
        <SavedGuideList guides={mockGuides} onGuideClick={handleGuideClick} />
      </SavedGuidePageContent>
    </StyledSavedGuidePage>
  );
};

export default SavedGuidePage;

const StyledSavedGuidePage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 80px;
`;

const SavedGuidePageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
