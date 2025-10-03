'use client'

import Header from "@/components/common/header"
import NavigationBar from "@/components/common/navigationbar"
import styled from "@emotion/styled"
import color from "@/packages/design-system/src/color"

const vote = () =>{
    return (
        <VoteLayout>
            <Header types={'default'}/>
            <NavigationBar />
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