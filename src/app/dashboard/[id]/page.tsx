"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Logo as LogoIcon, Nexts, ProfileIcon } from "@/../public/svg/svg";
import { useParams, useRouter } from "next/navigation";

const reportDetailsData: Record<
  string,
  {
    id: number;
    reason: string;
    reasonDetail: string;
    detailContent: string;
    reporterId: string;
    reporterName: string;
    targetId: string;
    targetName: string;
    targetType: string;
  }
> = {
  "1": {
    id: 1,
    reason: "신고 사유",
    reasonDetail: "욕설/생명경시/혐오 표현이 사용되었어요",
    detailContent:
      "욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설",
    reporterId: "fake_user_id1",
    reporterName: "김땡땡",
    targetId: "fake_user_id2",
    targetName: "박땡땡",
    targetType: "가이드",
  },
  "2": {
    id: 2,
    reason: "신고 사유",
    reasonDetail: "욕설/생명경시/혐오 표현이 사용되었어요",
    detailContent:
      "욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설",
    reporterId: "fake_user_id1",
    reporterName: "김땡땡",
    targetId: "fake_user_id2",
    targetName: "박땡땡",
    targetType: "가이드",
  },
  "3": {
    id: 3,
    reason: "신고 사유",
    reasonDetail: "욕설/생명경시/혐오 표현이 사용되었어요",
    detailContent:
      "욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설",
    reporterId: "fake_user_id1",
    reporterName: "김땡땡",
    targetId: "fake_user_id2",
    targetName: "박땡땡",
    targetType: "가이드",
  },
  "4": {
    id: 4,
    reason: "신고 사유",
    reasonDetail: "욕설/생명경시/혐오 표현이 사용되었어요",
    detailContent:
      "욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설",
    reporterId: "fake_user_id1",
    reporterName: "김땡땡",
    targetId: "fake_user_id2",
    targetName: "박땡땡",
    targetType: "가이드",
  },
  "5": {
    id: 5,
    reason: "신고 사유",
    reasonDetail: "욕설/생명경시/혐오 표현이 사용되었어요",
    detailContent:
      "욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설",
    reporterId: "fake_user_id1",
    reporterName: "김땡땡",
    targetId: "fake_user_id2",
    targetName: "박땡땡",
    targetType: "가이드",
  },
  "6": {
    id: 6,
    reason: "신고 사유",
    reasonDetail: "욕설/생명경시/혐오 표현이 사용되었어요",
    detailContent:
      "욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설 욕설",
    reporterId: "fake_user_id1",
    reporterName: "김땡땡",
    targetId: "fake_user_id2",
    targetName: "박땡땡",
    targetType: "가이드",
  },
};

const DashboardDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const report = reportDetailsData[id];

  if (!report) {
    return (
      <PageContainer>
        <TopHeader>
          <LogoIcon width="50" height="50" />
          <ProfileIconWrapper>
            <ProfileIcon width="24" height="24" />
          </ProfileIconWrapper>
        </TopHeader>
        <MainContent>
          <ErrorMessage>신고 내역을 찾을 수 없습니다.</ErrorMessage>
        </MainContent>
      </PageContainer>
    );
  }

  const handleReject = () => {};

  const handleAccept = () => {};

  const handleReportClick = (reportId: string) => {
    router.push(`/dashboard/${reportId}`);
  };

  return (
    <PageContainer>
      <TopHeader>
        <LogoIcon width="50" height="50" onClick={() => router.push("/")} />
        <ProfileIconWrapper>
          <ProfileIcon width="24" height="24" />
        </ProfileIconWrapper>
      </TopHeader>

      <MainContent>
        <CardContainer>
          <ReportCard>
            <CardTitle>신고 내역 보기</CardTitle>
            <ReportList>
              {Object.entries(reportDetailsData).map(
                ([reportId, reportData]) => (
                  <ReportItem
                    key={reportData.id}
                    onClick={() => handleReportClick(reportId)}
                  >
                    <ReportContent>
                      <ReportReason>{reportData.reason}</ReportReason>
                      <ReportDetails>
                        신고자: {reportData.reporterName} &nbsp;&nbsp;신고자
                        대상: {reportData.targetType}
                      </ReportDetails>
                    </ReportContent>

                    <ReportMeta>
                      <Timestamp>2025-06-12 09:12</Timestamp>
                      <ArrowIcon>
                        <Nexts width="24" height="24" />
                      </ArrowIcon>
                    </ReportMeta>
                  </ReportItem>
                ),
              )}
            </ReportList>
          </ReportCard>

          <ReportCard>
            <CardTitle>신고 내용 상세보기</CardTitle>
            <DetailSection>
              <DetailLabel>신고 사유</DetailLabel>
              <DetailContentBox>{report.reasonDetail}</DetailContentBox>
            </DetailSection>

            <DetailSection>
              <DetailLabel>상세 내용</DetailLabel>
              <DetailContentBox>{report.detailContent}</DetailContentBox>
            </DetailSection>

            <DetailSection>
              <DetailOtherLabel>신고자 아이디/이름</DetailOtherLabel>
              <DetailOtherText>
                {report.reporterId}/{report.reporterName}
              </DetailOtherText>
            </DetailSection>

            <DetailSection>
              <DetailOtherLabel>신고 대상자 아이디/이름</DetailOtherLabel>
              <DetailOtherText>
                {report.targetId}/{report.targetName}
              </DetailOtherText>
            </DetailSection>

            <DetailSection>
              <DetailOtherLabel>신고 대상</DetailOtherLabel>
              <DetailOtherText>{report.targetType}</DetailOtherText>
            </DetailSection>

            <ButtonContainer>
              <ActionButton buttonType="reject" onClick={handleReject}>
                신고 반려하기
              </ActionButton>
              <ActionButton buttonType="addWarning" onClick={handleAccept}>
                경고 횟수 추가하기
              </ActionButton>
            </ButtonContainer>
          </ReportCard>
        </CardContainer>
      </MainContent>
    </PageContainer>
  );
};

export default DashboardDetailPage;

const PageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${color.white};
`;

const TopHeader = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${color.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
`;

const ProfileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  background-color: ${color.white};
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  align-items: flex-start;
`;

const ReportCard = styled.div`
  flex: 1;
  background-color: ${color.gray50};
  border-radius: 32px;
  border: 1px solid ${color.gray300};
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CardTitle = styled.h1`
  ${font.D1};
  color: ${color.black};
  margin: 0 0 24px 0;
  text-align: center;
`;

const ReportList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ReportItem = styled.div`
  width: 100%;
  padding: 20px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 8px;
  }
`;

const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  padding: 0 16px;
`;

const ReportReason = styled.h3`
  ${font.D3};
  color: ${color.black};
  margin: 0;
  font-weight: 600;
`;

const ReportDetails = styled.p`
  ${font.H3};
  color: ${color.gray600};
  margin: 0;
`;

const ReportMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Timestamp = styled.span`
  ${font.H3};
  color: #999;
  font-size: 14px;
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DetailLabel = styled.p`
  font-family: ${font.D3};
  color: ${color.black};
  margin: 0;
`;

const DetailContentBox = styled.div`
  border-radius: 16px;
  border: 1px solid ${color.gray200};
  padding: 12px 16px;
  font-family: ${font.H1};
  color: ${color.gray700};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 24px;
`;

const ActionButton = styled.button<{ buttonType: "reject" | "addWarning" }>`
  flex: 1;
  padding: 12px 20px;
  border-radius: 100px;
  border: none;
  font-family: ${font.D3};
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${color.gray200};
  color: ${color.white};

  &:hover {
    background-color: ${color.primary};
    color: ${color.white};
  }
`;

const ErrorMessage = styled.div`
  ${font.D2};
  color: ${color.gray600};
  text-align: center;
  margin-top: 100px;
`;

const DetailOtherLabel = styled.p`
  font-family: ${font.D3};
  color: ${color.gray500};
  margin: 0;
`;

const DetailOtherText = styled.p`
  font-family: ${font.H1};
  color: ${color.black};
  background-color: transparent;
  margin: 0;
`;
