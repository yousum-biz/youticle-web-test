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
      <TimeWarning>이 시간이 지나면 읽을 수 없습니다.</TimeWarning>
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
  <StyledTime ref={ref}>{timeLeft}</StyledTime>
));

const StyledTime = styled.span`
  font-size: 32px;
  font-weight: 500;
  line-height: 16px;
  text-align: left;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
`;
