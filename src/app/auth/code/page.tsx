"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";

const AuthCodeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken) {
      Storage.setItem(TOKEN.ACCESS, accessToken);
    }

    if (refreshToken) {
      Storage.setItem(TOKEN.REFRESH, refreshToken);
    }

    if (accessToken || refreshToken) {
      router.push("/my");
    } else if (code) {
      // 여기서 code를 백엔드에 보내서 token을 받을 수 있음
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

const AuthCodePage = () => {
  return (
    <Suspense fallback={<div>로그인 처리 중...</div>}>
      <AuthCodeContent />
    </Suspense>
  );
};

export default AuthCodePage;
