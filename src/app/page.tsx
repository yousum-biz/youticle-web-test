// /app/page.tsx
"use client";

import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import axios from "axios";
import ServiceIntroduce from "./components/ServiceIntroduce";
import LogoHeader from "@/common/LogoHeader";
import YoutubeToday from "./components/YoutubeToday";
import Footer from "./components/Footer";
import { dataState } from "@/store/data";
import { userState } from "@/store/user";
import GoogleLogin from "@/common/GoogleLogin";

export default function LandingPage() {
  const setApiData = useSetRecoilState(dataState);
  const apiData = useRecoilValue(dataState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://claying.shop/briefing/top_videos/"
        );
        setApiData(response.data);
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching top videos:", error);
      }
    };

    getData();
  }, [setApiData]);

  return (
    <Container $isLogin={user.name !== ""}>
      <LogoHeader />
      {user.name === "" && (
        <>
          <ServiceIntroduce />
          <GoogleLogin
            variant="button"
            text="구글 계정 연동해서 무료 구독하기"
          />
        </>
      )}
      <YoutubeToday data={apiData} />
      <Footer />
    </Container>
  );
}

const Container = styled.div<{ $isLogin: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Pretendard Variable";
  padding-top: ${(props) => (props.$isLogin ? "16px" : "76px")};

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
`;
