"use client";

import React from "react";
import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { BackArrow } from "../../../../public/svg/svg";
import { QuestionList } from "@/components/question/QuestionList";
import * as boardApi from "@/services/board/api";
import type { Board } from "@/types/graphql";

const SearchPage = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Board[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);

  const handleSearch = React.useCallback(async () => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      const response = await boardApi.searchQuestions(searchInput.trim(), {
        page: 0,
        size: 50,
      });
      setSearchResults(response.content);
    } catch (error) {
      console.error("검색 실패:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchInput]);

  React.useEffect(() => {
    if (searchInput.trim()) {
      const debounce = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(debounce);
    } else {
      setSearchResults([]);
      setHasSearched(false);
    }
  }, [searchInput, handleSearch]);

  return (
    <StyledSearchPage>
      <SearchHeader>
        <BackButton onClick={() => window.history.back()}>
          <BackArrow width="24" height="24" color={color.black} />
        </BackButton>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="원하는 질문 검색하기"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoFocus
          />
        </SearchInputWrapper>
      </SearchHeader>
      <SearchContent>
        {loading && <EmptyMessage>검색 중...</EmptyMessage>}
        {!loading && !hasSearched && (
          <EmptyMessage>검색어를 입력해주세요</EmptyMessage>
        )}
        {!loading && hasSearched && searchResults.length === 0 && (
          <EmptyMessage>검색 결과가 없습니다</EmptyMessage>
        )}
        {!loading && searchResults.length > 0 && (
          <QuestionList questions={searchResults} />
        )}
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
  flex: 1;
  width: 100%;
`;

const EmptyMessage = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${color.gray600};
  line-height: 1;
  margin: 40px 0;
  text-align: center;
`;
