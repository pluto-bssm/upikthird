import React from "react";
import styled from "@emotion/styled";
import { Select } from "../../../public/svg/svg";
import font from "@/packages/design-system/src/font";
type Props = {
  category: string;
  setGuideCategory: (category: string) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
};

const categories = ["기숙사", "학교생활", "유머"];

export default function CategoryBottomSheet({
  category,
  setGuideCategory,
  isOpen,
  setIsOpen,
}: Props) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={() => setIsOpen && setIsOpen(false)}>
      <BottomSheet onClick={(e) => e.stopPropagation()}>
        <SheetTitle>카테고리 선택</SheetTitle>

        <CategoryList>
          {categories.map((cat) => (
            <CategoryListItem
              key={cat}
              selected={cat === category}
              onClick={() => setGuideCategory(cat)}
            >
              {cat}
              {cat === category && (
                <SelectIconWrapper>
                  <Select width="25" height="25" />
                </SelectIconWrapper>
              )}
            </CategoryListItem>
          ))}
        </CategoryList>
      </BottomSheet>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const BottomSheet = styled.div`
  width: 100%;
  max-width: 600px;
  background: #fdfffc;
  border-radius: 24px 24px 0 0;
  padding: 32px 24px 0 24px;
  box-sizing: border-box;
  height: 64vh;
  position: relative;
  z-index: 1002;

  animation: slideUp 0.35s ease-out forwards;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const SheetTitle = styled.h2`
  text-align: center;
  ${font.H2};
  color: #011627;
  margin-bottom: 32px;
  position: relative;

  &:before {
    content: "";
    display: block;
    width: 60px;
    height: 1px;
    background: #c8c8c8;
    margin: 0 auto 12px auto;
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryListItem = styled.li<{ selected?: boolean }>`
  ${font.H2};
  color: ${({ selected }) => (selected ? "#FF9F1C" : "#011627")};
  margin-bottom: 24px;
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    color: #ff9f1c;
  }
`;

const SelectIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
