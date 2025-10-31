import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Select } from "../../../public/svg/svg";
import { useVoteStore } from "@/store/useMakeVoteStore";
type SelectorItem = {
  value: string;
  label: string;
  badge?: string;
};

type Props = {
  title: string;
  selectedValue: string;
  setSelectedValue: (value: number) => void;
  items: SelectorItem[];
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  showArrowIcon?: boolean;
  arrowIconSrc?: string;
  setSelect: (value: string) => void;
};

export default function BottomSheetSelector({
  title,
  selectedValue,
  setSelectedValue,
  items,
  isOpen,
  setIsOpen,
  setSelect,
  showArrowIcon = true,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleBackgroundClick = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isVisible) return null;

  return (
    <Background isAnimating={isAnimating} onClick={handleBackgroundClick}>
      <SelectorBox isAnimating={isAnimating} onClick={handleBoxClick}>
        <Title>{title}</Title>
        <ItemList>
          {items.map((item) => (
            <ItemContainer key={item.value}>
              <ItemRow
                selected={item.value === selectedValue}
                onClick={() => {
                  setSelectedValue(parseInt(item.value));
                  setSelect(item.value);
                }}
              >
                <ItemText selected={item.value === selectedValue}>
                  {item.label}
                </ItemText>

                <RightSection>
                  {item.badge && <Badge>{item.badge}</Badge>}
                  {item.value === selectedValue && showArrowIcon && (
                    <ArrowIcon>
                      <Select width={25} height={25} />
                    </ArrowIcon>
                  )}
                </RightSection>
              </ItemRow>
            </ItemContainer>
          ))}
        </ItemList>
      </SelectorBox>
    </Background>
  );
}

const SelectorBox = styled.div<{ isAnimating: boolean }>`
  width: 100%;
  max-width: 600px;
  background: #fdfffc;
  border-radius: 24px 24px 0 0;
  padding: 32px 24px 0 24px;
  box-sizing: border-box;
  position: fixed;
  height: 64vh;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%)
    translateY(${({ isAnimating }) => (isAnimating ? "0" : "100%")});
  z-index: 1000;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Title = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
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

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: calc(70vh - 120px);
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const ItemContainer = styled.div`
  margin-bottom: 24px;
`;

const ItemRow = styled.li<{ selected?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemText = styled.span<{ selected?: boolean }>`
  color: ${({ selected }) => (selected ? "#FF9F1C" : "#011627")};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #9ca3af;
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
`;

const Background = styled.div<{ isAnimating: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(
    0,
    0,
    0,
    ${({ isAnimating }) => (isAnimating ? "0.5" : "0")}
  );
  z-index: 1001;
  display: flex;
  align-items: end;
  justify-content: center;
  transition: background-color 0.3s ease;
`;
