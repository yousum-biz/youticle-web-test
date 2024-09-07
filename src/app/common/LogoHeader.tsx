"use client";

import { useState, useEffect } from "react";
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
import { isDesktop } from "react-device-detect";

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
          console.error("URL 복사에 실패했습니다.", err);
        });
    } else {
      console.warn("이 브라우저는 Clipboard API를 지원하지 않습니다.");
    }
  };

  const togglePlayerVisible = () => {
    setPlayer(!player);
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
  const [isClientDesktop, setIsClientDesktop] = useState(false);
  useEffect(() => {
    // 클라이언트에서만 isDesktop 값을 설정
    setIsClientDesktop(isDesktop);
  }, []);
  return (
    <>
      <Container $isDetailPage={isDetailPage} $isDesktop={isClientDesktop}>
        <PageInfo>
          {isDetailPage && <BackIcon onClick={goHome} />}
          {title === "" ? (
            <span onClick={goHome} className="logo">
              YouTicle
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

const Container = styled.header<{
  $isDetailPage: boolean;
  $isDesktop: boolean;
}>`
  width: 100%;
  max-width: ${({ $isDesktop }) => ($isDesktop ? "420px" : "none")};
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
    color: ${(props) =>
      props.$isDetailPage ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)"};
    font-family: "Inter";
    font-weight: 700;
    font-size: 20px;
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
