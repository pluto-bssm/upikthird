"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { ChevronRightIcon } from "../../../public/svg/ChevronRight";
import font from "@/packages/design-system/src/font";

export type MenuCategory = "기록" | "설정" | "도움말 & 지원";
export type MenuItem = {
  id: string;
  label: string;
  category: MenuCategory;
  onClick?: () => void;
};

interface MenuSectionProps {
  items: MenuItem[];
  onItemClick?: (item: MenuItem) => void;
}

const MenuSection = ({ items, onItemClick }: MenuSectionProps) => {
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<MenuCategory, MenuItem[]>,
  );

  return (
    <MenuSectionWrapper>
      {Object.entries(groupedItems).map(
        ([category, categoryItems], categoryIndex) => (
          <MenuCategoryGroup
            key={category}
            isLast={categoryIndex === Object.entries(groupedItems).length - 1}
          >
            <MenuCategoryLabel>{category}</MenuCategoryLabel>
            <MenuListWrapper>
              {categoryItems.map((item, index) => (
                <div key={item.id}>
                  <MenuItemButton onClick={() => onItemClick?.(item)}>
                    <MenuItemLabel>{item.label}</MenuItemLabel>
                    <ChevronRightIcon />
                  </MenuItemButton>
                  {index < categoryItems.length - 1 && <MenuItemDivider />}
                </div>
              ))}
            </MenuListWrapper>
          </MenuCategoryGroup>
        ),
      )}
    </MenuSectionWrapper>
  );
};

export default MenuSection;

const MenuSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`;

const MenuCategoryGroup = styled.div<{ isLast?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0;
  border-bottom: ${(props) =>
    props.isLast ? "none" : `2px solid ${color.gray50}`};
`;

const MenuCategoryLabel = styled.p`
  ${font.P3}
  color: ${color.gray500};
  margin: 0;
  padding: 0 20px;
  padding-top: 20px;
  padding-bottom: 10px;
  line-height: 1;
`;

const MenuListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
`;

const MenuItemButton = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
  padding: 16px 20px;
  height: auto;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: ${color.gray50};
  }
`;

const MenuItemLabel = styled.p`
  ${font.P1}
  color: ${color.black};
  margin: 0;
  padding: 0;
  text-align: start;
  line-height: 1;
  white-space: nowrap;
  flex: 1;
`;

const MenuItemDivider = styled.div`
  background-color: ${color.gray100};
  width: 100%;
`;
