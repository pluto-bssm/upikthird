"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Revote from "@/components/guide/revote/Revote";
import DetailBox from "@/components/guide/revote/DetailBox";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RevoteSend from "@/components/button/RevoteSend";
import AccentModal from "@/components/modal/AccentModal";
import Completevote from "../../../public/svg/Completevote";
import TwoOptionModal from "@/components/modal/TwoOptionModal";

const revote = () => {
  const router = useRouter();
  const [selectedReasonIndex, setSelectedReasonIndex] = useState<number | null>(
    null,
  );
  const [detailText, setDetailText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);
  return (
    <Root>
      <Header types="title" text="재투표 신청하기" />
      <BackHotspot>
        <BackHitArea onClick={() => setIsBackModalOpen(true)} />
      </BackHotspot>
      <RevoteLayout>
        <Layout>
          <RevoteHeader>
            <SmallHeader>재투표 신청</SmallHeader>
            <Title>가이드 재투표 신청하기</Title>
          </RevoteHeader>

          <Column>
            <SmallTitle>
              재투표 요청 이유 선택 <Star>*</Star>
            </SmallTitle>
            <Revote
              selectedIndex={selectedReasonIndex}
              onSelect={setSelectedReasonIndex}
            />
          </Column>

          <Column>
            <SmallTitle>
              상세 내용 <Star>*</Star>
            </SmallTitle>
            <DetailBox value={detailText} onChange={setDetailText} />
            <InnerText>500자 이내로 입력해주세요</InnerText>
          </Column>
        </Layout>

        <SendBar>
          <RevoteSend
            disabled={
              selectedReasonIndex === null || detailText.trim().length === 0
            }
            onClick={() => setIsModalOpen(true)}
          >
            신청 보내기
          </RevoteSend>
        </SendBar>
      </RevoteLayout>

      {isModalOpen && (
        <AccentModal
          icon={<Completevote width="60px" height="60px" />}
          leftText="요청이"
          accentText="성공적"
          rightText="으로 접수됐어요"
          subText={`지속적으로 정상적인 가이드를 신고하는 경우\n제재의 대상이 될 수 있어요`}
          onClick={() => setIsModalOpen(false)}
        />
      )}

      {isBackModalOpen && (
        <TwoOptionModal
          title={"재투표 요청을 취소하시겠어요??"}
          info={"지금까지 작성한 내용은 저장되지 않습니다."}
          passfunction={() => router.back()}
          isOpen={isBackModalOpen}
          setIsOpen={setIsBackModalOpen}
        />
      )}
    </Root>
  );
};

export default revote;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  min-height: 100vh;
  background-color: ${color.white};
`;

const RevoteLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  min-height: 100vh;
  margin-top: 15%;
  padding-bottom: 0px;
  background-color: ${color.white};
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.74vh;
  width: 90%;
  align-items: start;
`;

const RevoteHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const SmallHeader = styled.div`
  font-family: ${font.H1};
  color: ${color.gray700};
`;

const Title = styled.h1`
  margin: 0;
  color: ${color.black};
  font-family: ${font.D1};
`;

const SmallTitle = styled.div`
  font-family: ${font.D3};
  color: ${color.gray700};
`;

const Star = styled.span`
  color: ${color.accent};
`;

const SendBar = styled.div`
  position: sticky;
  bottom: 0;
  width: 90%;
  margin: 0 auto;
  max-width: 600px;
  padding: 8px 0;
  background-color: ${color.white};
  z-index: 1001;
  margin-top: 40px;
`;

const InnerText = styled.div`
  font-family: ${font.H2};
  color: ${color.gray300};
  text-align: left;
  margin-top: 8px;
`;

const BackHotspot = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  max-width: 100%;
  height: 80px;
  z-index: 2001;
  pointer-events: none;
`;

const BackHitArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 80px;
  pointer-events: auto;
  background: transparent;
`;
