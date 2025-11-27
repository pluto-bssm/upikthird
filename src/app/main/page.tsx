"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import PopularGuide from "@/components/main/PopularGuide";
import FastRoad from "@/components/main/FastRoad";
import { Vs, Main, UpMark, DownMark } from "../../../public/svg";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGuides } from "@/hooks/useGuides";
import { useVote } from "@/hooks/useVotes";

export default function MainPage() {
  const router = useRouter();
  const { guides } = useGuides();
  const [isSchoolInfoExpanded, setIsSchoolInfoExpanded] = useState(true);
  
  const todayVoteId = process.env.NEXT_PUBLIC_TODAY_VOTE_ID || "239840kdsjkfda";
  const { vote: todayVote } = useVote(todayVoteId);

  const popularGuides = useMemo(() => {
    if (!guides?.length) return [];

    return [...guides]
      .sort(
        (a, b) => (b.like ?? b.likeCount ?? 0) - (a.like ?? a.likeCount ?? 0),
      )
      .slice(0, 3)
      .map((guide) => {
        const date = new Date(guide.createdAt);
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return {
          id: guide.id,
          title: guide.title,
          meta: [guide.category || "", `제작 ${year}.${month}.${day}.`],
          description: guide.content || "",
        };
      });
  }, [guides]);

  const voteOptions = todayVote?.options?.slice(0, 2) || [];

  return (
    <MainLayout>
      <Header types={"default and no navi"} />

      <MainSection>
        <SchoolInfoSection>
          <SchoolHeader>
            <SchoolTitleWrapper onClick={() => setIsSchoolInfoExpanded(!isSchoolInfoExpanded)}>
              <SchoolTitle>부산소프트웨어마이스터고</SchoolTitle>
              <SchoolToggle>
                {isSchoolInfoExpanded ? (
                  <UpMark width={24} height={24} />
                ) : (
                  <DownMark width={24} height={24} />
                )}
              </SchoolToggle>
            </SchoolTitleWrapper>
            <SchoolChangeButton onClick={() => router.push('/schoolSelect')}>학교 이동하기</SchoolChangeButton>
          </SchoolHeader>
          {isSchoolInfoExpanded && (
            <SchoolDetails>
              <SchoolDetailItem>개교년도 · 1970년 03월 26일</SchoolDetailItem>
              <SchoolDetailItem>위치 · 부산광역시 강서구 가락대로 1393</SchoolDetailItem>
            </SchoolDetails>
          )}
        </SchoolInfoSection>
        <HeroCard>
          <Main preserveAspectRatio="xMidYMid slice" />
          <HeroTitle>{todayVote?.title || "오늘의 투표"}</HeroTitle>
          <HeroHighlight>
            <HeroLeftText>{voteOptions[0]?.content || ""}</HeroLeftText>
            <VsWrapper>
              <Vs />
            </VsWrapper>
            <HeroRightText>
              <p>{todayVote ? voteOptions[1]?.content : ""}</p>
            </HeroRightText>
          </HeroHighlight>
          <HeroButton
            onClick={() => todayVote && router.push(`/vote/${todayVote.id}`)}
          >
            1분 만에 투표하기
          </HeroButton>
        </HeroCard>

        <PopularGuide cards={popularGuides} />

        <FastRoad />
      </MainSection>

      <NavigationBar />
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: #f3f4f6;
  min-height: 100vh;
`;

const MainSection = styled.section`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 80px;
  margin-bottom: 80px;
`;

const SchoolInfoSection = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SchoolHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SchoolTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const SchoolTitle = styled.h2`
  ${font.H4};
  color: ${color.black};
  margin: 0;
`;

const SchoolToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SchoolDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SchoolDetailItem = styled.p`
  ${font.P3};
  color: ${color.gray600};
  margin: 0;
`;

const SchoolChangeButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  color: ${color.gray300};
  ${font.Btn3};
  cursor: pointer;
`;

const HeroCard = styled.div`
  position: relative;
  height: 192px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;

  svg {
    display: block;
    width: 100%;
    height: 192px;
  }
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
  border: 1px solid rgba(249, 249, 249, 0.45);
  background:
    linear-gradient(
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
  padding: 0 10px;
  flex: 1;
  min-width: 0;
  text-align: center;
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
  justify-content: center;
  flex: 1;
  min-width: 0;

  p {
    margin: 0;
    ${font.H4};
    font-weight: 600;
    font-size: 14px;
    line-height: normal;
    color: ${color.white};
    text-align: center;
    padding: 0 10px;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

const HeroButton = styled.button`
  position: absolute;
  top: 132px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(240, 240, 240, 0.47);
  background: rgba(255, 255, 255, 0.18);
  color: ${color.white};
  ${font.Btn3};
  font-weight: 700;
  font-size: 12px;
  backdrop-filter: blur(5px);
  cursor: pointer;
  z-index: 1;
  white-space: nowrap;
`;