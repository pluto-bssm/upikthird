"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";

export default function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken) {
      Storage.setItem(TOKEN.ACCESS, accessToken);
    }

    if (refreshToken) {
      Storage.setItem(TOKEN.REFRESH, refreshToken);
    }

    if (accessToken && refreshToken) {
      router.push("/my");
    } else if (accessToken) {
      router.push("/my");
    } else {
      router.push("/login");
    }
  }, [searchParams, router]);

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
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
