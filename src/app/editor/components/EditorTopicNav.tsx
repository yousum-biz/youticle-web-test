"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { isDesktop } from "react-device-detect";
import { EDITOR_YOUTUBE_TOPICS } from "@/constants/editorTopic";

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

  const navSize = Math.ceil(EDITOR_YOUTUBE_TOPICS.length / 3);

  const topicGroups = [
    EDITOR_YOUTUBE_TOPICS.slice(0, navSize),
    EDITOR_YOUTUBE_TOPICS.slice(navSize, navSize * 2),
    EDITOR_YOUTUBE_TOPICS.slice(navSize * 2, EDITOR_YOUTUBE_TOPICS.length),
  ];

  const [clientSelected, setClientSelected] = useState<string>("");

  useEffect(() => {
    setClientSelected(selectedTopic);
  }, [selectedTopic]);

  const [isClientDesktop, setIsClientDesktop] = useState(false);
  useEffect(() => {
    // 클라이언트에서만 isDesktop 값을 설정
    setIsClientDesktop(isDesktop);
  }, []);

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
      $isDesktop={isClientDesktop}
      $isFixed={$isFixed}
      $hasScrolled={hasScrolled}
    >
      {topicGroups.map((chunk, index) => (
        <Column key={index}>
          {chunk.map(({ topic, icon }) => (
            <Topic
              key={topic}
              onClick={() => handleTopicClick(topic)}
              selected={clientSelected === topic}
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
  padding: 12px 0;
  margin-bottom: 12px;
  background-color: rgba(242, 242, 242, 1);

  margin-left: ${({ $isFixed, $hasScrolled }) =>
    $isFixed ? ($hasScrolled ? "0" : "12px") : $hasScrolled ? "0" : "12px"};
  /* width: ${(props) =>
    props.$isFixed ? "calc(100% + 20px)" : "calc(100% + 20px)"}; */
  transition: margin-left 0.3s ease;

  position: ${(props) => (props.$isFixed ? "fixed" : "static")};
  top: ${(props) => (props.$isFixed ? "52px" : "auto")};
  /* z-index: ${(props) => (props.$isFixed ? 0 : 0)}; */

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
    text-align: center;
  }
`;
