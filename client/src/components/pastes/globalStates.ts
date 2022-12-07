import { atom } from "recoil";

type Paste = {
  content: string;
  author: string;
  title: string;
  date: Date;
};

type TPastesState = {
  pastes: Paste[];
  pastesCount: number;
};

export const pastesState = atom({
  key: "pastesState",
  default: { pastes: [], pastesCount: 0 } as TPastesState,
});
