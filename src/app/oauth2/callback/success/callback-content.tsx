"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";

export default function OAuthCallbackContent() {
  const router = useRouter();
  const [status, setStatus] = useState("로그인 처리 중...");

  useEffect(() => {
    try {
      const getCookie = (name: string) => {
        if (typeof document === "undefined") return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
      };

      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");

      if (!accessToken) {
        setStatus("토큰 정보가 없습니다");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      Storage.setItem(TOKEN.ACCESS, accessToken);

      const savedAccessToken = Storage.getItem(TOKEN.ACCESS);

      if (!savedAccessToken) {
        setStatus("토큰 저장 실패");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      if (refreshToken) {
        Storage.setItem(TOKEN.REFRESH, refreshToken);
      }

      setStatus("로그인 성공! 리다이렉트 중...");

      setTimeout(() => {
        router.push("/my");
      }, 300);
    } catch (error) {
      setStatus("오류가 발생했습니다");
      setTimeout(() => router.push("/login"), 2000);
    }
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>로그인 처리 중...</h2>
        <p>{status}</p>
      </div>
    </div>
  );
}
