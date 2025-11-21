"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import PopularGuide from "@/components/main/PopularGuide";
import FastRoad from "@/components/main/FastRoad";
import Vs from "@/../public/svg/Vs";
import Image from "next/image";

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

const mockData = [
  {
    vote_option:[
      "재현쌤과 축구 5시간","규봉쌤과 수학 5시간 풀고 피자먹" 
    ]
  },
];
export default function MainPage() {
  return (
    <GuideLayout>
      <Header types={"default and no navi"}/>

        <MainSection>
          <HeroCard>
            <HeroBackgroundImage
              src="/svg/images/Main.png"
              alt="Main background"
              fill
              priority
              sizes="100vw"
            />
            <HeroGradient />
            <HeroTitle>오늘의 투표</HeroTitle>
            <HeroHighlight>
              <HeroLeftText>{mockData[0].vote_option[0]}</HeroLeftText>
              <VsWrapper>
                <Vs />
              </VsWrapper>
              <HeroRightText>
                <p>{mockData[0].vote_option[1]}</p>
              </HeroRightText>
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
  gap: 20px;
  padding-top: 100px;
  margin-bottom: 80px;
`;

const HeroCard = styled.div`
  position: relative;
  min-height: 192px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${color.white};
`;

const HeroBackgroundImage = styled(Image)`
  object-fit: cover;
  object-position: center;
  z-index: 0;
`;

const HeroGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
      180deg,
      rgba(75, 32, 0, 0) 2.523%,
      rgba(114, 51, 6, 0.2) 32.047%
    );
  z-index: 0;
`;

const HeroTitle = styled.p`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: ${color.white};
  ${font.H2};
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.2px;
  white-space: nowrap;
  z-index: 1;
  margin: 0;
`;

const HeroHighlight = styled.div`
  position: absolute;
  top: 49px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 310px;
  min-height: 94px;
  border-radius: 12px;
  border :none;
  background: linear-gradient(
      -75deg,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 139, 55, 0.08) 99.334%
    ),
    linear-gradient(
      255deg,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 139, 55, 0.08) 99.182%
    ),
    linear-gradient(
      75deg,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 139, 55, 0.08) 99.334%
    ),
    linear-gradient(
      104.656deg,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 139, 55, 0.08) 99.272%
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.18) 100%
    );
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  padding: 18px 0;
  overflow: visible;
  gap: 10px;
  z-index: 1;
`;

const HeroLeftText = styled.p`
  ${font.H4};
  font-weight: 600;
  font-size: 14px;
  line-height: normal;
  color: ${color.white};
  margin: 0;
  padding-left: 10px;
  flex: 1;
  min-width: 0;
  text-align: left;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const VsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 27px;
  margin: 0;
  align-self: center;
`;

const HeroRightText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  min-width: 0;
  
  p {
    margin: 0;
    ${font.H4};
    font-weight: 600;
    font-size: 14px;
    line-height: normal;
    color: ${color.white};
    text-align: left;
    padding-right: 10px;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;


const HeroButton = styled.button`
  position: absolute;
  top: calc(49px + 94px + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  border-radius: 12px;
  border: 1px solid rgba(240, 240, 240, 0.47);
  background: rgba(255, 255, 255, 0.18);
  color: ${color.white};
  ${font.Btn3};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.006px;
  backdrop-filter: blur(5px);
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
  margin: 0;
`;

