"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useEffect, useState } from "react";
import {
    Nexts,
    Logo as LogoIcon, ProfileIcon,
} from "@/../public/svg/svg";
import { useRouter } from "next/navigation";
import ReportCard from "@/components/dashboard/ReportCard";
import { upik } from "@/apis";
import { API } from "@/constants/common/constant";
import { GET_ALL_REPORTS } from "@/graphql/queries";

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

const dashboard = () => {
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
        const res = await upik.post(API.GRAPHQL_URL, {
          query: GET_ALL_REPORTS,
        });
        const data = res.data?.data?.report?.getAllReports || [];
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
        <ReportCard title="신고 내역 보기" variant="white" titleAlign="left" maxWidth={800} scrollable maxHeight={520}>
          <ReportList>
            {loading && <ReportDetails>불러오는 중…</ReportDetails>}
            {error && <ReportDetails>{error}</ReportDetails>}
            {!loading && !error &&
              reports.map((report, idx) => (
                <ReportItem
                  key={`${report.targetType}-${report.targetId}-${report.createdAt}-${idx}`}
                  onClick={() => handleReportClick(String(report.targetId))}
                >
                  <ReportContent>
                    <ReportReason>{report.reason}</ReportReason>
                    <ReportDetails>
                      신고자: {report.authorName} &nbsp;&nbsp;신고 대상: {report.targetType}
                    </ReportDetails>
                  </ReportContent>

                  <ReportMeta>
                    <Timestamp>{new Date(report.createdAt).toLocaleString("ko-KR")}</Timestamp>
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

// ReportCard moved to component

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
