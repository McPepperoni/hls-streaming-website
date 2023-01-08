import { schema as SUser, TCUser } from "../../mongoose/models/user";
import Auth from "../auth";

const UserQuery = {
  ...Auth({
    userById: TCUser.getResolver("findById"),
    userByIds: TCUser.getResolver("findByIds"),
    userOne: TCUser.getResolver("findOne"),
    userMany: TCUser.getResolver("findMany"),
    userCount: TCUser.getResolver("count"),
    userConnection: TCUser.getResolver("connection"),
    userPagination: TCUser.getResolver("pagination"),
  }),
};

const UserMutation = {
  login: TCUser.getResolver("login"),
  signup: TCUser.getResolver("signup"),
  ...Auth.Role(
    {
      userCreateMany: TCUser.getResolver("createMany"),
      userRemoveMany: TCUser.getResolver("removeMany"),
      userUpdateMany: TCUser.getResolver("updateMany"),
    },
    ["admin"]
  ),
  ...Auth({
    userUpdateById: TCUser.getResolver("updateById"),
    userUpdateOne: TCUser.getResolver("updateOne"),
    userRemoveById: TCUser.getResolver("removeById"),
    userRemoveOne: TCUser.getResolver("removeOne"),
  }),
};

export { UserQuery, UserMutation };
