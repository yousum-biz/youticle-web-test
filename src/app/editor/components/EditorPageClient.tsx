// /app/components/LandingPageClient.tsx (클라이언트 컴포넌트)
"use client";

import { useEffect, useState, useRef } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import LogoHeader from "@/common/LogoHeader";
import Footer from "../../components/Footer";
import EditorIcon from "@/assets/editor.svg";
import EditorBizThumbnail from "@/assets/editor_biz.svg";
import { dataState } from "@/store/data";
import { userState } from "@/store/user";
import { eidtorTopicState } from "@/store/editorTopic";
import EditorTopicNav from "../components/EditorTopicNav";
import { EDITOR_YOUTUBE_TOPICS } from "@/constants/editorTopic";
import TopicCard from "../../components/TopicCard";
import { timeAgo } from "../../utils/formatter";
import EditorCard from "./EditorCard";
interface EditorPageClientProps {
  apiData: any; // 서버에서 전달된 데이터
}

export default function EditorPageClient({ apiData }: EditorPageClientProps) {
  const [isFixed, setIsFixed] = useState(false);
  const selectedTopic = useRecoilValue(eidtorTopicState);
  const setSelectedTopic = useSetRecoilState(eidtorTopicState);
  const setApiData = useSetRecoilState(dataState);
  const sortOptionsRef = useRef<HTMLDivElement>(null);
  const EDITOR_TITLE = "유티클 에디터 픽";
  const EDITOR_SUBTITLE =
    "카테고리 별 유티클 에디터들이 선정한 영상을 아티클로 제공하고 있습니다.";
  const user = useRecoilValue(userState);
  useEffect(() => {
    // 클라이언트에서 받은 데이터를 Recoil 상태에 설정
    setApiData(apiData);
  }, [apiData, setApiData]);
  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);

    if (sortOptionsRef.current) {
      const { top } = sortOptionsRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + top - 94 - 112,
        behavior: "smooth",
      });
    }
  };
  return (
    <Container>
      <LogoHeader />
      <EditorTitle>
        <EditorIcon />
        {EDITOR_TITLE}
      </EditorTitle>
      <EditorSubTitle>{EDITOR_SUBTITLE}</EditorSubTitle>
      <TopicNavContainer>
        <EditorTopicNav
          $isFixed={isFixed}
          selectedTopic={selectedTopic}
          handleTopicClick={handleTopicClick}
        ></EditorTopicNav>
      </TopicNavContainer>
      <EditorInfoContainer>
        <EditorBizThumbnail />
        <EditorInfoTitleContainer>
          <EditorInfoTitle>유썸 비즈</EditorInfoTitle>
          <EditorInfoDescription>
            양질의 유튜브 비즈니스/사업 관련 영상을 읽어드립니다.
          </EditorInfoDescription>
        </EditorInfoTitleContainer>
      </EditorInfoContainer>
      <EditorContainer>
        {apiData.map((item, index) => {
          const topicIcon = EDITOR_YOUTUBE_TOPICS.find(
            (topic) => topic.topic === item.section
          )?.icon;
          return (
            <div key={item.video_id}>
              <ArticleDate>{timeAgo(item.article_date)} 업로드</ArticleDate>
              <EditorCard icon={topicIcon} {...item} />
            </div>
          );
        })}
      </EditorContainer>
      <Footer />
    </Container>
  );
}

const Container = styled.div<{ $isLogin: boolean }>`
  display: flex;
  flex-direction: column;
  font-family: "Pretendard Variable";
  padding-top: ${(props) => (props.$isLogin ? "16px" : "76px")};
  background-color: rgba(242, 242, 242, 1);
  height: 100vh;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
`;

const TopicNavContainer = styled.div`
  padding: 0;
  width: 100%;
`;

const EditorContainer = styled.div`
  padding: 20px 12px;
`;

const EditorTitle = styled.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 28.64px;
  color: rgba(0, 123, 255, 1);
  letter-spacing: -1px;
  margin-bottom: 12px;
  margin-left: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const EditorSubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 120%;
  margin-left: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const EditorInfoContainer = styled.div`
  display: flex;
  margin-left: 12px;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 0.5px solid #ababab;
  margin-right: 12px;
  margin-top: 20px;
`;

const EditorInfoTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditorInfoTitle = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
  font-weight: 700;
  margin-left: 8px;
`;

const EditorInfoDescription = styled.div`
  font-size: 14px;
  margin-left: 8px;
`;

const ArticleDate = styled.div`
  color: #494848;
  font-size: 14px;
  margin-bottom: 8px;
  margin-left: 4px;
`;
