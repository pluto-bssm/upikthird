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

const VoteBarChart = ({ voteId }: { voteId: string }) => {
  const [title, setTitle] = React.useState<string>("");
  const [participant, setParticipant] = React.useState<number>(0);
  const [bars, setBars] = React.useState<VoteBar[]>([]);

  React.useEffect(() => {
    const fetchVote = async () => {
      const data = await getVoteById(voteId);
      if (data) {
        setTitle(data.title ?? "");
        setParticipant(data.totalResponses ?? 0);
        const palette = [
          "#FF3B3B",
          "#FF9F1C",
          "#FFBE3C",
          "#58CCFF",
          "#7C5CFF",
          "#00C896",
        ];
        const mapped = (data.options ?? []).map((opt: any, idx: number) => ({
          label: opt.content,
          value: Math.max(0, Math.min(100, opt.percentage ?? 0)),
          fill: palette[idx % palette.length],
        }));
        setBars(mapped);
      }
    };
    if (voteId) fetchVote();
  }, [voteId]);
  return (
    <ChartCard>
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
  margin-top: 18px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 40px 16px 16px;
`;

const VoteTitle = styled.div`
  color: ${color.black};
  font-family: ${font.D1};
  text-align: center;
  margin: 0;
  width: 100%;
`;

const Participant = styled.div`
  color: ${color.black};
  font-family: ${font.H1};
  text-align: center;
  margin: 20px 0 0 0;
  width: 100%;
`;

const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  width: 100%;
  height: 180px;
  gap: 12px;
  padding: 16px 0 20px;
  margin: 20px 0 0 0;
`;

const BarTrack = styled.div`
  height: 100%;
  display: flex;
  align-items: end;
  background: ${color.gray50};
  border-radius: 8px;
  width: 36px;
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
  width: 314px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const LegendBox = styled.div`
  width: 314px;
  margin-top: 16px;
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
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
`;

const Option = styled.span`
  font-family: ${font.H3};
  color: ${color.black};
`;
