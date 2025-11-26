"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useSavedGuides } from "@/hooks/useSaved";
import {
  Bookmark,
  School,
  Domitorys,
  Humors,
} from "../../../../../public/svg/svg";

const GuideBlockImage = ({ category }: { category: string }) => {
  switch (category) {
    case "학교생활":
      return <School width="100%" height="100%" />;
    case "기숙사":
      return <Domitorys width="100%" height="100%" />;
    case "유머":
      return <Humors width="100%" height="100%" />;
    default:
      return <School width="100%" height="100%" />;
  }
};

const SavedGuidePage = () => {
  const router = useRouter();
  const { guides: boardGuides, loading, error } = useSavedGuides(0, 20);

  const handleGuideClick = (guideId: string) => {
    router.push(`/moreGuide/${guideId}`);
  };

  const handleClose = () => {
    router.push("/my");
  };

  return (
    <StyledSavedGuidePage>
      <Header types="close" text="저장한가이드" onClose={handleClose} />
      <SavedGuidePageContent>
        {!loading && error && (
          <NoResultsMessage>가이드를 불러올 수 없습니다.</NoResultsMessage>
        )}
        {!loading && !error && boardGuides && boardGuides.length > 0
          ? boardGuides.map((guide, index) => (
              <GuideCard key={index} onClick={() => handleGuideClick(guide.id)}>
                <GuideBlockImage category={guide.category ?? "전체"} />
                <GuideText>
                  <GuideTitle>{guide.title}</GuideTitle>
                  <OtherInfo>
                    <GuideInfoUpperBox>
                      <GuideTag>{guide.category}</GuideTag>
                      <GuideMarkBox>
                        <Bookmark width="12px" height="12px" />
                        <MarkCount>{guide.like ?? 0}</MarkCount>
                      </GuideMarkBox>
                    </GuideInfoUpperBox>
                  </OtherInfo>
                </GuideText>
              </GuideCard>
            ))
          : null}
        {!loading && !error && (!boardGuides || boardGuides.length === 0) && (
          <NoResultsMessage>저장한 가이드가 없어요</NoResultsMessage>
        )}
      </SavedGuidePageContent>
    </StyledSavedGuidePage>
  );
};

export default SavedGuidePage;

const StyledSavedGuidePage = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  margin: 0 auto;
  background-color: ${color.white};
  padding-top: 80px;
  min-height: 100vh;
`;

const SavedGuidePageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0;
`;

const GuideCard = styled.div`
  width: 100%;
  border: 1px solid ${color.gray50};
  border-radius: 12px;
  height: 12vh;
  display: flex;
  align-items: center;
  gap: 4%;
  padding: 0px 10px 0px 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const GuideText = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

const GuideTitle = styled.p`
  ${font.H1};
  color: ${color.black};
`;

const OtherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 95%;
`;

const GuideInfoUpperBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const GuideMarkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GuideTag = styled.p`
  ${font.P2};
  color: ${color.gray600};
`;

const MarkCount = styled.p`
  ${font.P2};
  color: ${color.gray600};
`;

const NoResultsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${color.gray500};
  font-family: ${font.D3};
  font-size: 16px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  color: ${color.gray600};
  font-family: ${font.P2};
`;
