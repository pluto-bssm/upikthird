"use client";

import styled from "@emotion/styled";
import { VoteItem } from "./VoteItem";
import type { VotePayload } from "@/types/graphql";

interface MyVotesListProps {
  votes: VotePayload[];
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
