import { Schema, model } from "mongoose";

export interface ITag {
  tag: string;
}

const tagSchema = new Schema(
  {
    tag: { type: String, required: true },
  },
  { collection: "tags" }
);

export const Tag = model<ITag>("Tag", tagSchema);
