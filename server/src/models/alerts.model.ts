import { Schema, model } from "mongoose";

export interface IAlert {
  alert: string;
  date: Date;
}

const alertSchema = new Schema(
  {
    alert: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { collection: "alerts" }
);

export const Alert = model<IAlert>("Alert", alertSchema);
