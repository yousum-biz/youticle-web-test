"use client";

import "./globals.css";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
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
      <body>
        <RecoilRoot>
          <AppContainer>
            <GlobalStyle />
            <ScrollToTop />
            {children}
          </AppContainer>
        </RecoilRoot>
      </body>
    </html>
  );
}

const AppContainer = styled.div`
  width: 100vw;
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
