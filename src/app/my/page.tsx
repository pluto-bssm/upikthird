'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import color from '@/packages/design-system/src/color';
import Header from '@/components/common/header';
import ProfileBox from '@/components/my/ProfileBox';
import TabBar from '@/components/my/TabBar';
import MenuSection, { type MenuItem } from '@/components/my/MenuSection';
import { useCurrentUser } from '@/hooks/useAccount';

const MyPage = () => {
  const router = useRouter();
  const { user, loading, error } = useCurrentUser();

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
      router.push('/my/likes');
    }
  };

  const getQualification = (role: string) => {
    switch (role) {
      case 'ROLE_BSM':
        return '재학생';
      default:
        return '외부인';
    }
  };

  if (loading) {
    return (
      <StyledMyPage>
        <Header types="close" text="" />
        <LoadingText>로딩 중...</LoadingText>
      </StyledMyPage>
    );
  }

  if (error || !user) {
    return (
      <StyledMyPage>
        <Header types="close" text="" />
        <ErrorText>사용자 정보를 불러올 수 없습니다.</ErrorText>
      </StyledMyPage>
    );
  }

  return (
    <StyledMyPage>
      <Header types="close" text="" />
      <MyPageContent>
        <ProfileBox
          profileImage="https://via.placeholder.com/54"
          name={user.name}
          status={getQualification(user.role)}
          email={user.email}
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

const LoadingText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${color.gray600};
  padding: 40px 20px;
  margin: 0;
`;
