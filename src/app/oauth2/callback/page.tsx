"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";


export default function OAuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("로그인 처리 중...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        let accessToken = params.get("accessToken");
        let refreshToken = params.get("refreshToken");

        if (code && !accessToken && !refreshToken) {
          const tokenUrl = `https://heodongun.com/auth/code?code=${code}`;

          try {
            const response = await fetch(tokenUrl, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            });

            accessToken = response.headers.get("authorization") || accessToken;
            refreshToken = response.headers.get("refreshToken") || refreshToken;

            if (!accessToken && response.ok) {
              const data = await response.json().catch(() => null);
              accessToken = data?.accessToken || accessToken;
              refreshToken = data?.refreshToken || refreshToken;
            }
          } catch (error) {
            void error;
            console.error("토큰 요청 에러:", error);
          }
        }

        if (!accessToken) {
          setStatus("토큰 정보가 없습니다");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        Storage.setItem(TOKEN.ACCESS, accessToken);
        if (refreshToken) Storage.setItem(TOKEN.REFRESH, refreshToken);

        router.push("/main");
      } catch (error) {
        void error;
        setStatus("오류가 발생했습니다");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    handleCallback();
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
