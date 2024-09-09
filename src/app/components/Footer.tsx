"use client";

import styled from "styled-components";

const Footer = () => {
  const openUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Container>
      <Logo>YouTicle</Logo>
      <Description>
        유튜브 영상을 아티클로 빠르고 편하게 읽어보세요.
      </Description>
      <Authorization>YouTicle@2024 all rights reserved</Authorization>
      <ButtonContainer>
        <button
          onClick={() =>
            openUrl(
              "https://youticle.notion.site/f076128fc331471cb90886dd8b19e4f5"
            )
          }
        >
          이용약관
        </button>
        <button
          onClick={() =>
            openUrl(
              "https://youticle.notion.site/077923c2481e4894b130b7ae1f1bc58a"
            )
          }
        >
          개인정보처리방침
        </button>
      </ButtonContainer>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  width: 100%;
  background-color: rgba(15, 15, 15, 1);
  display: flex;
  padding-left: 20px;
  padding-top: 24px;
  padding-bottom: 24px;
  flex-direction: column;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  font-family: "Inter";
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
`;

const Authorization = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-top: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 28px;
  button {
    font-size: 14px;
    font-weight: 500;
    line-height: 16.71px;
    background-color: transparent;
    color: rgba(255, 255, 255, 1);
    margin-right: 24px;
  }
`;
