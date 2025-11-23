"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useRouter } from "next/navigation";
import { FAST_ROAD_CARDS } from "./fastRoadData";

const FastRoad = () => {
  const router = useRouter();

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <Section>
      <SectionTitle>빠른이동</SectionTitle>
      <QuickScroll>
        {FAST_ROAD_CARDS.map((card) => (
          <QuickCard
            key={card.title.join("-")}
            type="button"
            onClick={() => handleNavigate(card.href)}
          >
            <QuickAccent />
            <QuickContent>
              <QuickText>
                {card.title.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </QuickText>
              <QuickDescription>
                {card.description.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </QuickDescription>
            </QuickContent>
            <IconWrapper>
              <card.Icon width="54" height="54" />
            </IconWrapper>
          </QuickCard>
        ))}
      </QuickScroll>
    </Section>
  );
};

export default FastRoad;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.p`
  ${font.H1};
  color: ${color.black};
`;

const QuickScroll = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-snap-type: x proximity;
`;

const QuickCard = styled.button`
  position: relative;
  flex: 0 0 167px;
  height: 206px;
  background-color: ${color.white};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  scroll-snap-align: start;

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
  }
`;

const QuickAccent = styled.div`
  width: 100%;
  height: 74px;
  background-color: rgba(255, 139, 55, 0.18);
`;

const QuickContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px 16px 24px;
  align-items: flex-start;
`;

const QuickText = styled.div`
  ${font.H1};
  color: ${color.black};
  line-height: 1.3;

  p {
    margin: 0;
  }
`;

const QuickDescription = styled.div`
  ${font.P2};
  color: ${color.gray400};
  line-height: 1.4;

  p {
    margin: 0;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 44px;
  right: 16px;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
