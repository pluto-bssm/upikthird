"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Nexts from "../../../public/svg/Nexts";
import { useRouter } from "next/navigation";

type GuideCard = {
  id: string;
  title: string;
  meta: string[];
  description: string;
};

interface PopularGuideProps {
  cards: GuideCard[];
}

const PopularGuide = ({ cards }: PopularGuideProps) => {
  const router = useRouter();
  if (!cards || cards.length === 0) {
    return (
      <Section>
        <SectionTitle>인기가이드</SectionTitle>
        <EmptyMessage>아직 가이드가 없습니다.</EmptyMessage>
      </Section>
    );
  }

  return (
    <Section>
      <SectionTitle>인기가이드</SectionTitle>
      <HorizontalScroll>
        {cards.map((guide, index) => (
          <GuideCard key={`guide-${index}`}>
            <GuideBadge>Q.</GuideBadge>
            <GuideTitle>{guide.title}</GuideTitle>
            <GuideMeta>
              {guide.meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </GuideMeta>
            <Divider />
            <GuideDescription>{guide.description}</GuideDescription>
            <GuideLink
              type="button"
              onClick={() => router.push(`/moreGuide/${guide.id}`)}
            >
              자세히 보기 <Nexts width="12" height="12" />
            </GuideLink>
          </GuideCard>
        ))}
      </HorizontalScroll>
    </Section>
  );
};

export default PopularGuide;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.p`
  ${font.H1};
  color: ${color.black};
`;

const HorizontalScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const GuideCard = styled.div`
  flex: 0 0 274px;
  background-color: ${color.white};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
`;

const GuideBadge = styled.p`
  ${font.H1};
  color: ${color.primary};
`;

const GuideTitle = styled.p`
  ${font.H1};
  color: ${color.black};
`;

const GuideMeta = styled.div`
  display: flex;
  gap: 12px;
  color: ${color.gray300};
  ${font.P3};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.gray300};
`;

const GuideDescription = styled.p`
  ${font.P2};
  color: ${color.gray600};
  line-height:20px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GuideLink = styled.button`
  color: ${color.gray300};
  ${font.P4};
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-underline-color: ${color.gray300};
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
`;

const EmptyMessage = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${color.gray300};
  ${font.P2};
`;
