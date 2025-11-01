"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useEffect, useMemo, useState } from "react";
import {
    Logo as LogoIcon,
    Nexts, ProfileIcon,
} from "@/../public/svg/svg";
import { useParams, useRouter } from "next/navigation";
import ReportCard from "@/components/dashboard/ReportCard";
import { upik } from "@/apis";
import { API } from "@/constants/common/constant";
import { GET_REPORTS_BY_TARGET, GET_ALL_REPORTS } from "@/graphql/queries";

type ReportItem = {
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

const DashboardDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [allReports, setAllReports] = useState<ReportItem[]>([]);
  const [items, setItems] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAll, setLoadingAll] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorAll, setErrorAll] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingAll(true);
        setErrorAll(null);
        const res = await upik.post(API.GRAPHQL_URL, {
          query: GET_ALL_REPORTS,
        });
        const data = res.data?.data?.report?.getAllReports || [];
        if (mounted) setAllReports(data);
      } catch (e) {
        if (mounted)
          setErrorAll(
            e instanceof Error ? e.message : "신고 내역을 불러오지 못했습니다.",
          );
      } finally {
        if (mounted) setLoadingAll(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await upik.post(API.GRAPHQL_URL, {
          query: GET_REPORTS_BY_TARGET,
          variables: { targetId: id },
        });
        const data = res.data?.data?.report?.getReportsByTarget || [];
        if (mounted) setItems(data);
      } catch (e) {
        if (mounted)
          setError(
            e instanceof Error ? e.message : "신고 상세를 불러오지 못했습니다.",
          );
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const report = useMemo(() => items[0], [items]);

  if (!loading && !report) {
    return (
      <PageContainer>
        <TopHeader>
          <LogoIcon width="50" height="50" />
          <ProfileIconWrapper>
            <ProfileIcon width="24" height="24" />
          </ProfileIconWrapper>
        </TopHeader>
        <MainContent>
          <ErrorMessage>{error || "신고 내역을 찾을 수 없습니다."}</ErrorMessage>
        </MainContent>
      </PageContainer>
    );
  }

  const handleReject = () => {
  };

  const handleAccept = () => {
  };

  const handleReportClick = (targetId: string) => {
    router.push(`/dashboard/${targetId}`);
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
          <ReportCard title="신고 내역 보기" variant="gray" titleAlign="center" scrollable maxHeight={520} style={{ flex: 1 }}>
            <ReportList>
              {loadingAll && <ReportDetails>불러오는 중…</ReportDetails>}
              {errorAll && <ReportDetails>{errorAll}</ReportDetails>}
              {!loadingAll && !errorAll &&
                allReports.map((r, idx) => (
                  <ReportItem
                    key={`${r.targetType}-${r.targetId}-${r.createdAt}-${idx}`}
                    onClick={() => handleReportClick(String(r.targetId))}
                    isSelected={String(r.targetId) === id}
                  >
                    <ReportContent>
                      <ReportReason>{r.reason}</ReportReason>
                      <ReportDetails>
                        신고자: {r.authorName} &nbsp;&nbsp;신고 대상: {r.targetType}
                      </ReportDetails>
                    </ReportContent>

                    <ReportMeta>
                      <Timestamp>{new Date(r.createdAt).toLocaleString("ko-KR")}</Timestamp>
                      <ArrowIcon>
                        <Nexts width="24" height="24" />
                      </ArrowIcon>
                    </ReportMeta>
                  </ReportItem>
                ))}
            </ReportList>
          </ReportCard>

          <ReportCard title="신고 내용 상세보기" variant="gray" titleAlign="center" scrollable maxHeight={520} style={{ flex: 1 }}>
            <DetailSection>
              <DetailLabel>신고 사유</DetailLabel>
              <DetailContentBox>{report?.reason || '-'}</DetailContentBox>
            </DetailSection>

            <DetailSection>
              <DetailLabel>상세 내용</DetailLabel>
              <DetailContentBox>{report?.content || '-'}</DetailContentBox>
            </DetailSection>

            <DetailSection>
              <DetailOtherLabel>신고자 아이디/이름</DetailOtherLabel>
              <DetailOtherText>
                {report?.authorId}/{report?.authorName}
              </DetailOtherText>
            </DetailSection>

            <DetailSection>
              <DetailOtherLabel>신고 대상자 아이디/이름</DetailOtherLabel>
              <DetailOtherText>
                {report?.targetId}/{report?.targetTitle}
              </DetailOtherText>
            </DetailSection>

            <DetailSection>
              <DetailOtherLabel>신고 대상</DetailOtherLabel>
              <DetailOtherText>{report?.targetType}</DetailOtherText>
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

const ReportList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ReportItem = styled.div<{ isSelected?: boolean }>`
  width: 100%;
  padding: 20px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${color.gray200};

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
  padding: 16px 0;
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
