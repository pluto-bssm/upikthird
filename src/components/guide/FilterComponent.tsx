import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import BottomSheetSelector_guide from "../common/BottomSheetguide";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onChange?: (sortBy: "date" | "like") => void;
};

export default function FilterComponent({
  isOpen,
  setIsOpen,
  onChange,
}: Props) {
  const [selectedValue, setSelectedValue] = useState("가이드 제작일 기준");
  const items = useMemo(
    () => [
      { value: "DATE", label: "가이드 제작일 기준" },
      { value: "SAVED", label: "많이 저장한 가이드 기준" },
    ],
    [],
  );

  const handleSelect = (value: string) => {
    const next =
      value === "DATE" ? "가이드 제작일 기준" : "많이 저장한 가이드 기준";
    setSelectedValue(next);
    setIsOpen(false);
    onChange?.(value === "DATE" ? "date" : "like");
  };

  return (
    <Container>
      <BottomSheetSelector_guide
        title="가이드 정렬하기"
        selectedValue={
          selectedValue === "가이드 제작일 기준" ? "DATE" : "SAVED"
        }
        setSelectedValue={() => {}}
        setSelect={handleSelect}
        items={items}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        showArrowIcon
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
