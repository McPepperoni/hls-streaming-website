import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

export const schema = new Schema(
  {
    media: { type: Schema.Types.ObjectId, ref: "Media" },
    position: {
      season: {
        type: String,
        required: true,
      },
      episode: {
        type: String,
        required: true,
      },
      currentTime: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true, collection: "tracking" }
);

export const MTracking = model("Tracking", schema, "tracking");
export const TCTracking = composeWithMongoose(MTracking);
