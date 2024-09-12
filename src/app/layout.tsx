"use client";

import "./globals.css";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
import { isDesktop } from "react-device-detect";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClientDesktop, setIsClientDesktop] = useState(false);
  useEffect(() => {
    // 클라이언트에서만 isDesktop 값을 설정
    setIsClientDesktop(isDesktop);
  }, []);
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
          as="style"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VN0ZH9YB60"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VN0ZH9YB60');
            `,
          }}
        />
      </head>
      <body>
        <RecoilRoot>
          <AppContainer $isDesktop={isClientDesktop}>
            <GlobalStyle />
            <ScrollToTop />
            {children}
          </AppContainer>
        </RecoilRoot>
      </body>
    </html>
  );
}

const AppContainer = styled.div<{ $isDesktop: boolean }>`
  width: 100vw;
  max-width: ${(props) => (props.$isDesktop ? "420px" : "none")};
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }
`;

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
