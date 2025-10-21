import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import styled from "@emotion/styled";
import VoteBlockImage from "../vote/voteblockimage";
import { Views } from "../../../public/svg/svg";

type GuideBlockProps = {
  category: string;
  title: string;
  viewCount: number;
  onClick?: () => void;
};

const GuideBlock = ({
  category,
  title,
  viewCount,
  onClick,
}: GuideBlockProps) => {
  return (
    <GuideBlockLayout onClick={onClick}>
      <VoteBlockImage category={category} />
      <GuideContentLayout>
        <Title>{title}</Title>

        <GuideInfoBox>
          <GuideInfoUpperBox>
            <Category>{category}</Category>

            <GuideViewsBox>
              <Views width="12" height="12" />
              <ViewCount>{viewCount}</ViewCount>
            </GuideViewsBox>
          </GuideInfoUpperBox>
        </GuideInfoBox>
      </GuideContentLayout>
    </GuideBlockLayout>
  );
};

export default GuideBlock;

const GuideBlockLayout = styled.div`
  width: 100%;
  border: 1px solid ${color.gray50};
  border-radius: 12px;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 4%;
  padding: 0px 10px 0px 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const GuideContentLayout = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

const GuideInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 94%;
`;

const GuideInfoUpperBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GuideViewsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  ${font.D3};
  color: ${color.black};
`;

const Category = styled.p`
  ${font.caption};
  color: ${color.gray600};
`;

const ViewCount = styled.p`
  ${font.caption};
  color: ${color.gray600};
`;
