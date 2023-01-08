import { compareArrayOne } from "../utils";

const Auth = (resolvers: any) => {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve((next: any) => async (rp: any) => {
      if (!rp.context.req.isAuth) {
        throw new Error("You must login to view this.");
      }
      return next(rp);
    });
  });
  return resolvers;
};

export default Auth;

Auth.Role = (resolvers: any, role: string[]) => {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve((next: any) => async (rp: any) => {
      if (compareArrayOne(role, rp.context.req.role)) {
        throw new Error(
          "You must have the required permission to perform this action"
        );
      }
      return next(rp);
    });
  });
  return resolvers;
};

Auth.Id = (resolvers: any, id: string) => {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve((next: any) => async (rp: any) => {
      if (rp.context.req.id !== id) {
        throw new Error(
          "You don't have the required permission to perform this action"
        );
      }
      return next(rp);
    });
  });
  return resolvers;
};
