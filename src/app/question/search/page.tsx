'use client';

import React from 'react';
import styled from '@emotion/styled';
import color from '@/packages/design-system/src/color';
import { BackArrow } from '../../../../public/svg/svg';

const SearchPage = () => {
  const [searchInput, setSearchInput] = React.useState('');

  return (
    <StyledSearchPage>
      <SearchHeader>
        <BackButton onClick={() => window.history.back()}>
          <BackArrow width="24" height="24" color={color.black} />
        </BackButton>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="원하는 가이드 검색하기"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoFocus
          />
        </SearchInputWrapper>
      </SearchHeader>
      <SearchContent>
        <EmptyMessage>검색어를 입력해주세요</EmptyMessage>
      </SearchContent>
    </StyledSearchPage>
  );
};

export default SearchPage;

const StyledSearchPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SearchHeader = styled.div`
  display: flex;
  gap: 8px;
  height: 64px;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: ${color.white};
  border-bottom: 1px solid ${color.gray300};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;

const SearchInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  height: 100%;
  background-color: ${color.gray50};
  border-radius: 120px;
  padding: 10px 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.black};
  outline: none;

  &::placeholder {
    color: ${color.gray500};
  }
`;

const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 20px;
  gap: 16px;
`;

const EmptyMessage = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.black};
  line-height: 1;
  margin: 0;
`;
