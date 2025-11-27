"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import Header from "@/components/common/header";
import NavigationBar from "@/components/common/navigationbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Chat } from "../../../public/svg";

type School = {
  id: string;
  name: string;
  category: string;
  location: string;
  date: string;
  views: number;
  comments: number;
};

export default function SchoolSelectPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const schools: School[] = [
    {
      id: "1",
      name: "부산소프트웨어마이스터고등학교",
      category: "특성화고교",
      location: "부산",
      date: "2025.04.13 등록",
      views: 182,
      comments: 312,
    },
  ];

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <PageLayout>
      <Header types={"default and no navi"} />
      <ContentSection>
        <SchoolList>
          {filteredSchools.map((school) => (
            <SchoolCard key={school.id} onClick={() => router.push("/main")}>
              <SchoolName>{school.name}</SchoolName>
              <SchoolMeta>
                {school.category} · {school.location}
              </SchoolMeta>
              <SchoolInfo>
                <SchoolDate>{school.date}</SchoolDate>
                <SchoolStats>
                  <StatItem><Bookmark width={14} height={14}/> {school.views}</StatItem>
                  <StatItem><Chat width={14} height={14}/> {school.comments}</StatItem>
                </SchoolStats>
              </SchoolInfo>
            </SchoolCard>
          ))}
        </SchoolList>
      </ContentSection>
        <NavigationBar />
    </PageLayout>
  );
}

const PageLayout = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  background-color: #FBFBFB;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const ContentSection = styled.section`
  flex: 1;
  padding: 76px 20px 80px;
  overflow-y: auto;
`;

const SchoolList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SchoolCard = styled.div`
  background-color: ${color.white};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
margin-top:30px;
`;

const SchoolName = styled.h3`
  ${font.H2};
  color: ${color.black};
  margin: 0;
  font-weight: 600;
`;

const SchoolMeta = styled.p`
  ${font.P4};
  color: ${color.gray600};
  margin: 0;
`;

const SchoolInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
`;

const SchoolDate = styled.span`
  ${font.P4};
  color: ${color.gray600};
`;

const SchoolStats = styled.div`
  display: flex;
  gap: 12px;
`;

const StatItem = styled.span`
  ${font.P3};
  color: ${color.gray600};
  display: flex;
  align-items: center;
  gap: 4px;
`;
