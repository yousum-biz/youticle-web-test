"use client";

import { calcuateTimeLeft } from "@/utils/formatter";
import { useState, useEffect, forwardRef, Ref } from "react";
import styled from "styled-components";

interface CountdownTimerProps {
  scrollRef?: Ref<HTMLSpanElement>;
}

const CountdownTimer = ({ scrollRef }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcuateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <TimeWarning>다음 업데이트까지 남은 시간</TimeWarning>
      <Time ref={scrollRef} timeLeft={timeLeft} />
    </>
  );
};

CountdownTimer.displayName = "CountdownTimer";
export default CountdownTimer;

const TimeWarning = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  margin-bottom: 20px;
`;

interface TimeProps {
  timeLeft: string;
}

const Time = forwardRef<HTMLSpanElement, TimeProps>(({ timeLeft }, ref) => (
  <>
    <Container>
      <StyledTime ref={ref}>{timeLeft}</StyledTime>
      <Tip>
        (단, <span>주식 주제</span>는 <span>오후 6시</span>에{" "}
        <span>중간 갱신</span>되어 <span>국내 증시 소식</span>을{" "}
        <span>업데이트</span>합니다.)
      </Tip>
    </Container>
  </>
));

Time.displayName = "Time"; // 추가된 부분

const StyledTime = styled.span`
  font-size: 32px;
  font-weight: 500;
  line-height: 16px;
  text-align: left;
  padding-bottom: 20px;
  min-width: 128px;
  max-width: 128px;
`;

const Tip = styled.div`
  font-size: 12px;
  margin-left: 12px;
  line-height: 136%;
  max-width: 200px;
  min-width: 192px;
  margin-top: -4px;
  span {
    background: #fde68a;
    font-weight: 700;
  }
`;

const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 1);
  display: flex;
`;
