import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import styled from "@emotion/styled";
import VoteBlockImage from "./voteblockimage";
import { Views } from "../../../public/svg/svg";

type VoteBlockProps = {
    category : string;
    title : string;
    viewCount : number;
    finishDate : string;
}

const VoteBlock = ({category,title,viewCount,finishDate} : VoteBlockProps) => {
    
  return (
    <VoteBlockLayout>
        <VoteBlockImage category="domitory"/>
        <VoteContentLayout>
            <Title>{title}</Title>
            <VoteInfoBox>
                <VoteInfoUpperBox> 
                    <Category>{category}</Category>
                    <VoteViewsBox>
                        <Views width="12" height="12"/>
                        <ViewCount>{viewCount}</ViewCount>
                    </VoteViewsBox>
                </VoteInfoUpperBox>
                    <FinishDate>{finishDate}</FinishDate>
            </VoteInfoBox>
        </VoteContentLayout>
    </VoteBlockLayout>
  );
}

export default VoteBlock;

const VoteBlockLayout = styled.div`
    width: 100%;
    border: 1px solid ${color.gray50};
    border-radius: 12px;
    height: 10%;
    display: flex;
    align-items: center;
    gap : 6%;
    padding :  0px 10px 0px 20px;
    margin-bottom : 20px;
`

const VoteContentLayout = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
`
const VoteInfoBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    flex-direction: row;
    width: 94%;
`

const VoteInfoUpperBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`    

const VoteViewsBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.p`
    ${font.D3};
    color: ${color.black};
`

const Category = styled.p`
    ${font.caption};
    color: ${color.gray600};
`

const ViewCount = styled.p`
    ${font.caption};
    color: ${color.gray600};
`

const FinishDate = styled.p`
    ${font.caption};
    color: ${color.gray500};
`