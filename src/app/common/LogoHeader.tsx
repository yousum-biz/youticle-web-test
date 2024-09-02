"use client";

import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter, usePathname } from "next/navigation";
import { auth, signOut } from "@/firebase";
import { userState } from "@/store/user";
import { playerState } from "@/store/player";
import BackIcon from "@/assets/back.svg";
import YoutubeOffIcon from "@/assets/youtubeOff.svg";
import YoutubeOnIcon from "@/assets/youtubeOn.svg";
import ShareIcon from "@/assets/share.svg";
import Toast from "./Toast";

interface LogoHeaderProps {
  title?: string;
}

const LogoHeader = ({ title = "" }: LogoHeaderProps) => {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const player = useRecoilValue(playerState);
  const setPlayer = useSetRecoilState(playerState);
  const [toastVisible, setToastVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isDetailPage = pathname.includes("/detail");

  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy URL:", err);
        });
    } else {
      console.warn("This browser does not support Clipboard API.");
    }
  };

  const togglePlayerVisible = () => {
    setPlayer(!player);
  };

  const goBack = () => {
    router.back();
  };

  const goHome = () => {
    router.push("/");
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser({
        name: "",
        email: "",
        picture: "",
      });
    } catch (e) {
      console.error("Error logging out:", e);
    }
  };

  return (
    <>
      <Container $isDetailPage={isDetailPage}>
        <PageInfo>
          {isDetailPage && <BackIcon onClick={goBack} />}
          {title === "" ? (
            <span onClick={goHome} className="logo">
              로고
            </span>
          ) : (
            <Title>{title}</Title>
          )}
        </PageInfo>
        {isDetailPage && title !== "" && (
          <IconSection>
            {player ? (
              <YoutubeOffIcon onClick={togglePlayerVisible} />
            ) : (
              <YoutubeOnIcon onClick={togglePlayerVisible} />
            )}
            <ShareIcon onClick={copyUrlToClipboard} />
          </IconSection>
        )}
        {title === "" && user.picture !== "" && (
          <ProfileImage onClick={logOut}>
            {user.picture !== "" && (
              <img src={user.picture} alt="User profile" />
            )}
          </ProfileImage>
        )}
      </Container>
      <Toast message="링크가 복사되었습니다" visible={toastVisible} />
    </>
  );
};

export default LogoHeader;

const Container = styled.header<{ $isDetailPage: boolean }>`
  width: 100%;
  height: 52px;
  padding: 0 20px !important;
  position: fixed;
  top: 0;
  background-color: ${(props) =>
    props.$isDetailPage ? "rgba(244, 244, 244, 1)" : "rgba(0, 123, 255, 1)"};
  font-family: "Pretendard Variable";

  display: flex;
  justify-content: ${(props) =>
    props.$isDetailPage ? "space-between" : "space-between"};
  align-items: center;
  z-index: 1000;
  overflow: hidden;

  .logo {
    margin-left: 8px;
    color: ${(props) =>
      props.$isDetailPage ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)"};
  }
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.09px;
  width: 200px;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileImage = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
`;

const IconSection = styled.div`
  display: flex;
  gap: 12px !important;
  align-items: center;
`;
