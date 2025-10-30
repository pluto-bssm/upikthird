"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Header from "@/components/common/header";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import VoteBarChart from "@/components/guide/VoteBarChart";
import { upik } from "@/apis";
import { GUIDE_BY_ID } from "@/graphql/queries";
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

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

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

  React.useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await upik.post("", {
          query: GUIDE_BY_ID,
          variables: { id: guideId },
        } as GraphQLRequest);
        const data = response?.data?.data?.guideById;
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
      } catch (e) {}
    };
    if (guideId) fetchGuide();
  }, [guideId]);

  return (
    <Root>
      <Header types="bookmark" />

      <Content>
        <Thumbnail>
          <Image src={getThumbnailImage(guide?.category ?? "")} alt={guide?.category ?? ""} width={24} height={24} />
        </Thumbnail>
        <GuideTitle>{guide?.title ?? "가이드를 불러오는 중"}</GuideTitle>
        <Date>{(guide?.createdAt ?? "").slice(0, 10)}</Date>

        <CardWrap>
          <ResultButton>투표 결과 확인하기</ResultButton>
          {guide?.voteId ? <VoteBarChart voteId={guide.voteId} /> : null}
        </CardWrap>

        <ContentText>{guide?.content}</ContentText>
        <Line />
        <ReportTextButton onClick={() => router.push(`/revote?guideId=${guideId}`)}>가이드에 문제가 있다면?</ReportTextButton>
      </Content>
    </Root>
  );
};

export default MoreGuidePage;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  min-height: 100vh;
  background-color: ${color.white};
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 90%;
  margin-top: 96px;
`;

const Thumbnail = styled.div`
  font-size: 20px;
`;

const GuideTitle = styled.h1`
  margin: 0;
  color: ${color.black};
  font-family: ${font.D1};
  line-height: 28px;
`;

const Date = styled.div`
  color: ${color.gray500};
  font-family: ${font.caption};
`;

const CardWrap = styled.div`
  position: relative;
  width: 100%;
`;

const ResultButton = styled.button`
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
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

const ContentText = styled.p`
  margin: 0;
  color: ${color.black};
  font-family: ${font.content};
  line-height: 20px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.gray300};
`;

const ReportTextButton = styled.button`
  border: none;
  background: none;
  color: ${color.gray500};
  font-family: ${font.caption};
  cursor: pointer;
  text-align: right;
  margin-top: 16px;
  margin-bottom: 16px;
`;