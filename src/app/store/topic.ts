import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const topicState = atom({
  key: "topicState",
  default: "전체",
  effects_UNSTABLE: [persistAtom],
});
