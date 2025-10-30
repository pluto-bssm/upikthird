"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import {
    Nexts,
    Logo as LogoIcon, ProfileIcon,
} from "@/../public/svg/svg";
import { useRouter } from "next/navigation";

const reportHistoryData = [
  {
    id: 1,
    reason: "신고 사유",
    reporter: "박땡땡",
    target: "가이드",
    timestamp: "2025-06-12 09:12",
  },
  {
    id: 2,
    reason: "신고 사유",
    reporter: "박땡땡",
    target: "가이드",
    timestamp: "2025-06-12 09:12",
  },
  {
    id: 3,
    reason: "신고 사유",
    reporter: "박땡땡",
    target: "가이드",
    timestamp: "2025-06-12 09:12",
  },
  {
    id: 4,
    reason: "신고 사유",
    reporter: "박땡땡",
    target: "가이드",
    timestamp: "2025-06-12 09:12",
  },
  {
    id: 5,
    reason: "신고 사유",
    reporter: "박땡땡",
    target: "가이드",
    timestamp: "2025-06-12 09:12",
  },
  {
    id: 6,
    reason: "신고 사유",
    reporter: "박땡땡",
    target: "가이드",
    timestamp: "2025-06-12 09:12",
  },
];

const dashboard = () => {
  const router = useRouter();

  const handleReportClick = (id: number) => {
    router.push(`/dashboard/${id}`);
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
        <ReportCard>
          <CardTitle>신고 내역 보기</CardTitle>
          <ReportList>
            {reportHistoryData.map((report) => (
              <ReportItem
                key={report.id}
                onClick={() => handleReportClick(report.id)}
              >
                <ReportContent>
                  <ReportReason>{report.reason}</ReportReason>
                  <ReportDetails>
                    신고자: {report.reporter} &nbsp;&nbsp;신고자 대상:{" "}
                    {report.target}
                  </ReportDetails>
                </ReportContent>

                <ReportMeta>
                  <Timestamp>{report.timestamp}</Timestamp>
                  <ArrowIcon>
                    <Nexts width="24" height="24" />
                  </ArrowIcon>
                </ReportMeta>
              </ReportItem>
            ))}
          </ReportList>
        </ReportCard>
      </MainContent>
    </PageContainer>
  );
};

export default dashboard;

const PageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafafaff;
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
  background-color: #fafafaff;
`;

const ReportCard = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: ${color.white};
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const CardTitle = styled.h1`
  font-family: ${font.D1};
  color: ${color.black};
  margin: 0 0 24px 0;
  text-align: left;
`;

const ReportList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ReportItem = styled.div`
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f5f5;
    border-radius: 8px;
  }
`;

const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  padding: 0 16px;
`;

const ReportReason = styled.h3`
  font-family: ${font.D3};
  color: ${color.black};
  margin: 0;
  font-weight: 600;
`;

const ReportDetails = styled.p`
  font-family: ${font.H3};
  color: ${color.black};
  margin: 0;
  font-size: 14px;
`;

const ReportMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Timestamp = styled.span`
  font-family: ${font.caption};
  color: ${color.black};
  font-size: 14px;
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.black};
`;
