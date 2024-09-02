import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const dataState = atom({
  key: "dataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
