'use client'

import Header from "@/components/common/header"
import styled from "@emotion/styled"
import color from "@/packages/design-system/src/color"
import font from "@/packages/design-system/src/font"
import { useParams } from "next/navigation"
import Button from "@/packages/ui/src/button/Button"
import Ballot from "@/components/vote/ballot"

const BallotData = [
    {
        content : "내용1",
        letter : "A"
    },
    {
        content : "내용2",
        letter : "B"
    }
]

const DesVote = () =>{
    const params = useParams();
    return (
        <DesVoteLayout>
            <Header types={'report and close'}/>

            <VoteBlock>
                <VoteInfo>
                    <MenuText>투표하기</MenuText>
                    <Title>제목</Title>
                    <SubTitle>서브제목</SubTitle>
                </VoteInfo>

                <VoteContent>
                    {BallotData.map((ballot, index) => (
                        <Ballot key={index} content={ballot.content} letter={ballot.letter}/>
                    ))}
                </VoteContent>

                <Button text="투표 완료하기" onCkick={() => console.log("click")}/>
                
            </VoteBlock>
            
        </DesVoteLayout>
    )   

}

export default DesVote;

const DesVoteLayout = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex; 
    justify-content: center;
    background-color: ${color.white};
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
`

const VoteContent = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap : 10px;
`


const MenuText = styled.p`
    ${font.D3};
    color: ${color.primary};
`

const Title = styled.p`
    ${font.D1};
    color: ${color.black};
`

const SubTitle = styled.p`
    ${font.H2};
    color: ${color.gray400};
`

const VoteInfo = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap : 2px;
`

const VoteBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    `