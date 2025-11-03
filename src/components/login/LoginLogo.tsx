"use client";

import styled from "@emotion/styled";
import Logo from "../../../public/svg/Logo";

const LoginLogo = () => {
  return (
    <StyledLogoContainer>
      <Logo width={150} height={80} />
    </StyledLogoContainer>
  );
};

export { LoginLogo };

const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
`;

