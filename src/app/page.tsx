'use client'

import styled from "@emotion/styled";
import AccentModal from "@/components/modal/AccentModal";
import {Bad} from "../../public/svg/svg";
export default function HomePage() {

    return (
      <MainLayout>
        <AccentModal icon={ <Bad width="60px" height="60px"/>} leftText="투표 제작을" accentText="완료" rightText="했어요!" subText="투표 제작 이후 투표 내용은 변경될 수 없어요." />
      </MainLayout>
    );
}

const MainLayout = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
`