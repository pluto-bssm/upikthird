import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Nexts } from "../../../public/svg/svg";

const mockData = [
  {
    title: "이중에 뭐가 더 싫어?",
    emoji: "🏫",
    category: "학교생활",
    option1: "최병준쌤과 헬스 3시간",
    option2: "규봉쌤과 수학풀이 5시간",
  },
];

export default function RecoVoteCard() {
  return (
    <RecoVoteContainer>
      <FeaturedVoteContent>
        <VoteHeader>
          <VoteLabel>오늘의 추천 투표</VoteLabel>
          <VoteTitle>{mockData[0].title}</VoteTitle>
        </VoteHeader>
        <VoteOptions>
          <VoteOption>{mockData[0].option1}</VoteOption>
          <VoteVS>VS</VoteVS>
          <VoteOption>{mockData[0].option2}</VoteOption>
        </VoteOptions>
      </FeaturedVoteContent>
      <VoteLink>
        투표하러 가기
        <Arrow>
          <Nexts />
        </Arrow>
      </VoteLink>
    </RecoVoteContainer>
  );
}

const RecoVoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  padding: 24px 24px;
  border: 1px solid ${color.gray50};
  border-radius: 8px;
  width: 100%;
`;

const FeaturedVoteContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const VoteHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const VoteLabel = styled.p`
  margin: 0;
  color: ${color.gray300};
  font-family: ${font.caption};
`;

const VoteTitle = styled.p`
  margin: 0;
  color: ${color.black};
  font-family: ${font.D3};
`;

const VoteOptions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const VoteOption = styled.div`
  color: ${color.black};
  font-family: ${font.H2};
`;

const VoteVS = styled.div`
  color: ${color.primary};
  font-family: ${font.H2};
`;

const VoteLink = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  color: ${color.primary};
  font-family: ${font.caption};
  cursor: pointer;
`;

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.primary};
`;
