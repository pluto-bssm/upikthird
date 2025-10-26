'use client';

import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';

type InquiryType = '오류' | '건의사항' | '신고' | '기타';

interface InquiryTypeButtonsProps {
  selected?: InquiryType;
  onSelect: (type: InquiryType) => void;
  error?: string;
}

const InquiryTypeButtons = ({ selected, onSelect, error }: InquiryTypeButtonsProps) => {
  const types: InquiryType[] = ['오류', '건의사항', '신고', '기타'];

  return (
    <Container>
      <Label>
        문의 유형 <Required>*</Required>
      </Label>
      <ButtonGroup>
        {types.map(type => (
          <TypeButton
            key={type}
            isSelected={selected === type}
            onClick={() => onSelect(type)}
          >
            {type}
          </TypeButton>
        ))}
      </ButtonGroup>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export { InquiryTypeButtons };
export type { InquiryType };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.gray600};
  margin: 0;
`;

const Required = styled.span`
  color: ${color.accent};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
`;

const TypeButton = styled.button<{ isSelected: boolean }>`
  padding: 8px 20px;
  border: 1px solid ${props => props.isSelected ? color.primary : color.gray100};
  border-radius: 100px;
  background-color: ${props => props.isSelected ? color.primary : color.white};
  color: ${props => props.isSelected ? color.white : color.gray600};
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${color.primary};
  }
`;

const ErrorText = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${color.accent};
  margin: 0;
  margin-top: 4px;
`;
