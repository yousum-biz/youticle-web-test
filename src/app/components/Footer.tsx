"use client";

import styled from "styled-components";

const Footer = () => {
  const openPolicy = () => {
    const notionPageUrl = "https://www.naver.com";
    window.open(notionPageUrl, "_blank");
  };

  return (
    <Container>
      <button onClick={openPolicy}>이용약관</button>
      <button onClick={openPolicy}>개인정보처리방침</button>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  width: 100%;
  height: 68px;
  background-color: rgba(15, 15, 15, 1);
  display: flex;
  padding-left: 20px;

  button {
    font-size: 14px;
    font-weight: 500;
    line-height: 16.71px;
    background-color: transparent;
    color: rgba(255, 255, 255, 1);
  }
`;
