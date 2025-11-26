"use client";

import styled from "@emotion/styled";
import color from "@/packages/design-system/src/color";
import { Home, Vote, Guide, Dashboard } from "@/../public/svg";
import { useRouter,usePathname } from "next/navigation";

const NavigationBar = () => {
  const router = useRouter();
  const pathname = usePathname();


  const isActive = (path: string) => {
    const result = pathname.includes(path);
    return result;
  };

  return (
    <NavigationBarLayout>
      <NavigationBarItem>
        <Home
          width="40"
          height="40"
          onClick={() => {
            router.push("/main");
          }}
          color={isActive("/main") ? color.black : color.gray300}
        />
        <Vote
          width="40"
          height="40"
          onClick={() => {
            router.push("/vote");
          }}
          color={isActive("vote") ? color.black : color.gray300}
        />
        <Guide
          width="40"
          height="40"
          onClick={() => {
            router.push("/guide");
          }}
          color={isActive("guide") ? color.black : color.gray300}
        />
        <Dashboard
          width="40"
          height="40"
          onClick={() => {
            router.push("/question");
          }}
          color={isActive("question") ? color.black : color.gray300}
        />
      </NavigationBarItem>
    </NavigationBarLayout>
  );
};

export default NavigationBar;

const NavigationBarLayout = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  background-color: ${color.white};
  position: fixed;
  bottom: 0;
  height: 50px;
`;

const NavigationBarItem = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;
