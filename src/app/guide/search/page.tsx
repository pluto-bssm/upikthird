'use client'

import { useState } from "react"
import Header from "@/components/common/header"
import GuideComponent from "@/components/guide/GuideComponent"
import styled from "@emotion/styled"
import color from "@/packages/design-system/src/color"

const guide = () =>{
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    return (
        <GuideLayout>
            <Header types={'search'} placeholers="원하는 가이드를 검색해주세요" onSubmit={() => {}}/>
            <SearchContainer>
                <SearchInput 
                    placeholder="원하는 가이드를 검색해주세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(searchQuery)
                        }
                    }}
                />
                <SearchButton onClick={() => handleSearch(searchQuery)}>검색</SearchButton>
            </SearchContainer>
            <GuideComponent searchQuery={searchQuery} />
        </GuideLayout>
    )   

}

export default guide;

const GuideLayout = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    background-color: ${color.white};
    min-height: 100vh;
    padding-top: 80px;
`

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background-color: ${color.white};
`

const SearchInput = styled.input`
    flex: 1;
    height: 40px;
    border: 1px solid ${color.gray200};
    border-radius: 8px;
    background-color: ${color.gray50};
    padding: 0 16px;
    font-size: 14px;
    color: ${color.black};
    outline: none;
    
    &::placeholder {
        color: ${color.gray500};
    }
    
    &:focus {
        border-color: ${color.primary};
    }
`

const SearchButton = styled.button`
    height: 40px;
    padding: 0 20px;
    background-color: ${color.primary};
    color: ${color.white};
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
        background-color: #FFB84D;
    }
`