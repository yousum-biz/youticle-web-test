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

// Main page component
export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = params;

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

  return <ClientSide detailData={detailData} id={id} />;
}
