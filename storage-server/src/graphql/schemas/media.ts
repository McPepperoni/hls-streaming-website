import { TCMedia } from "../../mongoose/models/media";

const MediaQuery = {
  mediaById: TCMedia.getResolver("findById"),
  mediaByIds: TCMedia.getResolver("findByIds"),
  mediaOne: TCMedia.getResolver("findOne"),
  mediaMany: TCMedia.getResolver("findMany"),
  mediaCount: TCMedia.getResolver("count"),
  mediaConnection: TCMedia.getResolver("connection"),
  mediaPagination: TCMedia.getResolver("pagination"),
};

const MediaMutation = {
  mediaCreateOne: TCMedia.getResolver("createOne"),
  mediaCreateMany: TCMedia.getResolver("createMany"),
  mediaUpdateById: TCMedia.getResolver("updateById"),
  mediaUpdateOne: TCMedia.getResolver("updateOne"),
  mediaUpdateMany: TCMedia.getResolver("updateMany"),
  mediaRemoveById: TCMedia.getResolver("removeById"),
  mediaRemoveOne: TCMedia.getResolver("removeOne"),
  mediaRemoveMany: TCMedia.getResolver("removeMany"),
};

export { MediaQuery, MediaMutation };
