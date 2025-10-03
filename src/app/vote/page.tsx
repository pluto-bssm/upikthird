'use client'

import Header from "@/components/common/header"
import styled from "@emotion/styled"
import color from "@/packages/design-system/src/color"

const vote = () =>{
    return (
        <VoteLayout>
            <Header types={'default'} text="제목1" placeholers="원하는 가이드 입력"/>
        </VoteLayout>
    )   

}

export default vote;

const VoteLayout = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex; 
    justify-content: center;
    background-color: ${color.white};
    min-height: 100vh;
`