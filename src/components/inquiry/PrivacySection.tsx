"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { CheckIcon } from "../../../public/svg/CheckIcon";
import { ChevronRightIcon } from "../../../public/svg/ChevronRight";

interface PrivacySectionProps {
  isChecked: boolean;
  onToggle: () => void;
  error?: string;
}

const PrivacySection = ({
  isChecked,
  onToggle,
  error,
}: PrivacySectionProps) => {
  return (
    <Container>
      <SectionContainer onClick={onToggle}>
        <Checkbox isChecked={isChecked}>
          {isChecked && <CheckIcon width={12} height={12} />}
        </Checkbox>
        <Text>개인정보 수집 및 이용 동의</Text>
      </SectionContainer>
      <ChevronRightIcon width={16} height={16} />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export { PrivacySection };

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  flex-wrap: wrap;
`;

const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex: 1;
`;

const Checkbox = styled.div<{ isChecked: boolean }>`
  width: 16px;
  height: 16px;
  border: 1px solid
    ${(props) => (props.isChecked ? color.primary : color.gray300)};
  border-radius: 4px;
  background-color: ${(props) =>
    props.isChecked ? color.primary : color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
`;

const Text = styled.span`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.gray600};
`;

const ErrorText = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${color.accent};
  margin: 0;
  margin-top: 4px;
  width: 100%;
`;
