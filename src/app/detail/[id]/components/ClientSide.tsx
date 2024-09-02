"use client";

import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import YouTube, { YouTubeProps } from "react-youtube";
import { useRecoilValue } from "recoil";
import LogoHeader from "@/common/LogoHeader";
import Contents from "./Contents";
import { DataProps } from "@/types/dataProps";
import { formatSummary } from "@/utils/formatter";
import { playerState } from "@/store/player";
import { base64ToBlobUrl } from "@/utils/base64";

interface ClientSideProps {
  id: string;
  detailData: DataProps;
}

const ClientSide = ({ id, detailData }: ClientSideProps) => {
  const [videoPlayer, setVideoPlayer] = useState<any>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isPlayerVisible = useRecoilValue(playerState);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setVideoPlayer(event.target);
    setIsLoading(false);
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (!event.data) {
      const player = event.target;
      player.playVideo();
    }
  };

  const handleTocItemClick = (start: number) => {
    if (!isPlayerVisible) return;

    if (videoPlayer) videoPlayer.seekTo(start, true);
  };

  const opts: YouTubeProps["opts"] = {
    height: "202",
    playerVars: {
      autoplay: 1,
      rel: 0,
      disablekb: 1,
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollRefTop = scrollRef.current.getBoundingClientRect().top;
        setIsFixed(scrollRefTop <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();
    setIsLoading(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const thumbnailResponse = await fetch(
          `https://claying.shop/briefing/capture_frames/${id}`,
          { cache: "no-store" }
        );
        if (!thumbnailResponse.ok)
          throw new Error("Failed to fetch thumbnails");

        const thumbnailData = await thumbnailResponse.json();
        const sortedThumbnails = thumbnailData
          .sort((a: any, b: any) => {
            const numA = parseInt(a.filename.match(/\d+/)?.[0] || "0", 10);
            const numB = parseInt(b.filename.match(/\d+/)?.[0] || "0", 10);
            return numA - numB;
          })
          .map(({ content }: any) => base64ToBlobUrl(content));

        setThumbnails(sortedThumbnails);
      } catch (error) {
        console.error("Error fetching thumbnails:", error);
      }
    };

    fetchThumbnails();
  }, [id]);

  return (
    <Container $isFixed={isFixed}>
      <LogoHeader
        title={
          isFixed
            ? `${detailData.headline_title}, ${detailData.headline_subtitle}`
            : ""
        }
      />
      <PageInfo ref={scrollRef}>
        <Category>{detailData.section}</Category>
        <Title>
          {detailData.headline_title},
          <br />
          {detailData.headline_subtitle}
        </Title>
        <Upload>{detailData.upload_date} 업로드</Upload>
      </PageInfo>
      {isPlayerVisible && (
        <VideoContainer ref={videoContainerRef} $isFixed={isFixed}>
          {isLoading && <Loader />}
          <YouTube
            videoId={detailData.id}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </VideoContainer>
      )}

      <Preview $isFixed={isFixed}>
        <div>
          <span>🔎 미리보기</span>
          {formatSummary(detailData.short_summary)}
        </div>
      </Preview>
      <TOC>
        <div>목차</div>
        <div>
          {detailData.template_summary.map(({ title }, index) => (
            <span key={index}>{title} </span>
          ))}
        </div>
      </TOC>
      <Contents
        detailData={detailData}
        thumbnails={thumbnails}
        handleTocItemClick={handleTocItemClick}
      />
    </Container>
  );
};

export default ClientSide;

const Container = styled.div<{ $isFixed: boolean }>`
  display: flex;
  flex-direction: column;
  font-family: "Pretendard Variable";
  padding-top: 76px;
  background-color: white;
`;

const PageInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 16px;
`;

const Category = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  color: rgba(48, 213, 200, 1);
  margin-bottom: 12px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 800;
  line-height: 24px;
  margin-bottom: 4px;
`;

const Upload = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
`;

const Preview = styled.div<{ $isFixed: boolean }>`
  padding: 20px;
  margin-top: ${(props) => (props.$isFixed ? "176px" : "28px")};

  div {
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    padding: 20px;
    gap: 12px;
  }

  span {
    display: block;
    font-family: "Pretendard Variable";
    font-size: 16px;
  }

  span:first-child {
    font-weight: 600;
  }

  span.line-break {
    font-weight: 400;
    line-height: 160%;
    margin-bottom: 8px;
  }
`;

const TOC = styled.div`
  margin-top: 24px;
  padding: 0 20px;

  div:first-child {
    height: 44px;
    padding: 10px 16px 10px 16px;
    background-color: rgba(0, 0, 0, 1);
    font-size: 20px;
    font-weight: 800;
    line-height: 24px;
    color: rgba(255, 255, 255, 1);
  }

  div:nth-child(2) {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    background-color: rgba(242, 242, 242, 1);
    font-size: 18px;
    font-weight: 600;
    line-height: 19.09px;
  }
`;

const VideoContainer = styled.div<{ $isFixed: boolean }>`
  position: ${(props) => (props.$isFixed ? "fixed" : "static")};
  top: ${(props) => (props.$isFixed ? "52px" : "auto")};
  left: ${(props) => (props.$isFixed ? "0" : "auto")};
  z-index: 1000;
  display: flex;

  div {
    width: 100vw;

    iframe {
      width: 100vw;
    }
  }
`;

const LoaderAnimation = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: 200px 0;
    }
`;

const Loader = styled.div`
  width: 360px;
  height: 202px;
  background: #f0f0f0;
  background-image: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: ${LoaderAnimation} 1.5s infinite;
`;