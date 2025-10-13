"use client";
import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Bookmark } from '../../../public/svg/svg';

const mockData = [
  {
    id: 1,
    thumbnail: "🏫",
    title: "가이드 1",
    category: "학교생활",
    like: 16,
  },
  {
    id: 2,
    thumbnail: "🏫",
    title: "가이드 1",
    category: "학교생활",
    like: 16,
  },
  {
    id: 3,
    thumbnail: "🏫",
    title: "가이드 1",
    category: "학교생활",
    like: 16,
  },
  {
    id: 4,
    thumbnail: "🏫",
    title: "가이드 1",
    category: "학교생활",
    like: 16,
  },
  {
    id: 5,
    thumbnail: "🏫",
    title: "가이드 1",
    category: "학교생활",
    like: 16,
  }
]

const GuideComponent = () => {
  return (
    <GuideBox>
      <Section>
        <SectionBody gap={"16px"}>
          {mockData.map((guide, index) => (
            <GuideCard key={index}>
              <Thumnail>{guide.thumbnail}</Thumnail>
              <GuideText>
                <GuideTitle>{guide.title}</GuideTitle>
                <OtherInfo>
                  <GuideTag>{guide.category}</GuideTag>
                  <Bookmark width="12px" height="12px" />
                  <MarkCount>{guide.like || 0}</MarkCount>
                  <BookmarkIcon />
                </OtherInfo>
              </GuideText>
            </GuideCard>
          ))}
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
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:-12px;
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
