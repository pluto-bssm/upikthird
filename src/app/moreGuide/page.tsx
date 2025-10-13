'use client'

import Header from "@/components/common/header";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Chart from '@/components/guide/Chart'

const mockData = [
  {
    title: "뭐가 더 재밌니",
    date: "2025-01-01",
    category: "학교생활",
    content: "그런데, 지금 그 아가씨가 바로 내 눈앞에 와 있는 것입니다. 그리고, 우리 둘 이는 아무 말 없이 나란히 앉아 있었습니다. "
  },
]
const MoreGuide = () => {
  return (
    <GuidePageLayout>
        <Header types="bookmark" />
    
      <MainLayout>
      <TitleColumn>
        
        <TitleTexts>
          <Title>{mockData[0].title}</Title>
          <DateText>{mockData[0].date}</DateText>
        </TitleTexts>
      </TitleColumn>
        <Chart />
      </MainLayout>
      
    </GuidePageLayout>
  );
}

export default MoreGuide;

const GuidePageLayout = styled.div`
display :flex;
flex-direction : column;
align-items : center;
max-width : 600px;
width : 100%;
background-color : ${color.white};
padding-bottom: 72px;
`;

const MainLayout = styled.div`
display :flex;
flex-direction : column;
align-items : center;
max-width : 600px;
width : 100%;
margin-top:13%;
margin-bottom: 10px;
background-color : ${color.white};
`;  

const TitleColumn = styled.div`
display: flex;
flex-direction: column;
align-items: start;
gap: 20px;
width: 100%;
`;

const Thumb = styled.img`
width: 33px;
height: 33px;
`;

const TitleTexts = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
`;

const Title = styled.h1`
margin: 0;
color: ${color.black};
font-family: ${font.D1};
`;

const DateText = styled.span`
color: ${color.gray500};
font-family: ${font.caption};
`;
