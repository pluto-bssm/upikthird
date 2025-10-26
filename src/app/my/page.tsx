'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import color from '@/packages/design-system/src/color';
import Header from '@/components/common/header';
import ProfileBox from '@/components/my/ProfileBox';
import TabBar from '@/components/my/TabBar';
import MenuSection, { type MenuItem } from '@/components/my/MenuSection';

const MyPage = () => {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      id: '1',
      label: '내가 만든 투표',
      category: '기록',
      onClick: () => router.push('/my/my-votes'),
    },
    {
      id: '2',
      label: '투표 응답 내역',
      category: '기록',
      onClick: () => router.push('/my/vote-responses'),
    },
    {
      id: '3',
      label: '질문 게시판 글 작성 내역',
      category: '기록',
      onClick: () => router.push('/my/posts'),
    },
    {
      id: '4',
      label: '계정 정보',
      category: '설정',
      onClick: () => router.push('/my/info'),
    },
    {
      id: '5',
      label: '서비스 소개',
      category: '도움말 & 지원',
      onClick: () => router.push('/info/about'),
    },
    {
      id: '6',
      label: '문의하기',
      category: '도움말 & 지원',
      onClick: () => router.push('/my/inquiry'),
    },
  ];

  const handleMenuItemClick = (item: MenuItem) => {
    item.onClick?.();
  };

  const handleTabChange = (tab: 'saved' | 'like') => {
    if (tab === 'saved') {
      router.push('/my/saved/guide');
    } else {
      router.push('/my/saved/post');
    }
  };

  return (
    <StyledMyPage>
      <Header types="close" text="" />
      <MyPageContent>
        <ProfileBox
          profileImage="https://via.placeholder.com/54"
          name="박땡땡"
          status="재학생"
          email="fake_bssm_email@bssm.hs.kr"
        />

        <TabBarWrapper>
          <TabBar
            savedGuideCount={0}
            likeQuestionCount={0}
            onTabChange={handleTabChange}
          />
        </TabBarWrapper>

        <MenuSectionWrapper>
          <MenuSection items={menuItems} onItemClick={handleMenuItemClick} />
        </MenuSectionWrapper>
      </MyPageContent>
    </StyledMyPage>
  );
};

export default MyPage;

const StyledMyPage = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background-color: ${color.white};
  min-height: 100vh;
  padding-top: 80px;
`;

const MyPageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`;

const TabBarWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  padding-bottom: 2px;
`;

const MenuSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 40px;
`;
