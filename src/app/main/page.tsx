"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Vs } from "../../../public/svg/svg";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import PopularGuide from "@/components/main/PopularGuide";
import FastRoad from "@/components/main/FastRoad";

const HERO_IMAGE =
  "http://localhost:3845/assets/3bcb6fc900332f7e94566aa6980f13e122a0d616.png";

const guideCards = [
  {
    title: "딴은 밤을 세워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다.",
    meta: ["기숙사", "저장 16", "제작 25.10.12."],
    description:
      "어머님, 그리고 당신은 멀리 북간도에 계십니다. 그러나, 겨울이 지나고 나의 별에도 봄이 오면, 무덤 위에 파란 잔디가 피어나듯이 내 이름자 묻힌 언덕 위에도 자랑처럼 풀이 무성할 거외다.",
  },
  {
    title: "딴은 밤을 세워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다.",
    meta: ["기숙사", "저장 16", "제작 25.10.12."],
    description:
      "어머님, 그리고 당신은 멀리 북간도에 계십니다. 그러나, 겨울이 지나고 나의 별에도 봄이 오면, 무덤 위에 파란 잔디가 피어나듯이 내 이름자 묻힌 언덕 위에도 자랑처럼 풀이 무성할 거외다.",
  },
];

export default function MainPage() {
  return (
    <GuideLayout>
      <Header types={"default and no navi"}/>

        <MainSection>
          <HeroCard>
            <HeroBackground>
              <HeroBackgroundImage src={HERO_IMAGE} alt="school" />
              <HeroGradient />
            </HeroBackground>
            <HeroTitle>오늘의 투표</HeroTitle>
            <HeroHighlight>
              <HeroTextBlock>
                <HeroPrimaryText>재현쌤과 축구 5시간</HeroPrimaryText>
                <HeroSecondaryText>
                  규봉쌤과 수학 5시간규봉쌤과 수학 5시간규봉쌤과 수학 5시간
                </HeroSecondaryText>
              </HeroTextBlock>
                <Vs width="27" height="26" />
            </HeroHighlight>
            <HeroButton>1분 만에 투표하기</HeroButton>
          </HeroCard>

          <PopularGuide cards={guideCards} />

          <FastRoad />
        </MainSection>

        <NavigationBar />
    </GuideLayout>
  );
}

const GuideLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: #F3F4F6;
  min-height: 100vh;
`;

const MainSection = styled.section`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 100px;
  margin-bottom: 80px;
`;

const HeroCard = styled.div`
  position: relative;
  height: 192px;
  border-radius: 12px;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
`;

const HeroBackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 227%;
  height: 118%;
  left: -33%;
  top: -25%;
  object-fit: cover;
`;

const HeroGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 20%,
      rgba(114, 51, 6, 0.57) 100%
    ),
    linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.18)
    );
`;

const HeroTitle = styled.p`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: ${color.white};
  ${font.H1};
  letter-spacing: -0.2px;
`;

const HeroHighlight = styled.div`
  position: absolute;
  inset: 49px 29px auto 29px;
  min-height: 94px;
  border-radius: 12px;
  border: 1px solid rgba(249, 249, 249, 0.45);
  background: linear-gradient(
      -75deg,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 139, 55, 0.2) 100%
    ),
    linear-gradient(
      255deg,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 139, 55, 0.2) 100%
    ),
    linear-gradient(
      75deg,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 139, 55, 0.2) 100%
    ),
    linear-gradient(
      104deg,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 139, 55, 0.2) 100%
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.18) 100%
    );
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  padding: 18px 20px;
  gap: 20px;
`;

const HeroTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const HeroPrimaryText = styled.p`
  ${font.H4};
  color: ${color.white};
`;

const HeroSecondaryText = styled.p`
  ${font.P2};
  color: ${color.white};
  opacity: 0.9;
`;


const HeroButton = styled.button`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid rgba(240, 240, 240, 0.47);
  background: rgba(255, 255, 255, 0.18);
  color: ${color.white};
  ${font.Btn3};
  letter-spacing: 0.006em;
  backdrop-filter: blur(5px);
`;

