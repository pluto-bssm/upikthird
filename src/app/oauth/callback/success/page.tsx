"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";

const OAuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("로그인 처리 중...");

  useEffect(() => {
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

    try {
      Storage.setItem(TOKEN.ACCESS, accessToken);

      const savedToken = Storage.getItem(TOKEN.ACCESS);
      if (!savedToken) {
        setStatus("토큰 저장 실패");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }
    } catch (error) {
      setStatus("토큰 저장 실패");
      setTimeout(() => router.push("/login"), 2000);
      return;
    }

    if (refreshToken) {
      try {
        Storage.setItem(TOKEN.REFRESH, refreshToken);
      } catch (error) {}
    }

    setStatus("로그인 성공! 리다이렉트 중...");
    setTimeout(() => router.push("/my"), 300);
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
        <p>{status}</p>
      </div>
    </div>
  );
};

const OAuthCallbackPage = () => {
  return (
    <Suspense fallback={<div>로그인 처리 중...</div>}>
      <OAuthCallbackContent />
    </Suspense>
  );
};

export default OAuthCallbackPage;
