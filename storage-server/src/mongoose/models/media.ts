import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    extension: {
      type: String,
      required: true,
    },
    isSeries: {
      type: Boolean,
      required: true,
    },
    metadata: {
      duration: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
    },
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    series: {
      parent: {
        type: String,
        required: true,
      },
      season: {
        type: String,
        required: true,
      },
      episode: { type: String, required: true },
    },
    collectionBelong: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "media" }
);

export const MMedia = model("Media", schema, "media");
export const TCMedia = composeWithMongoose(MMedia);
