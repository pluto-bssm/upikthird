"use client";

import React from "react";
import { useParams } from "next/navigation";
import styled from "@emotion/styled";
import Header from "@/components/common/header";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import VoteBarChart from "@/components/guide/VoteBarChart";

const mockData = [
  {
    id: 1,
    title: "뭐가 재밌는지",
    date: "2025-01-01",
    category : "학교생활",
    content : "그런데, 지금 그 이야기까지 바로 난 날짱에 있는 것입니다. 그리고, 우리 둘 이는 아무 말 없이 내려앉고 있었습니다.",
  },
  {
    id: 2,
    title: "가이드 2",
    date: "2025-01-02",
    category : "학교생활",
    content : "두 번째 가이드의 내용입니다. 이 가이드는 다른 주제에 대해 다룹니다.",
  },
  {
    id: 3,
    title: "가이드 3",
    date: "2025-01-03",
    category : "학교생활",
    content : "세 번째 가이드의 내용입니다. 이 가이드는 또 다른 주제에 대해 다룹니다.",
  },
  {
    id: 4,
    title: "가이드 4",
    date: "2025-01-04",
    category : "학교생활",
    content : "네 번째 가이드의 내용입니다. 이 가이드는 또 다른 주제에 대해 다룹니다.",
  },
  {
    id: 5,
    title: "가이드 5",
    date: "2025-01-05",
    category : "학교생활",
    content : "다섯 번째 가이드의 내용입니다. 이 가이드는 또 다른 주제에 대해 다룹니다.",
  },
];

const MoreGuidePage = () => {
  const params = useParams();
  const guideId = parseInt(params.id as string);
  
  const guideData = mockData.find(item => item.id === guideId);
  
  const currentGuide = guideData || mockData[0];

  return (
    <Root>
      <Header types="bookmark" />

      <Content>
        <Thumbnail>🏫</Thumbnail>
        <GuideTitle>
          {currentGuide.title}
        </GuideTitle>
        <Date>{currentGuide.date}</Date>

        <CardWrap>
          <ResultButton>투표 결과 확인하기</ResultButton>
          <VoteBarChart/>
        </CardWrap>

        <ContentText>
          {currentGuide.content}
        </ContentText>
        <Line />
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