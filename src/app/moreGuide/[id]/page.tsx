"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import VoteBarChart from "@/components/guide/VoteBarChart";
import {
  getGuideById,
  toggleBookmark,
  isGuideBookmarked,
} from "@/services/guide/api";
import Image from "next/image";

const getThumbnailImage = (category: string) => {
  switch (category) {
    case "학교생활":
      return "/svg/images/School.png";
    case "유머":
      return "/svg/images/Humors.png";
    case "기숙사생활":
      return "/svg/images/MakeSchool.png";
    default:
      return "/svg/images/School.png";
  }
};

const MoreGuidePage = () => {
  const params = useParams();
  const guideId = params.id as string;
  const router = useRouter();

  const [guide, setGuide] = React.useState<{
    id: string;
    title: string;
    createdAt?: string;
    category?: string;
    content?: string;
    voteId?: string | null;
  } | null>(null);
  const [bookmarked, setBookmarked] = React.useState(false);

  React.useEffect(() => {
    const fetchGuide = async () => {
      const data = await getGuideById(guideId);
      if (data) {
        setGuide({
          id: data.id,
          title: data.title,
          createdAt: data.createdAt,
          category: data.category,
          content: data.content,
          voteId: data.voteId ?? null,
        });
        try {
          const isBookmarked = await isGuideBookmarked(guideId);
          setBookmarked(isBookmarked);
        } catch (_error) {
          setBookmarked(false);
          console.error(
            "북마크 상태를 불러오는 중 오류가 발생했습니다." + _error,
          );
        }
      }
    };
    if (guideId) fetchGuide();
  }, [guideId]);

  const formattedDate = React.useMemo(() => {
    if (!guide?.createdAt) return "-";
    const parsed = new Date(guide.createdAt);
    if (Number.isNaN(parsed.getTime())) {
      return guide.createdAt.slice(0, 10);
    }
    return parsed.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [guide?.createdAt]);

  return (
    <PageWrapper>
      <Header
        types="bookmark"
        bookmarked={bookmarked}
        onToggleBookmark={async () => {
          try {
            const next = await toggleBookmark(guideId);
            setBookmarked((prev) => (typeof next === "boolean" ? next : prev));
          } catch (_error) {
            console.error("북마크 토글 중 오류가 발생했습니다." + _error);
          }
        }}
      />

      <MainContent>
        <CategoryBadge>
          <Image
            src={getThumbnailImage(guide?.category ?? "")}
            alt={guide?.category ?? ""}
            width={24}
            height={24}
          />
        </CategoryBadge>
        <GuideTitle>{guide?.title ?? "가이드를 불러오는 중"}</GuideTitle>
        <GuideMeta>
          <GuideMetaLabel>가이드 제작 날짜</GuideMetaLabel>
          <GuideMetaValue>{formattedDate}</GuideMetaValue>
        </GuideMeta>

        <VoteSection>
          <ResultButton type="button">투표 결과 확인하기</ResultButton>
          <VoteChartWrapper>
            {guide?.voteId ? (
              <VoteBarChart voteId={guide.voteId} />
            ) : (
              <EmptyVote>등록된 투표 결과가 없습니다.</EmptyVote>
            )}
          </VoteChartWrapper>
        </VoteSection>

        <SectionDivider />
        <GuideBody>{guide?.content ?? "가이드 내용을 불러오는 중입니다."}</GuideBody>
        <MutedDivider />
        <ReportTextButton
          onClick={() => router.push(`/revote?guideId=${guideId}`)}
        >
          가이드에 문제가 있다면?
        </ReportTextButton>
      </MainContent>
      <FooterSpacer />
      <Footer />
    </PageWrapper>
  );
};

export default MoreGuidePage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  min-height: 100vh;
  background-color: ${color.white};
  margin: 0 auto;
  padding-bottom: 160px;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 96px 20px 0;
  box-sizing: border-box;
`;

const GuideTitle = styled.h1`
  margin: 0;
  color: ${color.black};
  font-family: ${font.D1};
  line-height: 1.3;
`;

const CategoryBadge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: ${color.gray50};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GuideMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const GuideMetaLabel = styled.span`
  color: ${color.gray400};
  font-family: ${font.P4};
`;

const GuideMetaValue = styled.span`
  color: ${color.black};
  font-family: ${font.H1};
`;

const VoteSection = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 18px;
`;

const VoteChartWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ResultButton = styled.button`
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  width: 148px;
  height: 36px;
  padding: 0 16px;
  border-radius: 30px;
  background: ${color.black};
  color: ${color.white};
  font-family: ${font.D3};
  z-index: 10;
  cursor: pointer;
`;

const EmptyVote = styled.div`
  margin-top: 18px;
  width: 100%;
  max-width: 350px;
  border: 1px solid ${color.gray500};
  border-radius: 8px;
  padding: 60px 36px;
  text-align: center;
  color: ${color.gray500};
   ${font.P1};
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.gray300};
`;

const MutedDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.gray500};
`;

const GuideBody = styled.p`
  margin: 0;
  color: ${color.black};
  font-family: ${font.P1};
  line-height: 24px;
  white-space: pre-wrap;
`;

const ReportTextButton = styled.button`
  border: none;
  background: none;
  color: ${color.gray500};
  font-family: ${font.P3};
  cursor: pointer;
  text-align: right;
`;

const FooterSpacer = styled.div`
  width: 100%;
  height: 140px;
`;
