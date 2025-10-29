"use client";

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import GuideCategoryImage from "@/components/votemake/GuideCategoryImage";
import CategoryChoseBox from "@/components/votemake/CategoryChoseBox";
import { useState } from "react";
import { useVoteStore } from "@/store/useMakeVoteStore";
import Button from "@/packages/ui/src/button/Button";
import { Plus } from "../../../public/svg/svg";
import CategoryBottomSheet from "@/components/votemake/CategoryBottomSheet";
import TwoOptionModal from "@/components/modal/TwoOptionModal";
import { useRouter, usePathname } from "next/navigation";


const MakeVote = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen_1, setIsOepn_1] = useState(false);
  const { category, setCategory, resetVoteData } = useVoteStore();
  const router = useRouter();
  const path = usePathname();


  function CanCelMakeVote() {
    resetVoteData();
    router.back();
  }

  return (
    <MakeVoteLayout>
      <Header types="close" onSubmit={() => setIsOepn_1(true)} />

      <MakeVoteSection>
        <MakeVoteInfomation>
          <GuideCategoryImage category={category} />

          <MakeVoteInfo>
            <Category>카테고리 선택</Category>
            <Title>투표제작하기</Title>
            <SubTitle>만들고 싶은 투표의 카테고리를 선택해주세요</SubTitle>
          </MakeVoteInfo>
        </MakeVoteInfomation>

        <MakeVoteActiveSection>
          <CategoryChoseBox
            category={category}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />

          <CategoryBottomSheet
            setGuideCategory={setCategory}
            category={category}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />

          <Button
            onCkick={() => router.push(`${path}/detail`)}
            text="투표 제작하기"
            icon={<Plus width="100%" height="100%" />}
          />
        </MakeVoteActiveSection>
      </MakeVoteSection>

      {isOpen_1 && (
        <TwoOptionModal
          title="투표 제작을 그만 두시겠습니까?"
          info="지금까지 작성한 내용은 저장되지 않습니다."
          isOpen={isOpen_1}
          setIsOpen={setIsOepn_1}
          passfunction={CanCelMakeVote}
        />
      )}
    </MakeVoteLayout>
  );
};

export default MakeVote;

const MakeVoteLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: ${color.white};
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`;

const MakeVoteActiveSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-direction: column;
`;

const MakeVoteInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: column;
`;
const MakeVoteSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  flex-direction: column;
`;
const MakeVoteInfomation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  flex-direction: column;
`;

const Title = styled.p`
  color: ${color.black};
  ${font.D1};
`;

const Category = styled.div`
  color: ${color.primary};
  ${font.D3};
`;

const SubTitle = styled.div`
  color: ${color.gray400};
  ${font.H3};
`;
