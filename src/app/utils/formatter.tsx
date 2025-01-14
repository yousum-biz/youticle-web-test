"use client";

import React from "react";

// 구독자 수를 파싱하는 함수
export const parseSubscribersCount = (count: number): string => {
  if (count < 1000) {
    return `${count}명`;
  } else if (count < 10000) {
    return `${(count / 1000).toFixed(2).replace(/\.?0+$/, "")}천명`;
  } else if (count < 100000000) {
    if (count >= 1000000) {
      return `${Math.floor(count / 10000)}만명`;
    }
    return `${(count / 10000).toFixed(2).replace(/\.?0+$/, "")}만명`;
  } else {
    return `${(count / 100000000).toFixed(1).replace(/\.?0+$/, "")}억명`;
  }
};

// 시간을 두 자리 숫자로 포맷팅하는 함수
const formatToTwoDigits = (time: number): string =>
  time.toString().padStart(2, "0");

// 남은 시간을 계산하는 함수
export const calcuateTimeLeft = (): string => {
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    9,
    0,
    0
  );
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${formatToTwoDigits(hours)}:${formatToTwoDigits(
    minutes
  )}:${formatToTwoDigits(seconds)}`;
};

// 분을 시간 포맷으로 변환하는 함수
const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};

// 시간 범위를 포맷팅하는 함수
export const formatTimeRange = (startMinutes: number): string => {
  const startTime = formatMinutesToTime(startMinutes);
  return `${startTime} ~`;
};

// 요약 텍스트를 포맷팅하는 함수
export const formatSummary = (summary: string) => {
  const regex = /(?<!\d\.\d)\. /g;

  return summary
    .split(regex)
    .filter((sentence) => sentence.trim() !== "")
    .map((sentence, index, array) => {
      const parts = sentence.split(/(<mark>.*?<\/mark>)/g).map((part, i) =>
        part.startsWith("<mark>") ? (
          <b style={{ fontWeight: "bold" }} key={i}>
            {part.replace(/<\/?mark>/g, "")}
          </b>
        ) : (
          part
        )
      );

      return (
        <span key={index} className="line-break">
          {parts}
          {index !== array.length - 1 ? "." : ""}
        </span>
      );
    });
};

export const timeSinceUpload = (uploadTime: string) => {
  // 현재 시각 가져오기
  const now = new Date();

  // 업로드 시간 파싱 (ISO 형식)
  const uploadDate = new Date(uploadTime);

  // 시간 차이 계산 (밀리초 단위)
  const timeDifference = now.getTime() - uploadDate.getTime();

  // 밀리초를 시간 단위로 변환
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  // 24시간 이상이면 일 단위로, 아니면 시간 단위로 출력
  if (hoursDifference >= 24) {
    const daysDifference = Math.floor(hoursDifference / 24);
    return `${daysDifference}일 전`;
  } else {
    return `${hoursDifference}시간 전`;
  }
};

export const removeMarkTags = (text: string): string => {
  // 정규식을 사용하여 <mark></mark> 태그를 삭제
  return text.replace(/<mark[^>]*>/g, "").replace(/<\/mark>/g, "");
};

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const dateObj = new Date(dateStr);

  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return `${diffSecs}초 전`;
  } else if (diffMins < 60) {
    return `${diffMins}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else {
    const diffMonths =
      (now.getFullYear() - dateObj.getFullYear()) * 12 +
      (now.getMonth() - dateObj.getMonth());
    const diffYears = now.getFullYear() - dateObj.getFullYear();

    if (diffYears >= 1) {
      return `${diffYears}년 전`;
    } else if (diffMonths >= 1) {
      return `${diffMonths}개월 전`;
    } else {
      return `${diffDays}일 전`;
    }
  }
}
