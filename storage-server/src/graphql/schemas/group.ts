import { TCGroup } from "../../mongoose/models/group";

const GroupQuery = {
  groupById: TCGroup.getResolver("findById"),
  groupByIds: TCGroup.getResolver("findByIds"),
  groupOne: TCGroup.getResolver("findOne"),
  groupMany: TCGroup.getResolver("findMany"),
  groupCount: TCGroup.getResolver("count"),
  groupConnection: TCGroup.getResolver("connection"),
  groupPagination: TCGroup.getResolver("pagination"),
};

const GroupMutation = {
  groupCreateOne: TCGroup.getResolver("createOne"),
  groupCreateMany: TCGroup.getResolver("createMany"),
  groupUpdateById: TCGroup.getResolver("updateById"),
  groupUpdateOne: TCGroup.getResolver("updateOne"),
  groupUpdateMany: TCGroup.getResolver("updateMany"),
  groupRemoveById: TCGroup.getResolver("removeById"),
  groupRemoveOne: TCGroup.getResolver("removeOne"),
  groupRemoveMany: TCGroup.getResolver("removeMany"),
};

export { GroupQuery, GroupMutation };
