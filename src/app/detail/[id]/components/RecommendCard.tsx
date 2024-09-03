"use client"; // Ensure the component is treated as a client component

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { detailDataState } from "@/store/detailData";
import { DataProps } from "@/types/dataProps";

interface RecommendCardProps extends DataProps {
  icon: React.ReactNode;
}

const RecommendCard = (props: RecommendCardProps) => {
  const router = useRouter();
  const setTopicState = useSetRecoilState(detailDataState);
  const { id, headline_title, headline_subtitle, thumbnail, upload_date } =
    props;

  const handleNavigate = () => {
    setTopicState(props);
    router.push(`/detail/${id}`);
  };

  return (
    <Container onClick={handleNavigate}>
      <Thumbnail src={thumbnail} />
      <Info>
        <Title>
          {headline_title}, <br /> {headline_subtitle}
        </Title>
        <UploadTime>{upload_date.slice(0, -3)}</UploadTime>
      </Info>
    </Container>
  );
};

export default RecommendCard;

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 20px 0;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(172, 172, 172, 1);
  font-family: "Pretendard Variable";
  cursor: pointer;
`;

const Thumbnail = styled.img`
  object-fit: cover;
  width: 120px;
  height: 64px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
`;

const UploadTime = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  color: rgba(158, 158, 158, 1);
`;
