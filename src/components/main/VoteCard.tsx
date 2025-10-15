import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";

interface VoteCardProps {
  emoji: string;
  title: string;
  category: string;
  participantCount: number;
  dueDate: string;
  onClick?: () => void;
}

export default function VoteCard({
  emoji,
  title,
  category,
  participantCount,
  dueDate,
  onClick,
}: VoteCardProps) {
  return (
    <CardContainer onClick={onClick}>
      <EmojiIcon>{emoji}</EmojiIcon>
      <ContentWrapper>
        <Title>{title}</Title>
        <MetaInfo>
          <Category>{category}</Category>
          <ParticipantInfo>
            <ParticipantIcon>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6C7.38071 6 8.5 4.88071 8.5 3.5C8.5 2.11929 7.38071 1 6 1C4.61929 1 3.5 2.11929 3.5 3.5C3.5 4.88071 4.61929 6 6 6Z"
                  stroke="#777777"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 11V10C2 9.20435 2.31607 8.44129 2.87868 7.87868C3.44129 7.31607 4.20435 7 5 7H7C7.79565 7 8.55871 7.31607 9.12132 7.87868C9.68393 8.44129 10 9.20435 10 10V11"
                  stroke="#777777"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ParticipantIcon>
            <ParticipantCount>{participantCount}</ParticipantCount>
          </ParticipantInfo>
          <DueDate>{dueDate}</DueDate>
        </MetaInfo>
      </ContentWrapper>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 18px 20px;
  height: 67px;
  background-color: ${color.white};
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: ${color.gray300};
  }
`;

const EmojiIcon = styled.div`
  font-size: 20px;
  font-weight: 700;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  min-width: 0;
`;

const Title = styled.p`
  margin: 0;
  color: ${color.black};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 15px;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  width: 100%;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
  padding: 7px 0;
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 10px;
  line-height: normal;
  color: ${color.gray700};
  flex-shrink: 0;
`;

const ParticipantInfo = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ParticipantIcon = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ParticipantCount = styled.p`
  margin: 0;
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 10px;
  line-height: normal;
  color: ${color.gray700};
  white-space: pre;
`;

const DueDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 10px;
  padding: 7px 0;
  flex: 1;
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 10px;
  line-height: normal;
  color: ${color.gray400};
  text-align: right;
  min-width: 0;
`;
