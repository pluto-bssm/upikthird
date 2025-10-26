'use client';

import styled from '@emotion/styled';
import Header from '@/components/common/header';
import color from '@/packages/design-system/src/color';

interface VoteResponse {
  id: string;
  question: string;
  selectedOption: string;
  tailQuestion?: string;
  tailAnswer?: string;
  responseDate: string;
  responseTime: string;
}

const mockVoteResponse: VoteResponse = {
  id: '1',
  question: '투표 질문투표 질문투표 질문투표 질문투표 질문투표 질문투표 질문투표 질문',
  selectedOption: '선지선지선지선지4',
  tailQuestion: '해당 선지를 고른 이유는 무엇인가요?',
  tailAnswer: '네!!!!!! 꼬리 질문에 무조건 응답할거에요!!!!!!!!!!!!!!',
  responseDate: '2025-07-19',
  responseTime: '12:34',
};

const VoteResponsePage = () => {
  return (
    <StyledVoteResponsePage>
      <Header types="close" text="투표 응답 내역" />
      <VoteResponseContent>
        <VoteSection>
          <SectionTitle>투표하기</SectionTitle>
          <VoteQuestion>{mockVoteResponse.question}</VoteQuestion>
          
          <SelectedOptionBox>
            <OptionLabel>선택한 선지</OptionLabel>
            <OptionText>{mockVoteResponse.selectedOption}</OptionText>
          </SelectedOptionBox>
        </VoteSection>

        <Divider />

        {mockVoteResponse.tailQuestion && (
          <TailQuestionSection>
            <TailQuestionTitle>꼬리질문 응답하기</TailQuestionTitle>
            <TailQuestion>{mockVoteResponse.tailQuestion}</TailQuestion>
            
            <TailAnswerBox>
              <AnswerText>{mockVoteResponse.tailAnswer}</AnswerText>
            </TailAnswerBox>
          </TailQuestionSection>
        )}

        <SeparatorBox />

        <ResponseInfoSection>
          <InfoGroup>
            <InfoLabel>응답일자</InfoLabel>
            <InfoValue>{mockVoteResponse.responseDate}</InfoValue>
          </InfoGroup>
          <InfoGroup>
            <InfoLabel>응답시간</InfoLabel>
            <InfoValue>{mockVoteResponse.responseTime}</InfoValue>
          </InfoGroup>
        </ResponseInfoSection>
      </VoteResponseContent>
    </StyledVoteResponsePage>
  );
};

export default VoteResponsePage;

const StyledVoteResponsePage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 80px;
`;

const VoteResponseContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

const VoteSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${color.primary};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;

const VoteQuestion = styled.p`
  font-size: 22px;
  font-weight: 700;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.3;
  word-break: break-word;
`;

const SelectedOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 2px solid ${color.primary};
  background-color: rgba(255, 159, 28, 0.1);
  border-radius: 12px;
`;

const OptionLabel = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray500};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;

const OptionText = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${color.gray50};
  margin: 0;
`;

const TailQuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TailQuestionTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${color.primary};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;

const TailQuestion = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.3;
  word-break: break-word;
`;

const TailAnswerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid ${color.gray100};
  background-color: ${color.white};
  border-radius: 12px;
  min-height: 120px;
`;

const AnswerText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${color.gray700};
  margin: 0;
  padding: 0;
  line-height: 1.4;
  word-break: break-word;
`;

const SeparatorBox = styled.div`
  height: 8px;
  background-color: ${color.gray50};
`;

const ResponseInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${color.white};
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoLabel = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray500};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;

const InfoValue = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${color.black};
  margin: 0;
  padding: 0;
  line-height: 1.2;
`;
