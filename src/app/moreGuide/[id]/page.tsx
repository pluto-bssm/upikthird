"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import VoteBarChart from "@/components/guide/VoteBarChart";
import {
  getGuideById,
  toggleBookmark,
  isGuideBookmarked,
  incrementGuideLike,
  decrementGuideLike,
} from "@/services/guide/api";

const parseContentWithBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2);
      return <strong key={index}>{content}</strong>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [bookmarkLoading, setBookmarkLoading] = React.useState(true);

  const fetchBookmarkStatus = React.useCallback(async () => {
    if (!guideId) return;
    try {
      setBookmarkLoading(true);
      const isBookmarked = await isGuideBookmarked(guideId);
      setBookmarked(isBookmarked);
    } catch (error) {
      setBookmarked(false);
    } finally {
      setBookmarkLoading(false);
    }
  }, [guideId]);

  React.useEffect(() => {
    const fetchGuide = async () => {
      try {
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
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    if (guideId) {
      setIsLoading(true);
      fetchGuide();
      fetchBookmarkStatus();
    }
  }, [guideId, fetchBookmarkStatus]);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && guideId) {
        fetchBookmarkStatus();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [guideId, fetchBookmarkStatus]);

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
            if (typeof next === "boolean") {
              setBookmarked(next);
              if (next) {
                await incrementGuideLike(guideId);
              } else {
                await decrementGuideLike(guideId);
              }
            }
          } catch (error) {
          }
        }}
      />

      <MainContent>
        <GuideTitle>{guide?.title ?? "가이드를 불러오는 중"}</GuideTitle>
        <GuideMeta>
          <GuideMetaValue>{formattedDate}</GuideMetaValue>
        </GuideMeta>

        <VoteSection>
          <VoteChartWrapper>
            {guide?.voteId ? (
              <VoteBarChart voteId={guide.voteId} />
            ) : (
              <EmptyVote>등록된 투표 결과가 없습니다.</EmptyVote>
            )}
          </VoteChartWrapper>
        </VoteSection>

        <SectionDivider />
        <GuideBody>
          {guide?.content
            ? parseContentWithBold(guide.content)
            : "가이드 내용을 불러오는 중입니다."}
        </GuideBody>
        <MutedDivider />
        <ReportTextButton
          onClick={() => router.push(`/revote?guideId=${guideId}`)}
        >
          가이드에 문제가 있다면?
        </ReportTextButton>
      </MainContent>
      <FooterSpacer />
      <NavigationBar />
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
  ${font.D2};
  line-height: 1.3;
`;

const GuideMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const GuideMetaValue = styled.span`
  color: ${color.black};
  ${font.P3};
`;

const VoteSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VoteChartWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
  ${font.P1};
  line-height: 24px;
  white-space: pre-wrap;
`;

const ReportTextButton = styled.button`
  border: none;
  background: none;
  color: ${color.gray500};
  ${font.P3};
  cursor: pointer;
  text-align: right;
`;

const FooterSpacer = styled.div`
  width: 100%;
  height: 140px;
`;



