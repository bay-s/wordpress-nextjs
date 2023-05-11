import { gql } from "@apollo/client";

export const GET_ABOUT = gql`
query {
  pageBy(uri: "about") {
    id
    title
    content
    featuredImage {
      node {
        sourceUrl
      }
    }
  }
}
`