'use client'

import Header from "@/components/common/header"
import styled from "@emotion/styled"
import color from "@/packages/design-system/src/color"
import font from "@/packages/design-system/src/font"
import Button from "@/packages/ui/src/button/Button"
import { useRouter,usePathname } from "next/navigation"

const TailVote = () => {

    const router = useRouter();
    const path = usePathname();
    const newPath = path.replace("tailvote", "");

    return (
        <TailVoteLayout>
            <Header types={'report and close'} onSubmit={() => {router.push(`${newPath}/report`)}} />

            <TailVoteBlock>
                <TailInfo>
                    <MenuText>꼬리질문 응답하기</MenuText>
                    <Title>해당 선지를 고른 이유는 무엇인가요?</Title>
                    <SubTitle>꼬리질문은 응답하지 않고 넘어갈 수 있어요</SubTitle>
                </TailInfo>

                <TextAreaContainer>
                    <TextArea 
                        placeholder="응답을 작성해주세요! 꼬리 질문 응답은 더 질 높은 가이드를 제작하는데 도움이 됩니다."
                    />
                </TextAreaContainer>

                <Button text="투표 완료하기" onCkick={() => console.log("")} />
            </TailVoteBlock>
        </TailVoteLayout>
    )
}

export default TailVote;


const TailVoteLayout = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex; 
    justify-content: center;
    background-color: ${color.white};
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
`

const TailVoteBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
    margin-top: 100px;
`

const TailInfo = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 4px;
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

const TextAreaContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
`

const TextArea = styled.textarea`
    width: 100%;
    min-height: 140px;
    border-radius: 12px;
    border: 1px solid ${color.gray200};
    padding: 16px;
    ${font.H3};
    background-color: ${color.white};
    color: ${color.gray300};
    resize: none;
    outline: none;

    ::placeholder {
        color: ${color.gray300};
    }
`
