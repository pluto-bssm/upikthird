'use client';

import styled from '@emotion/styled';
import Header from '@/components/common/header';
import { MyVotesList } from '@/components/my/votes/MyVotesList';
import color from '@/packages/design-system/src/color';

interface Vote {
  id: string;
  title: string;
  category: '학교생활' | '기숙사' | '유머';
  categoryEmoji: string;
  participantCount: number;
  status: 'urgent' | 'completed' | 'ongoing';
  statusText: string;
}

const mockVotes: Vote[] = [
  {
    id: '1',
    title: '투표 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    participantCount: 16,
    status: 'urgent',
    statusText: '2025-08-31에 마감되는 투표',
  },
  {
    id: '2',
    title: '투표 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    participantCount: 16,
    status: 'urgent',
    statusText: '2025-08-31에 마감되는 투표',
  },
  {
    id: '3',
    title: '투표 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    participantCount: 16,
    status: 'completed',
    statusText: '가이드 제작이 완료된 투표',
  },
  {
    id: '4',
    title: '투표 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    participantCount: 16,
    status: 'urgent',
    statusText: '2025-08-31에 마감되는 투표',
  },
  {
    id: '5',
    title: '투표 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    participantCount: 16,
    status: 'ongoing',
    statusText: '가이드가 제작 중인 투표',
  },
  {
    id: '6',
    title: '투표 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    participantCount: 16,
    status: 'urgent',
    statusText: '2025-08-31에 마감되는 투표',
  },
  {
    id: '7',
    title: '투표 제목',
    category: '학교생활',
    categoryEmoji: '🏫',
    participantCount: 16,
    status: 'completed',
    statusText: '가이드 제작이 완료된 투표',
  },
];

const MyVotesPage = () => {
  const handleVoteClick = (voteId: string) => {
    console.log('Vote clicked:', voteId);
    // TODO: Implement vote navigation
  };

  return (
    <StyledMyVotesPage>
      <Header types="close" text="내가 만든 투표" />
      <MyVotesPageContent>
        <MyVotesList votes={mockVotes} onVoteClick={handleVoteClick} />
      </MyVotesPageContent>
    </StyledMyVotesPage>
  );
};

export default MyVotesPage;

const StyledMyVotesPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 80px;
`;

const MyVotesPageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
