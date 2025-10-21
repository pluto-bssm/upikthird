"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/packages/ui/src/button/Button";
import GuideBlock from "@/components/votemake/guideblock";
import {Plus} from "../../../../../public/svg/svg";

const BallotData = [
    {  category : "학교생활", title : "가이드 제목", viewCount : 16},
    {  category : "학교생활", title : "가이드 제목", viewCount : 16},
    {  category : "학교생활", title : "가이드 제목", viewCount : 16},
    {  category : "학교생활", title : "가이드 제목", viewCount : 16}
];

const LikeGuide = () => {
  const router = useRouter();
  const path = usePathname();

  return (
    <LikeGuideLayout>
      <Header types="close" />

      <LikeGuideSection>
        <LikeGuideInfoArea>
          <LikeGuideMainText>유사한 내용의 가이드가 있어요!</LikeGuideMainText>
          <LikeGuideTitle>
            아래의 가이드에 원하는 내용이 있다면, 상단의 엑스 버튼을 선택해주세요!
          </LikeGuideTitle>
          <LikeGuideSubText>
            가이드 제목을 클릭하면 내용 전부를 확인할 수 있어요.
          </LikeGuideSubText>
        </LikeGuideInfoArea>

        <LikeGuideListArea>
          {BallotData.map((ballot, index) => (
            <GuideBlock
              key={index}
              title={ballot.title}
              category={ballot.category}
              viewCount={ballot.viewCount}
            />
          ))}
        </LikeGuideListArea>

        <Button
          icon = {<Plus width={20} height={20}/>}
          text="계속 진행하기"
          onCkick={() => router.push(`${path}/tailvote`)}
        />
      </LikeGuideSection>
    </LikeGuideLayout>
  );
};

export default LikeGuide;


const LikeGuideLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: ${color.white};
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  margin-top : -50px;
`;

const LikeGuideSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 100px;
`;

const LikeGuideInfoArea = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const LikeGuideMainText = styled.p`
  ${font.H1};
  color: ${color.primary};
`;

const LikeGuideTitle = styled.p`
  ${font.D1};
  color: ${color.black};
`;

const LikeGuideSubText = styled.p`
  ${font.H2};
  color: ${color.gray400};
`;

const LikeGuideListArea = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
`;
