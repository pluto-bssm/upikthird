"use client";

import { Suspense } from "react";
import OAuthCallbackContent from "./callback-content";

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
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
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
