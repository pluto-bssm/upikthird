import color from "@/packages/design-system/src/color";
import styled from "@emotion/styled";
import font from "@/packages/design-system/src/font";
import IconProfile from "../../../public/svg/IconProfile";

const ProfileBox = () => {
  return (
    <StyledProfileBox>
      <ProfileContent>
        <ProfileImageWrapper>
          <IconProfile width={54} height={54} />
        </ProfileImageWrapper>
        <ProfileTextWrapper>
          <ProfileHeader>
            <ProfileName>박땡땡</ProfileName>
            <StudentBadge>
              <BadgeIcon>🧑‍💻</BadgeIcon>
              <BadgeText>재학생</BadgeText>
            </StudentBadge>
          </ProfileHeader>
          <ProfileEmail>fake_bsm_email@bssm.hs.kr</ProfileEmail>
        </ProfileTextWrapper>
      </ProfileContent>
    </StyledProfileBox>
  );
};

export default ProfileBox;

const StyledProfileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${color.white};
`;

const ProfileContent = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ProfileImageWrapper = styled.div`
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${color.gray50};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ProfileName = styled.p`
  ${font.D3};
  color: ${color.black};
  margin: 0;
  white-space: nowrap;
`;

const StudentBadge = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
  background-color: ${color.gray50};
  padding: 4px;
  border-radius: 4px;
  flex-shrink: 0;
`;

const BadgeIcon = styled.span`
  font-size: 10px;
`;

const BadgeText = styled.p`
  ${font.caption};
  color: ${color.gray700};
  margin: 0;
  white-space: nowrap;
`;

const ProfileEmail = styled.p`
  ${font.caption};
  color: ${color.gray700};
  margin: 0;
`;
