import { model, Schema } from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { TResolverArgs } from "../../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export const schema = new Schema(
  {
    role: [
      {
        type: String,
        require: true,
      },
    ],
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    trackings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tracking",
      },
    ],
    validated: {
      status: {
        type: Boolean,
        required: true,
        default: false,
      },
      hash: {
        type: String,
        required: true,
      },
    },
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  },
  { timestamps: true, collection: "user" }
);

export const MUser = model("User", schema, "user");
export const TCUser = composeWithMongoose(MUser);

TCUser.addFields({
  token: "String",
});

TCUser.addResolver({
  kind: "mutation",
  name: "login",
  args: {
    email: "String!",
    password: "String!",
  },
  type: TCUser.getResolver("updateById").getType(),
  resolve: async (props: TResolverArgs) => {
    var user = await MUser.findOne({ email: props.args.email });

    if (!user) {
      throw new Error("User does not exist!!");
    }
    console.log(user.password);

    const isEqual = (await props.args.password) === user.password;
    if (!isEqual) {
      throw new Error("Password is incorrect!!");
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as jwt.Secret,
      {}
    );

    return {
      recordId: user.id,
      record: {
        email: user.email,
        token,
        validated: {
          status: user.validated?.status,
        },
      },
    };
  },
});

TCUser.addResolver({
  kind: "mutation",
  name: "signup",
  args: {
    email: "String!",
    password: "String!",
    displayName: "String!",
  },
  type: TCUser.getResolver("createOne").getType(),
  resolve: async (props: TResolverArgs) => {
    var user = await MUser.findOne({ email: props.args.email });

    if (user) {
      throw new Error("Email has already been used");
    }

    const userData = {
      displayName: props.args.displayName,
      email: props.args.email,
      password: props.args.password,
      role: ["user"],
      validated: {
        status: false,
        hash: randomUUID(),
      },
    };

    user = await MUser.create(userData);

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as jwt.Secret,
      {}
    );

    return {
      recordId: user._id,
      record: {
        email: user.email,
        token,
      },
    };
  },
});

TCUser.addResolver({
  kind: "mutation",
  name: "validate",
  args: {
    hash: "String!",
  },
  type: TCUser.getResolver("updateById").getType(),
  resolve: async (props: TResolverArgs) => {
    var user = await MUser.findOne({ "validated.hash": props.args.hash });
    if (!user) {
      throw new Error("This account has already been validated!!");
    }

    const validated = {
      status: true,
      hash: "",
    };

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as jwt.Secret,
      {}
    );

    return {
      recordId: user._id,
      record: {
        email: user.email,
        token,
        validated,
      },
    };
  },
});
