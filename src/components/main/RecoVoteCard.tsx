"use client";
import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Nexts } from "../../../public/svg/svg";
import { upik } from "@/apis";
import { TODAY_VOTE } from "@/graphql/queries";
import { useRouter } from "next/navigation";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export default function RecoVoteCard() {
  const router = useRouter();
  const [vote, setVote] = React.useState<{
    id: string;
    title: string;
    category?: string;
    options: { id: string; content: string }[];
  } | null>(null);

  React.useEffect(() => {
    const fetchTodayVote = async () => {
      try {
        const response = await upik.post("", {
          query: TODAY_VOTE,
        } as GraphQLRequest);
        const data = response?.data?.data?.vote?.getLeastPopularOpenVote;
        if (data) {
          setVote({
            id: data.id,
            title: data.title,
            category: data.category,
            options: Array.isArray(data.options)
              ? data.options.map((o: any) => ({ id: o.id, content: o.content }))
              : [],
          });
        }
      } catch (e) {}
    };
    fetchTodayVote();
  }, []);

  const displayedOptions = React.useMemo(() => {
    const options = vote?.options ?? [];
    if (options.length <= 2) return options;
    const indices = new Set<number>();
    while (indices.size < 2) {
      indices.add(Math.floor(Math.random() * options.length));
    }
    return Array.from(indices).map((i) => options[i]);
  }, [vote]);

  const handleGoToVote = () => {
    if (vote?.id) {
      router.push(`/vote/${vote.id}`);
    }
  };

  return (
    <RecoVoteContainer>
      <FeaturedVoteContent>
        <VoteHeader>
          <VoteLabel>오늘의 추천 투표</VoteLabel>
          <VoteTitle>{vote?.title ?? "오늘의 투표를 불러오는 중"}</VoteTitle>
        </VoteHeader>
        <VoteOptions>
          <VoteOption>{displayedOptions[0]?.content ?? "옵션 1"}</VoteOption>
          <VoteVS>VS</VoteVS>
          <VoteOption>{displayedOptions[1]?.content ?? "옵션 2"}</VoteOption>
        </VoteOptions>
      </FeaturedVoteContent>
      <VoteLink onClick={handleGoToVote}>
        투표하러 가기
        <Arrow>
          <Nexts />
        </Arrow>
      </VoteLink>
    </RecoVoteContainer>
  );
}

const RecoVoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  padding: 24px 24px;
  border: 1px solid ${color.gray50};
  border-radius: 8px;
  width: 100%;
`;

const FeaturedVoteContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const VoteHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const VoteLabel = styled.p`
  margin: 0;
  color: ${color.gray300};
  font-family: ${font.caption};
`;

const VoteTitle = styled.p`
  margin: 0;
  color: ${color.black};
  font-family: ${font.D3};
`;

const VoteOptions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const VoteOption = styled.div`
  color: ${color.black};
  font-family: ${font.H2};
`;

const VoteVS = styled.div`
  color: ${color.primary};
  font-family: ${font.H2};
`;

const VoteLink = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  color: ${color.primary};
  font-family: ${font.caption};
  cursor: pointer;
`;

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.primary};
`;
