import _ from "lodash";
import { Resolvers } from "../../types";

// import { Resolvers } from "../types";
// import helloResolver from "./hello";
// import registerUserResolver from "./registerUser";
// const resolvers = _.merge({}, helloResolver, registerUserResolver);

// programatically import all resolvers recursively from all child folders except root level index.ts
const normalizedPath = require("path").join(__dirname, ".");
const resolvers: Resolvers = _.merge(
  {},
  ...require("fs")
    .readdirSync(normalizedPath)
    .filter((file: string) => {
      console.log(file);
      return file !== "index.ts";
    })
    .map((file: string) => require("./" + file).default)
);

export default resolvers;
