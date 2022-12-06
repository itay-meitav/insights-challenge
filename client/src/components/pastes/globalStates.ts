import { atom } from "recoil";

type Paste = {
  content: string;
  author: string;
  title: string;
  date: Date;
};

type TPastesState = {
  pastes: Paste[];
  totalPages: number;
};

export const pastesState = atom({
  key: "pastesState",
  default: { pastes: [], totalPages: 0 } as TPastesState,
});
