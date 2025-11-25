"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Bookmark, School, Domitorys, Humors } from "../../../public/svg/svg";
import * as guideApi from "@/services/guide/api";
import type { Guide } from "@/types/api";

type GuideItem = Guide & {
  voteId?: string | null;
};

const GuideBlockImage = ({ category }: { category: string }) => {
  switch (category) {
    case "학교생활":
      return <School width="100%" height="100%" />;
    case "기숙사":
      return <Domitorys width="100%" height="100%" />;
    case "유머":
      return <Humors width="100%" height="100%" />;
    default:
      return <School width="100%" height="100%" />;
  }
};

interface GuideComponentProps {
  searchQuery?: string;
  onResultCountChange?: (count: number) => void;
  sortBy?: "like" | "date";
  limit?: number;
  category?: string | null;
}

const GuideComponent = ({
  searchQuery = "",
  onResultCountChange,
  sortBy = "date",
  limit = 50,
  category = null,
}: GuideComponentProps) => {
  const router = useRouter();
  const [guides, setGuides] = React.useState<GuideItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleGuideClick = (guideId: string) => {
    router.push(`/moreGuide/${guideId}`);
  };

  const fetchGuides = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const sortField = sortBy === "like" ? "like" : "createdAt";
      const requestedSize = sortBy === "like" ? Math.max(limit, 50) : limit;

      const response = await guideApi.getPaginatedGuides(
        0,
        requestedSize,
        `${sortField},desc`,
      );

      let content: GuideItem[] = response.content ?? [];

      if (sortBy === "like") {
        content = [...content]
          .sort((a, b) => {
            const aLike = a.like ?? a.likeCount ?? 0;
            const bLike = b.like ?? b.likeCount ?? 0;
            return bLike - aLike;
          })
          .slice(0, limit);
      } else if (sortBy === "date") {
        content = [...content]
          .sort((a, b) => {
            const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bTime - aTime;
          })
          .slice(0, limit);
      }

      setGuides(content);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "가이드를 불러오지 못했어요";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [sortBy, limit]);

  React.useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const filteredGuides = React.useMemo(() => {
    let filtered = guides.filter((guide) =>
      (guide.title || "").toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (category) {
      filtered = filtered.filter((guide) => guide.category === category);
    }

    return filtered;
  }, [guides, searchQuery, category]);

  React.useEffect(() => {
    onResultCountChange?.(filteredGuides.length);
  }, [filteredGuides.length, onResultCountChange]);

  return (
    <GuideBox>
      <Section>
        <SectionBody gap={"16px"}>
          {loading && <LoadingMessage>불러오는 중...</LoadingMessage>}
          {!loading && error && <NoResultsMessage>{error}</NoResultsMessage>}
          {!loading && !error && filteredGuides.length > 0
            ? filteredGuides.map((guide, index) => (
                <GuideCard
                  key={index}
                  onClick={() => handleGuideClick(guide.id)}
                >
                  <GuideBlockImage category={guide.category ?? "전체"} />
                  <GuideText>
                    <GuideTitle>{guide.title}</GuideTitle>
                    <OtherInfo>
                      <GuideInfoUpperBox>
                        <GuideTag>{guide.category}</GuideTag>
                        <GuideMarkBox>
                          <Bookmark width="12px" height="12px" />
                          <MarkCount>
                            {guide.like ?? guide.likeCount ?? 0}
                          </MarkCount>
                        </GuideMarkBox>
                      </GuideInfoUpperBox>
                      <BookmarkIcon />
                    </OtherInfo>
                  </GuideText>
                </GuideCard>
              ))
            : null}
          {!loading && !error && filteredGuides.length === 0 && (
            <NoResultsMessage>검색결과가 없어요</NoResultsMessage>
          )}
        </SectionBody>
      </Section>
    </GuideBox>
  );
};

export default GuideComponent;

const GuideBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionBody = styled.div<{ gap: string }>`
  display: flex;
  flex-direction: column;
`;

const GuideCard = styled.div`
  width: 100%;
  border: 1px solid ${color.gray50};
  border-radius: 12px;
  height: 12vh;
  display: flex;
  align-items: center;
  gap: 4%;
  padding: 0px 10px 0px 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const GuideText = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

const GuideTitle = styled.p`
  ${font.H1};
  color: ${color.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const OtherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 95%;
`;

const GuideTag = styled.p`
  ${font.P2};
  color: ${color.gray600};
`;

const GuideInfoUpperBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const GuideMarkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookmarkIcon = styled.span`
  display: inline-block;
`;

const MarkCount = styled.p`
  ${font.P2};
  color: ${color.gray600};
`;

const NoResultsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${color.gray500};
  ${font.P1};
  font-size: 16px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  color: ${color.gray600};
  ${font.H1};
`;
