import { Metadata } from "next";
import ClientSide from "./components/ClientSide";
import NotFoundPage from "./components/NotFound";
import { DataProps } from "@/types/dataProps";

interface DetailPageProps {
  params: {
    id: string;
  };
}

// Dynamically generate metadata based on fetched data
export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { id } = params;

  const response = await fetch(
    `https://claying.shop/briefing/top_videos/${id}`
  );
  const data = await response.json();
  const detailData = data[0];

  return {
    title: detailData?.title || "Detail Page",
    description: detailData?.short_summary || "Description",
    openGraph: {
      title: detailData?.title,
      description: detailData?.short_summary,
      images: [{ url: detailData?.thumbnail }],
    },
  };
}

// Base64 디코딩 함수 (서버에서 실행)
const decodeBase64 = (base64: string): Buffer => {
  return Buffer.from(base64, "base64");
};

// Main page component
export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = params;

  // Fetch top videos data
  const response = await fetch(
    `https://claying.shop/briefing/top_videos/${id}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    return <NotFoundPage />;
  }

  const data = await response.json();
  const detailData: DataProps | null = data[0] || null;

  if (!detailData) {
    return <NotFoundPage />;
  }

  // Fetch thumbnail data
  const thumbnailResponse = await fetch(
    `https://claying.shop/briefing/capture_frames/${id}`,
    { cache: "no-store" }
  );
  if (!thumbnailResponse.ok) {
    return <NotFoundPage />;
  }

  const thumbnailData = await thumbnailResponse.json();

  // 서버에서 base64로 변환 (Uint8Array 대신 문자열 형태로 변환하여 클라이언트로 전달)
  const base64Thumbnails = thumbnailData.map(({ content }: any) => content); // base64 문자열 배열

  // 데이터를 클라이언트 컴포넌트에 전달
  return (
    <ClientSide detailData={detailData} thumbnails={base64Thumbnails} id={id} />
  );
}
