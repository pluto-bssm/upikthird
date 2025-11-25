"use client";

import type { ComponentType, SVGProps } from "react";
import {
  BookBox,
  CheckBox,
  LogoBox,
  Placard,
  SmileBox,
  VoteBox,
} from "@/../public/svg";

export type FastRoadCard = {
  title: string[];
  description: string[];
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const FAST_ROAD_CARDS: FastRoadCard[] = [
  {
    title: ["투표 제작", "바로가기"],
    description: ["더 많은 사람들의", "의견이 궁금하다면"],
    href: "/makevote",
    Icon: VoteBox,
  },
  {
    title: ["투표 참여", "바로가기"],
    description: ["재학생이라면", "직접 투표에 참여하기"],
    href: "/vote",
    Icon: CheckBox,
  },
  {
    title: ["가이드", "보러가기"],
    description: ["학교에 대한", "정보는 가이드로!"],
    href: "/guide",
    Icon: BookBox,
  },
  {
    title: ["질문게시판", "바로가기"],
    description: ["빠르게 답변을", "받고 싶다면"],
    href: "/question",
    Icon: Placard,
  },
  {
    title: ["유픽 소개", "바로가기"],
    description: ["유픽에 대해서", "더 자세히 알고싶다면"],
    href: "https://www.notion.so/2733ccc9b3dc803fb8dcc0c581403bff",
    Icon: LogoBox,
  },
  {
    title: ["마이페이지", "바로가기"],
    description: ["내 계정 종합 관리", "바로가기"],
    href: "/my",
    Icon: SmileBox,
  },
];
