'use client'

import styled from '@emotion/styled'
import color from '@/packages/design-system/src/color'

export interface BarData {
  color: string
  height: string
  label: string
  value?: number
}

interface BarChartProps {
  data: BarData[]
  title?: string
  subtitle?: string
  showButton?: boolean
  buttonText?: string
  onButtonClick?: () => void
}

const BarChart = ({ 
  data, 
  title = "투표 제목", 
  subtitle = "전체 참여자 수 100명",
  showButton = true,
  buttonText = "투표 결과 확인하기",
  onButtonClick
}: BarChartProps) => {
  return (
    <ChartContainer>
      {showButton && (
        <HeaderBox onClick={onButtonClick}>
          {buttonText}
        </HeaderBox>
      )}

      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>

      <ChartWrapper>
        {data.map((bar, idx) => (
          <BarWrapper key={idx}>
            <BarBg>
              <BarFill color={bar.color} height={bar.height} />
            </BarBg>
          </BarWrapper>
        ))}
      </ChartWrapper>

      <Legend>
        {data.map((bar, idx) => (
          <LegendItem key={idx}>
            <LegendColor color={bar.color} />
            <span>{bar.label}</span>
          </LegendItem>
        ))}
      </Legend>
    </ChartContainer>
  )
}

export default BarChart

const ChartContainer = styled.div`
  background: ${color.white};
  border-radius: 24px;
  border: 2px solid #e0e0e0;
  padding: 40px;
  width: 100%;
  position: relative;

  @media (max-width: 600px) {
    padding: 20px;
  }
`

const HeaderBox = styled.div`
  background: #1a2332;
  color: ${color.white};
  padding: 16px 40px;
  border-radius: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2a3442;
    transform: translateX(-50%) translateY(-2px);
  }

  @media (max-width: 600px) {
    font-size: 16px;
    padding: 12px 30px;
  }
`

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  margin: 60px 0 20px;
  color: #1a2332;

  @media (max-width: 600px) {
    font-size: 28px;
    margin: 50px 0 15px;
  }
`

const Subtitle = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-bottom: 60px;

  @media (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 350px;
  margin-bottom: 60px;
  padding: 0 20px;

  @media (max-width: 600px) {
    height: 280px;
    margin-bottom: 40px;
  }
`

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 80px;
`

const BarBg = styled.div`
  background: #e8e8e8;
  border-radius: 20px 20px 0 0;
  height: 100%;
  width: 100%;
  position: relative;
`

const BarFill = styled.div<{ color: string; height: string }>`
  background: ${({ color }) => color};
  height: ${({ height }) => height};
  width: 100%;
  border-radius: 20px 20px 0 0;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease;
`

const Legend = styled.div`
  background: #f8f8f8;
  border-radius: 20px;
  padding: 30px;
  width: 100%;

  @media (max-width: 600px) {
    padding: 20px;
  }
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 15px;
  }
`

const LegendColor = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
  background: ${({ color }) => color};
`
