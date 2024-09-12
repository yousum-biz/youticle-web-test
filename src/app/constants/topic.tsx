import AllIcon from "@/assets/all.svg";
import ChartIcon from "@/assets/chart.svg";
import HouseIcon from "@/assets/house.svg";
import CoinIcon from "@/assets/coin.svg";
import EconomyIcon from "@/assets/economy.svg";
import HealthIcon from "@/assets/health.svg";
import ScienceIcon from "@/assets/science.svg";
import ItTechIcon from "@/assets/itTech.svg";
import CarIcon from "@/assets/car.svg";
import DevelopIcon from "@/assets/develop.svg";
import CookIcon from "@/assets/cook.svg";
import MarriageIcon from "@/assets/marriage.svg";
import ManFashionIcon from "@/assets/manFashion.svg";
import WomanFashionIcon from "@/assets/womanFashion.svg";
import FitnessIcon from "@/assets/fitness.svg";
import TripIcon from "@/assets/trip.svg";
import AiIcon from "@/assets/ai.svg";
import HistoryIcon from "@/assets/history.svg";
import BeautyIcon from "@/assets/beauty.svg";
import BusinessIcon from "@/assets/business.svg";
import PoliticsIcons from "@/assets/politics.svg";
export const YOUTUBE_TOPICS = [
  {
    topic: "전체",
    icon: <AllIcon />,
  },
  {
    topic: "주식",
    icon: <ChartIcon />,
  },
  {
    topic: "부동산",
    icon: <HouseIcon />,
  },
  {
    topic: "가상자산",
    icon: <CoinIcon />,
  },
  {
    topic: "경제",
    icon: <EconomyIcon />,
  },
  {
    topic: "정치",
    icon: <PoliticsIcons />,
  },
  {
    topic: "역사",
    icon: <HistoryIcon />,
  },
  {
    topic: "연애/결혼",
    icon: <MarriageIcon />,
  },
  {
    topic: "건강",
    icon: <HealthIcon />,
  },
  {
    topic: "자기계발",
    icon: <DevelopIcon />,
  },
  {
    topic: "피트니스",
    icon: <FitnessIcon />,
  },
  {
    topic: "뷰티/메이크업",
    icon: <BeautyIcon />,
  },
  {
    topic: "여자 패션",
    icon: <WomanFashionIcon />,
  },
  {
    topic: "남자 패션",
    icon: <ManFashionIcon />,
  },
  {
    topic: "비즈니스/사업",
    icon: <BusinessIcon />,
  },
  {
    topic: "인공지능",
    icon: <AiIcon />,
  },
  {
    topic: "IT/테크",
    icon: <ItTechIcon />,
  },
  {
    topic: "자동차",
    icon: <CarIcon />,
  },
  {
    topic: "여행",
    icon: <TripIcon />,
  },
  {
    topic: "과학",
    icon: <ScienceIcon />,
  },
  {
    topic: "요리",
    icon: <CookIcon />,
  },
];

export const TOPIC_TAGS = YOUTUBE_TOPICS.filter(({ topic }) => topic !== "전체")
  .map(({ topic }) => {
    if (topic === "남자 패션" || topic === "여자 패션") {
      return "패션";
    }
    return topic;
  })
  .filter((topic, index, self) => self.indexOf(topic) === index);
