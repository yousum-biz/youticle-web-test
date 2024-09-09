// /app/page.tsx (서버사이드 컴포넌트)
import axios from "axios";
import LandingPageClient from "./components/LandingPageClient"; // 클라이언트 컴포넌트

import { Suspense } from "react";

export const metadata = {
  title: "YouTicle",
  description:
    "매일 최신 업로드된 19가지 주제의 유튜브 영상들을 빠르고 편하게 아티클로 읽어보세요!",
  openGraph: {
    title: "YouTicle",
    description:
      "매일 최신 업로드된 19가지 주제의 유튜브 영상들을 빠르고 편하게 아티클로 읽어보세요!",
    images: [
      {
        url: "/images/ogImage.png", // public 폴더 내의 경로
        alt: "Thumbnail Image",
      },
    ],
    icons: {
      icon: "/images/favicon.png", // favicon 경로
    },
  },
};

export default async function LandingPage() {
  // 서버사이드에서 데이터 패칭
  const response = await fetch(
    "https://claying.shop/briefing/top_videos/csv/",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("API 요청 실패");
  }

  const apiData = await response.json();

  // 데이터를 클라이언트 컴포넌트에 전달
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LandingPageClient apiData={apiData} />
    </Suspense>
  );
}
