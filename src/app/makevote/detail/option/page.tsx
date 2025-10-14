'use client'

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import {Nexts} from "../../../../../public/svg/svg";

const Options = () => {
  const router = useRouter();

  return (
    <OptionsLayout>
      <Header
        types="title"
        text="투표 설정하기"
        onSubmit={() => {
          router.back();
        }}
      />

      <OptionSection>
        <OptionCard onClick={() => console.log("AI 추천 기능 클릭!")}>
          <OptionCardContent>
            <OptionTitleRow>
              <OptionTitleText>투표 종료 조건</OptionTitleText>
            </OptionTitleRow>
            <OptionActionRow>
              <OptionSubtitleText>투표 종료 조건 설정하기</OptionSubtitleText>
              <Nexts  width={20} height={20} />
            </OptionActionRow>
          </OptionCardContent>
        </OptionCard>

        <OptionCard onClick={() => console.log("공개 범위 설정 클릭!")}>
          <OptionCardContent>
            <OptionTitleRow>
              <OptionTitleText>선지 작성하기</OptionTitleText>
            </OptionTitleRow>
            <OptionActionRow>
              <OptionSubtitleText>AI 자동 선지 추천 기능 사용하기</OptionSubtitleText>
              <Nexts  width={20} height={20} />
            </OptionActionRow>
          </OptionCardContent>
        </OptionCard>
      </OptionSection>
    </OptionsLayout>
  );
};

export default Options;


const OptionsLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: start;
  background-color: ${color.white};
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`;

const OptionSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top : 100px;
`;

const OptionCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${color.gray100};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${color.gray50};
  }
`;

const OptionCardContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const OptionTitleRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const OptionActionRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OptionTitleText = styled.p`
  color: ${color.gray400};
  ${font.caption};
`;

const OptionSubtitleText = styled.p`
  color: ${color.black};
  ${font.D3};
`;
