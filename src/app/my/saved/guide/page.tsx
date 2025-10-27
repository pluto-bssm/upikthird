'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/header';
import { SavedGuideList } from '@/components/my/saved/guide/SavedGuideList';
import color from '@/packages/design-system/src/color';
import { useSavedGuides } from '@/hooks/useSaved';

interface Guide {
  id: string;
  title: string;
  category: '학교생활' | '기숙사' | '유머';
  categoryEmoji: string;
  likeCount: number;
}

const getCategoryEmoji = (category: string) => {
  switch (category) {
    case '학교생활':
      return '🏫';
    case '기숙사':
      return '⛺️';
    case '유머':
      return '😁';
    default:
      return '✨';
  }
};

const SavedGuidePage = () => {
  const router = useRouter();
  const { guides: boardGuides, loading, error } = useSavedGuides(0, 20);

  const guides: Guide[] = boardGuides.map(board => ({
    id: board.id,
    title: board.title,
    category: (board.category || '학교생활') as '학교생활' | '기숙사' | '유머',
    categoryEmoji: getCategoryEmoji(board.category || '학교생활'),
    likeCount: board.likes,
  }));

  const handleGuideClick = (guideId: string) => {
    router.push(`/guide/${guideId}`);
  };

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return (
      <StyledSavedGuidePage>
        <Header types="close" text="저장한 가이드" onClose={handleClose} />
        <LoadingText>로딩 중...</LoadingText>
      </StyledSavedGuidePage>
    );
  }

  if (error) {
    return (
      <StyledSavedGuidePage>
        <Header types="close" text="저장한 가이드" onClose={handleClose} />
        <ErrorText>가이드를 불러올 수 없습니다.</ErrorText>
      </StyledSavedGuidePage>
    );
  }

  return (
    <StyledSavedGuidePage>
      <Header types="close" text="저장한 가이드" onClose={handleClose} />
      <SavedGuidePageContent>
        <SavedGuideList guides={guides} onGuideClick={handleGuideClick} />
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
