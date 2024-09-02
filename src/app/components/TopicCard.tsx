"use client"; // 클라이언트 컴포넌트임을 명시

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { detailDataState } from "@/store/detailData";
import { DataProps } from "@/types/dataProps";
import { parseSubscribersCount } from "@/utils/formatter";

interface TopicCardProps extends DataProps {
  icon: React.ReactNode;
}

const TopicCard = (props: TopicCardProps) => {
  const router = useRouter();
  const setTopicState = useSetRecoilState(detailDataState);
  const {
    section,
    headline_title,
    headline_subtitle,
    short_summary,
    thumbnail,
    upload_date,
    channel_thumbnail,
    channel_name,
    channel_subscribers,
    icon,
    id,
  } = props;

  const handleNavigate = () => {
    setTopicState(props);
    router.push(`/detail/${id}`);
  };

  return (
    <Container onClick={handleNavigate}>
      <CardHeader>
        <IconWrapper>
          <IconBox>{icon}</IconBox>
          {section === "뷰티/메이크업" ? (
            <span>
              뷰티/ <br /> 메이크업
            </span>
          ) : (
            <span>{section}</span>
          )}
        </IconWrapper>
        <Title>
          {headline_title}, <br /> {headline_subtitle}
        </Title>
      </CardHeader>
      <Summary>
        <p>{short_summary}</p>
      </Summary>
      <Thumbnail src={thumbnail} />
      <UploadTime>{upload_date.slice(0, -3)} 영상 업로드</UploadTime>
      <ChannelInfo>
        <ProfileImage src={channel_thumbnail}></ProfileImage>
        <ProfileInfo>
          <Name>{channel_name}</Name>
          <Subscriber>{parseSubscribersCount(channel_subscribers)}</Subscriber>
        </ProfileInfo>
      </ChannelInfo>
    </Container>
  );
};

export default TopicCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 22px 18px 22px;
  gap: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 1);
  margin-bottom: 32px;
`;

const CardHeader = styled.div`
  display: flex;
  gap: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid black;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  span {
    font-family: var(--font-Pretendard);
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;
    width: 46px;
  }
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #30d5c8;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 800;
  line-height: 28px;
`;

const Summary = styled.div`
  padding: 4px;
  border-radius: 4px;

  p {
    height: 54px;
    font-size: 16px;
    font-weight: 400;
    line-height: 168%;
    color: rgb(119 121 123);
    display: -webkit-box;
    word-break: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    box-sizing: border-box;
  }
`;

const Thumbnail = styled.img`
  object-fit: cover;
  border-radius: 4px;
  width: 100%;
  aspect-ratio: 306 / 172;
`;

const UploadTime = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  height: 36px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(217, 217, 217, 1);
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 14px;
  line-height: 19.6px;
`;

const Subscriber = styled.span`
  font-size: 12px;
  line-height: 16.8px;
  color: rgba(158, 158, 158, 1);
`;
