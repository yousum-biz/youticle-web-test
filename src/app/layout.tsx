"use client";

import "./globals.css";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
import { isDesktop } from "react-device-detect";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </head>
      <body>
        <RecoilRoot>
          <AppContainer $isDesktop={isDesktop}>
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
