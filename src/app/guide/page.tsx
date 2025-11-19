"use client";

import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import GuideComponent from "@/components/guide/GuideComponent";
import { useState } from "react";
import FilterComponent from "@/components/guide/FilterComponent";
import { useGuides } from "@/hooks/useGuides";
import type { Guide } from "@/types/api";

const Guide = () => {
  const { guides, loading, error, refetch } = useGuides();
  void error;
  void refetch;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "like">("date");
  const categories = ["전체", "학교생활", "기숙사", "유머"];
  const [activeIdx, setActiveIdx] = useState(0);

  if (loading) {
    return (
      <LoadingLayout>
        <div>Loading...</div>
      </LoadingLayout>
    );
  }

  if (error) {
    return (
      <LoadingLayout>
        <IsNotFound>가이드를 불러오는 중 오류가 발생했습니다.</IsNotFound>
      </LoadingLayout>
    );
  }

  let filteredGuides =
    activeIdx === 0
      ? guides
      : guides.filter((guide) => guide.category === categories[activeIdx]);

  filteredGuides = [...filteredGuides].sort((a, b) => {
    switch (sortBy) {
      case "like":
        const aLike = a.like ?? a.likeCount ?? 0;
        const bLike = b.like ?? b.likeCount ?? 0;
        return bLike - aLike;

      case "date":
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;

      default:
        return 0;
    }
  });

  return (
    <GuideLayout>
      <Header
        types={"default"}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
        onOptionClick={() => setIsFilterOpen(true)}
      />

      <Section>
        <FilterComponent
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
          onChange={(next) => setSortBy(next)}
        />
        <GuideComponent guides={filteredGuides} />
      </Section>

      <NavigationBar />
    </GuideLayout>
  );
};

export default Guide;

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
  margin-bottom: 80px;
`;

const LoadingLayout = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: ${color.white};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IsNotFound = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: ${color.gray300};
`;
