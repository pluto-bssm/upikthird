'use client'

import styled from '@emotion/styled'
import color from '@/packages/design-system/src/color'
import BarChart from './BarChart'
import NavigationBar from '@/components/common/navigationbar'

const VoteResultPage = () => {
  const chartData = [
    { color: '#ff4757', height: '25%', label: '규봉쌤이랑 수학 문제 5시간 풀기' },
    { color: '#ff6348', height: '25%', label: '건우쌤이랑 마라톤 풀코스 뛰기' },
    { color: '#ff9f43', height: '30%', label: '건우쌤이랑 마라톤 풀코스 뛰기' },
    { color: '#ffa726', height: '20%', label: '규봉쌤이랑 수학 문제 5시간 풀기' },
  ]

  return (
    <VoteLayout>
      <Section>
        <BarChart 
          data={chartData}
          title="투표 제목"
          subtitle="전체 참여자 수 100명"
          showButton={true}
          buttonText="투표 결과 확인하기"
        />
      </Section>

      <NavigationBar />
    </VoteLayout>
  )
}

export default VoteResultPage

const VoteLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${color.white};
  min-height: 100vh;
  margin: 0 auto;
`

const Section = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 80px;
  gap: 24px;
`
