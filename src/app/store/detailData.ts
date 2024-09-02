import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const detailDataState = atom({
  key: "detailDataState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
