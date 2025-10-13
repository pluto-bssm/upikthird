'use client'

import Header from "@/components/common/header"
import styled from "@emotion/styled"
import color from "@/packages/design-system/src/color"

const guide = () =>{
    return (
        <GuideLayout>
            <Header types={'search'} placeholers="원하는 가이드를 검색해주세요"/>
        </GuideLayout>
    )   

}

export default guide;

const GuideLayout = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex; 
    justify-content: center;
    background-color: ${color.white};
    min-height: 100vh;
`