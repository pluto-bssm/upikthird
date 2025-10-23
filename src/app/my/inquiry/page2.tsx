'use client';

import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';
import { InquiryHeader } from '@/components/inquiry/InquiryHeader';
import { InquiryForm, type InquiryFormType } from '@/components/inquiry/InquiryForm';

const InquiryPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = (data: InquiryFormType) => {
    // TODO
  };

  return (
    <StyledInquiryPage>
      <InquiryHeader onBack={handleBack} />
      <InquiryForm onSubmit={handleSubmit} />
    </StyledInquiryPage>
  );
};

export default InquiryPage;

const StyledInquiryPage = styled.div`
  max-width: 390px;
  width: 100%;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  position: relative;
`;
