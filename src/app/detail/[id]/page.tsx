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
  {
    /* <LogoHeader
        title={`${detailData.headline_title}, ${detailData.headline_subtitle}`}
      />
      <PageInfo>
        <Category>{detailData.section}</Category>
        <Title>
          {detailData.headline_title},
          <br />
          {detailData.headline_subtitle}
        </Title>
        <Upload>{detailData.upload_date} 업로드</Upload>
      </PageInfo>
      <ClientSide id={id} detailData={detailData} /> */
  }
}

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   font-family: "Pretendard Variable";
//   padding-top: 76px;
//   background-color: white;
// `;

// const PageInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 0 20px;
//   margin-bottom: 16px;
// `;

// const Category = styled.span`
//   font-size: 16px;
//   font-weight: 600;
//   line-height: 19.09px;
//   color: rgba(48, 213, 200, 1);
//   margin-bottom: 12px;
// `;

// const Title = styled.span`
//   font-size: 20px;
//   font-weight: 800;
//   line-height: 24px;
//   margin-bottom: 4px;
// `;

// const Upload = styled.span`
//   font-size: 12px;
//   font-weight: 400;
//   line-height: 14.4px;
// `;
