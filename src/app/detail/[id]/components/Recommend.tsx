"use client"; // Ensure this is a client component

import styled from "styled-components";
import { useMemo, useState } from "react";
import { DataProps } from "@/types/dataProps";
import { useRecoilValue } from "recoil";
import { dataState } from "@/store/data";
import { YOUTUBE_TOPICS } from "@/constants/topic";
import RecommendCard from "./RecommendCard";
import CountdownTimer from "@/common/CountdownTimer";
import SortOptions from "@/common/SortOptions";

interface RecommendProps {
  detailData: DataProps;
}

const Recommend = ({ detailData }: RecommendProps) => {
  const RECOMMEND_TITLE = `👇 다음&nbsp;<span class='highlight'>${detailData.section}</span>&nbsp;유튜브 아티클 확인하기`;
  const [sortCriteria, setSortCriteria] = useState("engagement");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const apiData = useRecoilValue<DataProps[]>(dataState);

  const handleSortClick = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const handleClickIcon = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTooltipVisible(!tooltipVisible);
  };

  const filteredAndSortedData = useMemo(() => {
    const filteredData = apiData.filter(
      (item) => item.section === detailData.section && item.id !== detailData.id
    );
    const sortedData = filteredData.sort((a, b) => {
      if (sortCriteria === "engagement") {
        return b.engagement_score - a.engagement_score;
      } else {
        return b.views - a.views;
      }
    });
    return sortedData;
  }, [apiData, sortCriteria]);

  return (
    <Container>
      <RecommendTitle dangerouslySetInnerHTML={{ __html: RECOMMEND_TITLE }} />
      <CountdownTimer />
      <SortOptions
        sortCriteria={sortCriteria}
        tooltipVisible={tooltipVisible}
        setTooltipVisible={setTooltipVisible}
        handleSortClick={handleSortClick}
        handleClickIcon={handleClickIcon}
        variant="border"
      />
      {filteredAndSortedData.map((item, index) => {
        const topicIcon = YOUTUBE_TOPICS.find(
          (topic) => topic.topic === item.section
        )?.icon;
        return <RecommendCard key={index} icon={topicIcon} {...item} />;
      })}
    </Container>
  );
};

export default Recommend;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const RecommendTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;

  .highlight {
    font-weight: 600;
    color: rgba(48, 213, 200, 1);
  }
`;
