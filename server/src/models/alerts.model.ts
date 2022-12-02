import { Schema, model } from "mongoose";

export interface IAlert {
  content: string;
  date: Date;
}

const alertSchema = new Schema(
  {
    content: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { collection: "alerts" }
);

export const Alert = model<IAlert>("Paste", alertSchema);
