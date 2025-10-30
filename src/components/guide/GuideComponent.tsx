"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Bookmark } from '../../../public/svg/svg';
import Image from "next/image";
import { upik } from "@/apis";
import { GET_ALL_GUIDES } from "@/graphql/queries";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

interface GuideItem {
  id: string | number;
  title: string;
  category: string;
  content?: string;
  like?: number;
  createdAt?: string;
  voteId?: string | null;
}

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

interface GuideComponentProps {
  searchQuery?: string;
  onResultCountChange?: (count: number) => void;
  sortBy?: "like" | "date";
  limit?: number;
}

const GuideComponent = ({ searchQuery = "", onResultCountChange, sortBy = "date", limit = 50 }: GuideComponentProps) => {
  const router = useRouter();
  const [guides, setGuides] = React.useState<GuideItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleGuideClick = (guideId: string | number) => {
    router.push(`/moreGuide/${guideId}`);
  };

  const fetchGuides = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const sortField = sortBy === "like" ? "like" : "createdAt";
      const requestedSize = sortBy === "like" ? Math.max(limit, 50) : limit;
      const response = await upik.post("", {
        query: GET_ALL_GUIDES,
        variables: { page: 0, size: requestedSize, sortBy: `${sortField},desc` },
      } as GraphQLRequest);

      let content: GuideItem[] = response?.data?.data?.getAllGuides?.content ?? [];

      if (sortBy === "like") {
        content = [...content]
          .sort((a, b) => {
            const aLike = (a as any).like ?? (a as any).likeCount ?? 0;
            const bLike = (b as any).like ?? (b as any).likeCount ?? 0;
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

  const filteredGuides = React.useMemo(
    () =>
      guides.filter((guide) =>
        (guide.title || "").toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [guides, searchQuery],
  );

  React.useEffect(() => {
    onResultCountChange?.(filteredGuides.length);
  }, [filteredGuides.length, onResultCountChange]);

  return (
    <GuideBox>
      <Section>
        <SectionBody gap={"16px"}>
          {loading && <LoadingMessage>불러오는 중...</LoadingMessage>}
          {!loading && error && (
            <NoResultsMessage>{error}</NoResultsMessage>
          )}
          {!loading && !error && filteredGuides.length > 0 ? (
            filteredGuides.map((guide, index) => (
              <GuideCard key={index} onClick={() => handleGuideClick(guide.id)}>
                <Thumnail>
                  <Image 
                    src={getThumbnailImage(guide.category)} 
                    alt={guide.category}
                    width={20}
                    height={20}
                  />
                </Thumnail>
                <GuideText>
                  <GuideTitle>{guide.title}</GuideTitle>
                  <OtherInfo>
                    <GuideTag>{guide.category}</GuideTag>
                    <Bookmark width="12px" height="12px" />
                    <MarkCount>{(guide as any).like ?? (guide as any).likeCount ?? 0}</MarkCount>
                    <BookmarkIcon />
                  </OtherInfo>
                </GuideText>
              </GuideCard>
            ))
          ) : null}
          {!loading && !error && filteredGuides.length === 0 && (
            <NoResultsMessage>
              검색결과가 없어요
            </NoResultsMessage>
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
  width : 100%;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionBody = styled.div<{ gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap};
`;

const GuideCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  height: 69px;
  border: 1px solid ${color.gray50};
  border-radius: 8px;
  background: ${color.white};
  padding: 0 16px;
    box-shadow: 
    -4px -4px 10px 0 rgba(0,0,0,0.03),
     4px  4px 10px 0 rgba(0,0,0,0.03);
  cursor: pointer;
`;

const Thumnail = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:-12px;
  margin-left:12px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const GuideText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-left:16px;
`;

const GuideTitle = styled.div`
  color: ${color.black};
  font-family:  ${font.D3};
`;

const OtherInfo = styled.div`
  display: flex;
  align-items: center;
  gap:6px;
`;

const GuideTag = styled.div`
  color: ${color.gray600};
  font-family: ${font.caption};
`;

const BookmarkIcon = styled.span`
  background-color: ${color.gray500};
  display: inline-block;
  margin-left:8px;
`;

const MarkCount = styled.div`
  color: ${color.gray600};
  font-family:${font.caption};
  margin-left:-4px;
`;

const NoResultsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${color.gray500};
  font-family: ${font.D3};
  font-size: 16px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  color: ${color.gray600};
  font-family: ${font.caption};
`;
