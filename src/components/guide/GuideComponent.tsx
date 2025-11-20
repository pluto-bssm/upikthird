"use client";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Bookmark } from "../../../public/svg/svg";
import Image from "next/image";
import type { Guide } from "@/types/api";

const getThumbnailImage = (category: string) => {
  switch (category) {
    case "학교생활":
      return "/svg/images/School.png";
    case "유머":
      return "/svg/images/Humors.png";
    case "기숙사":
      return "/svg/images/MakeSchool.png";
  }
};

type GuideComponentProps = {
  guides: Guide[];
  onClick?: (guideId: string) => void;
};

const GuideComponent = ({ guides, onClick }: GuideComponentProps) => {
  const router = useRouter();

  const handleGuideClick = (guideId: string) => {
    if (onClick) {
      onClick(guideId);
    } else {
      router.push(`/moreGuide/${guideId}`);
    }
  };

  return (
    <GuideBox>
      <Section>
        <SectionBody gap={"16px"}>
          {guides.length === 0 ? (
            <NoResultsMessage>진행중인 가이드가 없습니다.</NoResultsMessage>
          ) : (
            guides.map((guide) => (
              <GuideCard
                key={guide.id}
                onClick={() => handleGuideClick(guide.id)}
              >
                <Thumnail>
                  <Image
                    src={getThumbnailImage(guide.category ?? "전체") ?? ""}
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
                    <MarkCount>
                      {guide.like ?? guide.likeCount ?? 0}
                    </MarkCount>
                    <BookmarkIcon />
                  </OtherInfo>
                </GuideText>
              </GuideCard>
            ))
          )}
        </SectionBody>
      </Section>
    </GuideBox>
  );
};

export default GuideComponent;

const GuideBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionBody = styled.div<{ gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};
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
  font-family: ${font.P2};
`;

const BookmarkIcon = styled.span`
  background-color: ${color.gray500};
  display: inline-block;
  margin-left: 8px;
`;

const MarkCount = styled.div`
  color: ${color.gray600};
  font-family: ${font.P2};
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
