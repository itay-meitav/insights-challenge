import { Schema, model } from "mongoose";

export interface IPaste {
  content: string;
  author: string;
  title: string;
  date: Date;
}

const pasteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { collection: "pastes" }
);

export const Paste = model<IPaste>("Paste", pasteSchema);
