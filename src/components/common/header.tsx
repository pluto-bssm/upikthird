"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import Headernavigationbar from "./headernavigationbar";
import {
  Logo,
  Bell,
  Search,
  User,
  Back,
  Back2,
  Bookmark,
  Close,
  Report,
  Options,
} from "@/../public/svg/svg";

type variant =
  | "default"
  | "bookmark"
  | "close"
  | "register"
  | "report and close"
  | "report and bookmark"
  | "title"
  | "close and option"
  | "search"
  | "question"
  | "default and no navi";

type HeaderProps = {
  types: variant;
  text?: string;
  placeholers?: string;
  onSubmit?: () => void;
  onClose?: () => void;
  onSecondSubmit?: () => void;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  onOptionClick?: () => void;
  onToggleBookmark?: () => void;
  bookmarked?: boolean;
  activeIdx?: number;
  setActiveIdx?: (idx: number) => void;
};

const Header = ({
  types,
  text,
  placeholers,
  onSubmit,
  onClose,
  onSecondSubmit,
  onSearchChange,
  searchValue,
  onOptionClick,
  onToggleBookmark,
  bookmarked,
  activeIdx,
  setActiveIdx,
}: HeaderProps) => {
  const router = useRouter();
  const path = usePathname();
  const [searchInput, setSearchInput] = useState(searchValue || "");

  switch (types) {
    case "default":
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <LeftItemBox>
              <Logo
                width="50"
                height="50"
                onClick={() => {
                  router.replace("/main");
                }}
              />
            </LeftItemBox>

            <RightItemBox>
              <Bell width="25" height="25" />
              <Search
                width="25"
                height="25"
                onClick={() => {
                  router.push(`${path}/search`);
                }}
              />
              <User
                width="25"
                height="25"
                onClick={() => {
                  router.push(`/my`);
                }}
              />
            </RightItemBox>
          </HeaderItemBox>
          <Headernavigationbar
            type={"vote"}
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
            onOptionClick={onOptionClick}
          />
        </HeaderLayout>
      );

    case "question":
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <LeftItemBox>
              <Logo
                width="50"
                height="50"
                onClick={() => {
                  router.replace("/main");
                }}
              />
            </LeftItemBox>

            <RightItemBox>
              <Bell width="25" height="25" />
              <Search
                width="25"
                height="25"
                onClick={() => {
                  router.push(`${path}/search`);
                }}
              />
              <User
                width="25"
                height="25"
                onClick={() => {
                  router.push(`/my`);
                }}
              />
            </RightItemBox>
          </HeaderItemBox>
        </HeaderLayout>
      );

    case "bookmark":
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <LeftItemBox>
              <Back
                width="22"
                height="22"
                onClick={() => {
                  router.back();
                }}
              />
            </LeftItemBox>

            <RightItemBox>
              <StyledBookmark
                width="25"
                height="25"
                onClick={onToggleBookmark}
                bookmarked={bookmarked}
              />
            </RightItemBox>
          </HeaderItemBox>
        </HeaderLayout>
      );

    case "close": {
      const handleCloseClick = () => {
        onClose?.();
      };
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <CenterItemBox>
              <Title>{text}</Title>
            </CenterItemBox>
            <RightItemBox>
              <Close width="25" height="25" onClick={handleCloseClick} />
            </RightItemBox>
          </HeaderItemBox>
        </HeaderLayout>
      );
    }

    case "register":
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <LeftItemBox>
              <Close
                width="25"
                height="25"
                onClick={() => {
                  router.back();
                }}
              />
            </LeftItemBox>
            <RightItemBox>
              <Button onClick={onSubmit}>등록</Button>
            </RightItemBox>
          </HeaderItemBox>
        </HeaderLayout>
      );

    case "report and close":
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <LeftItemBox>
              <Back
                width="22"
                height="22"
                onClick={() => {
                  router.back();
                }}
              />
            </LeftItemBox>

            <RightItemBox>
              <Report
                width="25"
                height="25"
                onClick={() => {
                  router.push(`${path}/report`);
                }}
              />
              <Close width="25" height="25" onClick={onClose} />
            </RightItemBox>
          </HeaderItemBox>
        </HeaderLayout>
      );

    case "report and bookmark":
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <LeftItemBox>
              <Back
                width="22"
                height="22"
                onClick={() => {
                  router.back();
                }}
              />
            </LeftItemBox>
            <RightItemBox>
              <Report width="25" height="25" />
              <Bookmark width="25" height="25" onClick={onClose} />
            </RightItemBox>
          </HeaderItemBox>
        </HeaderLayout>
      );

    case "title":
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <LeftItemBox>
              <Back
                width="22"
                height="22"
                onClick={() => {
                  router.back();
                }}
              />
            </LeftItemBox>
            <CenterItemBox>
              <Title>{text}</Title>
            </CenterItemBox>
          </HeaderItemBox>
        </HeaderLayout>
      );

    case "close and option":
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <LeftItemBox>
              <Back width="22" height="22" onClick={() => router.back()} />
            </LeftItemBox>
            <RightItemBox>
              <Close width="25" height="25" onClick={onSecondSubmit} />
              <Options width="25" height="25" onClick={onSubmit} />
            </RightItemBox>
          </HeaderItemBox>
        </HeaderLayout>
      );

    case "search":
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <LeftItemBox>
              <Back2 width="22" height="22" onClick={() => router.back()} />
            </LeftItemBox>
            <CenterItemBox>
              <SearchInput
                placeholder={placeholers}
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  onSearchChange?.(e.target.value);
                  onSubmit;
                }}
              />
            </CenterItemBox>
          </HeaderItemBox>
        </HeaderLayout>
      );

    case "default and no navi":
      return (
        <HeaderLayout>
          <HeaderItemBox>
            <LeftItemBox>
              <Logo
                width="50"
                height="50"
                onClick={() => {
                  router.replace("/main");
                }}
              />
            </LeftItemBox>

            <RightItemBox>
              <Bell width="25" height="25" />
              <Search
                width="25"
                height="25"
                onClick={() => {
                  router.push(`${path}/search`);
                }}
              />
              <User
                width="25"
                height="25"
                onClick={() => {
                  router.push(`/my`);
                }}
              />
            </RightItemBox>
          </HeaderItemBox>
        </HeaderLayout>
      );

    default:
      return null;
  }
};

export default Header;

const StyledBookmark = styled(Bookmark, {
  shouldForwardProp: (prop) => prop !== "bookmarked",
})<{ bookmarked?: boolean }>`
  path {
    fill: ${(p) => (p.bookmarked ? color.black : color.gray300)};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 32px;
  background-color: ${color.gray50};
  padding-left: 20px;
  ${font.H2};
  color: ${color.gray500};
  outline: none;
  ::placeholder {
    ${font.H2};
    color: ${color.gray500};
  }
`;

const Title = styled.p`
  ${font.H2};
  color: ${color.black};
`;

const Button = styled.button`
  ${font.D3};
  color: ${color.primary};
  background-color: #ffd8a2;
  width: 60px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const LeftItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const RightItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CenterItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
`;

const HeaderItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  position: relative;
`;

const HeaderLayout = styled.div`
  width: 100%;
  max-width: 600px;
  position: fixed;
  flex-direction: column;
  top: 0;
  height: 80px;
  background-color: ${color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;