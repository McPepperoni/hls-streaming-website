import { TCTracking } from "../../mongoose/models/tracking";

const TrackingQuery = {
  trackingById: TCTracking.getResolver("findById"),
  trackingByIds: TCTracking.getResolver("findByIds"),
  trackingOne: TCTracking.getResolver("findOne"),
  trackingMany: TCTracking.getResolver("findMany"),
  trackingCount: TCTracking.getResolver("count"),
  trackingConnection: TCTracking.getResolver("connection"),
  trackingPagination: TCTracking.getResolver("pagination"),
};

const TrackingMutation = {
  trackingCreateOne: TCTracking.getResolver("createOne"),
  trackingCreateMany: TCTracking.getResolver("createMany"),
  trackingUpdateById: TCTracking.getResolver("updateById"),
  trackingUpdateOne: TCTracking.getResolver("updateOne"),
  trackingUpdateMany: TCTracking.getResolver("updateMany"),
  trackingRemoveById: TCTracking.getResolver("removeById"),
  trackingRemoveOne: TCTracking.getResolver("removeOne"),
  trackingRemoveMany: TCTracking.getResolver("removeMany"),
};

export { TrackingQuery, TrackingMutation };
