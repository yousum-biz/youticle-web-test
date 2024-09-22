import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const eidtorTopicState = atom({
  key: "editorTopicState",
  default: "비즈니스/사업",
  effects_UNSTABLE: [persistAtom],
});
