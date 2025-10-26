'use client';

import styled from '@emotion/styled';
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

interface VoteItemProps {
  vote: Vote;
  onClick: () => void;
}

export const VoteItem = ({ vote, onClick }: VoteItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return color.accent;
      case 'completed':
        return color.gray500;
      case 'ongoing':
        return color.secondary;
      default:
        return color.gray500;
    }
  };

  return (
    <VoteItemButton onClick={onClick}>
      <CategoryIconWrapper>
        <CategoryEmoji>{vote.categoryEmoji}</CategoryEmoji>
      </CategoryIconWrapper>

      <VoteContentWrapper>
        <VoteTitle>{vote.title}</VoteTitle>
        <VoteMetaWrapper>
          <CategoryTag>{vote.category}</CategoryTag>
          <ParticipantInfo>
            <ParticipantIcon>❤️</ParticipantIcon>
            <ParticipantCount>{vote.participantCount}</ParticipantCount>
          </ParticipantInfo>
          <StatusText status={vote.status}>{vote.statusText}</StatusText>
        </VoteMetaWrapper>
      </VoteContentWrapper>
    </VoteItemButton>
  );
};

const VoteItemButton = styled.button`
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

const CategoryIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
`;

const CategoryEmoji = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;

const VoteContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  text-align: left;
`;

const VoteTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.2;
  word-break: break-word;
`;

const VoteMetaWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
`;

const CategoryTag = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  margin: 0;
  padding: 0;
  line-height: 1.2;
  white-space: nowrap;
`;

const ParticipantInfo = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

const ParticipantIcon = styled.span`
  font-size: 10px;
`;

const ParticipantCount = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  margin: 0;
  padding: 0;
  line-height: 1.2;
  white-space: nowrap;
`;

interface StatusTextProps {
  status: string;
}

const StatusText = styled.p<StatusTextProps>`
  font-size: 10px;
  font-weight: 400;
  color: ${(props) => {
    switch (props.status) {
      case 'urgent':
        return color.accent;
      case 'completed':
        return color.gray500;
      case 'ongoing':
        return color.secondary;
      default:
        return color.gray500;
    }
  }};
  margin: 0;
  padding: 0;
  line-height: 1.2;
  text-align: right;
  flex: 1;
`;
