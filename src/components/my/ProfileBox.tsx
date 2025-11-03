"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { ProfileIcon } from "../../../public/svg/svg";

interface ProfileBoxProps {
  name: string;
  status: string;
  email: string;
}

const ProfileBox = ({ name, status, email }: ProfileBoxProps) => {
  return (
    <ProfileBoxWrapper>
      <ProfileBoxContent>
        <ProfileIconWrapper>
          <ProfileIcon width="54" height="54" />
        </ProfileIconWrapper>
        <ProfileInfoBox>
          <NameWithStatusRow>
            <ProfileName>{name}</ProfileName>
            <StatusBadge>
              <StatusIcon>🧑‍💻</StatusIcon>
              <StatusLabel>{status}</StatusLabel>
            </StatusBadge>
          </NameWithStatusRow>
          <ProfileEmail>{email}</ProfileEmail>
        </ProfileInfoBox>
      </ProfileBoxContent>
    </ProfileBoxWrapper>
  );
};

export default ProfileBox;

const ProfileBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 8px solid ${color.gray50};
`;

const ProfileBoxContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 0 20px;
  padding-top: 10px;
`;

const ProfileIconWrapper = styled.div`
  width: 54px;
  height: 54px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const NameWithStatusRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ProfileName = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${color.black};
  margin: 0;
  line-height: 1;
`;

const StatusBadge = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  padding: 4px 10px;
  background-color: ${color.gray50};
  border-radius: 4px;
  flex-shrink: 0;
`;

const StatusIcon = styled.span`
  font-size: 10px;
  line-height: 1;
`;

const StatusLabel = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: #777777;
  margin: 0;
  line-height: 1;
`;

const ProfileEmail = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${color.gray600};
  margin: 0;
  line-height: 1;
`;
