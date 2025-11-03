"use client";
import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Views } from "../../../public/svg/svg";
import * as guideApi from "@/services/guide/api";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function PopularVote() {
  const router = useRouter();
  const [votes, setVotes] = React.useState<
    Array<{
      id: string;
      title: string;
      category?: string;
      finishedAt?: string;
      totalResponses?: number;
    }>
  >([]);

  React.useEffect(() => {
    const fetchMostPopular = async () => {
      try {
        const data = await guideApi.getMostPopularOpenVote();
        const votesArray = Array.isArray(data) ? data : [data];
        const mapped = votesArray.map((v) => ({
          id: v.id,
          title: v.title,
          category: v.category,
          finishedAt: v.finishedAt,
          totalResponses: v.totalResponses,
        }));
        setVotes(mapped);
      } catch (e) {}
    };
    fetchMostPopular();
  }, []);

  return (
    <>
      {votes.map((v) => (
        <CardContainer key={v.id} onClick={() => router.push(`/vote/${v.id}`)}>
          <Thumbnail>
            <Image
              src={getThumbnailImage(v.category ?? "")}
              alt={v.category ?? ""}
              width={20}
              height={20}
            />
          </Thumbnail>
          <ContentWrapper>
            <Title>{v.title}</Title>
            <MetaInfo>
              <Category>{v.category}</Category>
              <BookmarkInfo>
                <BookmarkIcon>
                  <Views />
                </BookmarkIcon>
                <BookmarkCount>{v.totalResponses ?? 0}</BookmarkCount>
              </BookmarkInfo>
              <DeadLine>
                {(v.finishedAt ?? "").slice(0, 10)}에 마감되는 투표
              </DeadLine>
            </MetaInfo>
          </ContentWrapper>
        </CardContainer>
      ))}
    </>
  );
}

const CardContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 18px 20px;
  background-color: ${color.white};
  border: 1px solid ${color.gray50};
  border-radius: 8px;
  height: 67px;
  width: 100%;
  box-sizing: border-box;
  flex: 0 0 80%;
  cursor: pointer;
`;

const Thumbnail = styled.div`
  font-size: 20px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  min-width: 0;
`;

const Title = styled.p`
  margin: 0;
  color: ${color.black};
  font-family: ${font.D3};
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
  padding: 7px 0;
  color: ${color.gray600};
  font-family: ${font.caption};
`;

const BookmarkInfo = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
`;

const BookmarkIcon = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BookmarkCount = styled.p`
  margin: 0;
  font-size: 10px;
  color: ${color.gray700};
  white-space: pre;
`;

const DeadLine = styled.p`
  margin: 0;
  color: ${color.gray700};
  font-family: ${font.caption};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;
