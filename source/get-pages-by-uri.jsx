import { gql } from "@apollo/client";

export const GET_PAGES_BY_URI = gql`
query GetPageByPath($path: String!) {
    pageBy(uri: $path) {
        id
        title
        content
        uri
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        date
        author {
          node {
            name
          }
        }
      }
    }
`