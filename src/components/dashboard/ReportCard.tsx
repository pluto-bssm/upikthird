"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import font from "@/packages/design-system/src/font";
import { Nexts } from "@/../public/svg/svg";
import { useRouter } from "next/navigation";

export interface NotificationItemProps {
  id: string;
  title: string;
  reporter: string;
  target: string;
  date: string;
}

const NotificationItem = ({
  id,
  title,
  reporter,
  target,
  date,
}: NotificationItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <ItemContainer onClick={handleClick}>
      <ContentWrapper>
        <TitleText>{title}</TitleText>
        <SubtitleText>
          신고자: {reporter} · 신고자 대상: {target}
        </SubtitleText>
      </ContentWrapper>
      <RightSection>
        <DateText>{date}</DateText>
        <Nexts width="20" height="20" />
      </RightSection>
    </ItemContainer>
  );
};

export default NotificationItem;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid ${color.gray300};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const TitleText = styled.p`
  ${font.D3};
  color: ${color.black};
`;

const SubtitleText = styled.p`
  ${font.H3};
  color: ${color.gray500};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateText = styled.p`
  ${font.caption};
  color: ${color.gray400};
`;
