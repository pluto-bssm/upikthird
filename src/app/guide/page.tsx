"use client";

import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import GuideComponent from "@/components/guide/GuideComponent";
import React, { useState } from "react";
import FilterComponent from "@/components/guide/FilterComponent";

const guide = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "like">("date");
  return (
    <GuideLayout>
      <Header types={"default"} onOptionClick={() => setIsFilterOpen(true)} />

      <Section>
        <FilterComponent
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
          onChange={(next) => setSortBy(next)}
        />
        <GuideComponent sortBy={sortBy} />
      </Section>

      <NavigationBar />
    </GuideLayout>
  );
};

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
  margin-bottom: 80px;
`;
