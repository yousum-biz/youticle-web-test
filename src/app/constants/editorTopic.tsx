import BusinessIcon from "@/assets/business.svg";
export const EDITOR_YOUTUBE_TOPICS = [
  {
    topic: "비즈니스/사업",
    icon: <BusinessIcon />,
  },
];

export const EDITOR_TOPIC_TAGS = EDITOR_YOUTUBE_TOPICS.filter(
  ({ topic }) => topic !== "전체"
)
  .map(({ topic }) => {
    if (topic === "남자 패션" || topic === "여자 패션") {
      return "패션";
    }
    return topic;
  })
  .filter((topic, index, self) => self.indexOf(topic) === index);
