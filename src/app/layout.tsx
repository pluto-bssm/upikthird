import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "upik",
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
