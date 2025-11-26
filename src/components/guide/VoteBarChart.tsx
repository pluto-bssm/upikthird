"use client";

import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { getVoteById } from "@/services/vote/api";

export type VoteBar = {
  label: string;
  value: number;
  fill: string;
};

export type VoteOption = {
  content: string;
  percentage: number;
};

const VoteBarChart = ({ voteId }: { voteId: string }) => {
  const [title, setTitle] = React.useState<string>("");
  const [participant, setParticipant] = React.useState<number>(0);
  const [bars, setBars] = React.useState<VoteBar[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchVote = async () => {
      try {
        setError(null);
        const data = await getVoteById(voteId);
        if (!data) return;

        setTitle(data.title ?? "");
        setParticipant(data.totalResponses ?? 0);

        const sorted = [...(data.options ?? [])]
          .map((opt: VoteOption) => ({
            label: opt.content,
            value: Math.max(0, Math.min(100, opt.percentage ?? 0)),
          }))
          .sort((a, b) => b.value - a.value);

        const styledBars = sorted.map((bar, idx) => ({
          ...bar,
          fill: idx === 0 ? color.primary : color.gray200,
        }));

        setBars(styledBars);
      } catch (err) {
        setError("투표 데이터를 불러오는데 실패했습니다.");
        console.error("Error fetching vote data:", err);
      }
    };
    if (voteId) fetchVote();
  }, [voteId]);

  if (error) {
    return (
      <ChartCard>
        <CardBody>
          <div>{error}</div>
        </CardBody>
      </ChartCard>
    );
  }

  return (
    <ChartCard>
      <ResultButton>투표 결과 확인하기</ResultButton>
      <CardBody>
        <VoteTitle>{title}</VoteTitle>
        <Participant>전체 참여자 수 {participant}명</Participant>

        <Bars>
          {bars.map((bar, idx) => (
            <BarTrack key={`${bar.label}-${idx}`}>
              <BarFill value={bar.value} fill={bar.fill} />
            </BarTrack>
          ))}
        </Bars>

        <LegendBox>
          <Legend>
            {bars.map((bar, idx) => (
              <LegendItem key={`${bar.label}-legend-${idx}`}>
                <Dot style={{ backgroundColor: bar.fill }} />
                <Option>{bar.label}</Option>
              </LegendItem>
            ))}
          </Legend>
        </LegendBox>
        <Note>득표율이 높은 순으로 나열되어 있습니다</Note>
      </CardBody>
    </ChartCard>
  );
};

export default VoteBarChart;

const ChartCard = styled.section`
  position: relative;
  border: 1px solid ${color.gray500};
  border-radius: 8px;
  background: ${color.white};
  overflow: visible;
  width: 100%;
  max-width: 350px;
`;

const ResultButton = styled.button`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  width: 148px;
  height: 36px;
  padding: 0 16px;
  border-radius: 30px;
  background: ${color.black};
  color: ${color.white};
  ${font.H4};
  z-index: 10;
  cursor: pointer;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 60px 36px 40px;
`;

const VoteTitle = styled.div`
  color: ${color.black};
  ${font.D3};
  text-align: center;
  margin: 0;
  width: 100%;
`;

const Participant = styled.div`
  color: ${color.black};
  ${font.P2};
  text-align: center;
  width: 100%;
`;

const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 255px;
  height: 168px;
  gap: 16px;
`;

const BarTrack = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  background: ${color.gray50};
  border-radius: 8px;
  width: 43px;
`;

const BarFill = styled.div<{ value: number; fill: string }>`
  width: 100%;
  height: ${({ value }) => `${Math.max(0, Math.min(100, value))}%`};
  background: ${({ fill }) => fill};
  border-radius: 10px;
`;

const Legend = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LegendBox = styled.div`
  width: 100%;
  border-radius: 8px;
  background: ${color.gray50};
  padding: 16px;
`;

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Dot = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  display: inline-block;
`;

const Option = styled.span`
  ${font.P2};
  color: ${color.black};
`;

const Note = styled.p`
  width: 100%;
  margin: 0;
  text-align: right;
  color: ${color.gray500};
  ${font.P3};
`;
