import React from "react";
import { UnderBar } from "../../../public/svg/svg";
import styled from "@emotion/styled";
import font from "@/packages/design-system/src/font";
import color from "@/packages/design-system/src/color";

type Props = {
  category: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
};

export default function CategoryChoseBox({
  category,
  isOpen,
  setIsOpen,
}: Props) {
  return (
    <CategoryChooseLayout>
      <CategorySelectSection>
        <CategoryLabel>투표 카테고리 선택</CategoryLabel>

        <CategorySelector onClick={() => setIsOpen && setIsOpen(!isOpen)}>
          <SelectedCategory>{category}</SelectedCategory>
          <UnderBar width="30px" height="30px" />
        </CategorySelector>

        <CategoryDescriptionArea>
          {category === "기숙사" && (
            <CategoryDescription>
              학교 기숙사에 관한 내용이 궁금할 때 이 카테고리를 선택해주세요
            </CategoryDescription>
          )}
          {category === "학교생활" && (
            <CategoryDescription>
              학교 생활에 내용이 궁금할 때 이 카테고리를 선택해주세요
            </CategoryDescription>
          )}
          {category === "유머" && (
            <CategoryDescription>
              유머유머유머유머유머유머유머유머유머유머유머유머유머유머유머
            </CategoryDescription>
          )}
        </CategoryDescriptionArea>
      </CategorySelectSection>
    </CategoryChooseLayout>
  );
}

const CategoryChooseLayout = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategorySelectSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 90%;
  padding: 6%;
  background-color: #f0f0f0;
  border-radius: 16px;
`;

const CategoryLabel = styled.p`
  ${font.H2};
  color: ${color.gray600};
`;

const CategorySelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background-color: #ffffff;
  width: 70%;
  padding: 8px 16px;
  cursor: pointer;
`;

const SelectedCategory = styled.p`
  ${font.H3};
  color: ${color.black};
`;

const CategoryDescriptionArea = styled.div`
  width: 100%;
  text-align: center;
`;

const CategoryDescription = styled.p`
  ${font.P3};
  color: ${color.gray400};
`;
