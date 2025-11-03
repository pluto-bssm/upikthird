"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useSavedGuides } from "@/hooks/useSaved";
import { Bookmark } from "../../../../../public/svg/svg";
import Image from "next/image";

const getThumbnailImage = (category: string) => {
  switch (category) {
    case "학교생활":
      return "/svg/images/School.png";
    case "유머":
      return "/svg/images/Humors.png";
    case "기숙사":
      return "/svg/images/MakeSchool.png";
    default:
      return "/svg/images/School.png";
  }
};

const SavedGuidePage = () => {
  const router = useRouter();
  const { guides: boardGuides, loading, error } = useSavedGuides(0, 20);

  const handleGuideClick = (guideId: string) => {
    router.push(`/moreGuide/${guideId}`);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <StyledSavedGuidePage>
      <Header types="close" text="저장한 가이드" onClose={handleClose} />
      <SavedGuidePageContent>
        {loading && <LoadingMessage>불러오는 중...</LoadingMessage>}
        {!loading && error && (
          <NoResultsMessage>가이드를 불러올 수 없습니다.</NoResultsMessage>
        )}
        {!loading && !error && boardGuides && boardGuides.length > 0 ? (
          boardGuides.map((guide, index) => (
            <GuideCard key={index} onClick={() => handleGuideClick(guide.id)}>
              <Thumnail>
                <Image
                  src={getThumbnailImage(guide.category ?? "전체")}
                  alt={guide.category ?? "전체"}
                  width={20}
                  height={20}
                />
              </Thumnail>
              <GuideText>
                <GuideTitle>{guide.title}</GuideTitle>
                <OtherInfo>
                  <GuideTag>{guide.category}</GuideTag>
                  <Bookmark width="12px" height="12px" />
                  <MarkCount>{guide.like ?? 0}</MarkCount>
                </OtherInfo>
              </GuideText>
            </GuideCard>
          ))
        ) : null}
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
  margin: 0 auto;
  padding-top: 80px;
`;

const SavedGuidePageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0;
`;

const GuideCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  height: 69px;
  border: 1px solid ${color.gray50};
  border-radius: 8px;
  background: ${color.white};
  padding: 0 16px;
  box-shadow:
    -4px -4px 10px 0 rgba(0, 0, 0, 0.03),
    4px 4px 10px 0 rgba(0, 0, 0, 0.03);
  cursor: pointer;
`;

const Thumnail = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -12px;
  margin-left: 12px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const GuideText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-left: 16px;
`;

const GuideTitle = styled.div`
  color: ${color.black};
  font-family: ${font.D3};
`;

const OtherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const GuideTag = styled.div`
  color: ${color.gray600};
  font-family: ${font.caption};
`;

const MarkCount = styled.div`
  color: ${color.gray600};
  font-family: ${font.caption};
  margin-left: -4px;
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
  font-family: ${font.caption};
`;
