'use client'

import Header from "@/components/common/header"
import NavigationBar from "@/components/common/navigationbar"
import styled from "@emotion/styled"
import color from "@/packages/design-system/src/color"
import GuideComponent from "@/components/guide/GuideComponent"

const guide = () =>{
    return (
        <GuideLayout>
            <Header types={'default'}/>

            <Section>
            <GuideComponent />
            </Section>

            <NavigationBar />
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
`;

const Section = styled.div`
    width: 90%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 100px;
`;