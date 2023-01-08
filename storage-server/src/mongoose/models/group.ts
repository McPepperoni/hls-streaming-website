import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

export const SGroup = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    trackings: [{ type: Schema.Types.ObjectId, ref: "Tracking" }],
    admin: [{ type: Schema.Types.ObjectId, ref: "User" }],
    setting: [{}],
  },
  { timestamps: true, collection: "group" }
);

export const MGroup = model("Group", SGroup, "group");
export const TCGroup = composeWithMongoose(MGroup);
