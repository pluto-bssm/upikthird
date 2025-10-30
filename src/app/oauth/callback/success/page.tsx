"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";

const OAuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken =
      searchParams.get("accessToken") || searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken) {
      Storage.setItem(TOKEN.ACCESS, accessToken);
    }

    if (refreshToken) {
      Storage.setItem(TOKEN.REFRESH, refreshToken);
    }

    if (accessToken || refreshToken) {
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
      <p>로그인 처리 중...</p>
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
