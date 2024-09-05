"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { isDesktop } from "react-device-detect";
import { YOUTUBE_TOPICS } from "@/constants/topic";

interface TopicNavProps {
  $isFixed: boolean;
  selectedTopic: string;
  handleTopicClick: (topic: string) => void;
}

const TopicNav = ({
  $isFixed,
  selectedTopic,
  handleTopicClick,
}: TopicNavProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navSize = Math.ceil(YOUTUBE_TOPICS.length / 3);

  const topicGroups = [
    YOUTUBE_TOPICS.slice(0, navSize),
    YOUTUBE_TOPICS.slice(navSize, navSize * 2),
    YOUTUBE_TOPICS.slice(navSize * 2, YOUTUBE_TOPICS.length),
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setHasScrolled(containerRef.current.scrollLeft > 0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Container
      ref={containerRef}
      $isDesktop={isDesktop}
      $isFixed={$isFixed}
      $hasScrolled={hasScrolled}
    >
      {topicGroups.map((chunk, index) => (
        <Column key={index}>
          {chunk.map(({ topic, icon }) => (
            <Topic
              key={topic}
              onClick={() => handleTopicClick(topic)}
              selected={selectedTopic === topic}
            >
              {icon}
              <span>{topic}</span>
            </Topic>
          ))}
        </Column>
      ))}
    </Container>
  );
};

export default TopicNav;

const Container = styled.div<{
  $isDesktop: boolean;
  $isFixed: boolean;
  $hasScrolled: boolean;
}>`
  max-width: ${({ $isDesktop }) => ($isDesktop ? "400px" : "none")};
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
  margin-bottom: 12px;
  background-color: rgba(242, 242, 242, 1);

  margin-left: ${({ $isFixed, $hasScrolled }) =>
    $isFixed ? ($hasScrolled ? "0" : "20px") : $hasScrolled ? "0" : "20px"};
  width: ${(props) =>
    props.$isFixed ? "calc(100% + 20px)" : "calc(100% + 20px)"};
  transition: margin-left 0.3s ease;

  position: ${(props) => (props.$isFixed ? "fixed" : "static")};
  top: ${(props) => (props.$isFixed ? "52px" : "auto")};
  z-index: ${(props) => (props.$isFixed ? 10000 : 0)};

  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Column = styled.div`
  display: flex;
  gap: 12px;
`;

const Topic = styled.div<{ selected: boolean }>`
  width: auto;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 1);
  background-color: ${(props) => (props.selected ? "#30D5C8" : "#D9D9D9")};

  span {
    font-family: var(--font-Pretendard);
    font-size: 12px;
    font-weight: 400;
    line-height: 14.32px;
    white-space: nowrap;
    /* display: inline-block; */
    text-align: center;
    /* width: 46px; */
  }
`;
