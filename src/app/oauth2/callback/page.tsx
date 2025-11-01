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
        let accessToken = params.get("accessToken");
        let refreshToken = params.get("refreshToken");
        const code = params.get("code");

        if (code && !accessToken && !refreshToken) {
          const tokenUrl = `https://upik-659794985248.asia-northeast3.run.app/auth/code?code=${code}`;

          try {
            const response = await fetch(tokenUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              redirect: "manual",
              credentials: "include",
            });

            if (response.status === 307 || response.status === 302) {
              const location = response.headers.get("location");

              if (location) {
                const redirectUrl = new URL(location, window.location.origin);
                accessToken = redirectUrl.searchParams.get("accessToken") || accessToken;
                refreshToken = redirectUrl.searchParams.get("refreshToken") || refreshToken;
              }
            } else if (response.ok) {
              const data = await response.json();

              accessToken = data?.accessToken || data?.data?.accessToken || accessToken;
              refreshToken = data?.refreshToken || data?.data?.refreshToken || refreshToken;

              if (!accessToken) {
                const cookies = document.cookie.split(';');
                for (const cookie of cookies) {
                  const [name, value] = cookie.trim().split('=');
                  if (name === 'accessToken') {
                    accessToken = decodeURIComponent(value);
                  }
                  if (name === 'refreshToken') {
                    refreshToken = decodeURIComponent(value);
                  }
                }
              }
            }
          } catch (error) {
            // ignore
          }
        }

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
        router.push("/my");
      } catch (error) {
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

