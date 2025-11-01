import type { Metadata } from "next";


import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js + Emotion + React Query",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">

        <body style={{ backgroundColor: "#FAFAFA", margin: 0, padding: 0 }}>
          {children}
        </body>
    </html>
  );
};

export default RootLayout;
