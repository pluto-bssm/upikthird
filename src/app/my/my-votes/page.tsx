'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/header';
import { MyVotesList } from '@/components/my/votes/MyVotesList';
import color from '@/packages/design-system/src/color';
import { useMyVotes } from '@/hooks/useVotes';

const MyVotesPage = () => {
  const router = useRouter();
  const { myVotes, loading, error } = useMyVotes();

  const handleClose = () => {
    router.back();
  };

  const handleVoteClick = (voteId: string) => {
    // TODO: Implement vote navigation
  };

  if (loading) {
    return (
      <StyledMyVotesPage>
        <Header types="close" text="내가 만든 투표" onClose={handleClose} />
        <LoadingText>로딩 중...</LoadingText>
      </StyledMyVotesPage>
    );
  }

  if (error) {
    return (
      <StyledMyVotesPage>
        <Header types="close" text="내가 만든 투표" onClose={handleClose} />
        <ErrorText>투표 목록을 불러올 수 없습니다.</ErrorText>
      </StyledMyVotesPage>
    );
  }

  const displayVotes = myVotes;

  return (
    <StyledMyVotesPage>
      <Header types="close" text="내가 만든 투표" onClose={handleClose} />
      <MyVotesPageContent>
        <MyVotesList votes={displayVotes} onVoteClick={handleVoteClick} />
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

const LoadingText = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #E71D36;
  padding: 40px 20px;
  margin: 0;
`;
