"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Bookmark } from '../../../public/svg/svg';

const mockData = [
  {
    id: 1,
    thumbnail: "🏫",
    title: "뭐가 재밌는지",
    category: "학교생활",
    like: 16,
  },
  {
    id: 2,
    thumbnail: "🏫",
    title: "가이드2",
    category: "학교생활",
    like: 16,
  },
  {
    id: 3,
    thumbnail: "🏫",
    title: "가이드 3",
    category: "학교생활",
    like: 16,
  },
  {
    id: 4,
    thumbnail: "🏫",
    title: "가이드 4",
    category: "학교생활",
    like: 16,
  },
  {
    id: 5,
    thumbnail: "🏫",
    title: "가이드 5",
    category: "학교생활",
    like: 16,
  }
]

interface GuideComponentProps {
  searchQuery?: string;
}

const GuideComponent = ({ searchQuery = "" }: GuideComponentProps) => {
  const router = useRouter();

  const handleGuideClick = (guideId: number) => {
    router.push(`/moreGuide/${guideId}`);
  };

  const filteredGuides = mockData.filter(guide => 
    guide.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <GuideBox>
      <Section>
        <SectionBody gap={"16px"}>
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide, index) => (
              <GuideCard key={index} onClick={() => handleGuideClick(guide.id)}>
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
            ))
          ) : (
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

const NoResultsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${color.gray500};
  font-family: ${font.D3};
  font-size: 16px;
`;
