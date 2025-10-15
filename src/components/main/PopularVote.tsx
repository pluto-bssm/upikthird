import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Profile } from '../../../../public/svg/svg';

const mockData = [
  {
    id: 1,
    emoji: "🏫",
    title: "투표1",
    category: "학교생활",
    date: "2025-01-01",
    like: 16,
  },
  {
    id: 2,
    emoji: "🏫",
    title: "투표2",
    category: "학교생활",
    date: "2025-01-02",
    like: 16,
  },
  {
    id: 3,
    emoji: "🏫",
    title: "투표3",
    category: "학교생활",
    date: "2025-01-03",
    like: 16,
  },
];

export default function PopularVote() {
  return (
    <CardContainer>
      <EmojiIcon>{mockData[0].emoji}</EmojiIcon>
      <ContentWrapper>
        <Title>{mockData[0].title}</Title>
        <MetaInfo>
          <Category>{mockData[0].category}</Category>
          <BookmarkInfo>
            <BookmarkIcon>
              <Profile />
            </BookmarkIcon>
            <BookmarkCount>{mockData[0].like}</BookmarkCount>
          </BookmarkInfo>
        </MetaInfo>
      </ContentWrapper>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 18px 20px;
  background-color: ${color.white};
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${color.gray300};
  }
`;

const EmojiIcon = styled.div`
  font-size: 20px;
  font-weight: 700;
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
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 15px;
  line-height: normal;
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
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 10px;
  line-height: normal;
  color: ${color.gray700};
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
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 10px;
  line-height: normal;
  color: ${color.gray700};
  white-space: pre;
`;
