'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { z } from 'zod';
import color from '@/packages/design-system/src/color';
import { InquiryTypeButtons, type InquiryType } from './InquiryTypeButtons';
import { PrivacySection } from './PrivacySection';

// Zod 스키마 정의
const inquirySchema = z.object({
  type: z.enum(['오류', '건의사항', '신고', '기타']).optional(),
  content: z.string().min(20, '20자 이상 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  agreePrivacy: z.boolean().refine(val => val === true, {
    message: '개인정보 수집 및 이용에 동의해주세요',
  }),
}).refine(data => data.type !== undefined, {
  message: '문의 유형을 선택해주세요',
  path: ['type'],
});

interface InquiryForm {
  type?: InquiryType;
  content: string;
  email: string;
  agreePrivacy: boolean;
}

interface InquiryFormProps {
  onSubmit?: (data: InquiryForm) => void;
}

const InquiryForm = ({ onSubmit }: InquiryFormProps) => {
  const [formData, setFormData] = useState<InquiryForm>({
    type: undefined,
    content: '',
    email: '',
    agreePrivacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTypeSelect = (type: InquiryType) => {
    setFormData(prev => ({ ...prev, type }));
    if (errors.type) {
      setErrors(prev => ({ ...prev, type: '' }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
    if (errors.content && content.length >= 20) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  };

  const handleEmailChange = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
    if (errors.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
  };

  const handlePrivacyToggle = () => {
    setFormData(prev => ({ ...prev, agreePrivacy: !prev.agreePrivacy }));
    if (errors.agreePrivacy) {
      setErrors(prev => ({ ...prev, agreePrivacy: '' }));
    }
  };

  const validateForm = () => {
    try {
      inquirySchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const isFormValid = () => {
    return formData.type && 
           formData.content && 
           formData.content.length >= 20 &&
           formData.email && 
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
           formData.agreePrivacy;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  return (
    <StyledContent>
      <TitleSection>
        <MainTitle>유픽에 전하고 싶은 말을 남겨주세요</MainTitle>
        <Subtitle>내용을 꼼꼼히 확인한 후 이메일로 답변 드릴게요</Subtitle>
      </TitleSection>

      <Section>
        <InquiryTypeButtons
          selected={formData.type}
          onSelect={handleTypeSelect}
          error={errors.type}
        />
      </Section>

      <Section>
        <Label>
          상세 내용 <Required>*</Required>
        </Label>
        <ContentTextarea
          placeholder="응답을 작성해주세요! 꼬리 질문 응답은 더 질 높은 가이드를 제작하는데 도움이 됩니다."
          value={formData.content}
          onChange={(e) => handleContentChange(e.target.value)}
          hasError={!!errors.content}
        />
        <CharacterCount hasError={(formData.content?.length || 0) < 20 && (formData.content?.length || 0) > 0}>
          20자 이상 입력해주세요
        </CharacterCount>
        {errors.content && <ErrorText>{errors.content}</ErrorText>}
      </Section>

      <Section>
        <Label>
          답변 받으실 이메일 주소 <Required>*</Required>
        </Label>
        <EmailInput
          placeholder="이메일 주소를 작성해주세요"
          value={formData.email}
          onChange={(e) => handleEmailChange(e.target.value)}
          hasError={!!errors.email}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </Section>

      <NoticeSection>
        <NoticeText>
          답변은 평균 7일 정도 소요됩니다.
          <br />
          답변이 완료되면 이메일에서 확인하실 수 있습니다.
        </NoticeText>
      </NoticeSection>

      <PrivacySectionWrapper>
        <PrivacySection
          isChecked={!!formData.agreePrivacy}
          onToggle={handlePrivacyToggle}
          error={errors.agreePrivacy}
        />
      </PrivacySectionWrapper>

      <SubmitButton 
        isEnabled={!!isFormValid()}
        onClick={handleSubmit}
        disabled={!isFormValid()}
      >
        문의 보내기
      </SubmitButton>
    </StyledContent>
  );
};

export { InquiryForm };
export type { InquiryForm as InquiryFormType };

const StyledContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MainTitle = styled.h2`
  font-family: Pretendard, sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: ${color.black};
  margin: 0;
  line-height: 1;
`;

const Subtitle = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.gray600};
  margin: 0;
  line-height: 1;
`;

const Section = styled.div`
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

const ContentTextarea = styled.textarea<{ hasError?: boolean }>`
  min-height: 120px;
  padding: 20px;
  border: 1px solid ${props => props.hasError ? color.accent : color.gray100};
  border-radius: 16px;
  background-color: ${color.white};
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${color.black};
  resize: none;
  outline: none;

  &::placeholder {
    color: ${color.gray300};
  }

  &:focus {
    border-color: ${color.primary};
  }
`;

const CharacterCount = styled.p<{ hasError?: boolean }>`
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${props => props.hasError ? color.accent : color.gray300};
  margin: 0;
`;

const EmailInput = styled.input<{ hasError?: boolean }>`
  padding: 20px;
  border: 1px solid ${props => props.hasError ? color.accent : color.gray100};
  border-radius: 16px;
  background-color: ${color.white};
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  outline: none;

  &::placeholder {
    color: ${color.gray300};
    font-weight: 400;
  }

  &:focus {
    border-color: ${color.primary};
  }
`;

const NoticeSection = styled.div`
  margin-top: -16px;
`;

const NoticeText = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${color.gray300};
  margin: 0;
  line-height: 1.4;
`;

const PrivacySectionWrapper = styled.div`
  margin-top: -16px;
`;

const SubmitButton = styled.button<{ isEnabled: boolean }>`
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 100px;
  background-color: ${props => props.isEnabled ? color.primary : color.gray200};
  color: ${color.white};
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  cursor: ${props => props.isEnabled ? 'pointer' : 'not-allowed'};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isEnabled ? color.primary : color.gray200};
    opacity: ${props => props.isEnabled ? 0.9 : 1};
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
