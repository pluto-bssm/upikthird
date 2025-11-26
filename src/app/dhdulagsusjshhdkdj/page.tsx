"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useEffect, useState } from "react";
import { Nexts, Logo as LogoIcon, ProfileIcon } from "@/../public/svg/svg";
import { useRouter } from "next/navigation";
import ReportCard from "@/components/dashboard/ReportCard";
import { getAllReports } from "@/services/dashboard/api";

type ReportSummary = {
  authorId: string;
  authorName: string;
  category: string;
  content: string;
  createdAt: string;
  guideType?: string;
  likeCount?: number;
  reason: string;
  revoteCount?: number;
  targetCreatedAt?: string;
  targetId: string;
  targetTitle: string;
  targetType: string;
  userId?: string;
};

const Dashboard = () => {
  const router = useRouter();
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllReports();
        if (mounted) setReports(data);
      } catch (e) {
        if (mounted)
          setError(
            e instanceof Error ? e.message : "신고 내역을 불러오지 못했습니다.",
          );
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleReportClick = (id: string) => {
    router.push(`/dhdulagsusjshhdkdj/${id}`);
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
        <ReportCard
          title="신고 내역 보기"
          variant="white"
          titleAlign="left"
          maxWidth={800}
          scrollable
          maxHeight={520}
        >
          <ReportList>
            {loading && <ReportDetails>불러오는 중…</ReportDetails>}
            {error && <ReportDetails>{error}</ReportDetails>}
            {!loading &&
              !error &&
              reports.map((report, idx) => (
                <ReportItem
                  key={`${report.targetType}-${report.targetId}-${report.createdAt}-${idx}`}
                  onClick={() => handleReportClick(String(report.targetId))}
                >
                  <ReportContent>
                    <ReportReason>{report.reason}</ReportReason>
                    <ReportDetails>
                       &nbsp;&nbsp;신고 대상:{" "}
                      {report.targetType}
                    </ReportDetails>
                  </ReportContent>

                  <ReportMeta>
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

export default Dashboard;

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

const ReportList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ReportItem = styled.div`
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid ${color.gray200};
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${color.gray50};
    border-radius: 8px;
  }
`;

const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  padding: 0 16px;
  min-width: 0;
`;

const ReportReason = styled.h3`
  ${font.D3};
  color: ${color.black};
  margin: 0;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ReportDetails = styled.p`
  ${font.H3};
  color: ${color.black};
  margin: 0;
  font-size: 14px;
`;

const ReportMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.black};
`;
