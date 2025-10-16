import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Views } from "../../../public/svg/svg";

const mockData = [
  {
    id: 1,
    emoji: "🏫",
    title: "투표1",
    category: "학교생활",
    date: "2025-01-01",
    views: 120,
  },
  {
    id: 2,
    emoji: "🏫",
    title: "투표2",
    category: "학교생활",
    date: "2025-01-02",
    views: 280,
  },
  {
    id: 3,
    emoji: "🏫",
    title: "투표3",
    category: "학교생활",
    date: "2025-01-03",
    views: 210,
  },
];

export default function PopularVote() {
  const topByViews = [...mockData]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  return (
    <>
      {topByViews.map((vote) => (
        <CardContainer key={vote.id}>
          <EmojiIcon>{vote.emoji}</EmojiIcon>
          <ContentWrapper>
            <Title>{vote.title}</Title>
            <MetaInfo>
              <Category>{vote.category}</Category>
              <BookmarkInfo>
                <BookmarkIcon>
                  <Views />
                </BookmarkIcon>
                <BookmarkCount>{vote.views}</BookmarkCount>
              </BookmarkInfo>
              <DeadLine>{vote.date}에 마감되는 투표</DeadLine>
            </MetaInfo>
          </ContentWrapper>
        </CardContainer>
      ))}
    </>
  );
}

const CardContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 18px 20px;
  background-color: ${color.white};
  border: 1px solid ${color.gray50};
  border-radius: 8px;
  height: 67px;
  width: 100%;
  box-sizing: border-box;
  flex: 0 0 80%;
`;

const EmojiIcon = styled.div`
  font-size: 20px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  min-width: 0;
`;

const Title = styled.p`
  margin: 0;
  color: ${color.black};
  font-family: ${font.D3};
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
  padding: 7px 0;
  color: ${color.gray600};
  font-family: ${font.caption};
`;

const BookmarkInfo = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
`;

const BookmarkIcon = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BookmarkCount = styled.p`
  margin: 0;
  font-size: 10px;
  color: ${color.gray700};
  white-space: pre;
`;

const DeadLine = styled.p`
  margin: 0;
  color: ${color.gray700};
  font-family: ${font.caption};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;
