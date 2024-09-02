"use client"; // 클라이언트 컴포넌트임을 명시

import { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import TopicCard from "./TopicCard";
import { DataProps } from "@/types/dataProps";
import TodayIcon from "@/assets/today.svg";
import { YOUTUBE_TOPICS } from "@/constants/topic";
import GoToTopBtn from "@/common/GoToTopBtn";
import CountdownTimer from "@/common/CountdownTimer";
import SortOptions from "@/common/SortOptions";
import { topicState } from "@/store/topic";
import { useRecoilValue, useSetRecoilState } from "recoil";

const TODAY_TITLE = "오늘의 유튜브 아티클";

interface YoutubeTodayProps {
  data: DataProps[];
}

const YoutubeToday = ({ data }: YoutubeTodayProps) => {
  const selectedTopic = useRecoilValue(topicState);
  const setSelectedTopic = useSetRecoilState(topicState);
  const [sortCriteria, setSortCriteria] = useState("engagement");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sortOptionsRef = useRef<HTMLDivElement>(null);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);

    if (sortOptionsRef.current) {
      const { top } = sortOptionsRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + top - 94 - 52,
        behavior: "smooth",
      });
    }
  };

  const handleSortClick = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const handleClickIcon = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTooltipVisible(!tooltipVisible);
  };

  const filteredAndSortedData = useMemo(() => {
    const filteredData = data.filter(
      (item) => selectedTopic === "전체" || item.section === selectedTopic
    );
    const sortedData = filteredData.sort((a, b) => {
      if (sortCriteria === "engagement") {
        return b.engagement_score - a.engagement_score;
      } else {
        return b.views - a.views;
      }
    });
    return sortedData;
  }, [data, selectedTopic, sortCriteria]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollRefTop = scrollRef.current.getBoundingClientRect().top;
        setIsFixed(scrollRefTop <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      <TodayTitle>
        <TodayIcon />
        {TODAY_TITLE}
      </TodayTitle>
      <CountdownTimer scrollRef={scrollRef} />
      <TopicNav $isFixed={isFixed}>
        {YOUTUBE_TOPICS.map(({ topic, icon }) => (
          <Topic key={topic} onClick={() => handleTopicClick(topic)}>
            <IconBox selected={selectedTopic === topic}>{icon}</IconBox>
            {topic === "뷰티/메이크업" ? (
              <span>
                뷰티/ <br /> 메이크업
              </span>
            ) : (
              <span>{topic}</span>
            )}
          </Topic>
        ))}
      </TopicNav>
      <SortOptions
        ref={sortOptionsRef}
        isFixed={isFixed}
        sortCriteria={sortCriteria}
        tooltipVisible={tooltipVisible}
        setTooltipVisible={setTooltipVisible}
        handleSortClick={handleSortClick}
        handleClickIcon={handleClickIcon}
        variant="default"
      />
      {filteredAndSortedData.map((item, index) => {
        const topicIcon = YOUTUBE_TOPICS.find(
          (topic) => topic.topic === item.section
        )?.icon;
        return <TopicCard key={index} icon={topicIcon} {...item} />;
      })}
      <GoToTopBtn isVisible={isFixed} />
    </Container>
  );
};

export default YoutubeToday;

const Container = styled.div`
  width: 100%;
  background-color: rgba(242, 242, 242, 1);
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  margin-top: 36px;
  font-family: "Pretendard Variable";
`;

const TodayTitle = styled.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 28.64px;
  color: rgba(0, 123, 255, 1);
  letter-spacing: -1px;
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  gap: 12px;
`;

const TopicNav = styled.div<{ $isFixed: boolean }>`
  width: calc(100% + 20px);
  display: flex;
  gap: 12px;
  padding-top: 12px;
  margin-bottom: 5px;
  background-color: rgba(242, 242, 242, 1);

  padding-right: ${(props) => (props.$isFixed ? "50px" : "auto")};
  position: ${(props) => (props.$isFixed ? "fixed" : "static")};
  top: ${(props) => (props.$isFixed ? "52px" : "auto")};
  left: ${(props) => (props.$isFixed ? "20px" : "auto")};
  z-index: ${(props) => (props.$isFixed ? 10000 : 0)};

  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Topic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  span {
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;

    display: inline-block;
    text-align: center;
    width: 46px;
  }
`;

const IconBox = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;

  background-color: ${(props) => (props.selected ? "#30D5C8" : "#D9D9D9")};
`;
