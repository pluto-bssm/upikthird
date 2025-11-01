import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Select } from "../../../public/svg";

type Props = {
  sortstandard: string;
  setsortstandard: (category: string) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  title?: string;
  options?: string[];
};

const Sortstandard = [
  "투표 제작일 기준",
  "투표 종료일 기준",
  "투표 참여율 기준",
];

const Votesort = ({
  sortstandard,
  setsortstandard,
  isOpen,
  setIsOpen,
  title,
  options,
}: Props) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);

      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);

      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <Background
      isAnimating={isAnimating}
      onClick={() => setIsOpen && setIsOpen(false)}
    >
      <BottomSheet
        isAnimating={isAnimating}
        onClick={(e) => e.stopPropagation()}
      >
        <Title>{title ?? "투표 정렬하기"}</Title>
        <CategoryList>
          {(options ?? Sortstandard).map((cat) => (
            <CategoryItem
              key={cat}
              selected={cat === sortstandard}
              onClick={() => setsortstandard(cat)}
            >
              {cat}

              {cat === sortstandard && (
                <ArrowIcon>
                  <Select width={25} height={25} />
                </ArrowIcon>
              )}
            </CategoryItem>
          ))}
        </CategoryList>
      </BottomSheet>
    </Background>
  );
};

export default Votesort;

const Background = styled.div<{ isAnimating: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  align-items: end;
  justify-content: center;
  opacity: ${({ isAnimating }) => (isAnimating ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const BottomSheet = styled.div<{ isAnimating: boolean }>`
  width: 100%;
  max-width: 600px;
  background: #fdfffc;
  border-radius: 24px 24px 0 0;
  padding: 32px 24px 0 24px;
  box-sizing: border-box;
  height: 64vh;
  transform: ${({ isAnimating }) =>
    isAnimating ? "translateY(0)" : "translateY(100%)"};
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

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li<{ selected?: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ selected }) => (selected ? "#FF9F1C" : "#011627")};
  margin-bottom: 24px;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArrowIcon = styled.div``;
