import { graphQLRequest } from "./request";

export const foldersLoader = async () => {
  const query = `query ExampleQuery {
      folders {
        id
        name
        createAt
     }
        }`;
  const data = await graphQLRequest({ query });

  return data;
};
