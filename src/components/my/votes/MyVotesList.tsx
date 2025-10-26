'use client';

import styled from '@emotion/styled';
import { VoteItem } from './VoteItem';

interface Vote {
  id: string;
  title: string;
  category: '학교생활' | '기숙사' | '유머';
  categoryEmoji: string;
  participantCount: number;
  status: 'urgent' | 'completed' | 'ongoing';
  statusText: string;
}

interface MyVotesListProps {
  votes: Vote[];
  onVoteClick: (voteId: string) => void;
}

export const MyVotesList = ({ votes, onVoteClick }: MyVotesListProps) => {
  return (
    <VotesListWrapper>
      {votes.map((vote, index) => (
        <VoteItemWrapper key={vote.id}>
          <VoteItem vote={vote} onClick={() => onVoteClick(vote.id)} />
          {index !== votes.length - 1 && <Divider />}
        </VoteItemWrapper>
      ))}
    </VotesListWrapper>
  );
};

const VotesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
`;

const VoteItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #f0f0f0;
  margin-top: 0px;
`;
