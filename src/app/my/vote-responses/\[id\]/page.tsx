'use client';

import styled from '@emotion/styled';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/common/header';
import color from '@/packages/design-system/src/color';
import font from '@/packages/design-system/src/font';
import { useVoteResponseDetail } from '@/hooks/useVoteResponses';

const VoteResponseDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const voteId = params.id as string;
  
  const { detail, loading, error } = useVoteResponseDetail({ id: voteId });

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return (
      <StyledPage>
        <Header types="close" text="투표 상세" onClose={handleClose} />
        <LoadingText>로딩 중...</LoadingText>
      </StyledPage>
    );
  }

  if (error || !detail) {
    return (
      <StyledPage>
        <Header types="close" text="투표 상세" onClose={handleClose} />
        <ErrorText>투표 정보를 불러올 수 없습니다.</ErrorText>
      </StyledPage>
    );
  }

  return (
    <StyledPage>
      <Header types="close" text="투표 상세" onClose={handleClose} />
      <Content>
        <VoteSection>
          <SectionTitle>투표</SectionTitle>
          <VoteQuestion>{detail.title}</VoteQuestion>
          
          <VoteStats>
            <StatItem>
              <StatLabel>카테고리</StatLabel>
              <StatValue>{detail.category}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>상태</StatLabel>
              <StatValue status={detail.status}>
                {detail.status === 'OPEN' ? '진행중' : '마감됨'}
              </StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>마감일</StatLabel>
              <StatValue>{detail.finishedAt || '-'}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>총 응답</StatLabel>
              <StatValue>{detail.totalResponses || 0}명</StatValue>
            </StatItem>
          </VoteStats>
        </VoteSection>

        <Divider />

        <OptionsSection>
          <SectionTitle>선택지</SectionTitle>
          <OptionsList>
            {detail.options && detail.options.length > 0 ? (
              detail.options.map((option, index) => (
                <OptionItem key={option.id}>
                  <OptionContent>
                    <OptionLetter>{String.fromCharCode(65 + index)}</OptionLetter>
                    <OptionText>{option.content || option.text}</OptionText>
                  </OptionContent>
                  <OptionStats>
                    <OptionVotes>{option.votes || 0}표</OptionVotes>
                    <OptionPercentage>{option.percentage || 0}%</OptionPercentage>
                  </OptionStats>
                </OptionItem>
              ))
            ) : (
              <EmptyText>선택지 정보가 없습니다.</EmptyText>
            )}
          </OptionsList>
        </OptionsSection>
      </Content>
    </StyledPage>
  );
};

export default VoteResponseDetailPage;

const StyledPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 80px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

const VoteSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.p`
  ${font.H1};
  color: ${color.primary};
  margin: 0;
  padding: 0;
`;

const VoteQuestion = styled.p`
  ${font.D1};
  color: ${color.black};
  margin: 0;
  padding: 0;
  word-break: break-word;
  line-height: 1.4;
`;

const VoteStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background-color: ${color.gray50};
  border-radius: 8px;
`;

const StatLabel = styled.p`
  ${font.caption};
  color: ${color.gray600};
  margin: 0;
  padding: 0;
`;

interface StatValueProps {
  status?: string;
}

const StatValue = styled.p<StatValueProps>`
  ${font.H2};
  color: ${(props) =>
    props.status && props.status === 'OPEN' ? color.primary : color.black};
  margin: 0;
  padding: 0;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${color.gray100};
`;

const OptionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${color.gray100};
  border-radius: 8px;
  background-color: ${color.white};
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const OptionLetter = styled.span`
  ${font.H1};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${color.primary};
  color: ${color.white};
`;

const OptionText = styled.p`
  ${font.content};
  color: ${color.black};
  margin: 0;
  padding: 0;
  word-break: break-word;
`;

const OptionStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const OptionVotes = styled.p`
  ${font.H2};
  color: ${color.black};
  margin: 0;
  padding: 0;
`;

const OptionPercentage = styled.p`
  ${font.caption};
  color: ${color.gray600};
  margin: 0;
  padding: 0;
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

const EmptyText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.gray600};
  padding: 20px;
  margin: 0;
`;
