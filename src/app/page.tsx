// /app/page.tsx (서버사이드 컴포넌트)
import axios from "axios";
import LandingPageClient from "./components/LandingPageClient"; // 클라이언트 컴포넌트

export default async function LandingPage() {
  // 서버사이드에서 데이터 패칭
  const response = await axios.get("https://claying.shop/briefing/top_videos/");
  const apiData = response.data;

  // 데이터를 클라이언트 컴포넌트에 전달
  return <LandingPageClient apiData={apiData} />;
}
