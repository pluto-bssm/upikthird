import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import React from "react";
import { Divider, Navoption } from "@/../public/svg";

type Variant = "vote" | "guide";

type HeaderNavigationProps = {
  type: Variant;
  activeIdx?: number;
  setActiveIdx?: (idx: number) => void;
  onOptionClick?: () => void;
};

const VoteNavs = ["전체", "학교생활", "기숙사", "유머"];
const GuideNavs = ["전체", "인기"];

const HeaderNavigationBar = ({
  type,
  activeIdx = 0,
  setActiveIdx,
  onOptionClick,
}: HeaderNavigationProps) => {
  const navItems = type === "vote" ? VoteNavs : GuideNavs;

  return (
    <HeaderNavigationLayout>
      <SortMenuBox>
        {navItems.map((nav, idx) => (
          <React.Fragment key={nav}>
            <SortMenuText
              active={activeIdx === idx}
              onClick={() => setActiveIdx && setActiveIdx(idx)}
            >
              {nav}
            </SortMenuText>
            {idx < navItems.length - 1 && (
              <DividerLayout>
                <Divider width="2" height="10" />
              </DividerLayout>
            )}
          </React.Fragment>
        ))}
      </SortMenuBox>

      {type === "vote" && (
        <OptionButton onClick={onOptionClick}>
          <Navoption width="20" height="20" />
        </OptionButton>
      )}
    </HeaderNavigationLayout>
  );
};

export default HeaderNavigationBar;

const HeaderNavigationLayout = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${color.white};
  height: 40px;
`;

const SortMenuBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SortMenuText = styled.p<{ active?: boolean }>`
  ${({ active }) => (active ? font.D3 : font.H2)};
  color: ${({ active }) => (active ? color.primary : color.black)};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const DividerLayout = styled.div`
  display: flex;
  align-items: center;
`;

const OptionButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
`;
