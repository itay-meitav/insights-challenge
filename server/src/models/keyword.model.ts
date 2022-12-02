import { Schema, model } from "mongoose";

export interface IKeyword {
  keyword: string;
}

const keywordSchema = new Schema(
  {
    keyword: { type: String, required: true },
  },
  { collection: "keywords" }
);

export const Keyword = model<IKeyword>("Paste", keywordSchema);
