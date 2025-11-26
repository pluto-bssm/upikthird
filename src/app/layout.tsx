import type { Metadata } from "next";

import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "upik",
  icons: {
		icon: "/favicon.ico",
	},
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
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
