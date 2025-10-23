"use client";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import Header from "@/components/common/header";

const SavedGuidePage = () => {
  return (
  <StyledSavedPostPage>
      <Header types="close" text="좋아요한 질문" />

    </StyledSavedPostPage>);
}

export default SavedGuidePage;
const StyledSavedPostPage = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 80px;
`;