import {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/graphql/schema.graphql",
  documents: ["src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      
    },
  },
};

export default config;
