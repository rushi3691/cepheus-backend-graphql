import { gql } from "graphql-tag";

import { readFileSync } from "fs";
import { join } from "path";
const definitions = readFileSync(join(__dirname, "./schema.graphql"), "utf8");

export const typeDefs = gql`${definitions}`;