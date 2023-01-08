import { SchemaComposer } from "graphql-compose";
import { GroupMutation, GroupQuery } from "./schemas/group";
import { MediaMutation, MediaQuery } from "./schemas/media";
import { TrackingMutation, TrackingQuery } from "./schemas/tracking";
import { UserMutation, UserQuery } from "./schemas/user";

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...UserQuery,
  ...GroupQuery,
  ...MediaQuery,
  ...TrackingQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...GroupMutation,
  ...MediaMutation,
  ...TrackingMutation,
});

export default schemaComposer.buildSchema();
